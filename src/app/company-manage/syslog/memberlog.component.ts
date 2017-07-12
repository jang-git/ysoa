import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CompanySetService } from '../services/company-set.service';
const now = new Date();

@Component({
  selector: 'app-home',
  templateUrl: './memberlog.component.html'
})
export class MemberLogComponent implements OnInit {
  page:number = 0;
  collectionSize:number;
  startDate: NgbDateStruct; //开始时间
  endDate: NgbDateStruct; //结束时间

  selected:any = 0;
  selectList:any = [
    {
      "id":0,
      "name":"所有"
    },
    {
      "id":1,
      "name":"网页登录"
    },
    {
      "id":2,
      "name":"手机登录"
    }
  ];

  logList:any = [];
  constructor(private ngbformatter:NgbDateParserFormatter,
              private companySetService: CompanySetService) {

  }

  ngOnInit() {
    // this.searchLog();
  }

  searchLog($event?:any){
    let s = this.ngbformatter.format(this.startDate);
    let e = this.ngbformatter.format(this.endDate);
    let loginType = this.selected;
    let page = $event ? ($event-1).toString() : "0";

    this.companySetService.loginLog(s,e,loginType,page).subscribe(
       data => {
        console.log(data);
        if (data.status === 0) {
          if(data.data.list.length > 0){
            this.logList = data.data.list;
            this.collectionSize = data.data.memberLog.totalElements;
          }
        } else {
          alert(data.msg);
        }
      }
    )

  }



}
