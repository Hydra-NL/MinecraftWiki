import { Entity } from '../entity/entity.model';
import { Tool } from '../tool/tool.model';

export class Block extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  stackable: boolean = false;
  stackSize: number = 0; // 1 - 64
  hardness: number = 0; // 0 - 4
  tool: Tool = new Tool('');
  creationDate: Date = new Date();
}
