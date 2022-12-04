import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/domain/models/tool/tool.model';
import { ToolService } from 'src/app/domain/models/tool/tool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tooldetail',
  templateUrl: './tooldetail.component.html',
})
export class ToolDetailComponent implements OnInit {
  tool: Tool | undefined;
  toolId!: string;
  tools!: Tool[];
  blocks: Block[] = [];
  mobs: Mob[] = [];
  creator: User | undefined;
  currentUser: User | undefined;
  userTools: Tool[] = [];
  subscription!: Subscription;

  constructor(
    private toolService: ToolService,
    private userService: UserService,
    private blockService: BlockService,
    private mobService: MobService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('ToolComponent constructor');
  }

  ngOnInit() {
    // Tool for this page
    this.toolId = this.route.snapshot.params['id'];
    console.log(this.toolId);

    this.subscription = this.toolService.read(this.toolId).subscribe({
      next: (tool) => {
        this.tool = tool;
        console.log(`Tool: ${this.tool._id}`);
        // Creator of said tool
        this.subscription = this.userService
          .read(this.tool?.createdBy!)
          .subscribe({
            next: (creator) => {
              this.creator = creator;
              console.log(`Creator: ${this.creator._id}`);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });

    

    // Current user
    // Moet current user worden
    this.subscription = this.userService
      .read('638a0fd2abf8e7b2eb1bb039')
      .subscribe({
        next: (currentUser) => {
          this.currentUser = currentUser;
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving the currentuser: ' + err
          );
        },
      });

    // Tools of the creator (see also from creator list)
    this.subscription = this.toolService.list().subscribe({
      next: (userTools) => {
        this.userTools = userTools!.filter((tool) => {
          return tool.createdBy === this.currentUser?._id;
        });
        this.userTools.sort((a, b) => {
          return a.creationDate.getTime() - b.creationDate.getTime();
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Tools (see also list)
    this.subscription = this.toolService.list().subscribe({
      next: (tools) => {
        this.tools = tools!;
        this.tools = this.tools.filter((t) => t._id !== this.tool?._id);
        this.tools.sort((a, b) => a.toolLevel - b.toolLevel);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Blocks that this tool can break
    this.subscription = this.blockService.list().subscribe({
      next: (blocks) => {
        this.blocks = blocks!;
        this.blocks
          .filter((b) => b.tool === this.tool!.toolType)
          .filter((b) => b.hardness <= this.tool!.toolLevel);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Mobs that can be damages by this tool
    this.subscription = this.mobService.list().subscribe({
      next: (mobs) => {
        this.mobs = mobs!;
        this.mobs.filter((m) => m.armor <= this.tool!.toolLevel);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Explosion1.ogg';
    audio.load();
    audio.play();
  }

  deleteTool() {
    this.subscription = this.toolService.delete(this.toolId).subscribe({
      next: () => {
        this.playAudio();
        this.router.navigate(['/tools']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  subscribe() {
    this.userService.subscribeToUser(this.currentUser!, this.creator?._id!);
    this.router.navigate(['/tools', this.tool?._id]);
  }
}
