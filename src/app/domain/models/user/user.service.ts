import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { Dimension } from '../biome/biome.model';
import { BlockService } from '../block/block.service';
import { EntityType } from '../entity/entity.model';
import { MobService } from '../mob/mob.service';
import { ToolType } from '../tool/tool.model';
import { ToolService } from '../tool/tool.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  constructor(
    protected override http: HttpClient,
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService
  ) {
    super(environment.apiUrl, http, 'user');
  }
  readonly users: User[] = [
    {
      _id: '1',
      username: 'SteveTheMiner',
      email: 'steve@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: ['4'],
      disliked: [],
    },
    {
      _id: '2',
      username: 'AlexTheBuilder',
      email: 'alex@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '3',
      username: 'EnderDragon',
      email: 'ender@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '4',
      username: 'Herobrine',
      email: 'herobrine@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '5',
      username: 'Notch',
      email: 'notch@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '6',
      username: 'WitherBoss',
      email: 'wither@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '7',
      username: 'JessePigman',
      email: 'jesse@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
    {
      _id: '8',
      username: 'FerdinandPierre',
      email: 'ferdinand@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: ['1'],
      subscribers: ['1'],
      liked: [],
      disliked: [],
    },
    {
      _id: '9',
      username: 'xAyrianna',
      email: 'xay@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',
      subscriptions: [],
      subscribers: [],
      liked: [],
      disliked: [],
    },
  ];

  getUsers(): User[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUserById(id: string): User {
    console.log('getUserById aangeroepen');
    return this.users.find((user) => user._id === id)!;
  }

  updateUser(user: User): void {
    console.log('updateUser aangeroepen');
    const index = this.users.findIndex((u) => u._id === user._id);
    this.users[index] = user;
  }

  deleteUser(id: string): void {
    console.log('deleteUser aangeroepen');
    this.mobService.getMobs().forEach((m) => {
      if (m.createdBy === id) {
        this.mobService.deleteMob(m._id!);
      }
    });
    this.blockService.getBlocks().forEach((b) => {
      if (b.createdBy === id) {
        this.blockService.deleteBlock(b._id!);
      }
    });
    this.toolService.getTools().forEach((t) => {
      if (t.createdBy === id) {
        this.toolService.deleteTool(t._id!);
      }
    });
    this.users.splice(
      this.users.findIndex((user) => user._id === id),
      1
    );
  }

  subscribeToUser(subscriber: User, subscribedTo: string): void {
    console.log('subscribeToUser aangeroepen');
    if (!subscriber.subscriptions.find((user) => user === subscribedTo)) {
      subscriber.subscriptions.push(subscribedTo);
      this.getUserById(subscribedTo).subscribers.push(subscriber._id!);
    } else {
      subscriber.subscriptions.splice(
        subscriber.subscriptions.findIndex((user) => user === subscribedTo),
        1
      );
      this.getUserById(subscribedTo).subscribers.splice(
        this.getUserById(subscribedTo).subscribers.findIndex(
          (user) => user === subscriber._id
        ),
        1
      );
    }
  }
}
