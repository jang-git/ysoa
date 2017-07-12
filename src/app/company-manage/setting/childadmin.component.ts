import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';
import { ToasterService } from 'angular2-toaster';
import { CompanySetService } from '../services/company-set.service';
import { CookieService } from 'ngx-cookie';
@Component({
	selector: 'app-home',
	templateUrl: './childadmin.component.html'
})

export class ChildAdminComponent implements OnInit {

	public modal: NgbModalOptions = {
		backdrop: 'static',
		size: 'sm'
	};
	public member:any;
	public memberList: SelectItem[];
	public user: any;

	loading: boolean = false;
	submitted: boolean = false;

	constructor(private companySetService: CompanySetService,
		private toasterService: ToasterService,
		private modalService: NgbModal) { }


	ngOnInit() {
		this.getMemberList();
	}

	getMemberList() {
		this.companySetService.memberList().subscribe(
			data => {
				console.log(data);
				if (data.status === 0) {
					if(data.data.length > 0){
						this.memberList = [];
						data.data.forEach(element => {
							let label = element.membername;
							let value = element.memberid;
							this.memberList.push({label:label,value:value});
						});
					}
				}
			},
			error => {
				
			}
		)
	}
	open(content) {
		console.log(content);
		// var a = this.modalService.open(content,this.modal);
		// console.log(a);
		// setTimeout(function(){
		// 	a.close();
		// },3000)
		
		this.modalService.open(content,this.modal).result.then((result) => {
			if(result == 'submit'){
				this.addChildAdmin();
			}
			console.log(result);
		}, (reason) => {
			console.log(reason);

		});
	}

	addChildAdmin() {

		console.log(this.member);
	}

}
