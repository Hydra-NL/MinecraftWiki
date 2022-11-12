import { Entity } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';
import { User } from '../user/user.model';
import { Biome } from '../biome/biome.model';

export class Block extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  stackable: boolean = false;
  stackSize: number = 0; // 1 - 64
  hardness: number = 0; // 0 - 5
  tool: ToolType = ToolType.pickaxe;
  biome: Biome = new Biome('');
  createdBy: User = new User('');
  creationDate: Date = new Date();
  lastUpdateDate: Date = new Date();
}
