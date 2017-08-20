import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';

enum BtnStatus {
  DEFAULT = <any>'SEND LINK',
  PROCESSING = <any>'SENDING...'
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  model: any = { email: null };

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;

  showSuccess: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  requestDone() {
    this.btnStatus = BtnStatus.DEFAULT;
    this.btnDisabled = false;
  }

  onSubmit() {
    this.btnStatus = BtnStatus.PROCESSING;
    this.btnDisabled = true;

    this.authService
      .requestPasswordReset(this.model)
      .subscribe(response => {
        this.requestDone()
        if (response.status === 'success') {
            this.showSuccess = true;
            this.model.email = null;
        }
      },
      err => {
        this.requestDone();
      })
  }
}
