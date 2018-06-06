import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

export interface QueryPeriod {
  label: string;
  start?: string;
  end?: string;
  time_period: string;
}

@Component({
  selector: 'app-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit {

  @Input('alt') alt: boolean;
  public periods: QueryPeriod[];
  public regularPeriods: QueryPeriod[] = [
    {
      label: 'This Week',
      time_period: 'week'
    },
    {
      label: '7 Days',
      time_period: '7days'
    },
    {
      label: 'This Month',
      time_period: 'month'
    },
    {
      label: '30 Days',
      time_period: '30days'
    },
    {
      label: 'This Quarter',
      time_period: 'quarter'
    }
  ]

  public altPeriods: QueryPeriod[] = [
    {
      label: '30 Days',
      time_period: '30days'
    },
    {
      label: 'This Month',
      time_period: 'month'
    },
    {
      label: 'This Quarter',
      time_period: 'quarter'
    },
    {
      label: 'This Year',
      time_period: 'year'
    }
  ]
  selectedPeriod: QueryPeriod;
  @Output() periodSelected: EventEmitter<QueryPeriod> = new EventEmitter();
  private current: moment.Moment = moment();

  constructor() { }

  private setStartEnd(period: QueryPeriod) {
    let start, end: moment.Moment;
    switch (period.time_period) {
      case 'week':
        start = this.current.clone().startOf('week');
        end = this.current.clone().endOf('week');
        break;
      case '7days':
        start = this.current.clone().subtract(7, 'days');
        end = this.current.clone();
        break;
      case 'month':
        start = this.current.clone().startOf('month');
        end = this.current.clone().endOf('month');
        break;
      case '30days':
        start = this.current.clone().subtract(30, 'days');
        end = this.current.clone();
        break;
      case 'quarter':
        start = this.current.clone().startOf('quarter');
        end = this.current.clone().endOf('quarter');
        break;
      case 'year':
        start = this.current.clone().startOf('year');
        end = this.current.clone().endOf('year');
        break;
    }

    period.end = end.format('YYYY-MM-DD');
    period.start = start.format('YYYY-MM-DD');
    return period;
  }

  selectPeriod(period: QueryPeriod) {
    this.selectedPeriod = this.setStartEnd(period);
    this.periodSelected.emit(period);
  }

  ngOnInit() {
    this.periods = this.alt ? this.altPeriods : this.regularPeriods;
    this.selectedPeriod = this.setStartEnd(this.periods[0]);
  }
}
