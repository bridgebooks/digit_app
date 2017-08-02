import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginResponse } from '../models/responses/login';
import { LoginFormModel } from '../models/forms/login';
import { AuthService, JwtService } from '../services';

enum LoginBtnStatus {
  DEFAULT = <any>'LOGIN',
  PROCESSING = <any>'AUTHENTICATING'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: FormData;

  model: LoginFormModel = {
    email: null,
    password: null
  }

  loginBtnStatus: any = LoginBtnStatus.DEFAULT;
  loginBtnDisabled: Boolean = false;

  processing: Boolean = false;

  constructor(public router: Router, private authService: AuthService, private jwtService: JwtService) { }

  ngOnInit() {
  }

  onRequestDone() {
    this.processing = true;
    this.loginBtnStatus = LoginBtnStatus.DEFAULT;
    this.loginBtnDisabled = false;
  }

  onLoginError(err) {
     this.onRequestDone()
     console.log(err);
  }

  onSubmit() {
    this.loginBtnStatus = LoginBtnStatus.PROCESSING;
    this.loginBtnDisabled = true;

    this.authService
      .login(this.model)
      .subscribe(response => {
        this.onRequestDone()

        this.jwtService.saveToken(response.data.token);
        this.authService.addUser(response.data.user);

        const token = this.jwtService.getToken();

        if (token.orgs.length < 1)
          this.router.navigate(['/setup'])
        else
          this.router.navigate(['/dashboard'])
        
      }, this.onLoginError);
  }
}
