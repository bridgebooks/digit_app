import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntlPhoneNumberPipe, NumericDirective, PhoneNumberDirective, MatchValidator } from './index';
import { BankSelectComponent } from './components/bank-select/bank-select.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    IntlPhoneNumberPipe,
    NumericDirective, 
    MatchValidator,
    PhoneNumberDirective,
    BankSelectComponent
  ],
  exports: [BankSelectComponent, NumericDirective, PhoneNumberDirective],
  providers: [IntlPhoneNumberPipe]
})
export class SharedModule { }
