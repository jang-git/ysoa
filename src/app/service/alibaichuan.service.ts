import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

/** models  */
import { Message } from '../model/message.model';
import { Thread } from '../model/thread.model';
import { User } from '../model/user';
import { Tribe } from '../model/tribe.model';
import { TribeMember } from '../model/tribe-member.model';

/** util */
import * as _ from 'lodash';
/** services */
import { ThreadsService } from '../service/threads.service';
import { MessagesService } from '../service/messages.service';

declare var WSDK: any;
@Injectable()
export class AlibaichuanService {
  /** 阿里百川SDK用到的,注意只能实例化一次 */
  public sdk: any;
  public Emot: any;

  /** 当前的聊天信息数组 */
  public currentMessages: Message[] = [];

  /** 当前的联系人数组 */
  public currentThreads: Thread[] = [];

  /** 当前聊天对象的ID 可以是某个人ID也可以是一个群ID */
  public toUserId: string = '';

  /** Rxjs */
  public hasNewThread: Subject<any> = new Subject<any>();
  public hasNewThreadA: Subject<any> = new Subject<any>();
  public updateMessages: Subject<any> = new Subject<any>();
  public updateTribe: Subject<any> = new Subject<any>();
  public updateMessagesScroll: Subject<any> = new Subject<any>();

  /** 获取下一页聊天记录的参数 默认必须空*/
  public nextkeyHistory: string = '';

  public currentTribeSubscribe: any;
  public currentTribe: Tribe = new Tribe(); //当前的群信息
  public currentTribeMembers: TribeMember[] = []; //当前的群成员

  /** HTTP API */
  public createTribeUrl = environment.api.createTribeUrl; //创建群组
  public getTribeInfoUrl = environment.api.getTribeInfoUrl; //获取群组信息
  public quitTribeUrl = environment.api.quitTribeUrl; //退出群聊
  public inviteJoinTribeUrl = environment.api.inviteJoinTribeUrl; //邀请加入讨论组
  public getTribeLogsUrl = environment.api.getTribeLogsUrl; //邀请加入讨论组

  constructor(public http: Http, public threadService: ThreadsService, public messagesService: MessagesService, public router: Router) {
    this.sdk = new WSDK();
    this.Emot = this.sdk.Plugin.Emot;
    this.hasNewThreadA = this.hasNewThread;
  }
  /**
   * 用户登录
   * @param  {string} uid        [用户ID]
   * @param  {string} appkey     [appkey]
   * @param  {string} credential [credential]
   */
  login(uid, appkey, credential) {
    var that = this;
    this.sdk.Base.login({
      uid: uid,
      appkey: appkey,
      credential: credential,
      timeout: 5000,
      success: function(data) {
        console.log('login===登录成功!', data);
        that.getRecentContact(uid);
        that.listenAllMessage(uid);
        that.getTribeList();
        // setTimeout(function() {
        //   that.getUnreadMsgCount();
        // }, 10000);
      },
      error: function(error) {
        // {code: 1002, resultText: 'TIMEOUT'}
        console.log('login fail', error);
        that.loginOnly(uid, appkey, credential);
      }
    });
  }
  //仅仅为了登录
  loginOnly(uid, appkey, credential) {
    var that = this;
    this.sdk.Base.login({
      uid: uid,
      appkey: appkey,
      credential: credential,
      timeout: 5000,
      success: function(data) {
        console.log('login===再次登录成功!', data);
        // setTimeout(function() {
        //   that.getUnreadMsgCount();
        // }, 10000);
      },
      error: function(error) {
        // {code: 1002, resultText: 'TIMEOUT'}
        console.log('login fail', error);
        // that.loginOnly(uid, appkey, credential);
      }
    });
  }
  addMessage(message: Message) {
    var Emot = this.sdk.Plugin.Emot;
    message.msg = Emot.decode(message.msg);
    message.from = message.from.substring(8);
    if(message.type == 1) {
      message.pic = message.msg.replace(/amp;/g,"");
    }
    console.log(message);

    let length = this.currentMessages.length;
    if (length > 0) {
      let lastMessageTime = this.currentMessages[length - 1].time;
      console.log('上一条消息的时间', lastMessageTime)
      console.log('这次发消息的时间', new Date(message.time))
      if ((message.time - lastMessageTime) > 10 * 60 * 1000) {
        message.isTimeVisible = true;
      }
    }
    else {
      message.isTimeVisible = true;
    }


    this.currentMessages.push(message);
    this.updateMessages.next('更新信息');
    console.log(this.currentMessages);
  }
  //监听群聊里的消息模拟发送
   addMessageTribe(message: Message) {
    
    message.from = message.from.substring(8);
    
    console.log(message);

    let length = this.currentMessages.length;
    if (length > 0) {
      let lastMessageTime = this.currentMessages[length - 1].time;
      console.log('上一条消息的时间', lastMessageTime)
      console.log('这次发消息的时间', new Date(message.time))
      if ((message.time - lastMessageTime) > 10 * 60 * 1000) {
        message.isTimeVisible = true;
      }
    }
    else {
      message.isTimeVisible = true;
    }


    this.currentMessages.push(message);
    this.updateMessages.next('更新信息');
    console.log(this.currentMessages);
  }


