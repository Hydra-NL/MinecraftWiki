import { Entity, EntityType } from '../entity/entity.model';
import { User } from '../user/user.model';

export enum ToolType {
  pickaxe = 'Pickaxe',
  axe = 'Axe',
  shovel = 'Shovel',
  sword = 'Sword',
}

export class Tool extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  type: EntityType = EntityType.tool;
  durability: number = 0;
  isWeapon: boolean = false;
  attack: number = 0;
  toolLevel: number = 0; // 0 = hand, 1 = wood, 2 = stone, 3 = iron, 4 = diamond, 5 = netherite
  toolType: ToolType = ToolType.pickaxe;
  createdBy: User = new User('');
  creationDate: Date = new Date();
  timePassed: number = 0;
  lastUpdateDate: Date = new Date();
  likes: number = 0;
  likedBy: User[] = [];
}
