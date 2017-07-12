import { Message } from '../model/message.model';
import { uuid } from '../util/uuid';

/**
 * 会话列表
 */
 export class Thread {
   msg: string;//消息
   nickname: string;//昵称
   avator: string;//头像
   time: number;//时间戳
   uid: string;//用户ID或者是群ID
   type: number;//消息类型 0文本 1图片 2语音 默认为0
   threadType: number;//会话类型 1单聊 2群聊 默认为1
   threadUnread: number;//未读消息
   clickForbidden: boolean;
   constructor(nickname?: string,
               avator?: string,
               time?: number,
               uid?: string) {
     this.nickname = nickname;
     this.avator = avator;
     this.time = time;
     this.uid = uid;
     this.type = 0;
     this.threadType = 1;
     this.threadUnread = 0;
     this.clickForbidden = false;
   }
 }
