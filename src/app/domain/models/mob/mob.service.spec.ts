import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dimension } from '../biome/biome.model';
import { EntityType } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';
import { Mob } from './mob.model';
import { MobService } from './mob.service';

const expectedMob: Mob = {
  _id: '1',
  name: 'Zombie',
  description:
    'Zombies are common undead hostile mobs that deal melee damage and attack in groups.',
  type: EntityType.mob,
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
  createdBy: '2',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedMob2: Mob = {
  _id: '2',
  name: 'Skeleton',
  description: 'A skeleton is a common undead hostile mob equipped with a bow.',
  type: EntityType.mob,
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
  createdBy: '2',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedMob3: Mob = {
  _id: '3',
  name: 'Creeper',
  description:
    'A creeper is a common hostile mob that silently approaches players and explodes. Due to their distinctive appearance and a high potential for killing unwary players as well as damaging the environment and players’ constructions, creepers have become one of the icons of Minecraft, both among players and non-players. \n\nCreepers are a major source of gunpowder as well as the only way to obtain most music discs. When struck by lightning, a creeper becomes charged, which amplifies its explosion power and enables mob heads to be obtained.',
  type: EntityType.mob,
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
  createdBy: '3',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};

const expectedMobs: Mob[] = [expectedMob, expectedMob2, expectedMob3];

describe('MobService', () => {
  let mobServiceSpy: any;
  let routerSpy;
  let httpSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'post',
    'put',
    'delete',
  ]);
  beforeAll(() => {
    mobServiceSpy = jasmine.createSpyObj('MobService', [
      'list',
      'read',
      'create',
      'update',
      'delete',
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: MobService, useValue: mobServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
      ],
    }).compileComponents();
    mobServiceSpy = TestBed.inject(MobService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should return all mobs', () => {
    httpSpy.get.and.returnValue(expectedMobs);
    mobServiceSpy.list.and.returnValue(expectedMobs);
    expect(mobServiceSpy.list()).toEqual(expectedMobs);
  });

  it('should return a mob', () => {
    httpSpy.get.and.returnValue(expectedMob);
    mobServiceSpy.read.and.returnValue(expectedMob);
    expect(mobServiceSpy.read('1')).toEqual(expectedMob);
  });

  it('should create a mob', () => {
    httpSpy.post.and.returnValue(expectedMob);
    mobServiceSpy.create.and.returnValue(expectedMob);
    expect(mobServiceSpy.create(expectedMob)).toEqual(expectedMob);
  });

  it('should update a mob', () => {
    httpSpy.put.and.returnValue(expectedMob);
    mobServiceSpy.update.and.returnValue(expectedMob);
    expect(mobServiceSpy.update(expectedMob)).toEqual(expectedMob);
  });

  it('should delete a mob', () => {
    httpSpy.delete.and.returnValue(expectedMob);
    mobServiceSpy.delete.and.returnValue(expectedMob);
    expect(mobServiceSpy.delete(expectedMob)).toEqual(expectedMob);
  });
});
