import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Subject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { Group } from '../model/group.model';
import { Subgroup } from '../model/subgroup.model';
import { Friend } from '../model/friend.model';
import { Contact } from '../model/contact.model';
import { ChineseCharacter } from '../util/chinese.character';

@Injectable()
export class ContactsService {

	public groupList: Group[] = [];
	public subgroupList: Subgroup[] = [];
	public contactsListURL = environment.api.contactsUrl;
	public httpBaseURL = environment.api.baseURL;
	public personInfoUrl = environment.api.personInfoUrl;
	constructor(private chinesecharacter: ChineseCharacter,
		private http: Http) {

		this.getContactsList().subscribe(
			res => {
				let list = res.data1;
				console.log(list);
				if (list && list.length > 0) {
					for (var i = 0, len = list.length; i < len; i++) {
						this.addFriend(new Friend({
							id: list[i].memberid,
							name: list[i].membername,
							imgSrc: list[i].headPortrait == '' ? '' : this.httpBaseURL + list[i].headPortrait,
							depardepartmentName: list[i].department.name
						}))
					}
				}



			}
		)

	}
	/**
	 * 获取通讯录列表(不需要参数)
	 */
	getContactsList() {
		let url = this.contactsListURL;
		return this.http.get(url)
			.map((res: Response) => {
				console.log(res);
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 获取会员信息
	 * @param id 会员ID
	 */
	getPersonInfo(id) {
		let url = this.personInfoUrl;
		let params = new URLSearchParams();
		params.set('id', id);

		return this.http.get(url, { search: params })
			.map((res: Response) => {
				console.log(res);
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}

	quickGetFriend(id: string, firstchar: string) {
		for (var i = 0, slen = this.subgroupList.length; i < slen; i++) {
			var list = this.subgroupList[i].list;
			if (this.subgroupList[i].title == firstchar) {
				for (var j = 0, flen = list.length; j < flen; j++) {
					if (list[j].id == id) {
						return list[j];
					}
				}
			}
		}
		return null;
	}


	addFriend(friend: Friend) {
		var obj = this.chinesecharacter.convertToABC(friend.name);
		var f = this.chinesecharacter.getPortraitChar(friend.name);
		friend.setpinying({ pinyin: obj.pinyin, everychar: obj.first, firstchar: f });
		f = this.chinesecharacter.getPortraitChar2(friend.name);

		if (!this.quickGetFriend(friend.id, f)) {
			for (var i = 0, len = this.subgroupList.length; i < len; i++) {
				if (this.subgroupList[i].title == f) {
					this.subgroupList[i].list.push(friend);
					return friend;
				}
			}
			this.subgroupList.push(new Subgroup(f, [friend]));
			this.subgroupList.sort(function (a: Subgroup, b: Subgroup) { return a.title.charCodeAt(0) - b.title.charCodeAt(0); });
			return friend;
		}
	}

	find(str: string, arr: Contact[]) {
		var num = /^[0-9]+$/, abc = /^[a-zA-Z]+$/, reg = /^[0-9a-zA-Z\-]+$/;
		var str = str.trim();
		var newArr = <Contact[]>[];

		if (reg.test(str)) {
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i];
				if (item.everychar.toLowerCase().indexOf(str.toLowerCase()) !== -1 || item.pinyin.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
					newArr.push(item);
				}
			}
		} else if (str !== "") {
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i];
				if (item.name.indexOf(str) !== -1) {
					newArr.push(item);
				}
			}
		}
		return newArr;
	}
}
