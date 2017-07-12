import { User } from './user';
import { uuid } from './../util/uuid';

/**
 * 发送消息的Model
 */
 export class Message {
   id: string;
   isRead: boolean;
   author: User;
   text: string;
   extInfo: string;
   from: string;
   msg: string;
   msgId: string;
   time: number;
   isTimeVisible: boolean;
   to: string;
   type: number;
   pic: string;
   constructor(obj?: any) {
     this.id              = obj && obj.id              || uuid();
     this.isRead          = obj && obj.isRead          || false;
     this.author          = obj && obj.author          || null;
     this.text            = obj && obj.text            || "";
     this.msg             = obj && obj.msg            || "";
     this.isTimeVisible   = obj && obj.isTimeVisible   || false;
   }
 }
