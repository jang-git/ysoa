import { Component, OnInit } from '@angular/core';

import { NgLayer, NgLayerRef, NgLayerComponent  } from '../../shared/ng-layer.service';


@Component({
  selector: 'project-manage.vbox',
  templateUrl: 'project-manage.component.html',
})
export class ProjecManageComponent implements OnInit {
  constructor(private ly:NgLayer) {   }

  ngOnInit() {}

  config:any = {
      inSelector:"fadeInUp",
      outSelector:"fadeOutDown",
      title:"归档",
      align:"top",
      parent: this,
      // dialogComponent:DialogComponent,
      closeAble: false,
      // ok: this.ok(),
      onOk: false
  }
  confirm(){
        var res = this.ly.confirm(this.config);
        // this.l.ok()
        // res.onOk = false;
        // res.layer.onOk = this.ok();
        res.setMessage('确定要删除吗？');
        res.ok( ()=> {
          // alert('确定删除按钮');
          console.log('点击了确定按钮');
          return true;
        })
        // res.cancel( ()=> {
        //   // alert('取消按钮');
        //   return true;
        // })
        // res.ok()
        console.dir(res.ok);
        console.log(res.ok)
        
    }

  dialog(){
      this.ly.dialog(this.config);
  }

  loading(){
      let tip = this.ly.loading(this.config);

      setTimeout(()=>{tip.close();}, 2000)
  }

  alert(){
      this.ly.alert(this.config);
  }


}
