import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../model/message.model';
import { CookieService } from 'ngx-cookie';
import { User } from '../../model/user';

@Component({
  selector: 'chat-message',
  templateUrl: './chat.message.component.html'
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  public localStorage :any;
  public uid: string;
  public user:any;
  currentUser: User;
  incoming: boolean;

  constructor(public _cookieService:CookieService) {
    this.user = this._cookieService.getObject('currentUser');
    this.uid  = this.user.cellphone;
  }

  ngOnInit(): void {
    this.incoming = this.message.from !== this.uid;
    // console.log(this.message);
  }
}
