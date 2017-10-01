import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService, InvoiceService } from '../../../services';
import { InvoiceUtils } from './invoice-utils';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  org: any;
  editing: boolean;

  constructor(private route: ActivatedRoute, private session: SessionService, private invoiceService: InvoiceService) { }

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
      .setStatus(model.status);
    
    return builder.get()
  }
  saveInvoice($event) {
    let model = this.buildInvoice($event);
    this.invoiceService.create(model).subscribe(response => console.log(response));
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
