import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/requests/user';
import { SignupService } from '../services/signup.service';


import '@clr/icons/shapes/social-shapes';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss']
})
export class SignupSuccessComponent implements OnInit {

  public user: any;

  emailLink: String;

  constructor(public router: Router, private signupService: SignupService) { 
  }

  ngOnInit() {
    this.user = this.signupService.getUser();

    if (this.user) {
      this.emailLink = this.getEmailDomain(this.user.email);
      this.signupService.clearUser();
    } else {
      //redirect to 404 page
      console.log(404);
    }
  }

  onInboxBtnClick() {
    //this.router.navigate([ '/login/validate', this.user.id ]);
  }

  getEmailDomain(email: string) {
    const parts = email.split('@');
    if (parts.length === 2) {
      return 'https://' + parts[1];
    }

    return 'javascript;';
  }
}
