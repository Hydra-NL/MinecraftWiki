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
      description:
        'Stone is a block found underground in the Overworld or on the surface of mountains.',
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Dirt',
      description:
        'Dirt is a block found abundantly in most biomes under a layer of grass blocks at the top of the Overworld.',
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.shovel,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Grass Block',
      description:
        'A grass block is a natural block that generates abundantly across the surface of the Overworld.',
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.shovel,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Cobblestone',
      description:
        'Cobblestone is a common block, obtained from mining stone. It is mainly used for crafting or as a building block.',
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    },
    {
      _id: '5',
      name: 'Oak Wood',
      description:
        'A log or stem is a naturally occurring block found in trees or huge fungi, primarily used as a building block, and to create planks, a versatile crafting ingredient. It comes in nine types: oak, spruce, birch, jungle, acacia, dark oak, mangrove, crimson and warped. \n\nA stripped log or stripped stem is a variant obtained by using an axe on a log or a stem respectively. Once stripped, it cannot be reversed.',
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
