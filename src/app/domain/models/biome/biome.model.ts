import { Entity } from '../entity/entity.model';

export enum Dimension {
    overworld = 'Overworld',
    nether = 'Nether',
    end = 'End',
}

export class Biome extends Entity {
  constructor(id: string) {
    super(id);
  }
  name: string = '';
  description: string = '';
  temperature: number = 0; // -20 - 40
  dimension: Dimension = Dimension.overworld;
}
