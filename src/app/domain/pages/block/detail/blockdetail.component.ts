import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';

@Component({
  selector: 'app-blockdetail',
  templateUrl: './blockdetail.component.html',
})
export class BlockDetailComponent implements OnInit {
  block: Block | undefined;
  blocks: Block[] = [];
  tools: Tool[] = [];
  user: User | undefined;
  currentUser: User | undefined;
  userBlockId!: string;
  biome: Biome | undefined;
  userBlocks: Block[] = [];

  constructor(
    private blockService: BlockService,
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockComponent constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      // Block for this page
      this.block = this.blockService.getBlock(this.route.snapshot.params['id']);
      this.biome = this.block?.biome;
      console.log(this.route.snapshot.params['id']);

      // Creator of said block
      this.userBlockId = this.block?.createdBy['_id'] || '';
      this.user = this.userService.getUserById(this.userBlockId);

      // Current user
      // Moet current user worden
      this.currentUser = this.userService.getUserById('1');

      // Blocks of the creator (see also from creator list)
      this.userBlocks = this.blockService.getBlocksByUser(this.userBlockId);
      this.userBlocks = this.userBlocks.filter(
        (block) => block._id !== this.block?._id
      );
      this.userBlocks.sort((a, b) => {
        return a.creationDate.getTime() - b.creationDate.getTime();
      });

      // Blocks (see also list)
      this.blocks = this.blockService.getBlocks();
      this.blocks = this.blocks.filter(
        (block) => block._id !== this.block?._id
      );
      this.blocks.sort((a, b) => a.hardness - b.hardness);

      // Tools that can break this block
      this.tools = this.toolService
        .getTools()
        .filter((tool) => tool.toolType === this.block?.tool)
        .filter((tool) => tool.toolLevel >= this.block!.hardness);

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

  deleteBlock() {
    this.blockService.deleteBlock(this.block!._id!);
    this.playAudio();
    this.router.navigate(['/blocks']);
  }

  subscribe() {
    this.userService.subscribeToUser(this.currentUser!, this.user!);
    this.router.navigate(['/blocks', this.block?._id]);
  }
}
