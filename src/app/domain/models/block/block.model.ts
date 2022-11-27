import { Entity, EntityType } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';
import { User } from '../user/user.model';
import { Biome } from '../biome/biome.model';

export class Block extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  type: EntityType = EntityType.block;
  stackable: boolean = false;
  stackSize: number = 1; // 1 - 64
  hardness: number = 0; // 0 = hand, 1 = wood, 2 = stone, 3 = iron, 4 = diamond, 5 = netherite, 6 = unbreakable
  tool: ToolType = ToolType.pickaxe;
  biome: Biome = new Biome('');
  createdBy: User = new User('');
  creationDate: Date = new Date();
  timePassed: number = 0;
  lastUpdateDate: Date = new Date();
  likes: number = 0;
  likedBy: User[] = [];
}
