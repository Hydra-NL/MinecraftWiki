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

  constructor(
    private blockService: BlockService,
    private userService: UserService,
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

    let biomeform = document.getElementById('biome-form') as HTMLFormElement;
    biomeform['markAsUntouched'];
    biomeform['markAsPristine'];
  }

  addBlock() {
    this.block;
    if (this.block) {
      this.block.createdBy = this.userService.getUserById('8');
      this.block.creationDate = new Date();
      this.block.lastUpdateDate = new Date();
      this.blockService.addBlock(this.block);
      this.router.navigate(['/blocks/' + this.block._id]);
      console.log('BlockAddComponent Block added');
      console.log(this.block);
    }
  }
}
