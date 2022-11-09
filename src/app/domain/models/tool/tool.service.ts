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
      description: 'This is the content of card 1',
      isWeapon: false,
      durability: 129,
      attack: 2,
      toolLevel: 1,
      toolType: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Stone Pickaxe',
      description: 'This is the content of card 2',
      isWeapon: false,
      durability: 250,
      attack: 3,
      toolLevel: 2,
      toolType: ToolType.pickaxe,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Iron Sword',
      description: 'This is the content of card 3',
      isWeapon: true,
      durability: 250,
      attack: 7,
      toolLevel: 3,
      toolType: ToolType.sword,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Diamond Shovel',
      description: 'This is the content of card 4',
      isWeapon: false,
      durability: 1561,
      attack: 1,
      toolLevel: 4,
      toolType: ToolType.shovel,
      creationDate: new Date(),
    },
    {
      _id: '5',
      name: 'Netherite Axe',
      description: 'This is the content of card 5',
      isWeapon: false,
      durability: 2031,
      attack: 9,
      toolLevel: 5,
      toolType: ToolType.axe,
      creationDate: new Date(),
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
    this.tools.push(tool);
  }

  updateTool(id: string, tool: Tool) {
    const index = this.tools.findIndex((tool) => tool._id === id);
    this.tools[index] = tool;
  }

  deleteTool(id: string) {
    const index = this.tools.findIndex((tool) => tool._id === id);
    this.tools.splice(index, 1);
  }
}
