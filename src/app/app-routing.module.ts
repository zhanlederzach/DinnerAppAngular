import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './modules/home/home.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AdminComponent} from "./components/admin/admin.component";
import {RestaurantFormComponent} from "./components/restaurant-form/restaurant-form.component";
import {RestaurantUpdateFormComponent} from "./components/restaurant-update-form/restaurant-update-form.component";

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
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module').then(mod => mod.LandingModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./modules/restaurant/restaurant.module').then(mod => mod.RestaurantModule)
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'new',
    component: RestaurantFormComponent,
  },
  {
    path: 'update',
    component: RestaurantUpdateFormComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
