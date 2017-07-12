import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactsService } from '../../../service/contacts.service';
import { Project } from '../model/project.model';
import { Contact } from '../model/contact.model';
import { ProjectManageService } from '../services/project-manage.service';
import * as moment from 'moment';
// import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;
@Component({
	selector: 'project-manage-child',
	templateUrl: 'project-add.component.html',
	providers: [
		ProjectManageService
	]
})

export class ProjectAddComponent implements OnInit {

	name: string = '';
	desc: string = '';
	endDate: any; //截止时间
	public expression: boolean = false;

	public switch:boolean = false;
	// public contacts: any; //这里是通讯录的数据 属性和结构不可以再改变

	public defaultCheck: boolean = false;
	public checkedContacts = []; //成员
	public chooseSort: number; //选择通讯录的类型 1负责人 2关注人 3项目成员

	public leader: any = []; //负责人
	public projectMember: any = []; //项目成员
	public followMember: any = []; //关注人

	public contactlist: any = [];

	constructor(
		private projectManage: ProjectManageService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
		private contactsService: ContactsService) { }

	ngOnInit() {
		this.contactlist = this.contactsService.subgroupList;

		$('.datetimepicker').datetimepicker({
			step: 10,
			format: 'Y-m-d H:i'
		});
		var that = this;
		$('.datetimepicker').datetimepicker({
			onChangeDateTime: function(dateText, inst) {
				console.log(dateText);
				that.alert();
			}
		});
	}

	project_add() {
		let leaderids = this.leader.map(item=>item.id).join(',');
		let normids = this.projectMember.map(item=>item.id).join(',');
		let followids = this.followMember.map(item=>item.id).join(',');
		//	这里可以考虑 用map 只保留一个参数的方法 然后转换成带逗号的字符串
		// this.leader.forEach(function (value, index) {
		// 	leaderids += value.memberid + ',';
		// })
		// this.projectMember.forEach(function (value, index) {
		// 	getNormids += value.memberid + ',';
		// })
		// this.followMember.forEach(function (value, index) {
		// 	followids += value.memberid + ',';
		// })

		let endDatestring = moment(this.endDate).format('YYYY-MM-DD');

		let JsonData = JSON.stringify(
			{
				name: this.name,
				desc: this.desc,
				closingdate: endDatestring,
				leaderids: leaderids,
				normids: normids,
				followids: followids
			}
		)
		console.log(JsonData);
		this.projectManage.addProject(JsonData).subscribe(
			res => {
				if (res.status === 0) {//表示操作成功
					console.log('添加成功');
					this.back();
				} else {
					console.log(res);
				}
			},
			error => { console.log(error) },
			() => { }
		)

	}

	check(contact) {
		// let defaultCheck = false;
		console.log(contact);
		if (contact.ischeck) {
			this.checkedContacts = this.checkedContacts.filter(res => res.id !== contact.id);
			contact.ischeck = false;
		} else {
			this.checkedContacts.push(contact);
			contact.ischeck = contact.ischeck ? false : true;
		}

		// this.leader = []
		// // let ids = this.followMember.map(item=>item.id).join(',');
		// console.log(this.leader);
		// console.log(this.checkedContacts);
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
	chooseMember(sort: number, checkedlist) {
		this.chooseSort = sort;
		let checkeditem = [];
		if(sort == 1){
			checkeditem = this.leader;
		}
		if(sort == 2) {
			checkeditem = this.followMember;
		}
		if(sort == 3) {
			checkeditem = this.projectMember;
		}

		this.doContacts(checkeditem);
		this.expression = true;
	}

	doContacts(checkedContacts) {
		let res = this.contactlist;
		this.checkedContacts = [];
		// console.log(res);
		for (var i = 0; i < checkedContacts.length; i++) {
			this.checkedContacts.push(checkedContacts[i]);
			for (var k = 0; k < res.length; k++) {
				for (var m = 0; m < res[k].list.length; m++) {
					console.log(res[k].list);
					if (res[k].list[m].id == checkedContacts[i].id) {
						res[k].list[m].ischeck = true;
						break;
					}
				}
			}
		}
	}

	insertEle() {
		let sort = this.chooseSort;
		if (sort == 1) {
			this.leader = this.checkedContacts;
		}
		if (sort == 2) {
			this.followMember = this.checkedContacts;
		}
		if (sort == 3) {
			this.projectMember = this.checkedContacts;
		}

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
		this.location.back();
	}



	alert() {
		console.log('zheli')
	}

	toggle() {
		this.switch = !this.switch;
	}



	
}
