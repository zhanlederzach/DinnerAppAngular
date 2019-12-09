import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ClickOutsideDirective} from '../../directives/click-outside.directive';
import {ZoomEffectDirective} from '../../directives/zoom-effect.directive';
import {SeatsPipe} from './pipes/seats.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    ClickOutsideDirective,
    ZoomEffectDirective,
    SeatsPipe,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
