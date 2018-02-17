import { Component, OnInit } from '@angular/core';
import { SessionService, OrgService, AlertService } from '../../../services/index';
import { AccountingSettingsData } from '../../../models/responses/account-settings';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  loading = true;
  processing = false;
  model: AccountingSettingsData;
  days: number[];
  months: any[];
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

  private getDays() {
    const count = 31;
    const days = [];

    for (let i = 1; i <= count; i++) {
      days.push(i);
    }

    return days;
  }

  private getMonths() {
    const months = [];
    // tslint:disable-next-line:max-line-length
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    monthNames.map((name, index) => {
      return {
        label: name,
        value: index + 1
      }
    }).forEach(month => {
      months.push(month);
    });
    return months;
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.days = this.getDays();
    this.months = this.getMonths();
    this.getSettings()
  }

}
