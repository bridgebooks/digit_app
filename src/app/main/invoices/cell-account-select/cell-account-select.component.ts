import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { SessionService, OrgService } from '../../../services'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'cell-account-select',
  templateUrl: './cell-account-select.component.html',
  styleUrls: ['./cell-account-select.component.scss']
})
export class CellAccountSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input('selected') selected: any;

  @Input('row') row: any;

  @Output() accountSelected = new EventEmitter<any>();

  org: any;
  accounts: any[] = [];
  hideAccountSelector: boolean = true;
  fetching: boolean = false;
  fetching$: Subject<any> = new Subject();

  constructor(private session: SessionService, private orgService: OrgService) { }

  isSelected(id) {
    return this.selected === id;
  }

  showSelector() {
    this.hideAccountSelector = false;
    if (this.accounts.length < 1) this.refresh();
  }

  hideSelector() {
    this.hideAccountSelector = true;
    this.fetching$.next();
  }

  selectItem(account) {
    this.selected = account.id;
    this.row.account = account;
    this.accountSelected.emit(this.row)

    this.hideAccountSelector = true;
  }

  refresh() {
    this.fetching = true;

    this.orgService
      .getAccounts(this.org.id, { ref: '', include: 'type', perPage: 100 })
      .takeUntil(this.fetching$)
      .subscribe(response => {
        this.accounts = response.data;
        this.fetching = false;
      },
      err => {
        this.fetching = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;
  }

  ngOnDestroy() {
    this.fetching$.next();
    this.fetching$.complete();
  }
}
