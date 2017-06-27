import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

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

  routeObservable: any;

  processing: Boolean = false;

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;

  constructor(public router: Router, public route: ActivatedRoute) { }

  onSubmit() {
    this.processing = true;
    this.btnStatus = BtnStatus.PROCESSING;
    this.btnDisabled = true;

    setTimeout(() => {
      this.processing = false;
      this.btnStatus = BtnStatus.DEFAULT;
      this.btnDisabled = false;
      this.router.navigate(['/setup']);
    }, 3000);
  }

  ngOnInit() {
      this.routeObservable = this.route.params.subscribe(params => {
        this.id = params['user_id'];
      });
  }

  ngOnDestroy() {
      this.routeObservable.unsubscribe();
  }
}
