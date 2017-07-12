import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MultiSelect } from 'primeng/primeng';
import { ToasterService } from 'angular2-toaster';
import { CompanySetService } from '../services/company-set.service';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
  styles: [`
			.form-control{
				padding: 20px 12px;
			}
  `]
})

export class AdminComponent implements OnInit {
  test:any;

  formData: any = {
    "account" : "",
    "telphone" : "",
    "code" : ""
  }
  select:any = [
    {
      label: '1',
      value:'a'
    },
    {
      label: '2',
      value:'b'
    },
    {
      label: '3',
      value:'c'
    },
    {
      label: '4',
      value:'d'
    },
    {
      label: '5',
      value:'e'
    }
  ]
  public secondNum: number = 60; // 倒计时秒数设置
  public timer;
  public disabledClick: boolean = false;
  public second : number = this.secondNum;

  public accountModel: any; //管理员模型
  public managerList: any; //管理员数据

  public user:any;
  public countries = [
    {
      name:"china",
      id:1
    },
    {
      name:"china1",
      id:2
    },
    {
      name:"bhina2",
      id:3
    }
  ];

  loading: boolean = false;
  submitted: boolean = false;
  
  constructor(private companySetService: CompanySetService,
              private toasterService: ToasterService ) { }


  ngOnInit() {
    this.getUser();
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.managerList.filter(v => v.membername.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 20));

  formatter = (x: {membername: string}) => x.membername;
        
  onSubmit() {
    console.log(this.test);
    this.companySetService.changeAdmin(this.accountModel.id,this.formData.telphone,this.formData.code).subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.toasterService.pop('success','提示','修改成功!');
          this.formData = {};
        } else {
          this.disabledClick = false;
        }
      },
      error => {
        this.toasterService.pop('warning','提示','网络错误!');
        this.disabledClick = false;
      }
    )
    
  }

  getCode() {
    this.disabledClick = true;
    this.companySetService.getCode(this.formData.telphone, 4).subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.doTimeLess();
        } else {
          this.toasterService.pop('error','提示',data.msg);
          this.disabledClick = false;
        }
      },
      error => {
        this.toasterService.pop('warning','提示','网络错误!');
        this.disabledClick = false;
      }
    )

  }

  doTimeLess() {
    this.second = this.secondNum;
    this.timer = setInterval(() => {
      if(this.second === 0){
        clearInterval(this.timer);
        this.second = this.secondNum;
        this.disabledClick = false;
      }else{
        this.second--;
      }
    }, 1000);
  }

  getUser() {
    this.companySetService.getUser().subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.managerList = data.data;
        } else {
          this.managerList = [];
        }
      },
      error => {
        this.managerList = [];
      }
    )
  }

}
