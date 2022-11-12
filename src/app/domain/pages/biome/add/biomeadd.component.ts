import { Component, OnInit, Input } from '@angular/core';
import { Biome, Dimension } from 'src/app/domain/models/biome/biome.model';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-biome-form',
  templateUrl: './biomeadd.component.html',
})
export class BiomeAddComponent implements OnInit {
  biome!: Biome;

  constructor() {}

  ngOnInit(): void {
    this.biome = {
      _id: undefined,
      name: '',
      description: '',
      temperature: 0,
      dimension: Dimension.overworld,
    };
  }
}
