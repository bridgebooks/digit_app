import { ViewChild, Component, OnInit } from '@angular/core';
import { FusionChartsComponent } from 'angular4-fusioncharts/dist/src/fusioncharts/fusioncharts.component';
import { StatsService, SessionService } from '../../../services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
@Component({
  selector: 'app-expensechart-widget',
  templateUrl: './expensechart-widget.component.html',
  styleUrls: ['./expensechart-widget.component.scss']
})
export class ExpensechartWidgetComponent implements OnInit {

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
      .bills(this.org.id, {
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
