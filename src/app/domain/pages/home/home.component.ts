import { Component } from '@angular/core';
import { MobService } from '../../models/mob/mob.service';
import { ToolService } from '../../models/tool/tool.service';
import { BlockService } from '../../models/block/block.service';
import { UserService } from '../../models/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'ClientSide-Project';
  tools: any[] = [];
  mobs: any[] = [];
  blocks: any[] = [];
  users: any[] = [];
  feed: any[] = [];
  date: Date = new Date();

  constructor(
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService,
    private userService: UserService
  ) {
    console.log('HomeComponent constructor');
  }

  ngOnInit() {
    console.log(this.date.toLocaleString());
    this.mobs = this.mobService.getMobs();
    this.tools = this.toolService.getTools();
    this.blocks = this.blockService.getBlocks();
    this.users = this.userService.getUsers();
    
    this.feed = [...this.mobs, ...this.tools, ...this.blocks];
    this.feed.sort((a, b) => {
      return b.creationDate.getTime() - a.creationDate.getTime();
    }
    );
  }
}
