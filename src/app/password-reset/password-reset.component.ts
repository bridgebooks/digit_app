import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.btnStatus = BtnStatus.PROCESSING;
    this.btnDisabled = true;

    setTimeout(() => {
      this.btnStatus = BtnStatus.DEFAULT;
      this.btnDisabled = false;
      this.showSuccess = true;
    }, 5000);
  }
}
