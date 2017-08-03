import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService, AuthService, SessionService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;

  logoutModalVisible: boolean = false;

  logoutProcessing: boolean = false;

  logoutBtnDisabled: boolean = false;

  constructor(
    private router: Router,
    private jwtService: JwtService, 
    private session: SessionService, 
    private authService: AuthService) { 
    this.user = this.session.getUser();
  }

  ngOnInit() {
  }

  showLogoutModal() {
    this.logoutModalVisible = true;
  }

  hideLogoutModal() {
    this.logoutModalVisible = false;
  }

  logout() {
    this.logoutProcessing = true;
    this.logoutBtnDisabled = true;

    this.authService
      .logout()
      .subscribe(response => {
        if (response.status === 'success') {
          this.logoutProcessing = false;
          this.session.end();
          this.hideLogoutModal();
          this.router.navigate(['/login'])
        }
      },
      err => {
        this.logoutProcessing = false;
        this.logoutBtnDisabled = false;
        this.hideLogoutModal();
      })
  }
}
