import { Component, ChangeDetectorRef, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AlertService, SessionService, OrgService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  route$: Subscription;
  org: any;
  type: string = 'acc_rec';
  invoices: any[];
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

  refresh(state: State) {
    state.sort = state.sort || {
      by: 'created_at',
      reverse: true
    }

    const options = {
      type: this.type,
      page: this.currentPage,
      perPage: this.perPage,
      include: 'contact'      
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.orgService
      .getSaleInvoices(this.org.id, options)
      .subscribe(response => {
        this.total = response.total
        this.invoices = response.data;
        this.currentPage = response.current_page;
      },
      err => {
      },
      () => {
        this.loading = false;        
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngOnDestroy() {
  }
}
