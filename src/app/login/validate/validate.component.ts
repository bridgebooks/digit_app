import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import 'clarity-icons';
import 'clarity-icons/shapes/social-shapes';

@Component({
  selector: 'app-login-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class LoginValidateComponent implements OnInit, OnDestroy {

  public model: any = {
      password: null
  };
  id: String;
  routeObservable: any;

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
      this.routeObservable = this.route.params.subscribe(params => {
        this.id = params['user_id'];
        console.log(this.id);
      });
  }

  ngOnDestroy() {
      this.routeObservable.unsubscribe();
  }
}
