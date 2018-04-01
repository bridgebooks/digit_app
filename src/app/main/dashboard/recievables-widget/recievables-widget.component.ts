import { ViewChild, ElementRef, Component, OnInit, AfterContentInit } from '@angular/core';
import { FusionChartsComponent } from 'angular4-fusioncharts/dist/src/fusioncharts/fusioncharts.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { SessionService, StatsService } from '../../../services';
import * as moment from 'moment';
@Component({
  selector: 'app-recievables-widget',
  templateUrl: './recievables-widget.component.html',
  styleUrls: ['./recievables-widget.component.scss']
})
export class RecievablesWidgetComponent implements OnInit, AfterContentInit {

  org: any;
  interval: string = 'week';
  interval$: BehaviorSubject<string> = new BehaviorSubject('week');
  loading: boolean = false;
  data$: Subject<any> = new Subject();
  @ViewChild('chartcontainer') chartContainerEl: ElementRef;
  @ViewChild('chartel') chart: FusionChartsComponent;
  chartConfig: any = {
      chart: {
        numberPrefix: 'N',
        theme: 'fint',
        showValues: 0,
        plotFillColor: '#91c4e6',
    },
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
      .receivables(this.org.id, {
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
      let width = this.chartContainerEl.nativeElement.clientWidth;
      width = width - (0.20 * width);

      this.chartConfig.chart.width = width;
      this.chartConfig.data = data;
    });
  }

  ngAfterContentInit() {
  }
}
