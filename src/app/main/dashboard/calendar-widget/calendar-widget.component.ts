import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { colors } from './colors';
import { Observable } from 'rxjs/Observable';
import { SessionService, OrgService } from '../../../services';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.scss']
})
export class CalendarWidgetComponent implements OnInit {

  org: any;
  loading: boolean = true;
  view: string = 'month';
  viewDate: Date = new Date();
  events: any[]; 
  activeDayIsOpen: boolean = false;  

  constructor(private router: Router, private session: SessionService, private $org: OrgService) { }

  fetch() {
    this.$org
      .getInvoiceEvents(this.org.id, { period: this.view, include: 'contact' })
      .map(response => { return response.data })
      .map(invoices => {
        return invoices.map(invoice => {
          return {
            title: `${invoice.invoice_no} - ${invoice.contact.data.name}`,
            color: colors.blue,
            start: new Date(invoice.due_at),
            meta: {
              id: invoice.id,
              type: invoice.type,
              amount: invoice.total,
              status: invoice.status,
              overdue: invoice.overdue,
              is_overdue: invoice.overdue > 0 ? true : false
            }
          }
        })
      })
      .subscribe(events => {
        this.events = events;
        this.loading = false;
      }, err => {
        this.loading = false;
      }, () => {
        this.loading = false;
      })
  }

  dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<any>>; }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked($event) {
    console.log($event);
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.fetch()
  }
}
