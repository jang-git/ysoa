import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, TooltipModule, FileUploadModule } from 'primeng/primeng';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationComponent } from './application.component';
import { ProjecManageComponent } from './project-manage/project-manage.component';
import { MyProjecComponent } from './project-manage/my-project/my-project.component';
import { MyTaskComponent } from './project-manage/my-task/my-task.component';
import { ProjecStaticsComponent } from './project-manage/project-statics/project-statics.component';
import { ProjectAddComponent } from './project-manage/project-add/project-add.component';
import { TaskAddComponent } from './project-manage/task-add/task-add.component';
import { ProjectDetailComponent } from './project-manage/project-detail/project-detail.component';
import { TaskDetailComponent } from './project-manage/task-detail/task-detail.component';
import { ActivityComponent } from './project-manage/activity/activity.component';
import { ProjectProgressComponent } from './project-manage/project-progress/project-progress.component';
import { NgLayer, NgLayerRef, NgLayerComponent } from '../shared/ng-layer.service';
import { BbsComponent } from './project-manage/bbs/bbs.component';


const ApplicationRoutes: Routes = [
	{
		path: '', component: ApplicationComponent,
		children: [
			{ path: '', redirectTo: 'project-manage', pathMatch: 'full' },
			{ path: 'activity', component: ActivityComponent },
			{ path: 'archives', loadChildren: '../archives/archives.module#ArchivesModule' },
			{ path: 'bbs', component: BbsComponent },
			{ path: 'project-manage/project-add', component: ProjectAddComponent },
			{ path: 'project-manage/task-add/:pid', component: TaskAddComponent },
			{ path: 'project-manage/project-detail/:id', component: ProjectDetailComponent },
			{ path: 'project-manage/project-progress/:id', component: ProjectProgressComponent },
			{ path: 'project-manage/task-detail/:id/:pid', component: TaskDetailComponent },
			{
				path: 'project-manage', component: ProjecManageComponent,
				children: [
					{ path: '', redirectTo: 'my-project', pathMatch: 'full' },
					{ path: 'my-project', component: MyProjecComponent },
					{ path: 'my-task', component: MyTaskComponent },
					{ path: 'project-statics', component: ProjecStaticsComponent },
					{ path: '**', redirectTo: 'my-project' }
				]
			}

		]
	},
	{
		path: '**', redirectTo: "my-task"
	}
];
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CalendarModule,
		FileUploadModule,
		TooltipModule,
		RouterModule.forChild(ApplicationRoutes)
	],
	declarations: [
		ApplicationComponent,
		ProjecManageComponent,
		MyProjecComponent,
		MyTaskComponent,
		ProjecStaticsComponent,
		ProjectAddComponent,
		ProjectDetailComponent,
		TaskDetailComponent,
		ProjectProgressComponent,
		TaskAddComponent,
		NgLayerComponent,
		ActivityComponent,
		BbsComponent
	],
	providers: [
		NgLayer
	],
	entryComponents: [
		NgLayerComponent,
		//  DialogComponent
	]
})
export class ApplicationModule { }
