import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
//service
import { ContactsListService } from '../contacts/services/contactslist.service';
import { CompanySetService } from '../company-manage/services/company-set.service';
import { AlibaichuanService } from '../service/alibaichuan.service';
import { ThreadsService } from '../service/threads.service';
import { MessagesService } from '../service/messages.service';
import { ContactsCheckService } from '../service/contacts-check.service';
import { ContactsService } from '../service/contacts.service';
import { ChineseCharacter } from '../util/chinese.character';
//chat-part
import { ChatComponent } from '../chat/chat.component';
import { ChatThreadsComponent } from '../chat/chat-threads/chat.threads.component';
import { ChatWindowComponent } from '../chat/chat-window/chat.window.component';
import { ChatWindowDefaultComponent } from '../chat/chat-window/chat.window.default.component';
import { ChatThreadComponent } from '../chat/chat-thread/chat.thread.component';
import { ChatMessageComponent } from '../chat/chat-message/chat.message.component';

//contacts-part
import { ContactsListComponent } from '../contacts/contacts-list/contacts.list.component';
import { ContactsGroupComponent } from '../contacts/contacts-group/contacts.group.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsTreeComponent } from '../contacts/contacts-group/contacts.tree.component';
import { netDiskComponent } from '../netdisk/netdisk.component';

import { setContactComponent } from '../setting/set.contact.component';

//Directive
import { ImgLoadedDirective } from "../_directives/imgload.directive";

//Pipe
import { KeysPipe } from '../util/keys.pipe';
//Shared

//Route
import { homeRoutes } from './home.routes';
@NgModule({
	declarations: [
		HomeComponent,
		ChatComponent,
		ContactsComponent,
		ContactsListComponent,
		ContactsGroupComponent,
		ChatThreadsComponent,
		ChatWindowComponent,
		ChatWindowDefaultComponent,
		ChatThreadComponent,
		ChatMessageComponent,
		ImgLoadedDirective,
		ContactsTreeComponent,
		netDiskComponent,
		setContactComponent,
		KeysPipe
	],
	imports: [
		FormsModule,
		CommonModule,
		NgbModule,
		ToasterModule,
		RouterModule.forChild(homeRoutes)
	],
	exports: [

	],
	providers: [
		ContactsListService,
		AlibaichuanService,
		ThreadsService,
		MessagesService,
		ContactsCheckService,
		CompanySetService,
		ToasterService,
		ContactsService,
		ChineseCharacter
		

	],
	entryComponents: [
		// ContactsTreeComponent
	]
})
export class HomeModule { }
