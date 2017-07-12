import { uuid } from '../util/uuid';

export class Usercheck {
  id: string;
  tel: number;
  nickname: string;
  name: string;
  avator: string;
  ischeck: boolean;
  isAZ: boolean;
  constructor() {

    this.id = uuid();
    this.nickname = '没有昵称的用户';
    this.name = "用户的name字段";
    this.ischeck = false;
    this.isAZ = false;
  }
}
