import { Component, OnInit } from '@angular/core';
import { SessionService, OrgService, AlertService } from '../../../services/index';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  loading: boolean = true;
  processing: boolean = false;
  model: any = {}
  org: any;

  constructor(
    private session: SessionService,
    private alert: AlertService,
    private orgService: OrgService
  ) { }

  save() {
    this.processing = true;

    this.orgService
      .updateAccountSettings(this.org.id, { values: this.model.values })
      .subscribe(response => {
        this.alert.success('Account settings', 'Settings successfully updated', {
          timeOut: 3000
        });
      }, err => {
        this.processing = false;
      }, () => {
        this.processing = false;
      })
  }
  
  getSettings() {
    this.orgService
      .getAccountSettings(this.org.id)
      .subscribe(response => {
        this.model = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.getSettings()
  }

}
