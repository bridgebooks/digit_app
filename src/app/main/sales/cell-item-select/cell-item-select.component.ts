import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { SessionService, OrgService } from '../../../services';
import { Subject } from 'rxjs';

@Component({
  selector: 'cell-item-select',
  templateUrl: './cell-item-select.component.html',
  styleUrls: ['./cell-item-select.component.scss']
})
export class CellItemSelectComponent implements OnInit, OnChanges {
  @Input('selected') selected: any;

  @Input('row') row: any;

  @Output() itemSelected = new EventEmitter<any>();

  org: any;
  items: any[] = [];
  hideItemSelector: boolean = true;
  fetching: boolean = false;
  fetching$: Subject<any> = new Subject();

  constructor(private session: SessionService, private orgService: OrgService) { }

  isSelected(id) {
    return this.selected === id;
  }

  showSelector() {
    this.hideItemSelector = false;
    if (this.items.length < 1) this.refresh(); 
  }

  hideSelector() {
    this.hideItemSelector = true;
    this.fetching$.next();
  }

  selectItem(item) {
    this.selected = item.id;
    this.row.item_id = item.id;
    this.row.item = item;

    this.itemSelected.emit(this.row)

    this.hideItemSelector = true;
  }

  refresh() {
    this.fetching = true;

    this.orgService
      .getItems(this.org.id, { include: 'sale_account,purchase_account,sale_tax,purchase_tax', perPage: 100 })
      .takeUntil(this.fetching$)
      .subscribe(response => {
        this.items = response.data;
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
