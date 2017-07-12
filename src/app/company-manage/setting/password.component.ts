import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService } from 'angular2-toaster';
import { CompanySetService } from '../services/company-set.service';
@Component({
  selector: 'app-home',
  templateUrl: './password.component.html',
  styles: [`
      .ng-touched.ng-valid[required], .ng-touched.ng-valid.required  {
        border: 1px solid #42A948; /* green */
      }

      .ng-touched.ng-invalid:not(form)  {
        border: 1px solid #a94442; /* red */
      }
  `]
})

export class PasswordComponent implements OnInit {
  
  formModify: any = {
    "oldPass": "",
    "newPass": "",
    "cnewPass": ""
  };
  loading: boolean = false;
  submitted: boolean = false;

  form: FormGroup;

  constructor(private companySetService: CompanySetService,
              private toasterService: ToasterService) {
    this.form = new FormGroup({
      // 定义form.field 是一个区间
      field: new FormControl('', CustomValidators.range([5, 9])),
      // 定义form.num 是数字类型
      num: new FormControl('', CustomValidators.number),
      
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.loading = true;
    this.companySetService.modifyPassword(this.formModify.oldPass, this.formModify.newPass).subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.formModify = {};
          this.toasterService.pop('success','提示','提交成功!');
        } else {
          this.toasterService.pop('error','提示', data.msg);
          this.loading = false;
        }
      },
      error => {
        this.formModify = {};
        this.toasterService.pop('warning','提示','网络错误');
        this.loading = false;
      }
    );
  }
}
