import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from './model/user-model';
@Component({
    selector: 'app-user-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    public user:User = new User();
    public error : Error;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if(window['Electron']){
            console.log(window['Electron']);   
            
        }
      
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(
                data => {
                    console.log(data);
                    if(data.status === 0) {
                      this.router.navigate([this.returnUrl]);
                    }else{
                      alert('用户名或密码错误!')
                      this.loading = false;
                    }
                    // console.log(this.returnUrl);

                },
                error => {
                    alert("请检查网络!");
                    this.loading = false;
                });

        // if(this.authenticationService.login(this.user.username, this.user.password)){
        //   this.router.navigate([this.returnUrl]);
        // }
    }
}
