import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Tool, ToolType } from './tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolService extends EntityService<Tool> {
  tools: Tool[] = [
    {
      _id: '1',
      name: 'Wooden Pickaxe',
      description:
        'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
      isWeapon: false,
      durability: 129,
      attack: 2,
      toolLevel: 1,
      toolType: ToolType.pickaxe,
      createdBy: {
        _id: '3',
        firstName: 'Ender',
        lastName: 'Dragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Stone Pickaxe',
      description:
        'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
      isWeapon: false,
      durability: 250,
      attack: 3,
      toolLevel: 2,
      toolType: ToolType.pickaxe,
      createdBy: {
        _id: '3',
        firstName: 'Ender',
        lastName: 'Dragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Iron Sword',
      description:
        'A sword is a melee weapon that is mainly used to damage entities and for cutting cobwebs or bamboo (resulting in twice the normal damage being taken). A sword is made from one of six materials, in order of increasing quality and expense: wood, gold, stone, iron, diamond and netherite.',
      isWeapon: true,
      durability: 250,
      attack: 7,
      toolLevel: 3,
      toolType: ToolType.sword,
      createdBy: {
        _id: '3',
        firstName: 'Ender',
        lastName: 'Dragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Diamond Shovel',
      description:
        'Shovels are tools used to ease the process of collecting dirt, sand and other blocks with silk touch mining the complete block.',
      isWeapon: false,
      durability: 1561,
      attack: 1,
      toolLevel: 4,
      toolType: ToolType.shovel,
      createdBy: {
        _id: '3',
        firstName: 'Ender',
        lastName: 'Dragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(),
      lastUpdateDate: new Date(),
    },
    {
      _id: '5',
      name: 'Netherite Axe',
      description:
        'An axe is a tool mainly used to hasten the breaking of wood-based blocks, remove the surface layer of certain blocks, and as a melee weapon.',
      isWeapon: false,
      durability: 2031,
      attack: 9,
      toolLevel: 5,
      toolType: ToolType.axe,
      createdBy: {
        _id: '3',
        firstName: 'Ender',
        lastName: 'Dragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(),
      lastUpdateDate: new Date(),
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