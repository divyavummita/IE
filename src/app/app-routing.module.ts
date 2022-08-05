import { Routes } from '@angular/router';

import { CustomerGuard } from './_guards/customer.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserformComponent } from './userform/userform.component';

export const appRoutes: Routes = [
  {
    path: ':customerkey',
    canActivate: [CustomerGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userlist', component:UserlistComponent},
      { path:'userform',component:UserformComponent},
      { path:'userform/:id',component:UserformComponent},
    ]
  }
];