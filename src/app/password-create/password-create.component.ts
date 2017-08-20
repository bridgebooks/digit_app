import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services';

enum BtnStatus {
  DEFAULT = <any>'RESET PASSWORD',
  PROCESSING = <any>'SENDING...'
}

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit {

  model: any = { password: null, confirm: null };
  token: string;

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;

  showSuccess: Boolean = false;
  showError: Boolean = false;
  successMessage: string;
  errorMessage: string;

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams
        .filter(params => params.token)
        .subscribe(params => {
          if(!params.token) this.router.navigate(['/login'])
          else this.token = params.token;
        })
  }

  requestDone() {
    this.btnStatus = BtnStatus.DEFAULT;
    this.btnDisabled = false;
  }

  onSubmit() {
    this.btnStatus = BtnStatus.PROCESSING;
    this.btnDisabled = true;
    
    this.authService
      .resetPassword(this.model, this.token)
      .subscribe(response => {
        this.requestDone()
        if (response.status === 'success') {
            this.showSuccess = true;
            this.successMessage = response.message;

            this.model.password = null;
            this.model.confirm = null;
        }
      },
      errResponse => {
        this.requestDone();
        this.showSuccess = false;
        this.showError = true;
        this.errorMessage = errResponse.error.message;
      })
  }

}
