import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { EventbusService } from '../services/index';
import { WindowService } from '../services/window.service';
import { AccountSelectComponent } from './components/account-select/account-select.component';
import { BankSelectComponent } from './components/bank-select/bank-select.component';
import { ImportModalComponent } from './components/import-modal/import-modal.component';
import { MarkPaidButtonComponent } from './components/mark-paid-button/mark-paid-button.component';
import { OrgbankaccountSelectComponent } from './components/orgbankaccount-select/orgbankaccount-select.component';
import { PayitemSelectComponent } from './components/payitem-select/payitem-select.component';
import { PinpadComponent } from './components/pinpad/pinpad.component';
import { TaxrateSelectComponent } from './components/taxrate-select/taxrate-select.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import {
  CanDoDirective,
  CanseeDirective,
  CreditCardNumberDirective,
  IntlPhoneNumberPipe,
  MatchValidator,
  NumericDirective,
  PhoneNumberDirective,
  URLDirective,
  UppercaseFirstCharacterPipe
} from './index';
import { CreditCardnoPipe } from './pipes/credit-cardno.pipe';
import { MinusSignToParens } from './pipes/minus-parens';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClarityModule,
    FileUploadModule,
  ],
  declarations: [
    IntlPhoneNumberPipe,
    UppercaseFirstCharacterPipe,
    MinusSignToParens,
    NumericDirective,
    CanseeDirective,
    CanDoDirective,
    MatchValidator,
    PhoneNumberDirective,
    URLDirective,
    BankSelectComponent,
    AccountSelectComponent,
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent,
    CreditCardnoPipe,
    CreditCardNumberDirective,
    PinpadComponent,
    PayitemSelectComponent,
    ImportModalComponent,
    MarkPaidButtonComponent,
    CountrySelectComponent,
  ],
  entryComponents: [
    ImportModalComponent,
  ],
  exports: [
    BankSelectComponent,
    AccountSelectComponent,
    TaxrateSelectComponent,
    OrgbankaccountSelectComponent,
    PayitemSelectComponent,
    CountrySelectComponent,
    NumericDirective,
    CanseeDirective,
    CanDoDirective,
    PhoneNumberDirective,
    URLDirective,
    CreditCardNumberDirective,
    IntlPhoneNumberPipe,
    UppercaseFirstCharacterPipe,
    MinusSignToParens,
    PinpadComponent,
    MarkPaidButtonComponent
  ],
  providers: [IntlPhoneNumberPipe, CreditCardnoPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        EventbusService,
        WindowService,
      ]
    }
  }
}
