import { Component, OnInit } from '@angular/core';
import { ProjectManageService } from '../services/project-manage.service'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Task } from '../model/task.model';
@Component({
	selector: 'project-manage-child',
	templateUrl: 'my-task.component.html',
	providers: [
		ProjectManageService
	]
})
export class MyTaskComponent implements OnInit {
	searchText: string = '';
	isSelected: number;

	taskList: Task[] = [];
	taskModel: Task; // 这里是针对模态框的数据
	public searchTextStream: Subject<string> = new Subject<string>();
	constructor(private projectManage: ProjectManageService) { }

	ngOnInit() {
		this.loadTask(0);

		this.searchTextStream.debounceTime(500).distinctUntilChanged()
			.subscribe(searchText => {
				//  console.log(this.searchText);
				this.loadTask(this.searchText)
			});

	}


	loadTask(state) {
		if (this.isSelected === state) return;
		this.taskList = [];
		this.searchText = '';
		this.getTask(state);
	}

	searchTask() {
		let state = this.isSelected;
		let searchText = this.searchText;
		this.projectManage.getProjectList(searchText, state).subscribe(
			res => {
				this.taskList = res['data'].objects;
				// console.log(res['data'].objects);
			},
			error => { console.log(error) },
			() => { }
		)
	}

	/**
	 * 获取任务列表
	 * @param state 
	 */
	getTask(state) {
		this.isSelected = state;
		this.projectManage.myTask(state).subscribe(
			res => {
				this.taskList = res['data'].tasks;
				console.log(res['data'].tasks);
				// this.doContactsData(res["data"]);
			},
			error => { console.log(error) },
			() => { }
		)
	}
	/**
	 * 更新任务状态
	 * @param state 
	 */
	changeState(task) {
		let stat = 1;
		if (this.isSelected == 1) {
			stat = 0;
		}
		this.projectManage.updateStatusTask(task.id, stat).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功
					this.getTask(this.isSelected);
				}
			},
			error => { console.log(error) }
		)
	}


}
