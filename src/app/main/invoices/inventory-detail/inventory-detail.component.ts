import { 
  ViewChild,
  Component,
  ViewContainerRef, 
  ComponentRef,
  ComponentFactoryResolver, 
  ComponentFactory, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService, ItemService } from '../../../services';
import { Item } from '../../../models/data/item';

import '@clr/icons';
import '@clr/icons/shapes/core-shapes';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  @ViewChild('modalcontainer', { read: ViewContainerRef }) modalContainer;
  itemModalComponentRef: ComponentRef<ItemModalComponent>;
  route$: Subscription;
  item: Item;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private alert: AlertService,
    private itemService: ItemService
  ) { }

  addItemModalComponent() {
    this.modalContainer.clear();
    const factory: ComponentFactory<ItemModalComponent> = this.resolver.resolveComponentFactory(ItemModalComponent);
    this.itemModalComponentRef = this.modalContainer.createComponent(factory);
    this.itemModalComponentRef.instance.item = this.item;

    this.itemModalComponentRef.instance.onItemSaved.subscribe($event => {
      this.item = $event;
    })

    this.itemModalComponentRef.instance.modal.open();
  }

  fetchItem(id: string) {
    this.loading = true
    this.itemService
      .get(id, { ref: 'inventory', include: 'sale_account,purchase_account,sale_tax,purchase_tax' })
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
