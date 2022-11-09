import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Block } from './block.model';
import { ToolType } from '../tool/tool.model';

@Injectable({
  providedIn: 'root',
})
export class BlockService extends EntityService<Block> {
  blocks: Block[] = [
    {
      _id: '1',
      name: 'Stone',
      description: 'This is the content of card 1',
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Dirt',
      description: 'This is the content of card 2',
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.shovel,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Grass',
      description: 'This is the content of card 3',
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.shovel,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Cobblestone',
      description: 'This is the content of card 4',
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    },
    {
      _id: '5',
      name: 'Oak Wood',
      description: 'This is the content of card 5',
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.axe,
      creationDate: new Date(),
    },
  ];

  getBlocks() {
    return this.blocks;
  }

  getBlock(id: string) {
    return this.blocks.find((block) => block._id === id);
  }

  getBlockByTool(tool: ToolType) {
    return this.blocks.find((block) => block.tool === tool);
  }

  getBlockByHardness(hardness: number) {
    return this.blocks.find((block) => block.hardness === hardness);
  }

  addBlock(block: Block) {
    this.blocks.push(block);
  }

  updateBlock(id: string, block: Block) {
    const index = this.blocks.findIndex((block) => block._id === id);
    this.blocks[index] = block;
  }

  deleteBlock(id: string) {
    const index = this.blocks.findIndex((block) => block._id === id);
    this.blocks.splice(index, 1);
  }
}
