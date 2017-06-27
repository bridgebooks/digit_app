import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { SignupFormModel } from '../models/forms/signup';

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
    email: null
  };

  signupBtnStatus: any = SignupBtnStatus.DEFAULT;
  signupBtnDisabled: Boolean = false;

  processing: Boolean = false;

  constructor(public router: Router) { }

  onSubmit() {
    this.signupBtnStatus = SignupBtnStatus.PROCESSING;
    this.signupBtnDisabled = true;
    this.processing = true;

    setTimeout(() => {
      this.signupBtnStatus = SignupBtnStatus.DEFAULT;
      this.signupBtnDisabled = false;
      this.processing = false;

      this.router.navigate(['/signup/success']);
    }, 3000);
  }

  ngOnInit() {
  }
}
