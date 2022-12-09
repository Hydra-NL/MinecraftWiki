import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BlockService } from '../block/block.service';
import { MobService } from '../mob/mob.service';
import { ToolService } from '../tool/tool.service';
import { User } from './user.model';
import { UserService } from './user.service';

const expectedUser: User = {
  _id: '1',
  username: 'SteveTheMiner',
  email: 'steve@mc.com',
  password: 'secret',
  about: 'I am a Minecraft player',
  subscriptions: [],
  subscribers: [],
  liked: ['4'],
  disliked: [],
};
const expectedUser2: User = {
  _id: '2',
  username: 'AlexTheBuilder',
  email: 'alex@mc.com',
  password: 'secret',
  about: 'I am a Minecraft player',
  subscriptions: [],
  subscribers: [],
  liked: [],
  disliked: [],
};
const expectedUser3: User = {
  _id: '3',
  username: 'EnderDragon',
  email: 'ender@mc.com',
  password: 'secret',
  about: 'I am a Minecraft player',
  subscriptions: [],
  subscribers: [],
  liked: [],
  disliked: [],
};
const expectedUsers: User[] = [expectedUser, expectedUser2, expectedUser3];

describe('UserService', () => {
  let userServiceSpy: any;
  let mobServiceSpy: any;
  let toolServiceSpy: any;
  let blockServiceSpy: any;
  let routerSpy;
  let httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);

  beforeAll(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'list',
      'read',
      'create',
      'update',
    ]);
    mobServiceSpy = jasmine.createSpyObj('MobService', [
      'list',
      'read',
      'create',
      'update',
      'delete',
    ]);
    toolServiceSpy = jasmine.createSpyObj('ToolService', [
      'list',
      'read',
      'create',
      'update',
      'delete',
    ]);
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
        { provide: UserService, useValue: userServiceSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MobService, useValue: mobServiceSpy },
        { provide: ToolService, useValue: toolServiceSpy },
        { provide: BlockService, useValue: blockServiceSpy },
      ],
    }).compileComponents();
    userServiceSpy = TestBed.inject(UserService);
    mobServiceSpy = TestBed.inject(MobService);
    toolServiceSpy = TestBed.inject(ToolService);
    blockServiceSpy = TestBed.inject(BlockService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  it('should return a list of users', () => {
    httpSpy.get.and.returnValue(of(expectedUsers));
    userServiceSpy.list.and.returnValue(of(expectedUsers));

    userServiceSpy.list().subscribe((expectedUsers: User[]) => {
      expect(expectedUsers).toContain(expectedUser);
      expect(expectedUsers).toContain(expectedUser2);
      expect(expectedUsers).toContain(expectedUser3);
    });
  });

  it('should return a user', () => {
    httpSpy.get.and.returnValue(of(expectedUser));
    userServiceSpy.read.and.returnValue(of(expectedUser));

    userServiceSpy.read('1').subscribe((expectedUser: User) => {
      expect(expectedUser).toEqual(expectedUser);
    });
  });

  it('should create a user', () => {
    httpSpy.post.and.returnValue(of(expectedUser));
    userServiceSpy.create.and.returnValue(of(expectedUser));

    userServiceSpy.create(expectedUser).subscribe((expectedUser: User) => {
      expect(expectedUser).toEqual(expectedUser);
    });
  });

  it('should update a user', () => {
    httpSpy.put.and.returnValue(of(expectedUser));
    userServiceSpy.update.and.returnValue(of(expectedUser));

    userServiceSpy.update(expectedUser).subscribe((expectedUser: User) => {
      expect(expectedUser).toEqual(expectedUser);
    });
  });
});
