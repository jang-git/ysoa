import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/guard/auth.guard';

//Services
import { AlertService } from './service/alert.service';
import { AuthenticationService } from './service/authentication.service';

// import { AngularIndexedDB } from 'angular2-indexeddb';
//Routes
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
