import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService, IndustryService, OrgService,  } from '../services';
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
  industries: Array<any> = [];

  model: OrgSetupModel = {
    name: null
  }

  constructor(
    public router: Router, 
    private jwtService: JwtService,
    private industryService: IndustryService, 
    private orgService: OrgService) { }

  ngOnInit() {
    this.fetchIndustries()
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onRequestDone() {
    this.processing = false;
    this.btnStatus = BtnStatus.DEFAULT
    this.btnDisabled = false;
  }

  fetchIndustries() {
    this.industryService
      .all()
      .subscribe(response => {
        this.industries = response.data;
      }, error => {
        console.log(error)
      })
  }

  onSubmit() {
    this.processing = true;
    this.btnStatus = BtnStatus.PROCESSING;

    this.orgService
      .create(this.model)
      .subscribe(response => {
        this.onRequestDone();
        // save new token
        this.jwtService.saveToken(response.data.token);
        // redirect to dashboard
        this.router.navigate(['/dashboard'])
      },
      error => {
        this.onRequestDone();
        console.log(error);
      })
  }
}
