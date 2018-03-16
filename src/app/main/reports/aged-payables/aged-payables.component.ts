import { Component, OnInit } from '@angular/core';
import { ReportService, SessionService, JwtService } from '../../../services';
import * as moment from 'moment';
@Component({
  selector: 'app-aged-payables',
  templateUrl: './aged-payables.component.html',
  styleUrls: ['./aged-payables.component.scss']
})
export class AgedPayablesComponent implements OnInit {

  report: any;
  org: any;
  token: any;
  balanceDates: any[];
  balanceDate: string = moment().endOf('month').format('YYYY-MM-DD');
  loading: boolean;
  exporting: boolean;

  constructor(
    private jwtService: JwtService,
    private session: SessionService,
    private reports: ReportService) { }

  private getBalanceDates() {
    const months = []
    const start = moment();
    const end = start.clone().subtract(1, 'year');

    const diff = start.diff(end, 'months', true);
    for (let i = 0; i <= diff; i++) {
      months.push({
        label: end.clone().format('MMMM YYYY'),
        value: end.clone().endOf('month').format('YYYY-MM-DD')
      })
      end.add(1, 'month')
    }

    return months;
  }

  getReport() {
    this.loading = true;
    const options = { date: this.balanceDate, type: 'acc_pay' }
    this.reports
      .agedInvoices(this.org.id, options)
      .subscribe(response => {
        this.report = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  export() {
    const url = `${this.reports.baseUrl}/${this.org.id}/aged-invoices?date=
    ${this.balanceDate}&type=acc_pay&export_pdf=true&token=${this.token}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.token = this.jwtService.readToken();
    this.balanceDates = this.getBalanceDates();
    this.getReport();
  }
}
