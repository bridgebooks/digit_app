import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../../services';

enum btnStatus {
  DEFAULT = <any>'Change Password',
  PROCESSING = <any>'Updating...'
}

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  editing: boolean = false;

  actionBtnText = 'Edit';

  btnText: any = btnStatus.DEFAULT

  btnDisabled: boolean = false;

  processing: boolean = false;

  model: any = {
    current: null,
    password: null,
    confirm: null
  }

  constructor(private alertService: AlertService, private userService: UserService) { }

  ngOnInit() {
  }

  toggleEditing() {
    this.editing = this.editing ? false : true;
    this.actionBtnText = this.editing ? 'Cancel' : 'Edit';
  }

  onRequestDone() {
    this.btnDisabled = false;
    this.processing = false;
    this.btnText = btnStatus.DEFAULT;
  }

  clearFields() {
    this.model.current, this.model.password, this.model.confirm = null
  }

  onSubmit() {
    this.btnText = btnStatus.PROCESSING;
    this.processing = true;
    this.btnDisabled = true;

    this.userService
      .updatePassword(this.model)
      .subscribe(response => {
        this.onRequestDone();
        this.toggleEditing();
        this.clearFields();

        this.alertService.success('Password Change', response.message, {
          timeOut: 3000
        });
      },
      errorResponse => {
        this.onRequestDone()
      });
  }
}
