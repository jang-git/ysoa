import {Component,Inject,ViewChild,ElementRef,OnInit,AfterViewInit,AfterViewChecked,AfterContentInit,OnChanges} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from '../../model/message.model';
import { Thread } from '../../model/thread.model';
import { Tribe } from '../../model/tribe.model';
import { TribeMember } from '../../model/tribe-member.model';
import { AlibaichuanService } from '../../service/alibaichuan.service';
import { MessagesService } from '../../service/messages.service';
import { CookieService } from 'ngx-cookie';
import { ContactsCheckService } from '../../service/contacts-check.service';
import { User } from '../../model/user';

import * as _ from 'lodash';
declare var WSDK:any;
declare var success:any;
@Component({
  selector: 'chat-window.vbox',
  templateUrl: './chat.window.component.html',

})

export class ChatWindowComponent implements OnInit{
  groupBtnSetting: boolean = false;
  noticeStatus: boolean = false;

  hasNewMessage: Observable<any>;
  draftMessage: Message;
  messages: Message[];
  // messages: Observable<any>;
  toUserNickname: any;
  toUserId: any;
  uid: any;

  getMoreData: boolean = true;
  oldScrollHeight: number = 0;
  public localStorage:any;

  public currentTribe: Tribe;
  public currentTribeMembers: TribeMember[];

  public chatSort: number = 1; //聊天类型 1单聊 2群聊

  public contactsShow: boolean = false; //通讯录默认关闭
  public contacts = []; //通讯录
  public checkedContacts = []; //讨论组成员

  public user:any;
  constructor(public contactsCheckService: ContactsCheckService,
              public messagesService: MessagesService,
              public el: ElementRef,
              public alibaichuanService: AlibaichuanService,
              public activeRoute: ActivatedRoute,
              public _cookieService:CookieService) {

    this.user = this._cookieService.getObject('currentUser');
    this.uid  = this.user.cellphone;
  }
  ngOnInit(): void {
    //获取路由参数，然后执行别的方法
    this.activeRoute.params.subscribe(
      params => {
        this.toUserId = params["uid"];
        this.toUserNickname = params["nickname"];
        this.alibaichuanService.toUserId = params["uid"];


        //获取历史消息
        if(params["type"] == 2){
          console.log('这里是群组标记');
          this.chatSort = 2;

          this.groupBtnSetting = true;
          this.messages = [];
          this.alibaichuanService.currentMessages = [];

          this.currentTribe = new Tribe();
          this.currentTribeMembers = [];
          this.alibaichuanService.nextkeyHistory = '';

          this.getTribeInfo(params["uid"],this.uid);
          this.getTribeLogs(params["uid"]); // 获取群组聊天记录
          // this.alibaichuanService.getTribeInfo(this.toUserId);
          // this.alibaichuanService.getTribeMembers(this.toUserId);
        }
        if(params["type"] == 1){
          this.chatSort = 1;
          this.messages = [];
          this.alibaichuanService.currentMessages = [];
          this.alibaichuanService.nextkeyHistory = '';
          this.groupBtnSetting = false;
          this.getHistory(params["uid"]);
        }

      }
    );
    /** 更新群组信息 */
    this.alibaichuanService.currentTribeSubscribe = this.alibaichuanService.updateTribe.subscribe(()=>{
      this.currentTribe = this.alibaichuanService.currentTribe;
      this.currentTribeMembers = this.alibaichuanService.currentTribeMembers;
      
      console.log(this.currentTribe);
    })

    /**  */
    this.alibaichuanService.updateMessagesScroll.subscribe(
      ()=>{
        this.messages = this.alibaichuanService.currentMessages;
        console.log("触发滚动事件,最新的message",this.messages);

        setTimeout(() => {
          this.scrollToBottom();
        });
      }
    )

    this.alibaichuanService.updateMessages.subscribe(
      ()=> {
        const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
        let old = scrollPane.scrollHeight - scrollPane.scrollTop;
        this.messages = this.alibaichuanService.currentMessages;
        setTimeout(function () {
          scrollPane.scrollTop = scrollPane.scrollHeight - old;
        }, 0);
        console.log("最新的messages",this.messages);
      }
    )

    this.draftMessage = new Message();
    // this.messages = this.alibaichuanService.currentMessages;
    // this.messages = this.messagesService.messages;

    //阿里百川里的表情插件
    var trigger = document.getElementById('myEmotTrigger'),
    box = document.getElementById('myEmotBox'),
    textarea = document.getElementById('message-content'),
    msgCon = document.getElementById('myMsgCon'),
    isEmotInited = false,
    isEmotBoxShow = false,
    Emot = this.alibaichuanService.sdk.Plugin.Emot;

    trigger.onclick = function(){

      if(!isEmotInited){
            Emot.render({
                container: box,
                onEmotClick: emotClickHandler
            });
            isEmotInited = true;
        }
        if(isEmotBoxShow){
            box.style.display = 'none';
        }else{
            box.style.display = 'block';
        }

        isEmotBoxShow = !isEmotBoxShow;

    };
    var emotClickHandler = (emotTitle) => {
      this.draftMessage.msg += emotTitle;
      box.style.display = 'none';
      isEmotBoxShow = false
    }



  }

