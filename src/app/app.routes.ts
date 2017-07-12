import { LoginComponent } from './login/login.component';

// 路由匹配策略：先匹配者优先
export const appRoutes = [
  // {
  //   path: '',
  //   redirectTo: 'usercenter',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '**',
    redirectTo: 'not-fond'
  }
];
