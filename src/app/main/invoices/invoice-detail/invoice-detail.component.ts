import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, InvoiceService } from '../../../services';
import { PaymentModalComponent } from '../../../shared/components/payment-modal/payment-modal.component';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {

  route$: Subscription;
  loading: boolean = true;
  invoice: any;
  lineItemColumns: any[] = [
    { label: 'Item' },
    { label: 'Description' },
    { label: 'Quantity' },
    { label: 'Unit Price' },
    { label: 'Disc %' },
    { label: 'Account '},
    { label: 'Tax Rate' },
    { label: 'Amount' }
  ];

  @ViewChild('modalcontainer', { read: ViewContainerRef }) modalContainer;
  paymentModalComponentRef: ComponentRef<PaymentModalComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private invoices: InvoiceService
  ) { }

  isPaid() {
    return this.invoice.status !== 'paid' || this.invoice.status !== 'voided';
  }

  onStatusChanged($event) {
    this.invoice.status = $event;
  }

  fetchInvoice(id: string) {
    this.invoices.get(id, { ref: 'invoices', include: 'contact,items' })
      .subscribe(response => {
        this.loading = false;
        this.invoice = response.data;
      },
      err => {
        this.loading = false;
      });
  }

  showPaymentModal() {
    this.modalContainer.clear();
    const factory: ComponentFactory<PaymentModalComponent> = this.resolver.resolveComponentFactory(PaymentModalComponent);
    this.paymentModalComponentRef = this.modalContainer.createComponent(factory);

    this.paymentModalComponentRef.instance.amount = this.invoice.total;
    this.paymentModalComponentRef.instance.invoice_type = 'sales';
    this.paymentModalComponentRef.instance.invoice_id = this.invoice.id;
    this.paymentModalComponentRef.instance.modal.open();
  }

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.fetchInvoice(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
