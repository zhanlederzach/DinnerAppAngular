import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
