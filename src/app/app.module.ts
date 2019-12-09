import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'angular-image-slider';
import { HomeComponent } from './modules/home/home.component';
import { NgxFlickingModule} from '@egjs/ngx-flicking';
import { MatFormFieldModule, MatInputModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './AuthInterceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import {ChartsModule} from 'ng2-charts';
import { ModalComponent } from './components/modal/modal.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import {RestaurantUpdateFormComponent} from "./components/restaurant-update-form/restaurant-update-form.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AdminComponent,
    ModalComponent,
    RestaurantFormComponent,
    RestaurantUpdateFormComponent
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SliderModule,
    NgxFlickingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
