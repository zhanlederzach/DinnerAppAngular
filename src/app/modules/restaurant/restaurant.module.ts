import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import {RestaurantRoutingModule} from './restaurant-routing.module';
import {FormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { FilterBlacklistPipe } from './pipes/show-in-maps.pipe';

@NgModule({
  declarations: [RestaurantComponent, FilterBlacklistPipe],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ]
})
export class RestaurantModule { }
