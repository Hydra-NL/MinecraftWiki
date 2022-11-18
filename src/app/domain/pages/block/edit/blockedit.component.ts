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
    // this.route.paramMap.subscribe((params) => {
    //   this.blockId = String(params.get('id'));
    //   this.subscription = this.blockService
    //     .read(this.blockId)
    //     .subscribe((result) => (this.block = result));
    // });
    // this.block = {
    //   _id: undefined,
    //   name: '',
    //   description: '',
    //   stackable: false,
    //   stackSize: 0,
    //   hardness: 0,
    //   tool: ToolType.pickaxe,
    //   biome: new Biome(''),
    //   createdBy: new User(''),
    //   creationDate: new Date(),
    //   lastUpdateDate: new Date(),
    // };
    this.block = this.blockService.getBlock(this.blockId);

    this.biome = this.block?.biome;
  }

  updateBlock() {
    if (this.block) {
      this.block.lastUpdateDate = new Date();
      this.blockService.updateBlock(this.block);
      this.router.navigate(['/blocks/' + this.blockId]);
      console.log('BlockEditComponent updateBlock');
      console.log(this.block);
    } else {
      this.router.navigate(['/blocks/' + this.blockId + '/edit']);
    }
  }
}
