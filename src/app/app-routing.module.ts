import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './modules/home/home.component';
import {AuthGuardGuard} from './auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/registration/registration.module').then(mod => mod.RegistrationModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    // component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
