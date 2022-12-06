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
    this.route.params.subscribe(() => {
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
          // Blocks that this tool can break
          this.subscription = this.blockService.list().subscribe({
            next: (blocks) => {
              this.blocks = blocks!;
              this.blocks = this.blocks.filter(
                (b) =>
                  this.tool?.toolType === b.tool &&
                  this.tool?.toolLevel >= b.hardness
              );
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
        .read('638a100681c9e538c5ebd7f0')
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

      // Tools (see also list)
      this.subscription = this.toolService.list().subscribe({
        next: (tools) => {
          this.tools = tools!;
          this.tools.sort((a, b) => a.toolLevel - b.toolLevel);
          this.tools = this.tools.filter((tool) => tool._id !== this.toolId);
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
    if (this.creator!.subscribers.includes(this.currentUser!._id!)) {
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: (creator) => {
          creator.subscribers = creator.subscribers.splice(
            creator.subscribers.indexOf(this.currentUser!._id!),
            1
          );
          this.creator = creator;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: (creator) => {
          creator.subscribers.push(this.currentUser!._id!);
          this.creator = creator;
          this.subscription = this.userService
            .update(this.currentUser!)
            .subscribe({
              next: (currentUser) => {
                currentUser.subscriptions.push(this.creator!._id!);
                this.currentUser = currentUser;
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
    }
  }
}
