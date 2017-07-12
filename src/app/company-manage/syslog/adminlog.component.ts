import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CompanySetService } from '../services/company-set.service';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-home',
  templateUrl: './adminlog.component.html'
})
export class AdminLogComponent implements OnInit {
  startDate: NgbDateStruct; //开始时间
  endDate: NgbDateStruct; //结束时间
  selected: any = 0;
  selectList: any = [];
  logList: any = [];
  adminList:any = [];

  page:number = 0;
  collectionSize:number;

  constructor(private ngbformatter:NgbDateParserFormatter,
              private companySetService: CompanySetService,
              private toasterService: ToasterService) {
  
    
  }

  ngOnInit() {
    this.getAdmin();
  }
  getAdmin() {

    this.companySetService.getAdminList().subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.adminList = data.data;
        } else {
          // this.toasterService.pop('error','提示','数据错误');
        }
      }
    )
  }
  searchLog($event?:any){
    let s = this.ngbformatter.format(this.startDate);
    let e = this.ngbformatter.format(this.endDate);
    let loginType = this.selected;
    let page = $event ? ($event-1).toString() : "0";
    
    this.companySetService.operationRecord(s,e,loginType,page).subscribe(
       data => {
        console.log(data);
        if (data.status === 0) {
          if(data.data.list.length > 0){
            this.logList = data.data.list;
            this.collectionSize = data.data.memberLog.totalElements;
          }
          
        } else {
          this.toasterService.pop('error','提示','数据错误');
        }
      },
      error => {
        this.toasterService.pop('warning','提示','网络错误');
      }
    )

  }


}
