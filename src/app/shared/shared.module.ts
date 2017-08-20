import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlPhoneNumberPipe, NumericDirective, PhoneNumberDirective, MatchValidator } from './index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IntlPhoneNumberPipe,
    NumericDirective, 
    MatchValidator,
    PhoneNumberDirective
  ]
})
export class SharedModule { }
