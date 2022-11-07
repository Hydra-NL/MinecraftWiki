import { Entity } from '../entity/entity.model';

export class Tool extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  durability: number = 0;
  stackable: boolean = false;
  toolLevel: number = 0;
  toolType: string = '';
  creationDate: Date = new Date();
}
