import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthService } from '../services';

import { PasswordCreateRoutingModule } from './password-create-routing.module';
import { PasswordCreateComponent } from './password-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PasswordCreateRoutingModule,
  ],
  declarations: [PasswordCreateComponent],
  providers: [AuthService]
})
export class PasswordCreateModule { }
