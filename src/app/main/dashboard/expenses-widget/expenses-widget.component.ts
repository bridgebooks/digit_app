import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PeriodSelectorComponent, QueryPeriod } from '../period-selector/period-selector.component';
import { createExpenseChart } from './chart';
import { SessionService, StatsService } from '../../../services';

@Component({
  selector: 'app-expenses-widget',
  templateUrl: './expenses-widget.component.html',
  styleUrls: ['./expenses-widget.component.scss']
})
export class ExpensesWidgetComponent implements OnInit, AfterViewInit {

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

  transformData(raw: any) {
    const labels = [];
    const data = [];

    raw.expenses.forEach(transaction => {
      labels.push(transaction.label);
      data.push(transaction.value);
    });

    return {
      labels,
      data
    };
  }

  renderChart() {
    if (this.chart) {
      this.chart.data.labels = this.dataset.labels;
      this.chart.data.datasets[0].data = this.dataset.data;
      this.chart.update();
      console.log(this.dataset);
    }
  }

  fetchData(period: QueryPeriod, showLoading = true) {
    if (showLoading && !this.fetching) this.fetching = true;
    this.stats.bills(this.org.id, { start: period.start, end: period.end })
      .subscribe(response => {
        this.fetching = false;
        this.total = response.data.total;
        this.dataset = this.transformData(response.data);
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
    this.canvas = document.getElementById('expense-widget-chart');
    this.ctx = this.canvas.getContext('2d');
    this.chart = createExpenseChart(this.ctx, this.dataset);
    this.fetchData(this.period);
  }
}
