import { Component } from '@angular/core';

@Component({
    selector: 'app-home.vbox',
    template: `<div class="row-row">
        <div class="cell" style="overflow-y:hidden;">
            <div class="cell-inner">
            <iframe style="width:100%;height:100%; border:none;" src="http://ysoa.qiban.com/qiban-activity/activity/index.jhtml" border="none"></iframe>
            </div>
        </div>
      </div>`

})

export class ActivityComponent {

    constructor() {

    }

    ngOnInit() {

    }
}
