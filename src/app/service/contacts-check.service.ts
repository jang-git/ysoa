import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { Contacts } from '../../model/contacts-list-model';

@Injectable()
export class ContactsCheckService {
    public contactsListURL = environment.api.contactsUrl;
    public contactsListSearchURL = environment.api.contactsSearchUrl;

    constructor(private http: Http) { }
    //获取通讯录列表
    getContactsList(){
      let url = this.contactsListURL;

      return this.http.get(url)
          .map((res: Response) => {
              let result = res.json();
              // console.log(result.data);
              return this.updateContacts(result.data);
              // return result;
            })
          .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    //处理后台传来的数据
    updateContacts(data) {
      console.log(data);
      let contactlistdata_temp = [];
      let contactlistdata = [];

      for(var key in data) {
        contactlistdata_temp['name'] = key;
        contactlistdata_temp['data'] = data[key];

        contactlistdata.push(contactlistdata_temp);
        contactlistdata_temp = [];
      }

      return contactlistdata;
      // this.contacts = contactlistdataA;
      // console.log("看这里啊",contactlistdata);
    }






}
