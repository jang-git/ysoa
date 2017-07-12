import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ContactsListService } from '../services/contactslist.service';
import { Contacts } from '../model/contacts-list-model';
import { Friend } from '../../model/friend.model';
import { ContactsService } from '../../service/contacts.service';

@Component({
	selector: 'app-contacts-list',
	templateUrl: './contacts.list.component.html'
})
export class ContactsListComponent implements OnInit {
	contact: Contacts[];
	contacts: any;
	selectedContacts: any;
	isFocus: boolean = false;
	isSearching: boolean = false;
	searchContact: any;
	friendList: any;
	public searchText: string;

	public searchTextStream: Subject<string> = new Subject<string>();

	constructor(
		public router: Router,
		public activeRoute: ActivatedRoute,
		public contactslistService: ContactsListService,
		public contactservice: ContactsService
	) {

	}
	searchChanged($event): void {
		// this.searchTextStream.next(this.searchText);
		let txt = this.searchText.trim();
		this.isSearching = txt.length > 0 ? true : false;

		this.searchContact = this.contactservice.find(txt, this.friendList);


		console.log(this.searchContact);
		console.log(txt);
	}


	ngOnInit(): void {
		// this.getContactsList();
		this.loadContactData();
		// this.alert();
		// console.log(this.contactservice.subgroupList);
		// this.activeRoute.params.subscribe(params => {
		// 	// 这里可以从路由里面获取URL参数
		// 	//  console.log(params);
		// 	this.loadData(this.searchText);
		// });


		// this.searchTextStream.debounceTime(500).distinctUntilChanged()
		// 	.subscribe(searchText => {
		// 		//  console.log(this.searchText);
		// 		this.loadData(this.searchText)
		// 	});
	}

	loadContactData() {
		this.contacts = this.contactservice.subgroupList;
		console.log(this.contacts);
		this.friendList = [].concat.apply([], this.contacts.map(function (item) { return item.list; }));
		console.log(this.friendList);
		// this.contactservice.getContactsList().subscribe(
		// 	res => {
		// 		let list = res.data1;
		// 		console.log(list);
		// 		if (list && list.length > 0) {
		// 			for (var i = 0, len = list.length; i < len; i++) {
		// 				this.contactservice.addFriend(new Friend({
		// 					id: list[i].memberid,
		// 					name: list[i].membername,
		// 					imgSrc: list[i].headPortrait =='' ? '' : this.contactservice.httpBaseURL + list[i].headPortrait,
		// 					depardepartmentName: list[i].department.name
		// 				}))
		// 			}
		// 		}

		// 		this.contacts = this.contactservice.subgroupList;
		// 		console.log(this.contacts);
		// 		this.friendList = [].concat.apply([], this.contacts.map(function (item) { return item.list; }));
		// 		console.log(this.friendList);

		// 	}
		// )
	}



	loadData(searchText: string) {
		return this.contactslistService.getContactsList(searchText).subscribe(
			res => {
				// this.contacts = res["data"];

				this.doContactsData(res["data"]);
			},
			error => { console.log(error) },
			() => { }
		);
	}


	doContactsData(data: any) {
		var contactlistdata = new Array();
		var contactlistdataA = new Array();
		var i: number = 0;
		for (var key in data) {
			contactlistdata['name'] = key;
			contactlistdata['data'] = data[key];

			contactlistdataA.push(contactlistdata);
			var contactlistdata = new Array();
		}
		this.contacts = contactlistdataA;
		console.log("看这里啊", contactlistdataA);


	}

	searchFocus(): void {
		this.isFocus = true;
		let input = document.getElementById('searchText').focus();
	}
	delFocus(): void {
		this.isFocus = false;
		this.searchText = '';
	}
	onSelect(contact): void {
		let uid = contact.id;
		this.contactservice.getPersonInfo(uid).subscribe(
			res => {
				if(res.status == 0) {
					this.selectedContacts = {
						"name" : res.data['姓名'],
						"department" : res.data['部门'],
						"imgSrc" : this.contactservice.httpBaseURL + res.data2,
						"telphone" : res.data1,
						"labelList" : res.data
					}
				}
			},
			error => { console.log(error) }
		)
		// this.selectedContacts = contacts;
	}

}
