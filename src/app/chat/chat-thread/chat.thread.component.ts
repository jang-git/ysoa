import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../../model/thread.model';
import { User } from '../../model/user';
import { AlibaichuanService } from '../../service/alibaichuan.service';
@Component({
  selector: 'chat-thread',
  templateUrl: './chat.thread.component.html'
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;

  constructor(public alibaichuanService:AlibaichuanService) {

  }

  ngOnInit(): void {

  }

  toUserInfo(name) {
  }

  readMsg(thread){
    if(thread.clickForbidden === true){
      return false;
    }
    thread.threadUnread = 0;
  }

}
