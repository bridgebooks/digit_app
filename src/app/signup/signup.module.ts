import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { UserService } from '../services/index';
import { NumericDirective, PhoneNumberDirective, IntlPhoneNumberPipe } from '../shared';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupService } from './services/signup.service';
import { SignupComponent } from './signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SignupRoutingModule,
  ],
  declarations: [
    IntlPhoneNumberPipe,
    NumericDirective, 
    PhoneNumberDirective, 
    SignupComponent, 
    SignupSuccessComponent
  ],
  providers: [IntlPhoneNumberPipe, UserService, SignupService]
})
export class SignupModule { }
