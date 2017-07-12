import { Component, OnInit } from '@angular/core';
import { CompanySetService } from '../services/company-set.service';
@Component({
	selector: 'app-home',
	templateUrl: './open.component.html'
})
export class OpenComponent implements OnInit {
	appliactionList:any = [];
	baseUrl: string;
	constructor(private cs:CompanySetService) {
		
	}

	ngOnInit() {
		this.baseUrl = this.cs.baseUrl;
		this.applicationList();
	}

	applicationList() {
		this.cs.applicationList(1).subscribe(
			res => {
				if (res.status === 0) {
					this.appliactionList = res.data;
				}
			},
			error => {
				
			}
		)
	}
	/**
	 * 停用应用
	 * @param id 
	 */
	closeApp(id) {
		this.cs.closeApplication(id).subscribe(
			res => {
				if (res.status === 0) {
					this.applicationList();
				}
			},
			error => {
				
			}
		)
	}
}