  ngOnDestroy() :void{

    this.alibaichuanService.currentTribeSubscribe.unsubscribe();
  }

  //=============聊天方法
  //点击回车
  onEnter(event: any): void {
    this.sendMessageByAlibaichuan();
    event.preventDefault();
  }

  file: File;
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(files);
        console.log(this.file);


        var that = this;
        this.alibaichuanService.sdk.Plugin.Image.upload({
            target: target,
            success: function(data){
                /*
                {
                    code: 1000,
                    resultCode: 'SUCCESS',
                    data: {
                        url: '',
                        base64Str: ''
                    }
                }
                */
                if(data.code === 1000) {
                  let msg;
                  const m: Message = new Message;
                  m.isRead = true;
                  m.msg = data.data.base64Str;
                  m.pic = m.msg;
                  m.type = 1;
                  // msg = that.alibaichuanService.sdk.Plugin.Emot.htmlEncode(msg);
                  m.from = "12345678"+ that.uid;
                  console.log(that.uid);

                  that.alibaichuanService.addMessagePic(m);
                  that.alibaichuanService.sendMsgPic(that.toUserId,data.data.url);
                  setTimeout(() => {
                    that.scrollToBottom();
                  });
                }
                console.log('上传成功', data);
            },
            error: function(error){
                console.log('上传失败', error);
            }
        });

    }


  uploadPic() {
    var fileInput = document.getElementById('J_fileInput');
    fileInput.click();
  }
  //获取单聊历史消息
  getHistory(uid) {

    this.alibaichuanService.currentMessages = [];
    this.alibaichuanService.nextkeyHistory = '';
    this.alibaichuanService.getHistory(uid,'');
    this.messages = this.alibaichuanService.currentMessages;
  }

  //获取群组历史消息
  getHistoryTribe(tid) {
    this.alibaichuanService.currentMessages = [];
    this.alibaichuanService.nextkeyHistory = '';


  }
  getTribeLogs (tribe_id) {
    this.alibaichuanService.currentMessages = [];
    this.alibaichuanService.nextkeyHistory = '';
    this.alibaichuanService.getTribeLogsToCurrentMessage(tribe_id,'',true);
    // this.alibaichuanService.getHistoryTribeToCurrentMessage(tribe_id,true);
    this.messages = this.alibaichuanService.currentMessages;
  }
  /** 获取群信息 */
  getTribeInfo (tribe_id, uid) {
    this.alibaichuanService.getTribeInfoByHttp(tribe_id,uid).subscribe(
      (data)=>{
        console.log(data);
        if(data.status === 0) {
          this.currentTribe = data.data;
          this.currentTribeMembers = data.data1;
          this.alibaichuanService.currentTribeMembers = data.data1;
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  sendMessageByAlibaichuan() {
    const m: Message = this.draftMessage;
    let t: Thread = new Thread();
    let msg;
    m.isRead = true;
    if (!this.draftMessage.msg) {
      return;
    }

    msg = this.alibaichuanService.Emot.htmlEncode(m.msg);
    m.type = 0;
    m.from = "12345678"+ this.uid;
    m.time = new Date().getTime();
    m.to = this.toUserId;
    m.msg = msg;
    t.time = m.time;
    t.msg = msg;
    t.uid = m.to;
    if(this.chatSort == 1) {
      t.threadType = 1;
    }else{
      t.threadType = 2;
    }
    console.log(m);
    console.log(t);
    // alert(this.uid);
    this.alibaichuanService.addMessage(m);//给某个用户的历史记录里添加聊天信息
    this.alibaichuanService.updateThread(t);//更新临时会话的信息以及时间
    if(this.chatSort === 1) {
      this.alibaichuanService.sendMsg(this.toUserId,msg);//给阿里百川服务器发送信息
    }else{
      this.alibaichuanService.sendMsgTribe(this.toUserId,msg);//给阿里百川服务器发送信息
    }

    setTimeout(() => {
      this.scrollToBottom();
    });
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  scrollToPrevPosition(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight - this.oldScrollHeight;
    console.log(this.oldScrollHeight);
  }

  listenScrollAndGetMoreData($event?:any) {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    // console.log(scrollPane.scrollTop);
    // let oldScrollHeight = scrollPane.scrollHeight;
    if(scrollPane.scrollTop <= 0 && this.alibaichuanService.nextkeyHistory.length > 30){
      let oldScrollHeight = scrollPane.scrollHeight;
      console.log(this.alibaichuanService.nextkeyHistory);
      console.log('去加载数据!')
      console.log(scrollPane.scrollHeight);
      if(this.chatSort == 1) {
        this.alibaichuanService.getHistoryAdd(this.toUserId,this.alibaichuanService.nextkeyHistory);
      }
      if(this.chatSort == 2) {
        this.alibaichuanService.getTribeLogsToCurrentMessage(this.toUserId, this.alibaichuanService.nextkeyHistory,false);
      }
      

      // setTimeout(function(){
      //   scrollPane.scrollTop = scrollPane.scrollHeight - oldScrollHeight;
      //   // console.log(scrollPane.scrollHeight);
      // },500)
    }
  }

  getMoreHistoryData() {
    this.alibaichuanService.getHistoryAdd(this.toUserId,this.alibaichuanService.nextkeyHistory);
  }

  showNotice() {
    this.noticeStatus = true;

  }

  hideNotice(event:any) {
    event.preventDefault();
    event.stopPropagation();
    this.noticeStatus = false;

  }

  /**
   * 群公告设置
   */
  updateNotice(event:any) {
    // event.preventDefault();
    // event.stopPropagation();
    this.noticeStatus = false;

  }

  /** 获取所有联系人数据 */
  loadContactsData(currentTribeMembers){
    return this.contactsCheckService.getContactsList().subscribe(
      res=>{
        for(var i=0;i<currentTribeMembers.length;i++) {
          for(var k=0;k<res.length;k++){
            for(var m=0;m<res[k].data.length;m++){
              if(res[k].data[m].cellphone == currentTribeMembers[i].userid){
                res[k].data[m].disabled = true;
                break;
              }
            }
          }
        }
        this.contacts = res;
      },
      error => {console.log(error)},
      () => {}
    );
  }

  /** 添加群组成员 */
  addMemberforTribe (currentTribeMembers) {
    console.log(currentTribeMembers);

    this.loadContactsData(currentTribeMembers);
    this.contactsShow = true;
  }


  /** 取消操作 */
  cancelTribe (event) {
    event.preventDefault();
    event.stopPropagation();
    this.contactsShow = false;
    this.checkedContacts = [];

  }

  /** 选择联系人到右侧 */
  check(contact) {
    // event.stopPropagation();
    if(contact.disabled === true) {
      return;
    }

    if(contact.ischeck){
      this.checkedContacts = this.checkedContacts.filter(res => res.cellphone !== contact.cellphone);
      contact.ischeck = false;
    }else{
      this.checkedContacts.push(contact);
      contact.ischeck = contact.ischeck ? false : true ;
    }

    console.log(this.checkedContacts);
  }


  /** 移除已选择的联系人 */
  delContact (tel) {
    event.stopPropagation();
    this.checkedContacts = this.checkedContacts.filter(res => res.cellphone !== tel);

    this.contacts.forEach(function(value,index){
      value.data.forEach(function(val,key){
        if(val.cellphone == tel){
          val.ischeck = false;
          return ;
        }
      })
    })

  }

  /** 阻止事件冒泡 */
  stopPropagation(event) {
    event.stopPropagation();
  }
  /** 添加联系人到群组 */
  addMemberToTribe() {
    let tribeCount = this.toUserId; // 群组账号
    let tribeCreater = this.uid; //群组创建人


    let userids: string = '';
    let cellphone = [];

    this.checkedContacts.forEach(function(value,index){
      cellphone.push(value.cellphone);
    })
    userids = cellphone.join(',');
    console.log(userids);

    if(cellphone.length === 0) {
      alert('请选择需要添加的群成员');
      return ;
    }

    this.alibaichuanService.inviteJoinTribe(tribeCount, this.uid, userids).subscribe(
      data => {
          if(data.status === 0) {
            var that = this;
            this.checkedContacts.forEach(function(value,index){
              let member = new TribeMember();
                  member.nick = value.membername;
                  member.name = value.membername;
                  member.userid = value.cellphone;
                  member.icon_url = value.headPortrait;
              that.alibaichuanService.currentTribeMembers.push(member);
            })

            this.alibaichuanService.updateTribe.next('update');
            
            console.log(this.currentTribeMembers);
            console.log('邀请成功!');
            this.contactsShow = false;
            this.checkedContacts = [];
          }
      },
      error => {
          alert("网络超时!");

      });
  }
  /** 退出群聊 */
  logutTribe() {
    this.alibaichuanService.quitTribe(this.toUserId,this.uid).subscribe(
      data => {
          if(data.status === 0) {
            console.log(this.alibaichuanService.currentThreads);
            console.log(this.toUserId)
            this.alibaichuanService.currentThreads = this.alibaichuanService.currentThreads.filter((res) => res.uid != this.toUserId || res.threadType != 2);
            console.log(this.alibaichuanService.currentThreads);

            this.alibaichuanService.hasNewThread.next('更新会话数据');
            this.alibaichuanService.router.navigateByUrl('/chat');
            console.log('退群成功!');
          }
      },
      error => {
          alert("通讯错误!");

      });
  }

}
