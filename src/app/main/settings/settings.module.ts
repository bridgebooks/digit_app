import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';

import { 
  AlertService, 
  UserService, 
  SessionService, 
  OrgService, 
  AccountsService, 
  TaxRateService,
  BankAccountService,
  RoleService,
  PayitemService
} from '../../services';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { EmailChangeComponent } from './email-change/email-change.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { LogoUploadComponent } from './logo-upload/logo-upload.component';
import { ChartAccountsComponent } from './chart-accounts/chart-accounts.component';
import { AccountBulkActionDropdownComponent } from './account-bulk-action-dropdown/account-bulk-action-dropdown.component';
import { AccountModalButtonComponent } from './account-modal-button/account-modal-button.component';
import { AccountEditModalComponent } from './account-edit-modal/account-edit-modal.component';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { TaxRateModalComponent } from './tax-rate-modal/tax-rate-modal.component';
import { TaxComponentFormComponent } from './tax-component-form/tax-component-form.component';
import { TaxBulkActionDropdownComponent } from './tax-bulk-action-dropdown/tax-bulk-action-dropdown.component';
import { TaxrateEditModalComponent } from './taxrate-edit-modal/taxrate-edit-modal.component';
import { TaxComponentEditComponent } from './tax-component-edit/tax-component-edit.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { BankAccountModalComponent } from './bank-account-modal/bank-account-modal.component';
import { BankAccountEditModalComponent } from './bank-account-edit-modal/bank-account-edit-modal.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { UsersComponent } from './users/users.component';
import { UserinviteFormComponent } from './userinvite-form/userinvite-form.component';
import { UserrolePickerComponent } from './userrole-picker/userrole-picker.component';
import { PayItemsComponent } from './pay-items/pay-items.component';
import { PayitemFormModalComponent } from './payitem-form-modal/payitem-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SharedModule,
    FileUploadModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    EmailChangeComponent,
    ProfileComponent, 
    AccountComponent, 
    PasswordChangeComponent, 
    OrgProfileComponent,
    LogoUploadComponent,
    ChartAccountsComponent,
    AccountBulkActionDropdownComponent,
    AccountModalButtonComponent,
    AccountEditModalComponent,
    TaxRatesComponent,
    TaxRateModalComponent,
    TaxComponentFormComponent,
    TaxBulkActionDropdownComponent,
    TaxrateEditModalComponent,
    TaxComponentEditComponent,
    BankAccountsComponent,
    BankAccountModalComponent,
    BankAccountEditModalComponent,
    InvoicesComponent,
    UsersComponent,
    UserinviteFormComponent,
    UserrolePickerComponent,
    PayItemsComponent,
    PayitemFormModalComponent
  ],
  providers: [ 
    AlertService, 
    UserService, 
    OrgService, 
    SessionService, 
    AccountsService, 
    TaxRateService, 
    BankAccountService, 
    RoleService, 
    PayitemService 
  ]
})
export class SettingsModule { }