import { Entity } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';

export class Block extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  stackable: boolean = false;
  stackSize: number = 0; // 1 - 64
  hardness: number = 0; // 0 - 4
  tool: ToolType = ToolType.pickaxe;
  creationDate: Date = new Date();
}
