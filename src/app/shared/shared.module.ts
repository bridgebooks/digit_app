import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FileUploadModule } from 'ng2-file-upload';

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
import { PayitemSelectComponent } from './components/payitem-select/payitem-select.component';
import { EventbusService } from '../services/index';
import { WindowService } from '../services/window.service';
import { ImportModalComponent } from './components/import-modal/import-modal.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClarityModule,
    FileUploadModule
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
    PayitemSelectComponent,
    ImportModalComponent
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
