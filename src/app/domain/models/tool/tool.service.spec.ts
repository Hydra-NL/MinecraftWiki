import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dimension } from '../biome/biome.model';
import { EntityType } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';
import { Tool } from './tool.model';
import { ToolService } from './tool.service';

const expectedTool: Tool = {
  _id: '1',
  name: 'Wooden Pickaxe',
  description:
    'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
  type: EntityType.tool,
  isWeapon: false,
  durability: 129,
  attack: 2,
  toolLevel: 1,
  toolType: ToolType.pickaxe,
  createdBy: '4',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedTool2: Tool = {
  _id: '2',
  name: 'Stone Pickaxe',
  description:
    'A pickaxe is one of the most commonly used tools in the game, being required to mine all ores, rock, rock-based blocks and metal-based blocks. A pickaxe allows the player to mine blocks at faster speeds, depending on the material it is made from. Specific pickaxe materials are also required to harvest certain types of blocks.',
  type: EntityType.tool,
  isWeapon: false,
  durability: 250,
  attack: 3,
  toolLevel: 2,
  toolType: ToolType.pickaxe,
  createdBy: '8',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedTool3: Tool = {
  _id: '3',
  name: 'Iron Sword',
  description:
    'A sword is a melee weapon that is mainly used to damage entities and for cutting cobwebs or bamboo (resulting in twice the normal damage being taken). A sword is made from one of six materials, in order of increasing quality and expense: wood, gold, stone, iron, diamond and netherite.',
  type: EntityType.tool,
  isWeapon: true,
  durability: 250,
  attack: 7,
  toolLevel: 3,
  toolType: ToolType.sword,
  createdBy: '8',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};

const expectedTools: Tool[] = [expectedTool, expectedTool2, expectedTool3];

describe('ToolService', () => {
  let toolServiceSpy: any;
  let routerSpy;
  let httpSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'post',
    'put',
    'delete',
  ]);
  beforeAll(() => {
    toolServiceSpy = jasmine.createSpyObj('ToolService', [
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
        { provide: ToolService, useValue: toolServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
      ],
    }).compileComponents();
    toolServiceSpy = TestBed.inject(ToolService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should return all tools', () => {
    httpSpy.get.and.returnValue(expectedTools);
    toolServiceSpy.list.and.returnValue(expectedTools);
    expect(toolServiceSpy.list()).toEqual(expectedTools);
  });

  it('should return a tool', () => {
    httpSpy.get.and.returnValue(expectedTool);
    toolServiceSpy.read.and.returnValue(expectedTool);
    expect(toolServiceSpy.read('1')).toEqual(expectedTool);
  });

  it('should create a tool', () => {
    httpSpy.post.and.returnValue(expectedTool);
    toolServiceSpy.create.and.returnValue(expectedTool);
    expect(toolServiceSpy.create(expectedTool)).toEqual(expectedTool);
  });

  it('should update a tool', () => {
    httpSpy.put.and.returnValue(expectedTool);
    toolServiceSpy.update.and.returnValue(expectedTool);
    expect(toolServiceSpy.update(expectedTool)).toEqual(expectedTool);
  });

  it('should delete a tool', () => {
    httpSpy.delete.and.returnValue(expectedTool);
    toolServiceSpy.delete.and.returnValue(expectedTool);
    expect(toolServiceSpy.delete(expectedTool)).toEqual(expectedTool);
  });
});
