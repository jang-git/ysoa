import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArchivesComponent } from './archives.component';
import { InitiateGrassComponent } from './initiate-grass/initiate-grass.component';
import { InitiateGrassAddComponent } from './initiate-grass/initiate-grass-add.component';
import { ReceivingRegistrationComponent } from './receiving-registration/receiving-registration.component';
import { ReceivingRegistrationAddComponent } from './receiving-registration/receiving-registration-add.component';

import { DocumentProcessingComponent } from './document-processing/document-processing.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { QueryStatisticsComponent } from './query-statistics/query-statistics.component';
import { ParameterSettingComponent } from './parameter-setting/parameter-setting.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { PrivilegeManagementComponent } from './privilege-management/privilege-management.component';
//Route
const archivesRoutes = [
	{
		path: '',
		component: ArchivesComponent,
		children: [
			{ path: '', redirectTo: 'initiate-grass', pathMatch: 'full' },
			{ path: 'initiate-grass', component: InitiateGrassComponent },
			
			{ path: 'receiving-registration', component: ReceivingRegistrationComponent },
			{ path: 'document-processing', component: DocumentProcessingComponent },
			{ path: 'document-management', component: DocumentManagementComponent },
			{ path: 'query-statistics', component: QueryStatisticsComponent },
			{ path: 'parameter-setting', component: ParameterSettingComponent },
			{ path: 'document-preview', component: DocumentPreviewComponent },
			{ path: 'privilege-management', component: PrivilegeManagementComponent }
			// { path:'**', redirectTo:'chat' }
		]
	},
	{	path: 'initiate-grass-add', component: InitiateGrassAddComponent },
	{	path: 'receiving-registration-add', component: ReceivingRegistrationAddComponent }
];
@NgModule({
	declarations: [
		ArchivesComponent,
		InitiateGrassComponent,
		InitiateGrassAddComponent,
		ReceivingRegistrationComponent,
		ReceivingRegistrationAddComponent,
		DocumentProcessingComponent,
		DocumentManagementComponent,
		QueryStatisticsComponent,
		ParameterSettingComponent,
		DocumentPreviewComponent,
		PrivilegeManagementComponent
	],
	imports: [
		CommonModule,
		
		RouterModule.forChild(archivesRoutes)
	],
	exports: [

	],
	providers: [

	]
})
export class ArchivesModule { }
