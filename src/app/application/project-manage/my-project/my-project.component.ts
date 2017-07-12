import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManageService } from '../services/project-manage.service';
import { Project } from '../model/project.model';
import { NgLayer, NgLayerRef, NgLayerComponent } from '../../../shared/ng-layer.service';
@Component({
	selector: 'project-manage-child',
	templateUrl: 'my-project.component.html',
	providers: [
		ProjectManageService
	]
})
export class MyProjecComponent implements OnInit {
	// @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
	public isModalShown: boolean = false;
	public searchTextStream: Subject<string> = new Subject<string>();

	searchText: string = '';
	isSelected: number;
	closeResult: string;
	projectList: Project[] = [];
	projectModal: Project; // 这里是针对模态框的数据

	config: any = {
		inSelector: "fadeInUp",
		outSelector: "fadeOutDown",
		title: "友情提示",
		align: "top",
		parent: this,
		closeAble: false,
		onOk: false
	}

	constructor(public projectManage: ProjectManageService,
		public modalService: NgbModal,
		public ly: NgLayer) {
	}

	ngOnInit() {
		// this.alert();
		this.loadProject(0);

		this.searchTextStream.debounceTime(500).distinctUntilChanged()
			.subscribe(searchText => {
				//  console.log(this.searchText);
				this.loadProject(this.searchText)
			});
	}

	confirm(project) {
		var res = this.ly.confirm(this.config);
		res.setTitle('删除');
		res.setMessage('确定要删除该项目吗？');
		res.ok(() => {
			this.deleteProject(project);
			console.log('点击了确定按钮');
			return true;
		})
	}

	confirmT(project) {
		var res = this.ly.confirm(this.config);
		res.setTitle('归档');
		res.setMessage('确定要归档该项目吗？');
		res.ok(() => {
			this.stateProject(project, 1);
			return true;
		})
	}
	confirmC(project) {
		var res = this.ly.confirm(this.config);
		res.setTitle('重启');
		res.setMessage('确定要重启该项目吗？');
		res.ok(() => {
			this.stateProject(project, 0);
			return true;
		})
	}

	loadProject(state) {
		if (this.isSelected === state) return;
		this.projectList = [];
		this.searchText = '';
		this.getProject(state);
	}

	searchProject() {
		let state = this.isSelected;
		let searchText = this.searchText;
		this.projectManage.getProjectList(searchText, state).subscribe(
			res => {
				this.projectList = res['data'].objects;
				// console.log(res['data'].objects);
			},
			error => { console.log(error) },
			() => { }
		)
	}
	/**
	 * 获取项目列表
	 * @param state 
	 */
	getProject(state) {
		this.isSelected = state;
		this.projectManage.getProjectList('', state).subscribe(
			res => {
				this.projectList = res['data'].objects;
				console.log(res['data'].objects);
				// this.doContactsData(res["data"]);
			},
			error => { console.log(error) },
			() => { }
		)
	}
	/**
	 * 删除项目
	 * @param project 
	 */
	deleteProject(project) {
		let projectId = project.id;
		console.log(projectId);
		this.projectManage.deleteProject(projectId).subscribe(
			res => {
				console.log(res);
				if (res.status === 0) {
					this.getProject(this.isSelected);
				}
			},
			error => {
				console.log(error)
			}
		)
	}
	/**
	 * 项目状态
	 * @param project 
	 */
	stateProject(project, status) {
		let projectId = project.id;
		let state = status;
		this.projectManage.stateProject(projectId, state).subscribe(
			res => {
				console.log(res);
				if (res.status === 0) {
					this.getProject(this.isSelected);
				}
			},
			error => {
				console.log(error)
			}
		)
	}
	/**
	 * 导出项目数据
	 * @param project 
	 */
	exportData(project) {
		let baseUrl = this.projectManage.baseURL;
		this.projectManage.exportData(project.id).subscribe(
			res => {
				console.log(res);
				if (res.status === 0) {
					let url = res.data.url;
					// window.location.href = baseUrl + url;
					window.open(baseUrl + url);
				}
			}
		)
	}

	/**
	 * 项目信息展示
	 * @param project 
	 * @param content 
	 */
	project_show(project, content) {
		this.projectModal = new Project();
		this.projectManage.infoProject(project.id).subscribe(
			res => {
				console.log(res);
				if (res.status === 0) {
					this.projectModal = res.data;
				}
			}
		)
		this.modalService.open(content).result.then((result) => {
			
		}, (reason) => {
			
		});
	}

	onHidden(): void {
		this.isModalShown = false;
		this.projectModal = new Project();
	}


}
