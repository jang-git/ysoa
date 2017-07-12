import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../model/project.model';
import { ProjectManageService } from '../services/project-manage.service'

@Component({
  selector: 'project-manage-child',
  templateUrl: 'project-statics.component.html',
  providers:[
    ProjectManageService
  ]
})
export class ProjecStaticsComponent implements OnInit {

  projectList:any = [];
  projectTotal:number;
  selectId:number;
  baseUrl:string;
  constructor(private projectManage:ProjectManageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getProjectList(0);
    this.baseUrl = this.projectManage.baseURL;
  }


  getProjectList(state) {
    this.selectId = state;
    this.projectManage.projectStatic(state).subscribe(
      res=>{
  				if(res.status === 0) {//表示操作成功
            this.projectTotal = res.data.objectnum;
            if(res.data.objects){
              console.log(res.data.objects);
              this.projectList = res.data.objects;
            }
            else{
              this.projectList = [];
            }
            
          }
  			},
  			error => {console.log(error)}
    )

  }
  /**
   * 字符串处理成数组
   * @param string 
   */
  doArray(data) {
    if(data){
      return data.split(',');
    }else{
      return [];
    }
  }








}
