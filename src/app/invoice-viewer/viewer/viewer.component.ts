import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PaymentWizardComponent } from '../payment-wizard/payment-wizard.component';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../services';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {

  @ViewChild('paymentWizard') paymentWizard: PaymentWizardComponent;
  route$: Subscription;
  loading: boolean = true;
  invoice: any;
  lineItemColumns: any[] = [
    { label: 'Description' },
    { label: 'Quantity' },
    { label: 'Unit Price' },
    { label: 'Disc %' },
    { label: 'Tax Rate' },
    { label: 'Amount' }
  ];

  constructor(private title: Title, private route: ActivatedRoute, private invoices: InvoiceService) { }

  onPaymentSuccess($event) {
    this.fetchInvoice(this.invoice.id);
  }

  onPayBtnClick() {
    this.paymentWizard.open();
  }

  fetchInvoice(id: string) {
    this.invoices.get(id, { ref: 'invoices', include: 'org,contact,items' })
      .subscribe(response => {
        this.loading = false;
        this.invoice = response.data;
        this.title.setTitle(`${this.invoice.contact.data.name} - ${this.invoice.invoice_no}`);
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
