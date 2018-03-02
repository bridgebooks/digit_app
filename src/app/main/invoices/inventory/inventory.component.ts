import { ViewChild, Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService, ItemService } from '../../../services';
import { Item } from '../../../models/data/item';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @ViewChild('itemModal') itemModal: ItemModalComponent;
  loading: boolean;
  org: any;
  perPage: number = 30;
  currentPage: number = 1;
  total: number;
  orderBy: string = 'created_at';
  sortedBy: string = 'desc';
  items: Item[];
  selected: Item[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private session: SessionService,
    private alert: AlertService,
    private orgService: OrgService,
    private itemService: ItemService
  ) { }

  delete(item) {
    if (window.confirm('Are sure you want to delete this item?')) {
      this.alert.info('Item', 'Deleting item', { timeOut: 3000 })

      this.itemService
        .delete(item.id)
        .subscribe(response => {
          this.alert.success('Item', 'Item successfully deleted', { timeOut: 5000 });
          this.refresh({});
        })
    }
  }

  refresh(state: any) {
    this.loading = true;
    this.cdRef.detectChanges();

    const options = {
      page: this.currentPage,
      perPage: this.perPage,
      orderBy: this.orderBy,
      sortedBy: this.sortedBy
    }

    this.orgService
      .getItems(this.org.id, options)
      .subscribe(response => {
        this.total = response.total
        this.items = response.data;
        this.currentPage = response.current_page;

        this.loading = false;
      },
      err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

}
