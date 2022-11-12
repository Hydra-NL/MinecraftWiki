import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { ToolType } from '../../../models/tool/tool.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { BiomeAddComponent } from '../../biome/add/biomeadd.component';

@Component({
  selector: 'app-blockadd',
  templateUrl: './blockadd.component.html',
})
export class BlockAddComponent implements OnInit {
  block!: Block;
  biomeSelected(biome: Biome) {
    this.block.biome = biome;
  }

  constructor(
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockAddComponent constructor');
  }

  ngOnInit() {
    this.block = {
      _id: undefined,
      name: '',
      description: '',
      stackable: false,
      stackSize: 0,
      hardness: 0,
      tool: ToolType.pickaxe,
      biome: new Biome(''),
      createdBy: new User(''),
      creationDate: new Date(),
      lastUpdateDate: new Date(),
    };
  }

  addBlock() {
    this.block;
    if (this.block) {
      this.blockService.addBlock(this.block);
      this.router.navigate(['/blocks/' + this.block._id]);
      console.log('BlockEditComponent updateBlock');
      console.log(this.block);
    }
  }
}
