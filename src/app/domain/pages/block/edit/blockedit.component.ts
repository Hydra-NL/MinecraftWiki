import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool, ToolType } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { Subscription } from 'rxjs';
import { Biome, Dimension } from 'src/app/domain/models/biome/biome.model';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-blockedit',
  templateUrl: './blockedit.component.html',
})
export class BlockEditComponent implements OnInit {
  blockId: string = this.route.snapshot.params['id'];
  block: Block | undefined;
  biome: Biome | undefined;
  subscription!: Subscription;

  constructor(
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockEditComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.blockService.read(this.blockId).subscribe({
      next: (block) => {
        this.block = block;
        console.log(`Block: ${this.block._id}`);
        console.log('block stack size: ' + this.block.stackSize);
      },
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Smithing_Table1.ogg';
    audio.load();
    audio.play();
    console.log('playAudio');
  }

  updateBlock() {
    this.subscription = this.blockService.update(this.block!).subscribe({
      next: (block) => {
        this.block = { ...block };
        this.playAudio();
        this.router.navigate(['/blocks/' + this.blockId]);
      },
    });
  }
}
