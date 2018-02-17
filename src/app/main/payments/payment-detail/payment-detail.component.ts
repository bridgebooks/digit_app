import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvoiceService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  payment: any;
  route$: Subscription

  constructor(
    private route: ActivatedRoute,
    private invoices: InvoiceService
  ) { }

  fetchPayment(id: string) {
    this.invoices
      .getPayment(id, {
        include: 'invoice,invoice.contact'
      })
      .subscribe(response => {
        this.payment = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.fetchPayment(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
