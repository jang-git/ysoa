import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../model/task.model';
import { ProjectManageService } from '../services/project-manage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'project-manage-child.vbox',
	templateUrl: 'task-detail.component.html',
	providers: [
		ProjectManageService
	]
})
export class TaskDetailComponent implements OnInit {

	id: number;
	projectId: number;
	subTaskEdit: boolean = true; //

	taskName: string = ''; //任务名称
	executorids: any = []; //执行人列表
	taskLogList: any = []; //任务日志
	subTaskList: any = []; //子任务列表
	reminddate: string = ''; //提醒日期
	closingdate: string = ''; //截止日期
	desc: string = ""; //描述
	level: number = 0; //优先级

	taskContent: string; //子任务content

	taskModal: any; //子任务Modal

	fileList: any = []; //文件列表

	newSubTask: any; //新增任务的模型
	constructor(
		private projectManage: ProjectManageService,
		private location: Location,
		public modalService: NgbModal,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.id = params["id"]; //任务ID
				this.projectId = params["pid"]; //项目ID

				this.loadTaskinfo(this.id, this.projectId);
				this.loadSubTaskinfo(this.id);
				this.loadFileList(this.projectId,this.id);
			}
		)

	}
	/**
	 * 获取任务信息
	 * @param id 
	 * @param projectId 
	 */
	loadTaskinfo(id, projectId) {
		this.projectManage.taskInfo(id, projectId).subscribe(
			res => {
				console.log(res);
				if (res.status == 0) {

					if (res['data']) {

						this.taskName = res['data'].name || '';
						this.closingdate = res['data'].closingdate || '';
						this.reminddate = res['data'].reminddate || '';
						this.level = res['data'].level || 0;
						this.desc = res['data'].desc || '';
						this.taskLogList = res['data'].taskLogList;
						this.executorids = res['data'].executors;

					}
				} else {
					this.location.back();
				}

			},
			error => {
				console.log(error)
			}
		)
	}
	/**
	 * 获取子任务列表
	 * @param id 
	 */
	loadSubTaskinfo(id) {
		this.projectManage.getSubTask(id).subscribe(
			res => {
				console.log(res);
				if (res.status == 0) {
					this.subTaskList = res.data.tasks;
				}
			},
			error => {
				console.log(error)
			}
		)
	}
	//切换显示
	toggleTask() {
		this.subTaskEdit = false;
		this.newSubTask = {
			"name": "",
			"executorids": "",
			"closingdate": "",
			"pid": this.id,//父任务ID，默认填0
			"projectid": this.projectId //所属项目
		}

		
	}

	cancel() {
		this.subTaskEdit = true;

	}
	//新增子任务
	save() {
		
		let task = {
			"name": this.taskContent, //任务名称
			// "level": this.level, //优先级
			"executorids": "51",//成员IDS
			"closingdate": "2017-06-30 18:30",//截止时间
			// "desc": this.desc,//任务描述
			"pid": this.id,//父任务ID，默认填0
			"projectid": this.projectId //所属项目
		};
		this.projectManage.addTask(this.newSubTask).subscribe(
			res => {
				console.log(res);
				if (res.status == 0) {
					this.subTaskList = this.loadSubTaskinfo(this.id);
				}
			},
			error => {
				console.log(error)
			}
		)

	}
	//删除子任务
	delSubTask(task) {
		let id = task.id;

		this.projectManage.deleteTask(id, this.projectId).subscribe(
			res => {
				if (res.status == 0) {
					this.loadSubTaskinfo(this.id);
				}
			},
			error => {
				console.log(error)
			}
		)

	}

	/**
	 * 子任务信息展示
	 * @param project 
	 * @param content 
	 */
	subTask_show(task, content) {
		this.taskModal = task;
		
		this.modalService.open(content).result.then((result) => {

		}, (reason) => {

		});
	}
	/**
	 * 获取任务文件列表
	 * @param projectId 
	 * @param taskid 
	 */
	loadFileList(projectId, taskid) {
		this.projectManage.fileProject(projectId, taskid).subscribe(
			res => {
				if (res.status == 0) {
					this.fileList = res.data;
				}
			},
			error => {
				console.log(error)
			}
		)
	}
	/**
	 * 删除附件
	 * @param file 
	 */
	del(file){
		let taskid = file.id;
		this.projectManage.deleteFile(taskid).subscribe(
			res => {
				if (res.status == 0) {
					this.loadFileList(this.projectId, this.id);
				}
			},
			error => {
				console.log(error)
			}
		)
	}
	/**
	 * 上传附件成功后的处理事件
	 * @param event 
	 */
	uploaded(event) {
		this.loadFileList(this.projectId, this.id);
	}
	//post 附带的参数
	postParameters(event) {
		console.log(event);
		event.formData.set('id',this.id);
		event.formData.set('projectid',this.projectId);
	}


	back() {
		// this.router.navigate(['../my-project'],{relativeTo: this.route}); 
		this.location.back();
	}

	


}
