import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-item-table',
  templateUrl: './invoice-item-table.component.html',
  styleUrls: ['./invoice-item-table.component.scss']
})
export class InvoiceItemTableComponent implements OnInit {
  
  @Input('items') items;
  @Input('type') type: string;
  @Input('startItems') startItems: number;

  columns: any[] = [
    { label: null, width: 20, },
    { label: 'Item', width: 114 },
    { label: 'Description', width: 204 },
    { label: 'Qty', width: 63 },
    { label: 'Unit Price', width: 78 },
    { label: 'Disc %', width: 63 },
    { label: 'Account', width: 147 },
    { label: 'Tax Rate', width: 117 },
    { label: 'Amount', width: 98 }
  ]

  lineItems: any[] = []

  constructor() { }

  addInitialItems() {
    for (let i = 0; i < this.startItems; i++) {
      this.lineItems.push({
        item_id: null,
        description: null,
        quantity: null,
        unit_price: null,
        discount: null,
        account_id: null,
        tax_rate_id: null,
        amount: null
      });
    }
  }

  rowItemSelected(row) {
    row.quantity = 1;

    if (this.type === 'acc_rec' && row.item.sale_account) {
      row.account_id = row.item.sale_account.data.id;
      row.description = row.item.sale_description;
      row.unit_price = row.item.sale_unit_price;
    } else if (this.type === 'acc_pay' && row.item.purhcase_account) {
      row.accout_id = row.item.purhcase_account.data.id;
      row.description = row.item.purchase_description;
      row.unit_price = row.item.purchase_unit_price;
    }

    console.log(row);
  }

  ngOnInit() {
    if (this.startItems && this.startItems > 0) this.addInitialItems()
  }

}
