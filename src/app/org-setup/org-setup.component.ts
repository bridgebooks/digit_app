import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OrgSetupModel } from '../models/forms/org-setup';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

enum BtnStatus {
  DEFAULT = <any> 'Next',
  PROCESSING = <any> 'Please wait..'
}

@Component({
  selector: 'app-org-setup',
  templateUrl: './org-setup.component.html',
  styleUrls: ['./org-setup.component.scss']
})
export class OrgSetupComponent implements OnInit, OnChanges{

  @ViewChild('orgForm') form: FormData;

  btnStatus: any = BtnStatus.DEFAULT;
  btnDisabled: Boolean = false;
  processing: Boolean = false;

  model: OrgSetupModel = {
    name: null
  };

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  gotoDashboard() {
    this.processing = true;
    this.btnStatus = BtnStatus.PROCESSING;

    setTimeout(() => {
      this.processing = false;
      this.btnStatus = BtnStatus.DEFAULT;
      this.router.navigate(['/dashboard']);
    }, 3000);
  }
}
