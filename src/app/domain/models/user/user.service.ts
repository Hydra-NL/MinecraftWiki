import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  readonly users: User[] = [
    {
      _id: '1',
      username: 'SteveTheMiner',
      email: 'steve@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '2',
      username: 'AlexTheBuilder',
      email: 'alex@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '3',
      username: 'EnderDragon',
      email: 'ender@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '4',
      username: 'Herobrine',
      email: 'herobrine@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '5',
      username: 'Notch',
      email: 'notch@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '6',
      username: 'WitherBoss',
      email: 'wither@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '7',
      username: 'JessePigman',
      email: 'jesse@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '8',
      username: 'FerdinandPierre',
      email: 'ferdinand@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [
        {
          _id: '1',
          username: 'SteveTheMiner',
          email: 'steve@mc.com',
          password: 'secret',
          subscriptions: [],
          subscribers: [],
        },
      ],
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
}
