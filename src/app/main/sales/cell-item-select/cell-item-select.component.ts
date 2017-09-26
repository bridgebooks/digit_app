import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { SessionService, OrgService } from '../../../services'

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
  items: any[];
  hideItemSelector: boolean = true;
  fetching: boolean = false;

  constructor(private session: SessionService, private orgService: OrgService) { }

  isSelected(id) {
    return this.selected === id;
  }

  showSelector() {
    this.hideItemSelector = false;
    this.refresh(); 
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
    console.log(this.selected)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;
  }
}
