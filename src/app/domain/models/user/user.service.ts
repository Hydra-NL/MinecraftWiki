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
      firstName: 'Steve',
      lastName: 'Miner',
      email: 'steve@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '2',
      firstName: 'Alex',
      lastName: 'Builder',
      email: 'alex@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '3',
      firstName: 'Ender',
      lastName: 'Dragon',
      email: 'ender@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '4',
      firstName: 'Herobrine',
      lastName: 'Ghost',
      email: 'herobrine@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '5',
      firstName: 'Notch',
      lastName: 'Creator',
      email: 'notch@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '6',
      firstName: 'Wither',
      lastName: 'Boss',
      email: 'wither@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '7',
      firstName: 'Jesse',
      lastName: 'Pigman',
      email: 'jesse@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [],
    },
    {
      _id: '8',
      firstName: 'Ferdinand',
      lastName: 'Pierre',
      email: 'ferdinand@mc.com',
      password: 'secret',
      subscriptions: [],
      subscribers: [
        {
          _id: '1',
          firstName: 'Steve',
          lastName: 'Miner',
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
