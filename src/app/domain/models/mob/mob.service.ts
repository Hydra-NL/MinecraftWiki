import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Mob } from './mob.model';
import { Dimension } from '../biome/biome.model';

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
      isPassive: false,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: {
        _id: '2',
        username: 'AlexTheBuilder',
        email: 'alex@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      _id: '2',
      name: 'Skeleton',
      description:
        'A skeleton is a common undead hostile mob equipped with a bow.',
      health: 20,
      attack: 2,
      armor: 0,
      isPassive: false,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: {
        _id: '2',
        username: 'AlexTheBuilder',
        email: 'alex@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      _id: '3',
      name: 'Creeper',
      description:
        'A creeper is a common hostile mob that silently approaches players and explodes. Due to their distinctive appearance and a high potential for killing unwary players as well as damaging the environment and players’ constructions, creepers have become one of the icons of Minecraft, both among players and non-players. \n\nCreepers are a major source of gunpowder as well as the only way to obtain most music discs. When struck by lightning, a creeper becomes charged, which amplifies its explosion power and enables mob heads to be obtained.',
      health: 10,
      attack: 3,
      armor: 0,
      isPassive: false,
      biome: {
        _id: '1',
        name: 'Plains',
        description:
          'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
        temperature: 16,
        dimension: Dimension.overworld,
      },
      createdBy: {
        _id: '3',
        username: 'EnderDragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
    {
      _id: '4',
      name: 'Spider',
      description:
        'Spiders are common neutral mobs that have the unique ability to climb walls.',
      health: 16,
      attack: 2,
      armor: 1,
      isPassive: false,
      biome: {
        _id: '3',
        name: 'Forest',
        description:
          'Forests are biomes that are characterized by trees and other tall vegetation. They are the most common biome in the Overworld.',
        temperature: 12,
        dimension: Dimension.overworld,
      },
      createdBy: {
        _id: '3',
        username: 'EnderDragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
      timePassed: 0,
      lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    },
    {
      _id: '5',
      name: 'Enderman',
      description:
        'An enderman is a neutral mob found in all three dimensions. Endermen can teleport and pick up blocks.',
      health: 40,
      attack: 7,
      armor: 3,
      isPassive: true,
      biome: {
        _id: '6',
        name: 'The End',
        description:
          'The End is a dimension that is accessed by traveling to the top of the End Portal Frame in the End Portal Room in the End City.',
        temperature: 0,
        dimension: Dimension.end,
      },
      createdBy: {
        _id: '3',
        username: 'EnderDragon',
        email: 'ender@mc.com',
        password: 'secret',
        subscriptions: [],
        subscribers: [],
      },
      creationDate: new Date(),
      timePassed: 0,
      lastUpdateDate: new Date(),
    },
  ];

  getMobs() {
    return this.mobs;
  }

  getMob(id: string) {
    return this.mobs.find((mob) => mob._id === id);
  }

  addMob(mob: Mob) {
    let newId = this.mobs.length + 1;
    while (this.mobs.find((mob) => mob._id === `${newId}`) !== undefined) {
      newId++;
    }
    mob._id = `${newId}`;
    this.mobs.push(mob);
  }

  updateMob(mob: Mob) {
    const index = this.mobs.findIndex((m) => m._id === mob._id);
    this.mobs[index] = mob;
  }

  deleteMob(id: string) {
    const index = this.mobs.findIndex((mob) => mob._id === id);
    this.mobs.splice(index, 1);
  }
}
