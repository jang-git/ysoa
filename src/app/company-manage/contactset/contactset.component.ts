import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Label } from './label-model';
import { CompanySetService } from '../services/company-set.service';
import { ToasterService } from 'angular2-toaster';

@Component({
	selector: 'app-home.vbox',
	templateUrl: './contactset.component.html'
})
export class ContactSetComponent implements OnInit {

	public labelList: Label[] = [];
	public label: Label = new Label();
	// public labelList: Label[] = [
	//   {'id': 1, "name": "姓名", "disabled": true, "selected":true, "delForbidden":true },
	//   {'id': 2, "name": "部门", "disabled": true, "selected":true, "delForbidden":true },
	//   {'id': 3, "name": "职位", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 4, "name": "工号", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 5, "name": "手机号", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 6, "name": "性别", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 7, "name": "入职时间", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 8, "name": "分机号", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 9, "name": "办公地点", "disabled": false, "selected":false, "delForbidden":true },
	//   {'id': 10, "name": "备注", "disabled": false, "selected":false, "delForbidden":true }
	// ];

	constructor(private companySetService: CompanySetService,
		private toasterService: ToasterService) {
	}

	ngOnInit() {
		this.addLables();

	}
	/**
	 * 移除标签
	 * @param id 标签ID
	 */
	removeLabel(id) {
		this.companySetService.removeLabel(id).subscribe(
			data => {
				if (data.status === 0) {
					this.labelList = this.labelList.filter(label => label.id !== id);
				} else {
					alert(data.msg);
				}
			},
			error => {
				alert('网络错误');
			}
		)
	}
	/**
	 * 获取标签添加到已有标签列表里
	 */
	addLables() {

		this.companySetService.labelList().subscribe(
			data => {
				console.log(data);
				if (data) {
					data.forEach(label => {
						let lab = new Label();
						lab.id = label.id;
						lab.name = label.name;
						if (label.checked === true) {
							lab.selected = true;
						}
						if (label.def == 0) {
							lab.delForbidden = true;
						}
						if (label.id < 3) {
							lab.disabled = true;
						}
						this.labelList.push(lab);
					});
				}
			},
			error => {
				this.toasterService.pop('error', '提示', '网络错误');
			}
		)
	}
	/**
	 * 添加标签
	 */
	addLabel() {

		if (!this.label.name) {
			return;
		}
		this.companySetService.inserLabel(this.label.name).subscribe(
			data => {
				if (data.status === 0) {
					this.label.id = data.data.id;
					this.labelList.push(this.label);
					this.label = new Label();
				} else {
					this.toasterService.pop('warning', '提示', '数据错误');
				}
			},
			error => {
				this.toasterService.pop('warning', '提示', '网络错误');
			}
		)
	}

	check(id) {

	}
	showSuccess() {

	}
	updateLabelShow() {
		let str;
		let checklist = [];
		this.labelList.forEach(function (value, index) {
			if (value.selected) {
				checklist.push(value.id);
			}

		})
		str = checklist.join(',');
		if (str) {
			this.companySetService.showLabel(str).subscribe(
				data => {
					console.log(data);
					if (data.status === 0) {
						// this._toaster.error('提示', data.msg, true, 3000);
						this.toasterService.pop('success', '提示', data.msg);
					} else {
						this.toasterService.pop('error', '提示', data.msg);
					}
				},
				error => {
					this.toasterService.pop('warning', '提示', '网络错误');
				}
			)
		}
	}
}
