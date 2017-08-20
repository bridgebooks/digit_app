import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/requests/user';
import { SignupFormModel } from '../models/forms/signup';
import { UserService } from '../services/user.service';
import { SignupService } from './services/signup.service';

enum SignupBtnStatus {
  DEFAULT = <any>'SIGN UP',
  PROCESSING = <any>'Please wait...'
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') form: FormData;

  model: SignupFormModel = {
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    primary_user: true
  };

  signupBtnStatus: any = SignupBtnStatus.DEFAULT;
  signupBtnDisabled: Boolean = false;

  processing: Boolean = false;

  constructor(public router: Router, private userService: UserService, private signupService: SignupService) { }

  onSubmit() {
    this.signupBtnStatus = SignupBtnStatus.PROCESSING;
    this.signupBtnDisabled = true;
    this.processing = true;

    this.userService
      .create(this.model)
      .subscribe(user => {
        this.signupBtnStatus = SignupBtnStatus.DEFAULT;
        this.signupBtnDisabled = false;
        this.processing = false;

        this.router.navigate(['/signup/success']);
        this.signupService.setUser(user);
      },
      err => {
        this.signupBtnStatus = SignupBtnStatus.DEFAULT;
        this.signupBtnDisabled = false;
        this.processing = false;

        console.log(err);
      })
  }

  ngOnInit() {
  }
}
