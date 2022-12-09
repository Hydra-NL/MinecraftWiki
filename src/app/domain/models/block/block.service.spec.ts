import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dimension } from '../biome/biome.model';
import { EntityType } from '../entity/entity.model';
import { ToolType } from '../tool/tool.model';
import { Block } from './block.model';
import { BlockService } from './block.service';

const expectedBlock: Block = {
  _id: '1',
  name: 'Stone',
  description:
    'Stone is a block found underground in the Overworld or on the surface of mountains.',
  type: EntityType.block,
  hardness: 1,
  stackable: true,
  stackSize: 64,
  tool: ToolType.pickaxe,
  biome: {
    _id: '1',
    name: 'Plains',
    description:
      'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
    temperature: 16,
    dimension: Dimension.overworld,
  },
  createdBy: '1',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedBlock2: Block = {
  _id: '2',
  name: 'Dirt',
  description:
    'Dirt is a block found abundantly in most biomes under a layer of grass blocks at the top of the Overworld.',
  type: EntityType.block,
  hardness: 0,
  stackable: true,
  stackSize: 64,
  tool: ToolType.shovel,
  biome: {
    _id: '1',
    name: 'Plains',
    description:
      'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
    temperature: 16,
    dimension: Dimension.overworld,
  },
  createdBy: '1',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};
const expectedBlock3: Block = {
  _id: '3',
  name: 'Grass Block',
  description:
    'A grass block is a natural block that generates abundantly across the surface of the Overworld.',
  type: EntityType.block,
  hardness: 0,
  stackable: false,
  stackSize: 64,
  tool: ToolType.shovel,
  biome: {
    _id: '1',
    name: 'Plains',
    description:
      'Plains are the most common biome in the Overworld. They are characterized by rolling hills and grassy plains.',
    temperature: 16,
    dimension: Dimension.overworld,
  },
  createdBy: '1',
  creationDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  timePassed: 0,
  lastUpdateDate: new Date(new Date().setDate(new Date().getDate() - 3)),
  likes: 0,
  dislikedBy: [],
  likedBy: [],
};

const expectedBlocks: Block[] = [expectedBlock, expectedBlock2, expectedBlock3];

describe('BlockService', () => {
  let blockServiceSpy: any;
  let routerSpy;
  let httpSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'post',
    'put',
    'delete',
  ]);
  beforeAll(() => {
    blockServiceSpy = jasmine.createSpyObj('BlockService', [
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
        { provide: BlockService, useValue: blockServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
      ],
    }).compileComponents();
    blockServiceSpy = TestBed.inject(BlockService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should return all blocks', () => {
    httpSpy.get.and.returnValue(expectedBlocks);
    blockServiceSpy.list.and.returnValue(expectedBlocks);
    expect(blockServiceSpy.list()).toEqual(expectedBlocks);
  });

  it('should return a block', () => {
    httpSpy.get.and.returnValue(expectedBlock);
    blockServiceSpy.read.and.returnValue(expectedBlock);
    expect(blockServiceSpy.read('1')).toEqual(expectedBlock);
  });

  it('should create a block', () => {
    httpSpy.post.and.returnValue(expectedBlock);
    blockServiceSpy.create.and.returnValue(expectedBlock);
    expect(blockServiceSpy.create(expectedBlock)).toEqual(expectedBlock);
  });

  it('should update a block', () => {
    httpSpy.put.and.returnValue(expectedBlock);
    blockServiceSpy.update.and.returnValue(expectedBlock);
    expect(blockServiceSpy.update(expectedBlock)).toEqual(expectedBlock);
  });

  it('should delete a block', () => {
    httpSpy.delete.and.returnValue(expectedBlock);
    blockServiceSpy.delete.and.returnValue(expectedBlock);
    expect(blockServiceSpy.delete(expectedBlock)).toEqual(expectedBlock);
  });
});
