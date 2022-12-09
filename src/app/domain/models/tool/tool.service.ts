import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { EntityType } from '../entity/entity.model';
import { Tool, ToolType } from './tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolService extends EntityService<Tool> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'tool');
  }
  tools: Tool[] = [
    {
      _id: '1',
      name: 'Wooden Pickaxe',
      description:
        'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
      type: EntityType.tool,
      isWeapon: false,
      durability: 129,
      attack: 2,
      toolLevel: 1,
      toolType: ToolType.pickaxe,
      createdBy: '4',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    },
    {
      _id: '2',
      name: 'Stone Pickaxe',
      description:
        'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
      type: EntityType.tool,
      isWeapon: false,
      durability: 250,
      attack: 3,
      toolLevel: 2,
      toolType: ToolType.pickaxe,
      createdBy: '8',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    },
    {
      _id: '3',
      name: 'Iron Sword',
      description:
        'A sword is a melee weapon that is mainly used to damage entities and for cutting cobwebs or bamboo (resulting in twice the normal damage being taken). A sword is made from one of six materials, in order of increasing quality and expense: wood, gold, stone, iron, diamond and netherite.',
      type: EntityType.tool,
      isWeapon: true,
      durability: 250,
      attack: 7,
      toolLevel: 3,
      toolType: ToolType.sword,
      createdBy: '8',
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    },
    {
      _id: '4',
      name: 'Diamond Shovel',
      description:
        'Shovels are tools used to ease the process of collecting dirt, sand and other blocks with silk touch mining the complete block.',
      type: EntityType.tool,
      isWeapon: false,
      durability: 1561,
      attack: 1,
      toolLevel: 4,
      toolType: ToolType.shovel,
      createdBy: '8',
      creationDate: new Date(),
      timePassed: 0,
      lastUpdateDate: new Date(),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    },
    {
      _id: '5',
      name: 'Netherite Axe',
      description:
        'An axe is a tool mainly used to hasten the breaking of wood-based blocks, remove the surface layer of certain blocks, and as a melee weapon.',
      type: EntityType.tool,
      isWeapon: false,
      durability: 2031,
      attack: 9,
      toolLevel: 5,
      toolType: ToolType.axe,
      createdBy: '4',
      creationDate: new Date(),
      timePassed: 0,
      lastUpdateDate: new Date(),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    },
  ];

  getTools() {
    return this.tools;
  }

  getTool(id: string) {
    return this.tools.find((tool) => tool._id === id);
  }

  getToolByToolType(toolType: ToolType) {
    return this.tools.filter((tool) => tool.toolType === toolType);
  }

  getToolByToolLevel(toolLevel: number) {
    return this.tools.filter((tool) => tool.toolLevel === toolLevel);
  }

  getToolsByUser(userId: string) {
    return this.tools.filter((tool) => tool.createdBy === userId);
  }

  addTool(tool: Tool) {
    let newId = this.tools.length + 1;
    while (this.tools.find((tool) => tool._id === `${newId}`) !== undefined) {
      newId++;
    }
    tool._id = `${newId}`;
    this.tools.push(tool);
  }

  updateTool(tool: Tool) {
    const index = this.tools.findIndex((t) => t._id === tool._id);
    this.tools[index] = tool;
  }

  deleteTool(id: string) {
    const index = this.tools.findIndex((tool) => tool._id === id);
    this.tools.splice(index, 1);
  }
}
