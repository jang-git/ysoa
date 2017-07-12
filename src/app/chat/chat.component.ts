import { Component,ElementRef,OnInit } from '@angular/core';
import { AlibaichuanService } from '../service/alibaichuan.service';
import { ContactsCheckService } from '../service/contacts-check.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-main-container',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {

  public expression:boolean = false;
  public contacts:any;
  public defaultCheck:boolean = false;


  public uid: any;
  public localStorage:any;
  public user:any;


  public tribeName : string = ''; //讨论组名称
  public checkedContacts = []; //讨论组成员

  constructor(
    private elementRef: ElementRef,
    public alibaichuanService: AlibaichuanService,
    public contactsCheckService:ContactsCheckService,
    public _cookieService:CookieService) {
    this.user = this._cookieService.getObject('currentUser');
    this.uid  = this.user.cellphone;

    // this.localStorage = JSON.parse(localStorage.getItem("currentUser"));
    // this.uid = this.localStorage.cellphone.toString();
  }

  public loadData(){
    return this.contactsCheckService.getContactsList().subscribe(
      res=>{
        this.contacts = res;
        console.log(res);
        // this.doContactsData(res["data"]);
      },
      error => {console.log(error)},
      () => {}
    );
  }

  ngOnInit() {
    let test = this._cookieService.getAll();

    // this._cookieService.removeAll()
    // let test = this._cookieService.get('t');
    // this._cookieService.put('testkey','stringstring')
    console.log(test);
    // var db = new AngularIndexedDB('testDB', 1);
    // db.createStore(1, (evt) => {
    //     console.log(evt);
    //     let objectStore = evt.currentTarget.result.createObjectStore('people');
    //
    //     // objectStore.createIndex("name", "name", { unique: false });
    //     // objectStore.createIndex("email", "email", { unique: true });
    //
    //
    // }).then(()=>{
    //   db.add('people', { name: '66', email: '66' },4).then(() => {
    //     // Do something after the value was added
    //       alert(1);
    //     }, (error) => {
    //         console.log(error);
    //     });
    // });

    //
    //
    // setTimeout(function(){
    //   db.getByKey('people', 3).then((person) => {
    //       console.log(person);
    //   }, (error) => {
    //       console.log(error);
    //   });
    // },2000)



    // db.getByKey('people', 1).then((person) => {
    //     console.log(person);
    // }, (error) => {
    //     console.log(error);
    // });



    // db.getByKey('people', 1).then((person) => {
    // console.log(person);
    // }, (error) => {
    //     console.log(error);
    // });


  }

  check(contact) {
    // let defaultCheck = false;
    console.log(contact);
    if(contact.ischeck){
      this.checkedContacts = this.checkedContacts.filter(res => res.cellphone !== contact.cellphone);
      contact.ischeck = false;
    }else{
      this.checkedContacts.push(contact);
      contact.ischeck = contact.ischeck ? false : true ;
    }



    console.log(contact.ischeck);
    console.log(this.checkedContacts);
  }
  //delContact
  delContact (tel) {
    this.checkedContacts = this.checkedContacts.filter(res => res.cellphone !== tel);
    let divEle = this.elementRef.nativeElement.querySelector('dd');
    console.dir(divEle);

    this.contacts.forEach(function(value,index){
      value.data.forEach(function(val,key){
        if(val.cellphone == tel){
          val.ischeck = false;
          return ;
        }
      })
    })

  }


  /** 创建讨论组或者修改讨论组成员 */
  createGroup() {
    this.expression = true;
    this.loadData();
  }
  /**
   * 创建讨论组
   * @return  [description]
   */
  createTribe () {
    let tribe_name = this.tribeName ;
    let notice = '公告';
    let userids: string = '';
    let cellphone = [];

    this.checkedContacts.forEach(function(value,index){
      cellphone.push(value.cellphone);
    })
    userids = cellphone.join(',');
    console.log(userids);
    console.log(tribe_name);

    if(tribe_name =="" || cellphone.length === 0) {
      alert('群组名称和群组成员必须选择')
      return ;
    }

    this.alibaichuanService.createTribe(this.uid,tribe_name,notice,userids).subscribe(
      data => {
          if(data.status === 0) {
            // debugger;
            console.log('创建群成功!');
            this.hide();
          }
          if(data.status === 1) {
            alert(data.message);
          }
      },
      error => {
          alert("通讯错误!");

      });
  }
  
  /** 阻止事件冒泡 */
  stopPropagation(event) {
    event.stopPropagation();
  }

  /** 隐藏通讯录选择界面 */
  hide() {
    this.expression = false;
    this.tribeName = '';
    this.contacts.forEach(function(value,index){
      value.data.forEach(function(val,key){
          val.ischeck = false;
          return ;
      })
    });
    this.checkedContacts = [];
  }

}