  addMessagePic(message: Message) {

    // let lastMessageTime = this.currentMessages.pop().time;
    let lastMessageTime = _.last(this.currentMessages).time;
    message.from = message.from.substring(8);
    if ((message.time - lastMessageTime) > 10 * 60 * 1000) {
      message.isTimeVisible = true;
    }

    this.currentMessages.push(message);

    // console.log(this.currentMessages);
  }

  updateThread(thread: Thread) {
    if (thread && thread.msg) {
      thread.msg = thread.type == 1 ? "[图片消息]" : thread.type == 2 ? "[语音消息]" : thread.msg;
      
      let notincurrentThreads = true;
      if (this.currentThreads) {
        var that = this;
        this.currentThreads.forEach(function(value, index) {
          if (value.uid == thread.uid && value.threadType == thread.threadType) {
            notincurrentThreads = false;
            value.time = thread.time;
            value.msg = thread.msg;
            if (thread.uid == that.toUserId) {
              value.threadUnread = 0;
            } else {
              value.threadUnread = value.threadUnread + 1;
            }
          }
        })
      }

      if (notincurrentThreads) {
        // console.log(thread);
        // this.currentThreads = this.currentThreads.concat(thread);
        this.currentThreads.push(thread);
      }

      this.currentThreads = _.sortBy(this.currentThreads, (thread) => {
        return -thread.time;
      });
      this.hasNewThread.next('更新会话数据');
      // console.log(this.currentThreads);
    }
  }
  //////////////阿里百川即时通讯方法//////////////
  //用户登出
  logout() {
    this.sdk.Base.logout({
      success: function(data){
        console.log('logout success', data);
      }
    });
  }

  //获取最近联系人
  getRecentContact(uid) {
    var that = this;
    this.sdk.Base.getRecentContact({
      count: 10,
      success: function(data) {
        let list = data.data.cnts;
        list.forEach(function(value, index) {
          let thread = new Thread();
          thread.avator = !value.avator ? "https://test.qiban.com/baichuntouxiang.png" : value.avator;
          thread.uid = value.uid.substring(8);
          thread.time = (value.time) * 1000;
          thread.nickname = !value.nickname ? thread.uid : value.nickname;
          thread.type = value.msg[0][1].indexOf('downloadPriFile.do?type=2') > 0 ? 2 : value.msg[0][1].indexOf('downloadPriFile.do?type=1') > 0 ? 1 : 0;
          thread.threadType = 1;
          thread.msg = value.msg[0][1];

          that.updateThread(thread);
        });
        // that.hasNewThread.next('更新会话数据');
        console.log("获取最近的联系人数据", data);
      },
      error: function(error) {
        console.log('获取最近联系人及最后一条消息内容失败', error);
      }
    });
  }

