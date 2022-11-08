import { Entity } from '../entity/entity.model';

export class Mob extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  health: number = 0;
  attack: number = 0;
  armor: number = 0; 
  dimension: string = ''; // overworld, nether, end
  isPassive: boolean = false;
  creationDate: Date = new Date();
}
