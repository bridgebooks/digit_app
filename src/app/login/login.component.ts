import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginResponse } from '../models/responses/login';
import { LoginFormModel } from '../models/forms/login';
import { AuthService, SessionService, JwtService } from '../services';

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
  showError: Boolean = false;
  errorMessage: string;

  processing: Boolean = false;

  constructor(
    public router: Router, 
    private authService: AuthService, 
    private jwtService: JwtService, 
    private sessionService: SessionService) { }

  ngOnInit() {
  }

  onRequestDone() {
    this.processing = false;
    this.loginBtnStatus = LoginBtnStatus.DEFAULT;
    this.loginBtnDisabled = false;
  }

  onSubmit() {
    this.loginBtnStatus = LoginBtnStatus.PROCESSING;
    this.loginBtnDisabled = true;
    if (this.showError) this.showError = false;

    this.authService
      .login(this.model)
      .subscribe(response => {
        this.onRequestDone()

        this.jwtService.saveToken(response.data.token);
        this.sessionService.addUser(response.data.user);
        this.showError = false;

        const token = this.jwtService.getToken();

        if (token.orgs.length < 1)
          this.router.navigate(['/setup'])
        else
          this.router.navigate(['/dashboard'])
        
      },
      errorResponse => {
        this.onRequestDone();
        this.showError = true;
        this.errorMessage = errorResponse.error.message;
      });
  }
}
