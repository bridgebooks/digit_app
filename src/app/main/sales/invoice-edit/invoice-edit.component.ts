import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, SessionService, InvoiceService } from '../../../services';
import { InvoiceUtils } from './invoice-utils';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  org: any;
  editing: boolean;
  saving: boolean = false;

  constructor(
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute, 
    private session: SessionService, 
    private invoiceService: InvoiceService
  ) { }

  buildInvoice(model) {
    let builder = new InvoiceUtils.Builder();
    
    builder
      .setType(model.type)
      .setOrg(model.org_id)
      .setTo(model.contact_id)
      .setRaisedAtDate(model.raised_at)
      .setDueDate(model.due_at)
      .setLineAmountType(model.line_amount_type)
      .setInvoiceNo(model.invoice_no)
      .setInvoiceReference(model.reference)
      .setItems(model.items)
      .setStatus(model.status)
      .setSubTotal(model.sub_total)
      .setTaxTotal(model.tax_total)
      .setTotal(model.total);
    
    return builder.get()
  }
  saveInvoice($event) {
    if (!this.editing) {
      let model = this.buildInvoice($event);
      this.saving = true;
      this.invoiceService.create(model)
        .subscribe(response => { 
          this.saving = false;
          this.alert.success('Invoice', 'Invoice successfully created', { timeOut: 3000 })
          this.router.navigate(['/sales/invoices']);
        }, 
        err => {
          this.saving = false;
        });
    }
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg()

    this.route.params.subscribe(param => {
      this.editing = param.id ? true : false;
    })
  }

  ngOnDestroy() {
  }
}
