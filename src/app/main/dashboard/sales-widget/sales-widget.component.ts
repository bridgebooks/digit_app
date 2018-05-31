import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { QueryPeriod, PeriodSelectorComponent } from '../period-selector/period-selector.component';
import { SessionService, StatsService } from '../../../services';
import { createChart } from './chart';

@Component({
  selector: 'app-sales-widget',
  templateUrl: './sales-widget.component.html',
  styleUrls: ['./sales-widget.component.scss']
})
export class SalesWidgetComponent implements OnInit, AfterViewInit {

  @ViewChild('period') periodSelect: PeriodSelectorComponent
  canvas: any;
  ctx: any;
  org: any;
  chart: Chart;
  period: QueryPeriod;
  fetching: boolean = true;
  dataset: any = {
    labels: [],
    data: [1000, 2000, 4000, 6000]
  };
  total: number = 0;

  constructor(
    private session: SessionService,
    private stats: StatsService) { }

  onQueryPeroidSelected(period: QueryPeriod) {
    this.period = period;
    this.fetchData(period);
  }

  renderChart() {
    if (this.chart) {
      this.chart.data.labels = this.dataset.labels;
      this.chart.data.datasets[0].data = this.dataset.data;
      this.chart.update();
    }
  }

  transformData(raw: any) {
    const labels = [];
    const data = [];

    raw.transactions.forEach(transaction => {
      labels.push(transaction.label);
      data.push(transaction.value);
    });

    return {
      labels,
      data
    };
  }

  fetchData(period: QueryPeriod, showLoading = true) {
    if (showLoading && !this.fetching) this.fetching = true;
    this.stats.sales(this.org.id, { start: period.start, end: period.end })
      .subscribe(response => {
        this.fetching = false;
        this.dataset = this.transformData(response.data);
        this.total = response.data.total;
        this.renderChart();
      }, error => {
        this.fetching = false;
      });
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngAfterViewInit() {
    this.period = this.periodSelect.selectedPeriod;
    this.canvas = document.getElementById('sales-widget-chart');
    this.ctx = this.canvas.getContext('2d');
    this.chart = createChart(this.ctx, this.dataset);
    this.fetchData(this.period);
  }
}
