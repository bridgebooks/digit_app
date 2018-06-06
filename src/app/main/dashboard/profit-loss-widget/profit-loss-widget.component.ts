import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { SessionService } from '../../../services';
import { StatsService } from '../../../services/stats.service';
import { PeriodSelectorComponent, QueryPeriod } from '../period-selector/period-selector.component';

@Component({
  selector: 'app-profit-loss-widget',
  templateUrl: './profit-loss-widget.component.html',
  styleUrls: ['./profit-loss-widget.component.scss']
})
export class ProfitLossWidgetComponent implements OnInit, AfterViewInit {

  @ViewChild('period') periodSelect: PeriodSelectorComponent
  period: QueryPeriod;
  fetching: boolean = true;
  org: any;
  total: number = 0;
  _total: number = 0;
  dataset = [
    {
      title: 'Income',
      value: 0,
      color: '#002538',
      size: 0
    },
    {
      title: 'Expenses',
      value: 0,
      color: '#b31313',
      size: 0
    },
  ]
  constructor(private session: SessionService, private stats: StatsService) { }

  fetchData(period: QueryPeriod, showLoading = true) {
    if (showLoading && !this.fetching) this.fetching = true;
    this.stats
      .pl(this.org.id, { start: period.start, end: period.end })
      .subscribe(response => {
        this.fetching = false;
        this.total = response.data.net_profit;
        this.dataset[0].value = response.data.income;
        this.dataset[1].value = response.data.expenses;
        this._total = this.dataset.reduce((a, b) => +a + +b.value, 0);
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