  //发送消息-单聊
  sendMsg(touid, msg) {
    this.sdk.Chat.sendMsg({
      touid: touid,
      msg: msg,
      success: function(data) {
        console.log('消息发送成功', data);
      },
      error: function(error) {
        console.log('消息发送失败', error);
      }
    });
  }

  /** 发送群聊消息 */
  sendMsgTribe(touid, msg) {
    this.sdk.Tribe.sendMsg({
      tid: touid,
      msg: msg,
      success: function(data) {
        console.log('发送群消息成功', data);
      },
      error: function(error) {
        console.log('发送群消息失败', error);
      }
    });
  }

  //发送图片消息
  sendMsgPic(touid, msg) {
    this.sdk.Chat.sendMsg({
      touid: touid,
      msgType: 1,
      msg: msg,
      success: function(data) {
        console.log('消息发送成功', data);
      },
      error: function(error) {
        console.log('消息发送失败', error);
      }
    });
  }

  //获取历史消息-单聊(注:这里是第一次加载历史数据，需要实现滚动)
  getHistory(uid, nextkey) {
    var that = this;
    this.sdk.Chat.getHistory({
      touid: uid,
      nextkey: nextkey,
      count: 10,
      success: function(data) {
        //记录下一页记录参数
        that.nextkeyHistory = data.data.nextKey || "";
        console.log(that.nextkeyHistory);
        //获取历史信息到当前的MESSAGES
        that.getHistoryToCurrentMessage(data, true);
        console.log('获取历史消息成功', data);
        // nextkey = data.data && data.data.next_key;
      },
      error: function(error) {
        if (error.code === 1001) {
          that.router.navigateByUrl('/chat');
        }
        console.log('获取历史消息失败', error);
      }
    });
  }

  //获取历史消息-单聊(注:这里是手动增加历史数据，不需要实现滚动)
  getHistoryAdd(uid, nextkey) {
    if (nextkey == '') {
      console.log('没有数据了')
      return false;
    }
    var that = this;
    this.sdk.Chat.getHistory({
      touid: uid,
      nextkey: nextkey,
      count: 10,
      success: function(data) {
        //记录下一页记录参数
        that.nextkeyHistory = data.data.nextKey;
        console.log(that.nextkeyHistory);
        //获取历史信息到当前的MESSAGES
        that.getHistoryToCurrentMessage(data, false);
        console.log('获取历史消息成功', data);
        // nextkey = data.data && data.data.next_key;
      },
      error: function(error) {
        if (error.code === 1001) {
          that.router.navigateByUrl('/usercenter/chat');
        }
        console.log('获取历史消息失败', error);
      }
    });
  }

  getHistoryToCurrentMessage(message, scroll: boolean) {
    var that = this;
    var msgs = message.data.msgs.reverse();
    var Emot = this.sdk.Plugin.Emot;


    msgs.forEach(function(data, i) {
      let message = new Message();
      message.msg = Emot.decode(data.msg);
      message.from = data.from.substring(8);
      message.time = data.time;
      message.type = data.type;
      if (i == 0) {
        message.isTimeVisible = true;
      }
      if (i > 0) {
        if ((msgs[i].time - msgs[i - 1].time) > 5 * 60 * 1000) {
          message.isTimeVisible = true;
        }
      }

      if (data.type === 1) {
        message.pic = data.msg;
      }
      if (data.type === 2) {
        message.msg = '::请在移动端收听语音消息::';
      }

      that.currentMessages.push(message);
    })

    this.orderByCurrentMessage(scroll);
  }
  //排序currentMessages 按照时间升序排序
  orderByCurrentMessage(scroll: boolean) {
    // console.log("XOXOXOXOXO",this.currentMessages);
    this.currentMessages = _.sortBy(this.currentMessages, (item) => {
      return item.time;
    });
    if (scroll) {
      // console.log('shi zheli')
      this.updateMessagesScroll.next('更新消息并且滚动到窗口底部');
    }
    else {
      // console.log('是这里')
      this.updateMessages.next('更新消息但是不控制滚动');
    }
  }

  listenThread() {
    this.hasNewThread.next('xiaoxi')
  }

