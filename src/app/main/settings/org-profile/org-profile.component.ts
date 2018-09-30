import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Org } from '../../../models/data/org';
import { ObjectUtils } from '../../../shared';
import { AlertService, JwtService, OrgService } from '../../../services';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent implements OnInit, OnDestroy {
  @ViewChild('orgForm') form;
  data: Org;
  org: any;

  loading: boolean = false;
  processing: boolean = false;

  constructor(
    private alertService: AlertService,
    private jwtService: JwtService,
    private orgService: OrgService
  ) { }

  ngOnInit() {
    this.getDefaultOrg()
  }

  ngOnDestroy() {

  }

  getDefaultOrg() {
    const token = this.jwtService.getToken();
    this.org = token.orgs[0];
    this.loading = true;

    this.orgService
      .get(this.org.id)
      .subscribe(response => {
        this.data = response.data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      });
  }

  onLogoUrlChanged(url) {
    this.data.logo_url = url;
  } 

  onSubmit() {
    const data = ObjectUtils.getDirtyValues(this.form)    
    this.processing = true;

    if (this.data.logo_url) data['logo_url'] = this.data.logo_url;

    this.orgService.update(this.org.id, data)
      .subscribe(response => {
        this.processing = false;
        this.data = response.data;

        this.alertService.success('Profile Update', 'Organization profile updated successfully', {
          timeOut: 4000
        })
      },
      err => {
        this.processing = false;
      })
  }
}
