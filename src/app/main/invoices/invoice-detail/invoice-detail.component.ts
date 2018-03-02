import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, InvoiceService } from '../../../services';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private invoices: InvoiceService
  ) { }

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

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.fetchInvoice(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
