import {Component,OnInit,Inject} from '@angular/core';
import { Observable } from 'rxjs';

import { AlibaichuanService } from '../../service/alibaichuan.service';
import { Thread } from '../../model/thread.model';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat.threads.component.html'
})
export class ChatThreadsComponent implements OnInit {
  // threads: Observable<any>;
  threads: Array<Thread>;
  hasNewThread: Observable<any>;
  constructor(public alibaichuanService: AlibaichuanService) {


  };

  ngOnInit() {

    this.hasNewThread = this.alibaichuanService.hasNewThreadA;

    this.hasNewThread.subscribe(
      ()=>{
        this.threads = this.alibaichuanService.currentThreads;
      }
    )

    this.threads = this.alibaichuanService.currentThreads;


  }

}
