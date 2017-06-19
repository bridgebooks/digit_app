import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormModel } from '../models/forms/login';

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

  model: LoginFormModel = new LoginFormModel('', '');

  loginBtnStatus: any = LoginBtnStatus.DEFAULT;
  loginBtnDisabled: Boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginBtnStatus = LoginBtnStatus.PROCESSING;
    this.loginBtnDisabled = true;

    setTimeout(() => {
      this.loginBtnStatus = LoginBtnStatus.DEFAULT;
      this.loginBtnDisabled = false;
      this.router.navigate(['/dashboard']);
    }, 5000);
  }
}
