import { Component, OnInit } from '@angular/core';
import { CompanySetService } from '../services/company-set.service';
@Component({
	selector: 'app-home',
	templateUrl: './close.component.html'
})
export class CloseComponent implements OnInit {
	appliactionList: any = [];
	baseUrl: string;
	constructor(private cs: CompanySetService) {

	}

	ngOnInit() {
		this.baseUrl = this.cs.baseUrl;
		this.applicationList();
	}

	applicationList() {
		this.cs.applicationList(0).subscribe(
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
	 * 开启应用
	 * @param id 
	 */
	openApp(id) {
		this.cs.openApplication(id).subscribe(
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
