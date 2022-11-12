import { Component } from '@angular/core';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { Block } from 'src/app/domain/models/block/block.model';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
})
export class BlockComponent {
  blocks: Block[] = [];

  constructor(private blockService: BlockService) {
    console.log('BlockComponent constructor');
  }

  ngOnInit() {
    this.blocks = this.blockService.getBlocks();
    console.log(this.blocks);
  }
}
