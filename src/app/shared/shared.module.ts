import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntlPhoneNumberPipe, NumericDirective, PhoneNumberDirective, MatchValidator } from './index';
import { BankSelectComponent } from './components/bank-select/bank-select.component';
import { AccountSelectComponent } from './components/account-select/account-select.component';
import { TaxrateSelectComponent } from './components/taxrate-select/taxrate-select.component';
import { OrgbankaccountSelectComponent } from './components/orgbankaccount-select/orgbankaccount-select.component';

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
    BankSelectComponent,
    AccountSelectComponent,
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent
  ],
  exports: [
    BankSelectComponent, 
    AccountSelectComponent, 
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent,
    NumericDirective, 
    PhoneNumberDirective, 
    IntlPhoneNumberPipe
  ],
  providers: [IntlPhoneNumberPipe]
})
export class SharedModule { }
