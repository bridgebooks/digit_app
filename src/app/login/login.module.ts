import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { JwtService, SessionService, AuthService, UserService } from '../services';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginValidateComponent } from './validate/validate.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    LoginRoutingModule,
  ],
  providers: [ JwtService, SessionService, AuthService, UserService ],
  declarations: [ LoginComponent, LoginValidateComponent ]
})
export class LoginModule { }
