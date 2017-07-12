import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Contacts } from '../model/contacts-list-model';

@Injectable()
export class ContactsListService {
	// public contactsListURL = "src/app/mock-data/contacts-mock.json";
	public contactsListURL = environment.api.contactsUrl;
	public contactsListSearchURL = environment.api.contactsSearchUrl;
	public contactsGrouphURL = environment.api.contactsGrouphUrl;

	public selectedContacts: any;
	public updateSelectedContacts: Subject<any> = new Subject<any>();
	constructor(public http: Http) { }

	public getContactsList(searchText: string): Observable<Contacts[]> {
		let url = this.contactsListURL;
		let params = new URLSearchParams();

		if (searchText) {
			params.set('searchText', searchText);
			url = this.contactsListSearchURL;
			console.log(`searchText=${searchText}`);
		}
		return this.http.get(url, { search: params })
			.map((res: Response) => {
				let result = res.json();
				console.log(result.data);
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}

	public getGroupList(searchText: string): Observable<Contacts[]> {
		let url = this.contactsGrouphURL;
		let params = new URLSearchParams();

		if (searchText) {
			params.set('searchText', searchText);
			url = this.contactsListSearchURL;
			console.log(`searchText=${searchText}`);
		}
		return this.http.get(url, { search: params })
			.map((res: Response) => {
				let result = res.json();
				console.log(result.data);
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}


}
