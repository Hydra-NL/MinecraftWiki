import { Block } from '../block/block.model';
import { Entity } from '../entity/entity.model';

export class User extends Entity {
  username: string = '';
  email: string = '';
  password: string = '';
  about: string = '';
  subscriptions: string[] = [];
  subscribers: string[] = [];
  liked: string[] = [];

  constructor(_id: string) {
    super(_id);
  }
}
