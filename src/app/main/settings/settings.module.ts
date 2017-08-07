import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { IntlPhoneNumberPipe, NumericDirective, PhoneNumberDirective } from '../../shared';
import { UserService, SessionService } from '../../services';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { EmailChangeComponent } from './email-change/email-change.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SettingsRoutingModule
  ],
  declarations: [
    IntlPhoneNumberPipe,
    NumericDirective, 
    PhoneNumberDirective,
    SettingsComponent,
    EmailChangeComponent,
    ProfileComponent, 
    AccountComponent
  ],
  providers: [ IntlPhoneNumberPipe, UserService, SessionService ]
})
export class SettingsModule { }