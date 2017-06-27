import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';

import 'clarity-icons';
import 'clarity-icons/shapes/social-shapes';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss']
})
export class SignupSuccessComponent implements OnInit {

  public user: any = {
    first_name: 'John',
    email: 'john.doe@acme.come'
  };

  emailLink: String;

  constructor(public router: Router) { }

  ngOnInit() {
    this.emailLink = this.getEmailDomain(this.user.email);
  }

  onInboxBtnClick() {
    this.router.navigate(['/login/validate', '3425-342542-24353']);
  }

  getEmailDomain(email: string) {
    const parts = email.split('@');
    if (parts.length === 2) {
      return 'https://' + parts[1];
    }

    return 'javascript;';
  }
}
