import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CompanySetService {
    public baseUrl = environment.api.baseURL;
    public modifyPasswordURL = environment.api.modifyPasswordURL;
    public changeAdminURL = environment.api.changeAdminURL;
    public getCodeURL = environment.api.getCodeURL;
    public getUserURL = environment.api.getUserURL;
    public labelInserURL = environment.api.labelInserURL;
    public labelRemoveURL = environment.api.labelRemoveURL;
    public labelListURL = environment.api.labelListURL;
    public showLabelURL = environment.api.showLabelURL;
    public loginLogsURL = environment.api.loginLogsURL;
    public operationRecordURL = environment.api.operationRecordURL;
    public adminListURL = environment.api.adminListURL;
    public contactlistUrl = environment.api.contactlistUrl;
    public applicationListURL = environment.api.applicationListURL;
    public applicationOpenURL = environment.api.applicationOpenURL;
    public applicationCloseURL = environment.api.applicationCloseURL;

    constructor(public http: Http) { }
    /**
     * 获取管理员列表
     */
    public getAdminList() {
        let url = this.adminListURL;
        let params = new URLSearchParams();

        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    /**
     * 管理员操作记录
     * @param starttime 
     * @param endtime 
     * @param logintype 
     * @param page 
     */
    public operationRecord(starttime,endtime,logintype,page='0') {
        let url = this.operationRecordURL;
        let params = new URLSearchParams();
            params.set('starttime', starttime);
            params.set('endtime', endtime);
            params.set('logintype', logintype);
            params.set('page', page);

        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    /**
     * 用户登录日志
     * @param starttime 
     * @param endtime 
     * @param logintype 
     * @param page 
     */
    public loginLog(starttime,endtime,logintype,page='0', size ="10") {
        let url = this.loginLogsURL;
        let params = new URLSearchParams();
            params.set('starttime', starttime);
            params.set('endtime', endtime);
            params.set('logintype', logintype);
            params.set('page', page);
            params.set('size', size);

        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    /**
     * 修改密码
     */
    public modifyPassword(oldPass:string, newPass:string) {
        let url = this.modifyPasswordURL;
        let params = new URLSearchParams();
            params.set('password', oldPass);
            params.set('newPassword', newPass);

        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    /**
     * 修改主管理员
     * @param id 
     * @param cellphone 
     * @param securityCode 验证码
     */
    public changeAdmin(id, cellphone, securityCode) {
        let url = this.changeAdminURL;
        let params = new URLSearchParams();
            params.set('id', id);
            params.set('cellphone', cellphone);
            params.set('securityCode', securityCode);
       
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    /**
     * 获取手机验证码
     * @param cellphone 电话号码
     * @param channel 渠道
     */
    public getCode(cellphone, channel) {
        let url = this.getCodeURL;
        let params = new URLSearchParams();
            params.set('cellphone', cellphone);
            params.set('channel', channel);
       
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    //获取用户模糊查询
    public getUser(membername?:string) {
        let url = this.getUserURL;
        let params = new URLSearchParams();
            if(membername) {
                params.set('membername', membername);
            }
            
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    //添加标签
    public inserLabel(labelName) {
        let url = this.labelInserURL;
        let params = new URLSearchParams();
          
            params.set('name', labelName);
            
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    //删除标签
    public removeLabel(id) {
        let url = this.labelRemoveURL;
        let params = new URLSearchParams();
          
            params.set('id', id);
            
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    //标签列表
    public labelList() {
        let url = this.labelListURL;
        let params = new URLSearchParams();
            
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    //修改标签显示状态
    public showLabel(showlabel) {
        let url = this.showLabelURL;
        let params = new URLSearchParams();
            params.set('showlabel', showlabel);
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    // 通讯录列表
    public memberList() {
        let url = this.contactlistUrl;
        let params = new URLSearchParams();
            
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    /**
     * 应用列表
     * @param open 1 开启的  0 停用的
     */
    public applicationList(open) {
        let url = this.applicationListURL;
        let params = new URLSearchParams();
            params.set('open', open);
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    /**
     * 开启应用
     */
    public openApplication(id) {
        let url = this.applicationOpenURL;
        let params = new URLSearchParams();
            params.set('id', id);
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    /**
     * 停止应用
     * @param id 应用ID
     */
    public closeApplication(id) {
        let url = this.applicationCloseURL;
        let params = new URLSearchParams();
            params.set('id', id);
            params.set('open', "0");
        return this.http.get(url, { search: params })
            .map((res: Response) => {
                let result = res.json();
                return result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
