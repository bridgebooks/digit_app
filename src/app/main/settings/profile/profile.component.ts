import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService, SessionService } from '../../../services';

enum btnStatus {
  DEFAULT = <any>'Save',
  PROCESSING = <any>'Saving...'
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileForm') form: FormData;

  user: any;

  btnText: any = btnStatus.DEFAULT;
  btnDisabled: boolean = false;
  processing: boolean = false;

  constructor(private userService: UserService, private sessionService: SessionService) { }

  ngOnInit() {
    this.user = this.sessionService.getUser()
  }

  onRequestDone() {
    this.btnDisabled = false;
    this.processing = false;
    this.btnText = btnStatus.DEFAULT;
  }

  onSubmit() {
    this.btnDisabled = true;
    this.processing = true;
    this.btnText = btnStatus.PROCESSING;

    this.userService.update(this.user.id, this.user)
      .subscribe(response => {
        this.onRequestDone()
        this.user = response.data;
        this.sessionService.addUser(this.user);
      },
      errorResponse => {
        this.onRequestDone()
      })
  }
}
