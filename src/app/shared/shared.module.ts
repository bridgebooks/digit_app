import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlPhoneNumberPipe, NumericDirective, PhoneNumberDirective, MatchValidator } from './index';
import { BankSelectComponent } from './components/bank-select/bank-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IntlPhoneNumberPipe,
    NumericDirective, 
    MatchValidator,
    PhoneNumberDirective,
    BankSelectComponent
  ],
  exports: [BankSelectComponent]
})
export class SharedModule { }
