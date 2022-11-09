import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Mob } from './mob.model';

@Injectable({
  providedIn: 'root',
})
export class MobService extends EntityService<Mob> {
  mobs: Mob[] = [
    {
      _id: '1',
      name: 'Zombie',
      description: 'This is the content of card 1',
      health: 20,
      attack: 3,
      armor: 2,
      dimension: 'Overworld',
      isPassive: false,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Skeleton',
      description: 'This is the content of card 2',
      health: 20,
      attack: 2,
      armor: 0,
      dimension: 'Overworld',
      isPassive: false,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Creeper',
      description: 'This is the content of card 3',
      health: 10,
      attack: 3,
      armor: 0,
      dimension: 'Overworld',
      isPassive: false,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Spider',
      description: 'This is the content of card 4',
      health: 16,
      attack: 2,
      armor: 1,
      dimension: 'Overworld',
      isPassive: false,
      creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    },
    {
      _id: '5',
      name: 'Enderman',
      description: 'This is the content of card 5',
      health: 40,
      attack: 7,
      armor: 3,
      dimension: 'The End',
      isPassive: false,
      creationDate: new Date(),
    },
  ];

  getMobs() {
    return this.mobs;
  }

  getMob(id: string) {
    return this.mobs.find((mob) => mob._id === id);
  }

  addMob(mob: Mob) {
    this.mobs.push(mob);
  }

  updateMob(id: string, mob: Mob) {
    const index = this.mobs.findIndex((mob) => mob._id === id);
    this.mobs[index] = mob;
  }

  deleteMob(id: string) {
    const index = this.mobs.findIndex((mob) => mob._id === id);
    this.mobs.splice(index, 1);
  }
}
