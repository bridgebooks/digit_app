import { Component, OnInit } from '@angular/core';
import { UserService, SessionService } from '../../../services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private sessionService: SessionService) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
  }

}
