import { Component, OnInit} from '@angular/core';

import { ContactsListService } from './services/contactslist.service';

import { Contacts } from './model/contacts-list-model';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  	constructor(

    ) {
      
    }

    ngOnInit() : void {

    }

    onSelect(contacts: Contacts) : void {
      // this.selectedContacts = contacts;
    }




}
