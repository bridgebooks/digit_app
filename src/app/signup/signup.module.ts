import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { NumericDirective, PhoneNumberDirective } from '../shared';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SignupRoutingModule,
  ],
  declarations: [NumericDirective, PhoneNumberDirective, SignupComponent, SignupSuccessComponent]
})
export class SignupModule { }
