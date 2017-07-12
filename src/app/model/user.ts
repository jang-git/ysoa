import { uuid } from '../util/uuid';

export class User {
  id: string;
  nickname: string;
  name: string;
  constructor() {
    
    this.id = uuid();
    this.nickname = '没有昵称的用户';
    this.name = "用户的name字段";
  }
}
