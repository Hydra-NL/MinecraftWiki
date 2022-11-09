import { Entity } from '../entity/entity.model';

export class User extends Entity {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  subscriptions: Array<User> = [];
  subscribers: Array<User> = [];

  constructor(_id: string) {
    super(_id);
  }
}
