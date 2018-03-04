import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionService, ReportService, JwtService } from '../../../services';
import { BalanceSheetReportData } from '../../../models/responses/balance-sheet';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  report: BalanceSheetReportData;
  org: any;
  token: any;
  balanceDates: any[];
  balanceDate: string = moment().endOf('month').format('YYYY-MM-DD');
  loading: boolean;
  exporting: boolean;

  constructor(
    private jwtservice: JwtService,
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
    const options = { balance_date: this.balanceDate }
    this.reports
      .balanceSheet(this.org.id, options)
      .subscribe(response => {
        this.report = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  export() {
    const url = `${this.reports.baseUrl}/${this.org.id}/balance-sheet?balance_date=
    ${this.balanceDate}&export_pdf=true&token=${this.token}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.token = this.jwtservice.readToken();
    this.balanceDates = this.getBalanceDates();
    this.getReport();
  }
}
