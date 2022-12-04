import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Block } from './block.model';
import { ToolType } from '../tool/tool.model';
import { Dimension } from '../biome/biome.model';
import { EntityType } from '../entity/entity.model';

@Injectable({
  providedIn: 'root',
})
export class BlockService extends EntityService<Block> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'block');
  }
  blocks: Block[] = [
    {
      _id: '1',
      name: 'Stone',
      description:
        'Stone is a block found underground in the Overworld or on the surface of mountains.',
      type: EntityType.block,
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: '1',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      likes: 1,
      likedBy: ['2'],
    },
    {
      _id: '2',
      name: 'Dirt',
      description:
        'Dirt is a block found abundantly in most biomes under a layer of grass blocks at the top of the Overworld.',
      type: EntityType.block,
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.shovel,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: '1',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      likes: 0,
      likedBy: [],
    },
    {
      _id: '3',
      name: 'Grass Block',
      description:
        'A grass block is a natural block that generates abundantly across the surface of the Overworld.',
      type: EntityType.block,
      hardness: 0,
      stackable: false,
      stackSize: 64,
      tool: ToolType.shovel,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: '1',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      likes: 0,
      likedBy: [],
    },
    {
      _id: '4',
      name: 'Cobblestone',
      description:
        'Cobblestone is a common block, obtained from mining stone. It is mainly used for crafting or as a building block.',
      type: EntityType.block,
      hardness: 1,
      stackable: true,
      stackSize: 64,
      tool: ToolType.pickaxe,
      biome: {
        _id: '4',
        name: 'Mountains',
        description:
          'Mountains are a biome found in the Overworld. They are characterized by tall mountains and steep cliffs.',
        temperature: 10,
        dimension: Dimension.overworld,
      },
      createdBy: '2',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 4)),
      likes: 1,
      likedBy: ['1'],
    },
    {
      _id: '5',
      name: 'Oak Wood',
      description:
        'A log or stem is a naturally occurring block found in trees or huge fungi, primarily used as a building block, and to create planks, a versatile crafting ingredient. It comes in nine types: oak, spruce, birch, jungle, acacia, dark oak, mangrove, crimson and warped. \n\nA stripped log or stripped stem is a variant obtained by using an axe on a log or a stem respectively. Once stripped, it cannot be reversed.',
      type: EntityType.block,
      hardness: 0,
      stackable: true,
      stackSize: 64,
      tool: ToolType.axe,
      biome: {
        _id: '3',
        name: 'Forest',
        description:
          'Forests are a biome found in the Overworld. They are characterized by tall trees and a variety of plants.',
        temperature: 12,
        dimension: Dimension.overworld,
      },
      createdBy: '2',
      creationDate: new Date(),
      timePassed: 0,
      lastUpdateDate: new Date(),
      likes: 0,
      likedBy: [],
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

  getBlocksByUser(userId: string) {
    return this.blocks.filter((block) => block.createdBy === userId);
  }

  addBlock(block: Block) {
    let newId = this.blocks.length + 1;
    while (
      this.blocks.find((block) => block._id === `${newId}`) !== undefined
    ) {
      newId++;
    }
    block._id = `${newId}`;
    this.blocks.push(block);
  }

  updateBlock(block: Block) {
    const index = this.blocks.findIndex((b) => b._id === block._id);
    this.blocks[index] = block;
  }

  deleteBlock(id: string) {
    const index = this.blocks.findIndex((block) => block._id === id);
    this.blocks.splice(index, 1);
  }
}
