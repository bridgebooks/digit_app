import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService, JwtService, SessionService } from '../../services';

import '@clr/icons';
import '@clr/icons/shapes/social-shapes';

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
  invited: boolean;
  org: string;

  processing: Boolean = false;

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    private session: SessionService,
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
      .validate(this.id, this.model)
      .subscribe(response => {
        this.requestDone();
        // save token
        this.jwtService.saveToken(response.data.token);
        // save user
        this.session.addUser(response.data.user);
        // read token
        const token = this.jwtService.getToken();
        if (token.orgs.length < 1) {
          // redirect to org setup view
          this.router.navigate(['/setup']);
        } else {
          this.session.addDefaultOrg(token.orgs[0]);
          this.router.navigate(['/dashboard']);          
        }
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
          this.invited = params.invited;
          this.org = params.org;

          this.model.invited = this.invited;
          this.model.org = this.org;
          this.model.token = this.token;
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
