import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PeriodSelectorComponent, QueryPeriod } from '../period-selector/period-selector.component';
import { SessionService, StatsService } from '../../../services';
import { NumericDictionary } from 'lodash';

@Component({
  selector: 'app-invoices-widget',
  templateUrl: './invoices-widget.component.html',
  styleUrls: ['./invoices-widget.component.scss']
})
export class InvoicesWidgetComponent implements OnInit, AfterViewInit {

  @ViewChild('period') periodSelect: PeriodSelectorComponent
  period: QueryPeriod;
  fetching: boolean = true;
  org: any;
  total: number = 0;
  dataset = [
    {
      title: 'Paid',
      value: 0,
      color: '#64c2f3',
      size: 0
    },
    {
      title: 'Unpaid',
      value: 0,
      color: '#46ceb0',
      size: 0
    },
    {
      title: 'Overdue',
      value: 0,
      color: '#b31313',
      size: 0
    },
  ]
  constructor(private session: SessionService, private stats: StatsService) { }

  fetchData(period: QueryPeriod, showLoading = true) {
    if (showLoading && !this.fetching) this.fetching = true;
    this.stats
      .invoices(this.org.id, { start: period.start, end: period.end })
      .subscribe(response => {
        this.fetching = false;
        this.total = response.data.total;
        this.dataset[0].value = response.data.paid;
        this.dataset[1].value = response.data.unpaid;
        this.dataset[2].value = response.data.overdue;
      }, error => {
        this.fetching = false;
      });
  }

  onPeriodChange($event: QueryPeriod) {
    this.period = $event;
    this.fetchData($event, true);
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngAfterViewInit() {
    this.period = this.periodSelect.selectedPeriod;
    this.fetchData(this.period);
  }

}
