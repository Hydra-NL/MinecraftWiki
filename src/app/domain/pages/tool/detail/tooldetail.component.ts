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

@Component({
  selector: 'app-tooldetail',
  templateUrl: './tooldetail.component.html',
})
export class ToolDetailComponent implements OnInit {
  tool: Tool | undefined;
  tools: Tool[] = [];
  blocks: Block[] = [];
  mobs: Mob[] = [];
  user: User | undefined;
  currentUser: User | undefined;
  userTools: Tool[] = [];
  userToolId: string = '';

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
    this.route.paramMap.subscribe((params: any) => {
      // Tool for this page
      this.tool = this.toolService.getTool(this.route.snapshot.params['id']);
      console.log(this.route.snapshot.params['id']);

      // Creator of said tool
      this.userToolId = this.tool?.createdBy['_id'] || '';
      this.user = this.userService.getUserById(this.userToolId);

      // Current user
      // Moet current user worden
      this.currentUser = this.userService.getUserById('1');

      // Tools of the creator (see also from creator list)
      this.userTools = this.toolService.getToolsByUser(this.userToolId);
      this.userTools = this.userTools.filter((t) => t._id !== this.tool?._id);
      this.userTools.sort((a, b) => {
        return a.creationDate.getTime() - b.creationDate.getTime();
      });

      // Tools (see also list)
      this.tools = this.toolService.getTools();
      this.tools = this.tools.filter((t) => t._id !== this.tool?._id);
      this.tools.sort((a, b) => a.toolLevel - b.toolLevel);

      // Blocks that this tool can break
      this.blocks = this.blockService
        .getBlocks()
        .filter((b) => b.tool === this.tool!.toolType)
        .filter((b) => b.hardness <= this.tool!.toolLevel);

      // Mobs that can be damages by this tool
      this.mobs = this.mobService
        .getMobs()
        .filter((m) => m.armor <= this.tool!.attack);

      console.log('current: ' + this.currentUser._id);
      console.log('user: ' + this.user._id);
      console.log(
        'includes: ' + this.user?.subscriptions?.includes(this.currentUser!)
      );
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Explosion1.ogg';
    audio.load();
    audio.play();
  }

  deleteTool() {
    this.toolService.deleteTool(this.tool!._id!);
    this.playAudio();
    this.router.navigate(['/tools']);
  }

  subscribe() {
    this.userService.subscribeToUser(this.currentUser!, this.user!);
    this.router.navigate(['/tools', this.tool?._id]);
  }
}
