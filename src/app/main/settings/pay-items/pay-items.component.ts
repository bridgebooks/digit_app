import { ViewChild, ChangeDetectorRef, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SessionService, OrgService, AlertService, PayitemService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular/data/datagrid'


import '@clr/icons/shapes/essential-shapes';
import { Payitem } from '../../../models/data/payitem';
import { Subject } from 'rxjs/Subject';
import { PayitemFormModalComponent } from '../../settings/payitem-form-modal/payitem-form-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { Modal } from '@clr/angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-pay-items',
  templateUrl: './pay-items.component.html',
  styleUrls: ['./pay-items.component.scss']
})
export class PayItemsComponent implements OnInit, AfterViewInit, OnDestroy {

  org: any;
  perPage: number = 30;
  currentPage: number;
  status: string = 'active';
  total: number;
  loading: boolean = true;
  deleting: boolean = false;

  items: Payitem[] = [];
  toDelete: string;

  @ViewChild('payitemModal') payitemModal: PayitemFormModalComponent;
  @ViewChild('archiveModal') archiveModal: Modal;
  @ViewChild('deleteModal') deleteModal: Modal;
  @ViewChild('restoreModal') restoreModal: Modal
  cancel$: Subject<any> = new Subject();
  route$: Subscription;
  route$$: Subscription;
  modal$: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private alerts: AlertService,
    private session: SessionService,
    private orgService: OrgService,
    private payitemService: PayitemService
  ) { }

  openModal() {
    this.payitemModal.open();
  }

  archiveItem(id: string) {
    this.archiveModal.open();
    this.toDelete = id;
  }

  deleteItem(id: string) {
    this.deleteModal.open();
    this.toDelete = id;
  }

  restoreItem(id: string) {
    this.restoreModal.open();
    this.toDelete = id;
  }

  archive() {
    this.deleting = true;

    this.payitemService.archive(this.toDelete)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.deleting = false;
        this.archiveModal.close();
        this.toDelete = null;
        this.alerts.success('Delete pay item', response.message, { timeOut: 3000 });
        this.refresh({});
      }, err => {
        this.deleting = false;
      })
  }

  restore() {
    this.deleting = true;

    this.payitemService.restore(this.toDelete)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.deleting = false;
        this.restoreModal.close();
        this.toDelete = null;
        this.alerts.success('Restore pay item', response.message, { timeOut: 3000 });
        this.refresh({});
      }, err => {
        this.deleting = false;
      })
  }

  delete() {
    this.deleting = true;

    this.payitemService.delete(this.toDelete)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.deleting = false;
        this.deleteModal.close();
        this.toDelete = null;
        this.alerts.success('Delete pay item', response.message, { timeOut: 3000 });
        this.refresh({});
      }, err => {
        this.deleting = false;
      })
  }

  refresh(state: ClrDatagridStateInterface) {
    state.sort = state.sort || {
      by: 'name',
      reverse: false
    }

    const options = {
      page: this.currentPage,
      perPage: this.perPage,
      status: this.status,
      include: 'account'
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.orgService
      .getPayitems(this.org.id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.items = response.data;
        this.total = response.total;
        this.currentPage = response.current_page;

        this.cdRef.detectChanges();
        this.loading = false;
      },
      err => {
        this.cdRef.detectChanges();
        this.loading = false;
      })
  }

  onItemUpdated(item: Payitem) {
    let itemIndex = this.items.indexOf(item)
    this.items[itemIndex] = item;
  }

  onItemCreated(item: Payitem) {
    this.refresh({})
  }

  ngOnInit(): void {
    this.org = this.session.getDefaultOrg();
    this.currentPage = 1;

    this.route$ = this.route.params
      .filter(params => params.id)
      .takeUntil(this.cancel$)
      .subscribe(params => {
        if (params.id) {
          this.payitemModal.edit(params.id);
        }
      });

    this.route$$ = this.route.queryParams
      .filter(params => params.status)
      .subscribe(params => {
        this.status = params.status || 'active';

        if (this.status) {
          this.loading = true;
          this.cancel$.next();
          this.refresh({})
        }
      })
  }

  ngAfterViewInit(): void {
    const modal$ = Observable.merge(
      this.archiveModal._openChanged,
      this.deleteModal._openChanged,
      this.restoreModal._openChanged);

    this.modal$ = modal$.subscribe(open => {
      if (!open) {
        this.cancel$.next();
      }
    })
  }

  ngOnDestroy(): void {
    this.cancel$.complete();
    this.route$.unsubscribe();
    this.route$$.unsubscribe()
    this.modal$.unsubscribe();
  }
}
