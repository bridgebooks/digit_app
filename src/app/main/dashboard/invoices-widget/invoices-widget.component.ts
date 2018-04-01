/* ts-lint:disable */
import { Component, OnInit, ViewChild } from '@angular/core';
import * as DataSource from './sample';
import { SessionService, StatsService } from '../../../services';
import * as moment from 'moment';
import { FusionChartsComponent } from 'angular4-fusioncharts';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-invoices-widget',
  templateUrl: './invoices-widget.component.html',
  styleUrls: ['./invoices-widget.component.scss']
})
export class InvoicesWidgetComponent implements OnInit {

  org: any;
  interval: string = 'week';
  interval$: BehaviorSubject<string> = new BehaviorSubject('week');
  loading: boolean = false;
  @ViewChild('chartel') chart: FusionChartsComponent;
  data$: Subject<any> = new Subject();
  chartConfig = {
      numberPrefix: 'N',
      theme: 'fint',
      width: '100%',
      height: '100%',
      paletteColors: '#23509F,#2266AF,#363645,#26ABD5,#00B0BD',
      showLabels: 0,
      enableMultiSlicing: 0,
      enableSmartLabels: 0,
      showLegend: 1,
      data: []
  }

  constructor(private session: SessionService, private stats: StatsService) { }

  private getIntervalStartEnd() {
    const now = moment();
    let start;
    let end;

    switch (this.interval) {
      case 'week':
        end = now.clone().format('YYYY-MM-DD');
        start = now.clone().subtract(1, 'w').format('YYYY-MM-DD');
      break;
      case 'month':
        end = now.clone().format('YYYY-MM-DD');
        start = now.clone().subtract(30, 'd').format('YYYY-MM-DD');
      break;
      default:
        end = now.clone().format('YYYY-MM-DD');
        start = now.clone().subtract(1, 'w').format('YYYY-MM-DD');
      break;
    }

    return { start, end };
  }

  isActiveInterval(interval: string) {
    return this.interval === interval;
  }

  fetchData() {
    const interval = this.getIntervalStartEnd();
    this.loading = true;

    this.stats
      .invoices(this.org.id, {
        start: interval.start,
        end: interval.end
      })
      .subscribe(response => {
        this.loading = false;
        this.data$.next(response.data);
      }, error => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();

    this.interval$.subscribe(interval => {
      this.interval = interval;
      this.fetchData()
    });

    this.data$.subscribe(data => {
      this.chartConfig.data = data;
    });
  }
}
