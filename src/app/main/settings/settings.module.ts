import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';

import { AlertService, UserService, SessionService, OrgService, AccountsService } from '../../services';

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
    AccountModalButtonComponent
  ],
  providers: [ AlertService, UserService, OrgService, SessionService, AccountsService ]
})
export class SettingsModule { }