import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService, PayrunService } from '../../../services';
import { ClrDatagridStateInterface } from '@clr/angular/data/datagrid';
import { Payrun } from '../../../models/data/payrun';
import { Subscription} from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-payrun-list',
  templateUrl: './payrun-list.component.html',
  styleUrls: ['./payrun-list.component.scss']
})

export class PayrunListComponent implements OnInit, OnChanges, OnDestroy {

  @Input('org_id') org_id: string;
  @Input('defer') defer: Subject<boolean>;
  loading: boolean = true;

  runs: Payrun[] = [];
  status: string;
  perPage: number = 30;
  currentPage: number = 1;
  total: number;

  route$: Subscription;
  cancel$: Subject<any> = new Subject();

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private orgs: OrgService,
    private payruns: PayrunService
  ) { }

  refresh(state: ClrDatagridStateInterface) {
    state.sort = state.sort || {
      by: 'created_at',
      reverse: true
    }

    const options = {
      page: this.currentPage,
      perPage: this.perPage
    }

    if (this.status) options['status'] = this.status;

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';


    this.orgs
      .getPayruns(this.org_id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        setTimeout(() => { this.loading = false }, 0);
        this.total = response.total;
        this.runs = response.data;
        this.currentPage = response.current_page;

        this.cdRef.detectChanges()
      },
      err => {
        setTimeout(() => { this.loading = false }, 0);
      })
  }

  ngOnInit() {
    this.defer.subscribe(defer => {
      if (defer) {
        this.loading = false;
        this.cancel$.next()
      } else {
        this.loading = true;
        this.refresh({});
      }
    })

    this.route$ = this.route.queryParams
      .filter(params => params.status)
      .subscribe(params => {
        this.status = params.status || 'all';

        if (this.status) {
          this.loading = true;
          this.cancel$.next();
          this.refresh({})
        }
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.org_id = changes.org_id ? changes.org_id.currentValue : this.org_id;
    this.defer = changes.defer ? changes.defer.currentValue : this.defer;
  }

  ngOnDestroy() {
    this.cancel$.complete();
  }
}
