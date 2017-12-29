import { ViewChild, ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent
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
import { Subject } from 'rxjs/Subject';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { SessionService, OrgService } from '../../../services';
import { Body } from '@angular/http/src/body';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.scss']
})
export class CalendarWidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  org: any;
  view: string = 'month';
  viewDate: Date = new Date();
  startDate: Date;
  endDate: Date;
  events$: Observable<any>;
  cancel$: Subject<any> = new Subject();
  viewChange$: Subject<any> = new Subject();
  refresh$: Subject<any> = new Subject();
  events: any[];
  loading: boolean;
  activeDayIsOpen: boolean = false;  

  @ViewChild('calendarRef') calendarRef: CalendarMonthViewComponent;

  constructor(private cdRef: ChangeDetectorRef,private router: Router, private session: SessionService, private $org: OrgService) { }
  
  private transform(data) {
    return data.map(invoice => {
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
  }
  
  switchView(view: string) {
    this.view = view;
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

  viewDateChanged($event) {
    console.log(this.calendarRef);
    this.viewChange$.next();
  }

  eventClicked($event) {
    const event = $event.event;
    this.router.navigate(['/invoices/view', event.meta.id])    
  }

  setDates(calendarRef) { 
    this.startDate = calendarRef.view.days[0].date;
    this.endDate = calendarRef.view.days[calendarRef.view.days.length - 1].date
  }

  resetDates() {
    this.startDate = null;
    this.endDate = null;
  }

  fetch() {
    this.events$ = this.$org.getInvoiceEvents(this.org.id, { 
      include: 'contact',
      start_date: format(this.startDate, 'YYYY-MM-DD'),
      end_date: format(this.endDate, 'YYYY-MM-DD')      
    })
    .pipe(
      map(response => {
        return response.data
      }),
      map(this.transform)
    )

    this.events$.subscribe(events => {
      this.resetDates();
      this.events = events
    });
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.cancel$.complete();
  }
}
