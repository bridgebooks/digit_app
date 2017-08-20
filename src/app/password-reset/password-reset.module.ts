import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetComponent } from './password-reset.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordResetRoutingModule,
  ],
  declarations: [PasswordResetComponent],
  providers: [AuthService]
})
export class PasswordResetModule { }
