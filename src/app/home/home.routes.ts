import { HomeComponent } from './home.component';
import { ChatComponent } from '../chat/chat.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { setContactComponent }  from '../setting/set.contact.component';
import { ContactsListComponent } from '../contacts/contacts-list/contacts.list.component';
import { ContactsGroupComponent } from '../contacts/contacts-group/contacts.group.component';
import { ChatWindowComponent } from '../chat/chat-window/chat.window.component';
import { ChatWindowDefaultComponent } from '../chat/chat-window/chat.window.default.component';
import { netDiskComponent } from '../netdisk/netdisk.component';
import { AuthGuard } from '../shared/guard/auth.guard';

export const homeRoutes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'chat', pathMatch: 'full' },
			{
				path: 'chat', component: ChatComponent,
				children: [
					{ path: '', component: ChatWindowDefaultComponent },
					{ path: ':uid/:nickname/:type', component: ChatWindowComponent, data: { param1: "routedata " } },
					{ path: ':uid/:nickname/3', redirectTo: '/chat' }
				]
			},
			{
				path: 'contacts', component: ContactsComponent,
				children: [
					{ path: '', redirectTo: 'list' },
					{ path: 'list', component: ContactsListComponent },
					{ path: 'group', component: ContactsGroupComponent },
				]
			},
			{
				path: 'application',
				loadChildren: '../application/application.module#ApplicationModule'
			},
			{
				path: 'company-manage',
				loadChildren: '../company-manage/company-manage.module#CompanyManageModule'
			},
			{
				path: 'netdisk', component: netDiskComponent
			},
			{
				path: 'setting/contacts', component: setContactComponent
			}
			// { path:'**', redirectTo:'chat' }
		]
	}
];
