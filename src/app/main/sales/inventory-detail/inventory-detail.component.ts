import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService, ItemService } from '../../../services';
import { Item } from '../../../models/data/item';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  route$: Subscription;
  item: Item;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private itemService: ItemService
  ) { }

  itemUpdated($event: Item) {
    this.item = $event;
  }

  fetchItem(id: string) {
    this.loading = true
    this.itemService
      .get(id, { include: 'sale_account,purchase_account,sale_tax,purchase_tax' })
      .subscribe(response => {
        this.loading = false;
        this.item = response.data;
      },
      err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.fetchItem(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
