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
    super(environment.apiUrl, http, 'users');
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
      liked: [
        {
          _id: '4',
          name: 'Cobblestone',
          description:
            'Cobblestone is a common block, obtained from mining stone. It is mainly used for crafting or as a building block.',
          type: EntityType.block,
          hardness: 1,
          stackable: true,
          stackSize: 64,
          tool: ToolType.pickaxe,
          biome: {
            _id: '4',
            name: 'Mountains',
            description:
              'Mountains are a biome found in the Overworld. They are characterized by tall mountains and steep cliffs.',
            temperature: 10,
            dimension: Dimension.overworld,
          },
          createdBy: {
            _id: '2',
            username: 'AlexTheBuilder',
            email: 'alex@mc.com',
            password: 'secret',
            about: 'I am a Minecraft player',

            subscriptions: [],
            subscribers: [],
            liked: [],
          },
          creationDate: new Date(new Date().setDate(new Date().getDate() - 4)),
          timePassed: 0,
          lastUpdateDate: new Date(
            new Date().setDate(new Date().getDate() - 4)
          ),
          likes: 1,
          likedBy: [
            {
              _id: '1',
              username: 'SteveTheMiner',
              email: 'steve@mc.com',
              password: 'secret',
              about: 'I am a Minecraft player',
              subscriptions: [
                {
                  _id: '2',
                  username: 'AlexTheBuilder',
                  email: 'alex@mc.com',
                  password: 'secret',
                  about: 'I am a Minecraft player',

                  subscriptions: [],
                  subscribers: [],
                  liked: [],
                },
              ],
              subscribers: [
                {
                  _id: '2',
                  username: 'AlexTheBuilder',
                  email: 'alex@mc.com',
                  password: 'secret',
                  about: 'I am a Minecraft player',

                  subscriptions: [],
                  subscribers: [],
                  liked: [],
                },
              ],
              liked: [],
            },
          ],
        },
      ],
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
    },
    {
      _id: '8',
      username: 'FerdinandPierre',
      email: 'ferdinand@mc.com',
      password: 'secret',
      about: 'I am a Minecraft player',

      subscriptions: [
        {
          _id: '1',
          username: 'SteveTheMiner',
          email: 'steve@mc.com',
          password: 'secret',
          about: 'I am a Minecraft player',

          subscriptions: [],
          subscribers: [],
          liked: [],
        },
      ],
      subscribers: [
        {
          _id: '1',
          username: 'SteveTheMiner',
          email: 'steve@mc.com',
          password: 'secret',
          about: 'I am a Minecraft player',

          subscriptions: [],
          subscribers: [],
          liked: [],
        },
      ],
      liked: [],
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
      if (m.createdBy._id === id) {
        this.mobService.deleteMob(m._id!);
      }
    });
    this.blockService.getBlocks().forEach((b) => {
      if (b.createdBy._id === id) {
        this.blockService.deleteBlock(b._id!);
      }
    });
    this.toolService.getTools().forEach((t) => {
      if (t.createdBy._id === id) {
        this.toolService.deleteTool(t._id!);
      }
    });
    this.users.splice(
      this.users.findIndex((user) => user._id === id),
      1
    );
  }

  subscribeToUser(subscriber: User, subscribedTo: User): void {
    console.log('subscribeToUser aangeroepen');
    if (
      !subscriber.subscriptions.find((user) => user._id === subscribedTo._id)
    ) {
      subscriber.subscriptions.push(subscribedTo);
      subscribedTo.subscribers.push(subscriber);
    } else {
      subscriber.subscriptions.splice(
        subscriber.subscriptions.findIndex((user) => user._id === subscribedTo._id),
        1
      );
      subscribedTo.subscribers.splice(
        subscribedTo.subscribers.findIndex(
          (user) => user._id === subscriber._id
        ),
        1
      );
    }
  }
}
