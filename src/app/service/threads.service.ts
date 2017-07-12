import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread } from '../model/thread.model';

import * as _ from 'lodash';

interface IThreadOperation extends Function {
  (threads: Thread[]): Thread[];
}
const initialThreads: Thread[] = [];
@Injectable()
export class ThreadsService {

  //最近联系人列表
  newthreads: Subject<Thread> = new Subject<Thread>();
  threads: Observable<Thread[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Thread> = new Subject<Thread>();
  constructor() {

    this.threads = this.updates
    .scan((threads: Thread[],
           operation: IThreadOperation) => {
            //  console.log(threads);
            //  console.log("这里呢",operation(threads))
             return operation(threads);
           },
          initialThreads)
    .publishReplay(1)
    .refCount();

    this.create
      .map( function(thread: Thread): IThreadOperation {
        return (threads: Thread[]) => {
          return threads.concat(thread);
        };
      })
      .subscribe(this.updates);

    this.newthreads
      .subscribe(this.create);
  }

  addThread(thread: Thread):void {
    // console.log(thread);
    this.newthreads.next(thread);//next表示返回值
  }

}
