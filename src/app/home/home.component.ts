import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AlibaichuanService } from '../service/alibaichuan.service';
import { AuthenticationService } from '../service/authentication.service';
import { CookieService } from 'ngx-cookie';

@Component({
	selector: 'main-container',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	userName: string;
	userCompanyName: string;
	isAdmin: boolean = false;

	public uid: string;
	public appkey: string;
	public credential: string;
	public avatarUrl: string;
	public localStorage: any;
	public user: any;

	constructor(private router: Router,
		public alibaichuanService: AlibaichuanService,
		public authenticationService: AuthenticationService,
		public _cookieService: CookieService) {

		this.user = this._cookieService.getObject('currentUser');

		this.uid = this.user.cellphone;
		this.appkey = environment.alibaichuanAccount.appkey;
		this.credential = this.uid + this.user.uid;

		this.alibaichuanService.login(this.uid, this.appkey, this.credential);


		console.log(this.user);
		this.avatarUrl = this.user.headPortrait;
		this.userName = this.user.membername;
		this.userCompanyName = this.user.companyname;
	}
	ngOnInit() {
		if(this.user.role == 1){
			this.isAdmin = true;
		}
		// this.ng.toaster();
		// this.msgs.push({severity:'su/ccess', summary:'Success Message', detail:'Order submitted'});
		// console.log('下面开始登录并且把最近联系人的数据拿出来');
		// this._toaster.warning('title', 'message', true, 4000);
		// this._toaster.wait('title', 'message', true, 1000);
		// this._toaster.info('title', 'message', true, 30000);
		// this._toaster.success('title', 'message', true, 100000);
		// this._toaster.error('title', 'message123', true, 200000);
	}

	logout() {
		// alert(1);
		window.location.href = "/yanshanpc/"
		// this.router.navigateByUrl('/login');
		// this.router.navigate(['/usercenter/application']);
		// localStorage.removeItem('currentUser');
		this.alibaichuanService.logout();
		this.authenticationService.logout();
	}
}
