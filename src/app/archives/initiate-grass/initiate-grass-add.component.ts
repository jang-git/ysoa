import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
	selector: 'main-container.vbox',
	templateUrl: './initiate-grass-add.component.html'
})
export class InitiateGrassAddComponent {

	constructor(private location: Location){

	}
	

	back() {
		this.location.back();
	}
}
