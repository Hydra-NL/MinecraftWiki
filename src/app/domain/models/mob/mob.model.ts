import { Entity } from '../entity/entity.model';

export class Mob extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  health: number = 0;
  attack: number = 0;
  armor: number = 0;
  biome: string = '';
  creationDate: Date = new Date();
}
