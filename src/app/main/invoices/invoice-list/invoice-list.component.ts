import { Component, ChangeDetectorRef, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AlertService, SessionService, OrgService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid';
import { Subscription, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  route$: Subscription;
  cancel$: Subject<any> = new Subject();
  
  org: any;
  type: string;
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
    private session: SessionService,
    private orgService: OrgService
  ) { }

  setListType(type: string) {
    if (!type) return 'acc_rec';

    return type === 'bills' ? 'acc_pay' : 'acc_rec';
  }

  refresh(state: State) {
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

  ngOnInit() {
    this.org = this.session.getDefaultOrg();

    let route$ = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));
    this.route$ = route$.subscribe(route => {
      this.status = route.qparams.status || 'all';
      this.type = this.setListType(route.params.type);
      
      if (this.status) {
        this.loading = true;
        this.cancel$.next();
        this.refresh({})
      }
    })
  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.route$.unsubscribe();
    this.cancel$.complete();
  }
}