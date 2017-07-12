import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyManageComponent } from './company-manage.component';
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
const routes: Routes = [
    {
        path: '', component: CompanyManageComponent,
        children: [
    			// { path: '', redirectTo:'project-manage',pathMatch:'full'},
    			{ path: 'application', component: ApplicationComponent,
    				children:[
    					{ path:'', redirectTo:'open',pathMatch:'full'},
    					{ path:'open', component: OpenComponent},
    					{ path:'close', component: CloseComponent },
    					{ path:'market', component: MarketComponent},
                        { path:'**', redirectTo: 'open'}
    				]
    		 	},
                { path: 'syslog', component: SysLogComponent,
    				children:[
    					{ path:'', redirectTo:'adminlog',pathMatch:'full'},
    					{ path:'adminlog', component: AdminLogComponent},
    					{ path:'memberlog', component: MemberLogComponent },
                        { path:'**', redirectTo: 'adminlog'}
    				]
    		 	},
                { path: 'contactset', component: ContactSetComponent},
                { path: 'setting', component: SettingComponent,
    				children:[
    					{ path:'', redirectTo:'password',pathMatch:'full'},
    					{ path:'admin', component: AdminComponent},
    					{ path:'password', component: PasswordComponent },
    					{ path:'childadmin', component: ChildAdminComponent },
                        { path:'**', redirectTo: 'password'}
    				]
    		 	}
                
        ]
    },
    {
        // path: '**', redirectTo: "company-manage"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyManageRoutingModule { }
