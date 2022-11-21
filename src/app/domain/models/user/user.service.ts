import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/domain/models/entity/entity.service';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'users');
  }
  readonly users: User[] = [
    {
      _id: '1',
      username: 'SteveTheMiner',
      email: 'steve@mc.com',
      password: 'secret',
      subscriptions: [
        {
          _id: '2',
          username: 'AlexTheBuilder',
          email: 'alex@mc.com',
          password: 'secret',
          subscriptions: [],
          subscribers: [],
          liked: [],
        },
      ],
      subscribers: [],
      liked: [],
    },
    {
      _id: '2',
      username: 'AlexTheBuilder',
      email: 'alex@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '3',
      username: 'EnderDragon',
      email: 'ender@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '4',
      username: 'Herobrine',
      email: 'herobrine@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '5',
      username: 'Notch',
      email: 'notch@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '6',
      username: 'WitherBoss',
      email: 'wither@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '7',
      username: 'JessePigman',
      email: 'jesse@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
      liked: [],
    },
    {
      _id: '8',
      username: 'FerdinandPierre',
      email: 'ferdinand@mc.com',
      password: 'secret',
      subscriptions: [
        {
          _id: '1',
          username: 'SteveTheMiner',
          email: 'steve@mc.com',
          password: 'secret',
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

  deleteUser(id: string): void {
    console.log('deleteUser aangeroepen');
    this.users.splice(
      this.users.findIndex((user) => user._id === id),
      1
    );
  }
}
