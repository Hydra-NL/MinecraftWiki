import { Block } from '../block/block.model';
import { Entity } from '../entity/entity.model';

export class User extends Entity {
  username: string = '';
  email: string = '';
  password: string = '';
  about: string = '';
  subscriptions: Array<User> = [];
  subscribers: Array<User> = [];
  liked: Array<Block> = [];

  constructor(_id: string) {
    super(_id);
  }
}
