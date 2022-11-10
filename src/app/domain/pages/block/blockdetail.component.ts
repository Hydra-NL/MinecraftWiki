import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../models/tool/tool.model';
import { ToolService } from '../../models/tool/tool.service';

@Component({
  selector: 'app-blockdetail',
  templateUrl: './blockdetail.component.html',
})
export class BlockDetailComponent implements OnInit {
  block: Block | undefined;
  blocks: Block[] = [];
  tools: Tool[] = [];

  constructor(
    private blockService: BlockService,
    private toolServce: ToolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockComponent constructor');
  }

  ngOnInit() {
    this.block = this.blockService.getBlock(this.route.snapshot.params['id']);
    this.blocks = this.blockService.getBlocks();
    this.blocks = this.blocks.filter((block) => block._id !== this.block?._id);
    this.tools = this.toolServce
      .getTools()
      .filter((tool) => tool.toolType === this.block?.tool);
    this.blocks.sort((a, b) => a.hardness - b.hardness);
    console.log(this.tools);
  }
}
