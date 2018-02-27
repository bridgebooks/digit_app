import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionService, ReportService } from '../../../services';
import { BalanceSheetReportData } from '../../../models/responses/balance-sheet';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  report: BalanceSheetReportData;
  org: any;
  balanceDates: any[];
  balanceDate: string = moment().endOf('month').format('YYYY-MM-DD');
  loading: boolean;

  constructor(
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
        this.report.assets['total'] = this.report.assets.map(a => { return a.balance }).reduce((a, b) => a + b);
        this.report.liabilities['total'] = this.report.liabilities.map(a => { return a.balance }).reduce((a, b) => a + b);
        this.report.equity['total'] = this.report.equity.length > 0
          ? this.report.equity.map(a => { return a.balance }).reduce((a, b) => a + b)
          : 0;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.balanceDates = this.getBalanceDates();
    this.getReport();
  }
}
