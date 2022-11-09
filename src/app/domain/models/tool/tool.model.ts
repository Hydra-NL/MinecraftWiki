import { Entity } from '../entity/entity.model';

export enum ToolType {
  pickaxe = 'pickaxe',
  axe = 'axe',
  shovel = 'shovel',
  sword = 'sword',
}

export class Tool extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  durability: number = 0;
  isWeapon: boolean = false;
  attack: number = 0;
  toolLevel: number = 0; // 0 = hand, 1 = wood, 2 = stone, 3 = iron, 4 = diamond, 5 = netherite
  toolType: ToolType = ToolType.pickaxe;
  creationDate: Date = new Date();
}
