import { Component, OnInit } from '@angular/core';
import { JwtService, SessionService, ReportService } from '../../../services';
import * as moment from 'moment';
import { ProfitLossReportData } from '../../../models/responses/profit-loss';
import { IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {

  loading: boolean;
  exporting: boolean;
  report: ProfitLossReportData;
  org: any;
  token: any;
  start: any;
  end: any;
  startDate: string = moment().startOf('y').format('YYYY-MM-DD');
  endDate: string = moment().format('YYYY-MM-DD');
  datePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  }

  constructor(
    private jwtservice: JwtService,
    private session: SessionService,
    private reports: ReportService) { }

  onStartDateChange($event) {
    this.startDate = $event.formatted;
  }

  onEndDateChange($event) {
    this.endDate = $event.formatted;
  }

  getReport() {
    this.loading = true;
    const options = { start_date: this.startDate, end_date: this.endDate }
    this.reports
      .profitLoss(this.org.id, options)
      .subscribe(response => {
        this.report = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  export() {
    const url = `${this.reports.baseUrl}/${this.org.id}/profit-loss?start_date=
    ${this.startDate}&end_date=${this.endDate}&export_pdf=true&token=${this.token}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.token = this.jwtservice.readToken();

    const start = moment().startOf('y').toDate();
    const end = moment().toDate();

    this.start = {
      date: {
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        day: start.getDate()
      }
    }

    this.end = {
      date: {
        year: end.getFullYear(),
        month: end.getMonth() + 1,
        day: end.getDate()
      }
    }

    this.getReport();
  }

}
