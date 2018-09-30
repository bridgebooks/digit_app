import { Component, ChangeDetectorRef, OnInit, AfterContentChecked, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, TourService, SessionService, OrgService } from '../../../services';
import { ClrDatagridStateInterface } from '@clr/angular/data/datagrid';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/combineLatest';
import { InvoiceListTour } from './invoice-list.tour';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit, OnDestroy, AfterViewInit {

  route$: Subscription;
  cancel$: Subject<any> = new Subject();

  org: any;
  type: string;
  invoiceType: string;
  status: string;
  invoices: any[] = [];
  perPage: number = 30;
  currentPage: number = 1;
  total: number;
  loading: boolean = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private alert: AlertService,
    private tour: TourService,
    private session: SessionService,
    private orgService: OrgService
  ) { }

  setListType(type: string) {
    if (!type) return 'acc_rec';

    return type === 'expenses' ? 'acc_pay' : 'acc_rec';
  }

  refresh(state: ClrDatagridStateInterface) {
    state.sort = state.sort || {
      by: 'created_at',
      reverse: true
    }

    const options = {
      type: this.type,
      page: this.currentPage,
      perPage: this.perPage,
      include: 'contact,user'
    }
    if (this.status) options['status'] = this.status;
    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.orgService
      .getInvoices(this.org.id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        setTimeout(() => { this.loading = false }, 0);
        this.total = response.total;
        this.invoices = response.data;
        this.currentPage = response.current_page;
        this.cdRef.detectChanges()
      },
      err => {
        setTimeout(() => { this.loading = false }, 0);
      })
  }

  startTour() {
    this.tour.start(InvoiceListTour, true);
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();

    const route$ = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));
    this.route$ = route$.subscribe(route => {
      this.status = route.qparams.status || 'all';
      this.type = this.setListType(route.params.type);
      this.invoiceType = route.params.type

      this.loading = true;
      this.cancel$.next();
      this.refresh({})

    })
  }

  ngAfterViewInit() {
    // this.tour.start(InvoiceListTour);
  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.route$.unsubscribe();
    this.cancel$.complete();
  }
}
