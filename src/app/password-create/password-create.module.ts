import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services';
import { MatchValidator } from '../shared';

import { PasswordCreateRoutingModule } from './password-create-routing.module';
import { PasswordCreateComponent } from './password-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordCreateRoutingModule,
  ],
  declarations: [MatchValidator, PasswordCreateComponent],
  providers: [AuthService]
})
export class PasswordCreateModule { }
