import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ContactsService } from '../../../service/contacts.service';
import { Task } from '../model/task.model';
import { ProjectManageService } from '../services/project-manage.service'
@Component({
	selector: 'project-manage-child.vbox',
	templateUrl: 'task-add.component.html',
	providers: [
		ProjectManageService
	]
})
export class TaskAddComponent implements OnInit {
	id: number;

	projectId: number;
	public expression: boolean = false;

	public defaultCheck: boolean = false;
	public checkedContacts = []; //成员
	public contactlist: any = [];
	name: string = ''; //任务名称
	endDate: any; //任务截止时间
	executorids: any = []; //执行人列表
	desc: string = ""; //描述
	level: number = 0; //优先级

	constructor(
		private projectManage: ProjectManageService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
		private contactsService: ContactsService) { }

	ngOnInit() {
		this.contactlist = this.contactsService.subgroupList;
		this.route.params.subscribe(
			params => {
				this.projectId = params["pid"];
			}
		)
	}
	/**
	 * 添加任务
	 */
	addTask() {
		let executorids = this.executorids.map(item=>item.id).join(',');
		let date = moment(this.endDate).format('YYYY-MM-DD HH:mm');
		console.log(executorids);
		let task = {
			"name": this.name, //任务名称
			"level": this.level, //优先级
			"executorids": executorids,//成员IDS
			"closingdate": date,//截止时间
			"desc": this.desc,//任务描述
			"pid": "0",//父ID，默认填0
			"projectid": this.projectId //所属项目
		};
		console.log(task);
		this.projectManage.addTask(task).subscribe(
			res => {
				console.log(res);
				if (res.status == 0) {
					this.location.back();
				} else {
					
				}

			},
			error => {
				console.log(error)
			}
		)
	}

	check(contact) {
		if (contact.ischeck) {
			this.checkedContacts = this.checkedContacts.filter(res => res.id !== contact.id);
			contact.ischeck = false;
		} else {
			this.checkedContacts.push(contact);
			contact.ischeck = contact.ischeck ? false : true;
		}
	}
	//delContact
	delContact(id) {
		this.checkedContacts = this.checkedContacts.filter(res => res.id !== id);
		this.contactlist.forEach(function (value, index) {
			value.list.forEach(function (val, key) {
				if (val.id == id) {
					val.ischeck = false;
					return;
				}
			})
		})

	}

	/** 
	 * 选择成员
	 */
	chooseMember() {
		let checkeditem = [];
		checkeditem = this.executorids;
		this.doContacts(checkeditem);
		this.expression = true;
	}

	doContacts(checkedContacts) {
		let res = this.contactlist;
		this.checkedContacts = [];
		for (var i = 0; i < checkedContacts.length; i++) {
			this.checkedContacts.push(checkedContacts[i]);
			for (var k = 0; k < res.length; k++) {
				for (var m = 0; m < res[k].list.length; m++) {
					if (res[k].list[m].id == checkedContacts[i].id) {
						res[k].list[m].ischeck = true;
						break;
					}
				}
			}
		}
	}

	insertEle() {
		this.executorids = this.checkedContacts;
		this.hide();
	}
	/** 
	* 阻止事件冒泡
	*/
	stopPropagation(event) {
		event.stopPropagation();
	}

	/** 隐藏通讯录选择界面 */
	hide() {
		this.expression = false;
		this.contactlist.forEach(function (value, index) {
			value.list.forEach(function (val, key) {
				val.ischeck = false;
				return;
			})
		});
		this.checkedContacts = [];
	}
	back() {
		// this.router.navigate(['../my-project'],{relativeTo: this.route}); 
		this.location.back();
	}


}
