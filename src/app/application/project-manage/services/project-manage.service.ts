import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Project } from '../model/project.model';

@Injectable()
export class ProjectManageService {
	public baseURL = environment.api.baseURL;
	public projectListURL = environment.api.projectListURL;
	public projectAddURL = environment.api.projectAddURL;
	public projectDeleteURL = environment.api.projectDeleteURL;
	public taskMyURL = environment.api.taskMyURL;
	public taskInfoURL = environment.api.taskInfoURL;
	public taskDeleteURL = environment.api.taskDeleteURL;
	public taskAddURL = environment.api.taskAddURL;
	public projectDetailURL = environment.api.projectDetailURL;
	public projectStaticURL = environment.api.projectStaticURL;
	public projectStateURL = environment.api.projectStateURL;
	public projectInfoURL = environment.api.projectInfoURL;
	public exportDataURL = environment.api.exportDataURL;
	public taskStateURL = environment.api.taskStateURL;
	public loadfileURL = environment.api.loadfileURL;
	public subTaskURL = environment.api.subTaskURL;
	public deletefileURL = environment.api.deletefileURL;
	
	constructor(public http: Http) { }

    /**
     * 获取项目列表以及搜索功能以及分页
     * @param searchText 模糊查询内容
     * @param state 项目分类标识
     */
	public getProjectList(searchText: string, state): Observable<Project[]> {
		let url = this.projectListURL;
		let params = new URLSearchParams();

		let creds = {
			"state": state,
			"name": ''
		}

		if (searchText) {
			creds.name = searchText;
			// params.set('name',searchText);
			// console.log(`searchText=${searchText}`);
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}

    /**
     * 添加项目
     * @param postData json data
     */
	public addProject(postData) {
		let url = this.projectAddURL;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, postData, { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));

	}
    /**
     * 项目详情
     * @param projectId 
     */
	public projectDetail(state, projectId) {
		let url = this.projectDetailURL;

		let creds = {
			"state": state,
			"projectid": projectId
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 归档项目	
	 * @param projectId 
	 * @param status 
	 */
	public stateProject(projectId, status = 1) {
		let url = this.projectStateURL;
		let creds = {
			"id": projectId,
			"state": status
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 项目信息
	 * @param projectId 
	 * @param status 
	 */
	public infoProject(projectId) {
		let url = this.projectInfoURL;
		let creds = {
			"id": projectId
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 项目文件
	 * @param projectId 
	 * @param taskid 
	 */
	public fileProject(projectId:number, taskid:number) {
		let url = this.loadfileURL;
		let creds = {
			"projectid": projectId,
			"taskid": taskid
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 导出项目数据
	 * @param projectId 
	 */
	public exportData(projectId) {
		let url = this.exportDataURL;
		let creds = {
			"id": projectId
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
    /**
     * 删除项目
     * @param postData json data
     */
	public deleteProject(projectId) {
		let url = this.projectDeleteURL;

		let creds = {
			"id": projectId
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
     * 删除附件
     * @param postData json data
     */
	public deleteFile(taskid) {
		let url = this.deletefileURL;

		let creds = {
			"id": taskid
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
    /**
     * 我的任务
     * @param state 
     */
	public myTask(state) {
		let url = this.taskMyURL;

		let creds = {
			"state": state
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));

	}

    /**
     * 添加任务
     * @param state 
     */
	public addTask(taskData) {
		let url = this.taskAddURL;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(taskData), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));

	}

    /**
     * 任务详情
     */
	public taskInfo(id, projectid) {
		let url = this.taskInfoURL;

		let creds = {
			"id": id,	//任务标识
			"projectid": projectid
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
    /**
     * 删除任务
     * @param id 
     * @param projectid 
     */
	public deleteTask(id, projectid) {
		let url = this.taskDeleteURL;

		let creds = {
			"id": id,
			"projectid": projectid
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}

	/**
     * 修改任务状态
     * @param id 
     * @param status 
     */
	public updateStatusTask(id, status) {
		let url = this.taskStateURL;
		let creds = {
			"id": id,
			"state": status
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 获取子任务列表
	 * @param id 
	 */
	public getSubTask(id) {
		let url = this.subTaskURL;
		let creds = {
			"id": id,
		}
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
	/**
	 * 添加子任务
	 * @param id 
	 */
	public addSubTask(id) {
		let url = this.subTaskURL;
		let creds = {
			"id": id,
		}
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
    /**
     * 项目统计
     * @param state 
     */
	public projectStatic(state) {
		let url = this.projectStaticURL;

		let creds = {
			"state": state
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, JSON.stringify(creds), { headers: headers })
			.map((res: Response) => {
				let result = res.json();
				return result;
			})
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}



}
