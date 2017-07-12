import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../model/project.model';
import { ProjectManageService } from '../services/project-manage.service'
@Component({
	selector: 'project-manage-child.vbox',
	templateUrl: 'project-detail.component.html',
	providers: [
		ProjectManageService
	]
})
export class ProjectDetailComponent implements OnInit {
	baseUrl: string;
	projectName: string;
	projectid: number;
	selectId: number;
	leaderList: any = [];
	taskList: any = [];

	fileList: any = [];
	constructor(
		private projectManage: ProjectManageService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.projectid = params["id"];
				this.getTabOne(params["id"]);
			}
		)

		this.baseUrl = this.projectManage.baseURL;

	}

	/**
	 * 获取待办任务列表
	 * @param projectid 
	 */
	getTabOne(projectid) {
		this.selectId = 1;
		this.projectManage.projectDetail(0, projectid).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功
					this.projectName = res.data.projectname;
					this.leaderList = res.data.leaders;
					if (res.data.tasks) {
						this.taskList = res.data.tasks;
					}
					else {
						this.taskList = [];
					}

				}
			},
			error => { console.log(error) }
		)
	}
	/**
	 * 获取已完成任务列表
	 * @param projectid 
	 */
	getTabTwo(projectid) {
		this.selectId = 2;
		this.projectManage.projectDetail(1, projectid).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功

					if (res.data.tasks) {
						this.taskList = res.data.tasks;
					}
					else {
						this.taskList = [];
					}

				}
			},
			error => { console.log(error) }
		)
	}
	/**
	 * 获取项目文件
	 * @param projectid 
	 */
	getTabThree(projectid) {
		this.selectId = 3;
		this.projectManage.fileProject(projectid, 0).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功
					if (res.data) {
						this.fileList = res.data;
					}
					else {
						this.taskList = [];
					}

				}
			},
			error => { console.log(error) }
		)
	}
	/**
	 * 更新任务状态
	 * @param task 
	 */
	changeState(task) {
		let stat = 1;
		if (this.selectId == 2) {
			stat = 0;
		}
		this.projectManage.updateStatusTask(task.id, stat).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功

					if (this.selectId == 1) {
						this.getTabOne(this.projectid);
					}
					if (this.selectId == 2) {
						this.getTabTwo(this.projectid);
					}

				}
			},
			error => { console.log(error) }
		)


	}

	back() {
		this.location.back();
	}


}
