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
      description:
        'Zombies are common undead hostile mobs that deal melee damage and attack in groups.',
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
      description:
        'A skeleton is a common undead hostile mob equipped with a bow.',
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
      description:
        'A creeper is a common hostile mob that silently approaches players and explodes. Due to their distinctive appearance and a high potential for killing unwary players as well as damaging the environment and players’ constructions, creepers have become one of the icons of Minecraft, both among players and non-players. \n\nCreepers are a major source of gunpowder as well as the only way to obtain most music discs. When struck by lightning, a creeper becomes charged, which amplifies its explosion power and enables mob heads to be obtained.',
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
      description:
        'Spiders are common neutral mobs that have the unique ability to climb walls.',
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
      description:
        'An enderman is a neutral mob found in all three dimensions. Endermen can teleport and pick up blocks.',
      health: 40,
      attack: 7,
      armor: 3,
      dimension: 'The End',
      isPassive: true,
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
