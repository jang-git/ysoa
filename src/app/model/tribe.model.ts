
import { TribeMember } from "./tribe-member.model"
/**
 * 群、讨论组模型
 *
 */
 export class Tribe {
   bulletin: string; //群公告
   checkMode: number; //是否选中
   icon: string; //群头像
   lastModified: string;//最近群的修改时间
   masterId: string;
   memberCount: number;
   name: string;
   tid: number;
   tribeType: number;
   constructor(obj?: any) {
     this.bulletin          = obj && obj.bulletin      || "暂无公告信息";
     this.name              = obj && obj.name          || null;
     this.icon              = obj && obj.icon          || "";
   }
 }
