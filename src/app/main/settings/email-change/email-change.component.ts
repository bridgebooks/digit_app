import { Component, OnInit, Input } from '@angular/core';
import { AlertService, UserService, SessionService } from '../../../services';

enum btnStatus {
  DEFAULT = <any>'Change Email',
  PROCESSING = <any>'Updating...'
}

@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.component.html',
  styleUrls: ['./email-change.component.scss']
})
export class EmailChangeComponent implements OnInit {
  
  @Input('current') 
  currentEmail: string;

  password: string;

  editing: boolean = false;

  actionBtnText = 'Edit';

  btnText: any = btnStatus.DEFAULT

  btnDisabled: boolean = false;

  processing: boolean = false;

  constructor(
    private alertService: AlertService,
    private userService: UserService, 
    private sessionService: SessionService) { }

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

  onSubmit() {
    this.btnText = btnStatus.PROCESSING;
    this.processing = true;
    this.btnDisabled = true;

    this.userService
      .updateEmail({ 
        password: this.password,
        email: this.currentEmail
      })
      .subscribe(response => {
        this.onRequestDone()
        this.sessionService.addUser(response.data);
        this.password = null;
        this.toggleEditing();
        this.alertService.success('Email', 'Your email has successfully been updated', {
          timeOut: 4000
        })
      },
      errorResponse => {
        this.onRequestDone()
      });
  }
}
