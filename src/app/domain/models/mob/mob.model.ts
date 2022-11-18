import { Entity, EntityType } from '../entity/entity.model';
import { User } from '../user/user.model';
import { Biome } from '../biome/biome.model';

export class Mob extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  type: EntityType = EntityType.mob;
  health: number = 0;
  attack: number = 0;
  armor: number = 0;
  isPassive: boolean = false;
  biome: Biome = new Biome('');
  createdBy: User = new User('');
  creationDate: Date = new Date();
  timePassed: number = 0;
  lastUpdateDate: Date = new Date();
}
