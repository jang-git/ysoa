import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../model/project.model';
import { ProjectManageService } from '../services/project-manage.service'
@Component({
	selector: 'project-manage-child.vbox',
	templateUrl: 'project-progress.component.html',
	providers: [
		ProjectManageService
	]
})
export class ProjectProgressComponent implements OnInit {

	projectid: number;
	projectName:string;
	projectStartTime: string;
	projectEndTime: string;

	selectId: number;
	leaderList:any = [];
	taskList: any = [];
	constructor(
		private projectManage: ProjectManageService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.projectid = params["id"];
				this.getProjectInfo(params["id"]);
			}
		)

	}

	/**
	 * 获取项目信息
	 * @param projectid 
	 */
	getProjectInfo(projectid) {
		this.projectManage.infoProject(projectid).subscribe(
			res => {
				console.log(res);
				if (res.status === 0) {
					this.projectName = res.data.name;
					this.projectStartTime = res.data.createtime;
					this.projectEndTime = res.data.closingdate
					this.leaderList = res.data.leaderList;
				}
			}
		)
	}
	/**
	 * 获取项目文件
	 * @param projectid 
	 */
	getTabThree(projectid) {
		this.selectId = 3;
		this.taskList = [];
		// this.projectManage.projectDetail(1,projectid).subscribe(
		//   res=>{
		// 			if(res.status === 0) {//表示操作成功
		//         if(res.data.tasks){
		//           this.taskList = res.data.tasks;
		//         }
		//         else{
		//           this.taskList = [];
		//         }

		//       }
		// 		},
		// 		error => {console.log(error)}
		// )
	}

	back() {
		this.location.back();
	}

}