  listenUpdateMessage() {
    this.updateMessages.next('xiaoxi')
  }
  /** 创建讨论组 */
  createTribe(uid, tribe_name, notice, userids) {

    let params = new URLSearchParams();
    params.set('userid', uid);
    params.set('tribe_name', tribe_name);
    params.set('notice', notice);
    params.set('userids', userids);
    console.log(params);
    return this.http.get(this.createTribeUrl, { search: params })
      .map((response: Response) => {
        let data = response.json();
        console.log(data);
        return data;
      });
  }
  /**
   * 获取群聊天记录
   * @param tribe_id 
   * @param next_key 
   */
  getTribeLogs(tribe_id, next_key) {

    let count = '10'; //一页显示的条数
    let params = new URLSearchParams();
    params.set('tribe_id', tribe_id);
    params.set('count', count);
    if (next_key) {
      params.set('next_key', next_key);
    }
    
    console.log(params);
    return this.http.get(this.getTribeLogsUrl, { search: params })
      .map((response: Response) => {
        let data = response.json();
        console.log(data);
        return data;
      });
  }
  /**
   * 获取群聊天记录
   * @param tribe_id 
   * @param next_key 
   */
  getTribeLogsToCurrentMessage (tribe_id, next_key, scroll: boolean) {
    this.getTribeLogs(tribe_id, next_key).subscribe(
      (data)=>{
        console.log(data);
        if(data.status === 0) {
          this.nextkeyHistory = data.data.next_key;
          this.getHistoryTribeToCurrentMessage(data.data.messages,scroll)
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getHistoryTribeToCurrentMessage(msgs, scroll: boolean) {
    
    let messages = msgs.tribe_message;
    var Emot = this.sdk.Plugin.Emot;
    
    console.log(messages);
    var that = this;
    messages.reverse();
    messages.forEach(function(data, i){
      
      let message = new Message();
      message.msg = Emot.decode(data.content.message_item[0].value);
      message.from = data.from_id.uid;
      message.time = data.time * 1000;
      message.type = data.type;
      if (i == 0) {
        message.isTimeVisible = true;
      }
      if (i > 0) {
        if ((messages[i].time - messages[i - 1].time) > 5 * 60) {
          message.isTimeVisible = true;
        }
      }

      if (data.type === 1) {
        message.pic = data.msg;
      }
      if (data.type === 2) {
        message.msg = '::请在移动端收听语音消息::';
      }

      that.currentMessages.push(message);

    })

    this.orderByCurrentMessage(scroll);
  }

  /** 获取群信息(http) 包括群成员列表数据 */
  getTribeInfoByHttp(tribe_id, uid) {
    console.log(tribe_id);
    let params = new URLSearchParams();
    params.set('userid', uid);
    params.set('tribe_id', tribe_id);
    return this.http.get(this.getTribeInfoUrl, { search: params })
      .map((response: Response) => {
        let data = response.json();
        return data;
      });

  }
  /** 获取指定群信息 */
  getTribeInfo(tid) {
    var that = this;
    this.sdk.Tribe.getTribeInfo({
      tid: tid,
      success: function(data) {
        that.currentTribe = new Tribe();
        if (data.data) {
          that.currentTribe.bulletin = data.data.bulletin;
          that.currentTribe.icon = data.data.icon;
          that.currentTribe.masterId = data.data.masterId.substring(8);
          that.currentTribe.tid = data.data.tid;
          that.currentTribe.name = data.data.name;
        }

        that.updateTribe.next('更新群信息');
        console.log('获取群信息成功', data);
      },
      error: function(error) {
        console.log('获取群信息失败', error);
      }
    });
  }
  /**
   * 邀请加入讨论组
   * @param tribe_id 
   * @param userid 
   * @param userids 
   */
  inviteJoinTribe(tribe_id, userid, userids) {
    let url = this.inviteJoinTribeUrl;
    let params = new URLSearchParams();
    params.set('userid', userid);
    params.set('tribe_id', tribe_id);
    params.set('userids', userids);
    console.log(params);
    return this.http.get(url,{ search: params })
      .map((res: Response) => {
        let result = res.json();
        console.log(result);
        return result;
        // return result;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /**
   * 退出群聊
   * @param tribe_id 
   * @param userid 
   */
  quitTribe(tribe_id, userid) {
    let url = this.quitTribeUrl;
    let params = new URLSearchParams();
    params.set('userid', userid);
    params.set('tribe_id', tribe_id);
    console.log(params);
    return this.http.get(url,{ search: params })
      .map((res: Response) => {
        let result = res.json();
        console.log(result);
        return result;
        // return result;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /** 获取指定群成员 */
  getTribeMembers(tid) {
    var that = this;
    this.sdk.Tribe.getTribeMembers({
      tid: tid,
      success: function(data) {
        that.currentTribeMembers = [];
        if (data.data) {
          that.doTribeMembers(data.data);
        }

        console.log('获取群成员成功', data);
      },
      error: function(error) {
        console.log('获取群成员失败', error);
      }
    });
  }

  doTribeMembers(data) {
    let tribeMember = new TribeMember();
    var that = this;
    data.forEach(function(value, index) {

      tribeMember.nick = value.nick;
      tribeMember.role = value.role;
      tribeMember.userid = value.uid.substring(8);

      that.currentTribeMembers.push(tribeMember);
    })
    that.updateTribe.next('更新群信息');
    console.log(that.currentTribeMembers);
  }

  /** 获取群列表 */
  getTribeList() {
    var that = this;
    this.sdk.Tribe.getTribeList({
      tribeTypes: [0, 1, 2],
      success: function(data) {
        data.data.forEach(function(value, index) {
          let thread: Thread = new Thread;
          thread.avator = value.icon;
          thread.nickname = value.name;
          thread.uid = value.tid;
          thread.threadType = 2;
          that.currentThreads.push(thread);
        })
        that.listenThread();
        console.log('获取群列表成功', data);
      },
      error: function(error) {
        console.log('获取群列表失败', error);
      }
    });
  }
  /** 获取未读消息的条数 */
  getUnreadMsgCount() {
    var recentTribe = [];
    console.log('fufuuffufu');
    this.sdk.Base.getUnreadMsgCount({
      count: 10,
      success: function(data) {
        console.log(data);
        var list = data.data;
        list.forEach(function(item) {
          if (item.contact.substring(0, 8) === 'chntribe') {
            recentTribe.push(item);
          } else {
            console.log(item.contact.substring(8) + '在' + new Date(parseInt(item.timestamp) * 1000) + ',');
            console.log('给我发了' + item.msgCount + '条消息，最后一条消息是在' + new Date(parseInt(item.lastmsgTime) * 1000) + '发的');
          }
        });

        recentTribe.length && console.log('最近给我发消息的群', recentTribe);
      },
      error: function(error) {
        console.log('获取未读消息的条数失败', error);
      }
    });
  }

  /** 监听消息 */
  startListen(uid) {
    this.sdk.Event.on('CHAT_START_RECEIVE_MSG', function(data) {
      console.log('我与' + uid + '之间的所有消息', data);
    });

    this.sdk.Event.on('MSG_RECEIVED', function(data) {
      console.log('我与' + uid + '之间能收到成功的消息', data);
    });

    this.sdk.Event.on('CHAT.MSG_RECEIVED', function(data) {
      console.log('我与' + uid + '之间能收到成功的单聊消息', data);
    });

    this.sdk.Event.on('KICK_OFF', function(data) {
      console.log('啊，我被踢了', data);
    });
    this.sdk.Chat.startListenMsg({
      touid: uid
    });
  }
  /** 监听所有的在线用户发来的消息 */
  listenAllMessage(uid) {
    var that = this;

    //监听单聊消息
    this.sdk.Event.on('CHAT.MSG_RECEIVED', function(data) {
      console.log('我能收到成功的单聊消息', data);
      var uid = data.data.touid.substring(8);
      // that.getRecentContact(uid);

      if (data.code === 1000 && that.toUserId == uid) {
        console.log(data.data.msgs[0].msg);
        that.addMessage(data.data.msgs[0]);
        that.updateMessagesScroll.next('更新并且滚动到底部');
      }

      let thread: Thread = new Thread;
      thread.time = data.data.msgs[0].time;
      thread.msg = data.data.msgs[0].msg;
      thread.type = data.data.msgs[0].type;
      thread.uid = uid;
      that.updateThread(thread);

    });

    //监听群聊消息
    this.sdk.Event.on('TRIBE.MSG_RECEIVED', function(data) {
      console.log('我能收到成功的群聊消息', data);

      // var uid = data.data.touid;//这里是群ID

      let thread: Thread = new Thread;
      // thread.nickname = data.data.
      thread.avator = 'http://tpsrv.wws.taobao.com/webim/tribev6/tribeGetLogo.htm?tribeId=2224749925&logoFlag=0&fromTaobao=true&ppid=&tribeType=1&subType=0';
      let msgType = data.data.msgs[0].type;
      if(msgType == 216) {
        return false;
      }
      thread.time = data.data.msgs[0].time;
      // thread.msg = data.data.msgs[0].msg;
      thread.uid = data.data.touid;
      thread.threadType = 2;
      
      if(msgType == 0) {
        thread.msg = data.data.msgs[0].msg;
        that.updateThread(thread);
      }
      else if(msgType == 3){
        thread.nickname = data.data.msgs[0].msg.tribeName;
        if(data.data.uid == data.data.msgs[0].msg.userId){
          thread.msg = '[您加入了该群]';
        }else{
          if(data.data.msgs[0].msg.userName == ''){
            thread.msg = '新群提示';
          }else{
            thread.msg = '['+ data.data.msgs[0].msg.userName +'加入了该群]';
          }
          
        }
        that.updateThread(thread);
      }else if(msgType == 5) {
        if(data.data.uid == data.data.msgs[0].msg.userId){
          thread.msg = '[您退出了该群]';
        }else{
          thread.msg = '['+ data.data.msgs[0].msg.userName +'退出了该群]';
          that.updateThread(thread);
        }
        
      }else if(msgType == 9) {
        if(data.data.uid == data.data.msgs[0].msg.userId){
          thread.msg = '[您被请出了该群]';
        }else{
          thread.msg = '['+ data.data.msgs[0].msg.userName +'被请出群]';
        }
        that.updateThread(thread);
      }else if(msgType == 15) {
        thread.msg = '[群名片修改]';
        that.updateThread(thread);
      }else if(msgType == 12) {
        thread.msg = '[该群已解散]';
        thread.clickForbidden = true;
        that.updateThread(thread);
      }else if(msgType == 16) { //讨论组里监听到的图片消息
        thread.msg = '[图片消息]';
        that.updateThread(thread);
      }

      if (data.code === 1000 && that.toUserId == thread.uid && msgType == 16) {
        console.log(data.data.msgs[0].msg);
        let uid = data.data.uid;
        let msgs = data.data.msgs;
        let pic = 'http://ftsproxy.wangxin.taobao.com/fetch?uid='+uid+'&ftsip='+msgs[0].msg.ftsip+'&ftsport='+msgs[0].msg.ftsport+'&ssession='+msgs[0].msg.ssession+'&filesize='+msgs[0].msg.filelen+'&filename='+msgs[0].msg.filehash+msgs[0].msg.fileextend+'&thumbnail=2&width='+msgs[0].msg.width+'&height='+msgs[0].msg.height;
        
        let m: Message = new Message;
            m.isRead = true;
            m.msg = '图片消息';
            m.pic = pic;
            m.type = 1;
            m.from = data.data.msgs[0].from;
              
            console.log(m);
        that.addMessageTribe(m);
        that.updateMessagesScroll.next('更新并且滚动到底部');
      }
      if (data.code === 1000 && that.toUserId == thread.uid && msgType == 0) {
        console.log(data.data.msgs[0].msg);
        that.addMessage(data.data.msgs[0]);
        that.updateMessagesScroll.next('更新并且滚动到底部');
      }

    });

    /** 执行监听所有消息 */
    this.sdk.Base.startListenAllMsg();
  }

}
