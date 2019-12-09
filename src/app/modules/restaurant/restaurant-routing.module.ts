import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {RestaurantComponent} from './restaurant.component';
import {Restaurant} from '../../models/Restaurant';
import {DataService} from '../../data-service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestaurantResolver implements Resolve<Restaurant> {
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Restaurant> | Promise<Restaurant> | Restaurant {
    const id = Number(route.paramMap.get('id'));
    return this.dataService.getRestaurant(id);
  }
}

const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full',
}, {
  path: ':id',
  component: RestaurantComponent,
  resolve: {
    restaurant: RestaurantResolver,
  }
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {
}
