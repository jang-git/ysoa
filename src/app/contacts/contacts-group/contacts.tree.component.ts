import { Component,Input,OnInit ,Output, EventEmitter} from '@angular/core';
import { ContactsListService } from '../services/contactslist.service';

@Component({
  selector: 'object-view',
  template: `
    <ul>
      <li class="openBig" *ngFor="let list of object; let i=index" [class.openBiga]="list.open">

        <div class="folder" *ngIf="hasChildren(list)" [class.open]="list.open" >
           <span class="toggler"></span> <a (click)="open(list)">{{list.name}}</a>
        </div>
        <ul *ngIf="list.corpationMemberList" >
          <li *ngFor="let m of list.corpationMemberList" (click)="onSelect(m)">
            
              <span class="tongxunlu-label pull-right">{{m.department.name}}</span>
              <span class="tongxunlu-avatar">{{m.fullpinyin | slice:0:[2] | uppercase}}</span>
              <span class="tongxunlu-name">{{ m.membername }}</span>
            
          </li>
        </ul>
        
        <div class="second" *ngIf="hasDepartment(list)">
          <object-view [object]="getValue(list)"></object-view>
        </div>
      </li>
    </ul>
  `,

})

export class ContactsTreeComponent{
  
  @Input() object: any;
  @Output() change = new EventEmitter();

  constructor(public contactslistService: ContactsListService
    ) {

    }

  hasChildren(list) {
    // console.log(list);
    if(list.corpationMemberList) {
      return true;
    }
    return false;
  }

  hasDepartment (list) {
    if(list.departmentList && list.departmentList.length > 0) {
      return true;
    }
    return false;
  }

  private getValue(list): any {
    return list.departmentList;
  }
  
  open(list){
    // alert(1);
    // console.log(list);
    list.open = !list.open;

    return !!list.open;

  }

  onSelect(m) {
    this.contactslistService.selectedContacts = m;
    this.contactslistService.updateSelectedContacts.next('update');
    // this.change.emit(m);
  }
}
