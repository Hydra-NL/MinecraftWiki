import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { Subscription } from 'rxjs';
import { Biome } from 'src/app/domain/models/biome/biome.model';

@Component({
  selector: 'app-blockedit',
  templateUrl: './blockedit.component.html',
})
export class BlockEditComponent implements OnInit {
  blockId: string = this.route.snapshot.params['id'];
  block: Block | undefined;
  biome: Biome | undefined;

  constructor(
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockEditComponent constructor');
  }

  ngOnInit() {
    this.block = this.blockService.getBlock(this.blockId);
    this.biome = this.block?.biome;
  }

  updateBlock() {
    this.block;
    if (this.block) {
      this.blockService.updateBlock(this.block);
      this.router.navigate(['/blocks/' + this.blockId]);
      console.log('BlockEditComponent updateBlock');
      console.log(this.block);
    } else {
      this.router.navigate(['/blocks/' + this.blockId + '/edit']);
    }
  }
}
