import { Entity } from '../entity/entity.model';
import { Tool } from '../tool/tool.model';

export class Block extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  durability: number = 0;
  stackable: boolean = false;
  stackSize: number = 0;
  toolLevelNeeded: number = 0;
  tool: Tool = new Tool('');
}
