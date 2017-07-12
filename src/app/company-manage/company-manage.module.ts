import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from "ng2-validation";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JasperoSelectModule } from '@jaspero/ng2-select';

import { MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { CompanyManageComponent }  from './company-manage.component';
import { ApplicationComponent } from './application/application.component';
import { OpenComponent } from './application/open.component';
import { CloseComponent } from './application/close.component';
import { MarketComponent } from './application/market.component';
import { SettingComponent } from './setting/setting.component';
import { AdminComponent } from './setting/admin.component';
import { ChildAdminComponent } from './setting/childadmin.component';
import { PasswordComponent } from './setting/password.component';
import { SysLogComponent } from './syslog/syslog.component';
import { AdminLogComponent } from './syslog/adminlog.component';
import { MemberLogComponent } from './syslog/memberlog.component';
import { ContactSetComponent } from './contactset/contactset.component';
import { CompanyManageRoutingModule } from './company-manage-routing.module';


@NgModule({
  imports: [
    CompanyManageRoutingModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    JasperoSelectModule,
    NgbModule.forRoot(),
    MultiSelectModule,
    DropdownModule
    // DatepickerModule.forRoot()
    // BsDropdownModule.forRoot(),
    // ModalModule.forRoot()
  ],
  declarations: [
    CompanyManageComponent,
    ApplicationComponent,
    OpenComponent,
    CloseComponent,
    MarketComponent,
    SettingComponent,
    AdminComponent,
    PasswordComponent,
    SysLogComponent,
    AdminLogComponent,
    MemberLogComponent,
    ContactSetComponent,
    ChildAdminComponent
  ],
  providers: [
  ],
  entryComponents:[

  ]
})
export class CompanyManageModule { }
