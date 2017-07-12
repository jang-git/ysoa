import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Md5 } from "ts-md5/dist/md5";
import { CookieService } from 'ngx-cookie';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class AuthenticationService {
    // public userLoginURL = 'src/app/mock-data/user-login-mock.json';
    public userLoginURL = environment.api.loginUrl;
    constructor(private http: Http, private router:Router, private _cookieService:CookieService) { }

    login(username: string, password: string) {

       var creds = "cellphone=" + username + "&password=" + Md5.hashStr(password) + "&extra=color";
       var headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.userLoginURL, creds, {headers: headers} )
          .timeout(10000)
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let data = response.json();
              let user = data.data;

              if (user && user.userid) {
                  let userLocal = {
                    uid: user.userid,
                    headPortrait: user.headPortrait,
                    cellphone: user.member.cellphone,
                    membername: user.member.corporateInfor.membername,
                    companyname: user.member.corporateInfor.companyName,
                    role: user.member.corpationMember.membertype
                  }
                  this._cookieService.putObject('currentUser',userLocal);
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                //   localStorage.setItem('currentUser', JSON.stringify(userLocal));
                  return data;
              } else {
                  console.log('login fail');
                  return data;
              }
          });
    }

    // login(username:string, password:string) {
    //
    //   var alibaichuanUser = {
    //     user_name:'18511334307',
    //     user_password:'qweasd'
    //   };
    //   console.log(alibaichuanUser);
    //   localStorage.setItem('currentUser', JSON.stringify(alibaichuanUser));
    //   return true;
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._cookieService.removeAll();
        // this.router.navigateByUrl('/login');
        // window.location.href="/";
        this.router.navigate(['/login']);
        // this.location.replaceState('/'); // clears browser history so they can't navigate with back button

    }
}
