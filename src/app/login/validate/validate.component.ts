import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { JwtService } from '../../services/jwt.service';

import 'clarity-icons';
import 'clarity-icons/shapes/social-shapes';

enum BtnStatus {
  DEFAULT = <any>'Activate',
  PROCESSING = <any>'Please wait...'
}

@Component({
  selector: 'app-login-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class LoginValidateComponent implements OnInit, OnDestroy {
  @ViewChild('validateForm') form: FormData;

  public model: any = {
      password: null
  };

  id: String;

  token: String;

  processing: Boolean = false;

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    private userService: UserService,
    private jwtService: JwtService) { }

  requestDone() {
    this.processing = false;
    this.btnStatus = BtnStatus.DEFAULT;
    this.btnDisabled = false;
  }

  onSubmit() {
    this.processing = true;
    this.btnStatus = BtnStatus.PROCESSING;
    this.btnDisabled = true;
   
    this.userService
      .validate(this.id, this.token, this.model.password)
      .subscribe(response => {
        this.requestDone();
        // save token
        this.jwtService.saveToken(response.data.token);
        // save user
        // redirect to org setup view
        this.router.navigate(['/setup']);
      },
      err => {
        this.requestDone();
        console.log(err);
      })
  }

  ngOnInit() {
      this.route.queryParams
        .filter(params => params.token)
        .subscribe(params => {
          this.token = params.token;
        })
      
      this.route.params
        .filter(params => params.user_id)
        .subscribe(params => {
          this.id = params.user_id;
        })
  }

  ngOnDestroy() {
  }
}
