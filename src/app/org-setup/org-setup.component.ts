import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService, SessionService,IndustryService, OrgService,  } from '../services';
import { OrgSetupModel } from '../models/forms/org-setup';

import '@clr/icons';
import '@clr/icons/shapes/core-shapes';

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
    private sessionService: SessionService,
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
        //save user
        this.sessionService.addUser(response.data.user);
        // save new token
        this.jwtService.saveToken(response.data.token);
        // read token
        const token = this.jwtService.getToken();
        // add org
        this.sessionService.addDefaultOrg(token.orgs[0]);
        // redirect to dashboard
        this.router.navigate(['/dashboard'])
      },
      error => {
        this.onRequestDone();
        console.log(error);
      })
  }
}
