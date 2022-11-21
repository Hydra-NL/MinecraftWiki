import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Biome } from './biome.model';
import { Dimension } from '../biome/biome.model';

@Injectable({
  providedIn: 'root',
})
export class BiomeService extends EntityService<Biome> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'biomes');
  }

  biomes: Biome[] = [
    {
      _id: '1',
      name: 'Plains',
      description:
        'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
      temperature: 16,
      dimension: Dimension.overworld,
    },
    {
      _id: '2',
      name: 'Desert',
      description:
        'Deserts are hot, dry biomes that are characterized by sand and cacti.',
      temperature: 40,
      dimension: Dimension.overworld,
    },
    {
      _id: '3',
      name: 'Forest',
      description:
        'Forests are biomes that are characterized by trees and other plants.',
      temperature: 12,
      dimension: Dimension.overworld,
    },
    {
      _id: '4',
      name: 'Mountains',
      description:
        'Mountains are biomes that are characterized by tall mountains and steep cliffs.',
      temperature: 10,
      dimension: Dimension.overworld,
    },
    {
      _id: '5',
      name: 'Nether Wastes',
      description:
        'The Nether Wastes are the most common biome in the Nether. They are characterized by lava lakes and basalt pillars.',
      temperature: 40,
      dimension: Dimension.nether,
    },
  ];

  getBiomes() {
    return this.biomes;
  }

  getBiomeById(id: string) {
    return this.biomes.find((biome) => biome._id === id);
  }

  createBiome(biome: Biome): Biome {
    this.biomes.push(biome);
    return biome;
  }

  updateBiome(biome: Biome): Biome {
    const index = this.biomes.findIndex((b) => b._id === biome._id);
    this.biomes[index] = biome;
    return biome;
  }

  deleteBiome(id: string): void {
    this.biomes = this.biomes.filter((biome) => biome._id !== id);
  }
}
