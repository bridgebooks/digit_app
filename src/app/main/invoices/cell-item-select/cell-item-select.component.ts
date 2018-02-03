import {
  ViewChild,
  Component,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { SessionService, OrgService, InvoiceService } from '../../../services';
import { Subject } from 'rxjs/Subject';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'cell-item-select',
  templateUrl: './cell-item-select.component.html',
  styleUrls: ['./cell-item-select.component.scss']
})
export class CellItemSelectComponent implements OnInit, OnChanges {

  @Input('selected') selected: any;
  @Input('row') row: any;
  @Output() itemSelected = new EventEmitter<any>();
  @ViewChild('modalcontainer', { read: ViewContainerRef }) modalContainer;
  itemModalComponentRef: ComponentRef<ItemModalComponent>;

  org: any;
  items: any[] = [];
  hideItemSelector = true;
  fetching = false;
  fetching$: Subject<any> = new Subject();

  constructor(
    private resolver: ComponentFactoryResolver,
    private session: SessionService,
    private orgService: OrgService,
    private invoices: InvoiceService) { }

  showItemModal() {
    this.modalContainer.clear();
    const factory: ComponentFactory<ItemModalComponent> = this.resolver.resolveComponentFactory(ItemModalComponent);
    this.itemModalComponentRef = this.modalContainer.createComponent(factory);

    this.itemModalComponentRef.instance.onItemCreated.subscribe($event => {
      this.refresh();
    })

    this.itemModalComponentRef.instance.modal.open();
  }

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
      .getItems(this.org.id, { ref: 'invoices', include: 'sale_account,purchase_account,sale_tax,purchase_tax', perPage: 100 })
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
