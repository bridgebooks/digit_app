import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IntlPhoneNumberPipe, 
  UppercaseFirstCharacterPipe, 
  NumericDirective, 
  CanseeDirective, 
  CanDoDirective,
  PhoneNumberDirective, 
  MatchValidator,
  CreditCardNumberDirective
} from './index';
import { BankSelectComponent } from './components/bank-select/bank-select.component';
import { AccountSelectComponent } from './components/account-select/account-select.component';
import { TaxrateSelectComponent } from './components/taxrate-select/taxrate-select.component';
import { OrgbankaccountSelectComponent } from './components/orgbankaccount-select/orgbankaccount-select.component';
import { CreditCardnoPipe } from './pipes/credit-cardno.pipe';
import { PinpadComponent } from './components/pinpad/pinpad.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    IntlPhoneNumberPipe,
    UppercaseFirstCharacterPipe,
    NumericDirective, 
    CanseeDirective,
    CanDoDirective,
    MatchValidator,
    PhoneNumberDirective,
    BankSelectComponent,
    AccountSelectComponent,
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent,
    CreditCardnoPipe,
    CreditCardNumberDirective,
    PinpadComponent,
  ],
  exports: [
    BankSelectComponent, 
    AccountSelectComponent, 
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent,
    NumericDirective, 
    CanseeDirective,
    CanDoDirective,
    PhoneNumberDirective,
    CreditCardNumberDirective, 
    IntlPhoneNumberPipe,
    UppercaseFirstCharacterPipe,
    PinpadComponent
  ],
  providers: [IntlPhoneNumberPipe, CreditCardnoPipe]
})
export class SharedModule { }
