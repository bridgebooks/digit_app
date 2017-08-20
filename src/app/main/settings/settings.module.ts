import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';

import { UserService, SessionService, OrgService } from '../../services';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { EmailChangeComponent } from './email-change/email-change.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { LogoUploadComponent } from './logo-upload/logo-upload.component';

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
    LogoUploadComponent
  ],
  providers: [ UserService, OrgService, SessionService ]
})
export class SettingsModule { }