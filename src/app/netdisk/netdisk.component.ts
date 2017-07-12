import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="app-content"> <iframe style="width:100%;height:100%; border:none;" src="http://ysoa.qiban.com/netdisc/index.jhtml" border="none"></iframe> </div>`
  
})

export class netDiskComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit() {

  }
}
