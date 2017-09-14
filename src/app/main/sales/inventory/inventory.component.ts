import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService } from '../../../services';
import { Item } from '../../../models/data/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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
    private orgService: OrgService
  ) { }

  delete(item) {
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
