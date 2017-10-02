import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-item-table',
  templateUrl: './invoice-item-table.component.html',
  styleUrls: ['./invoice-item-table.component.scss']
})
export class InvoiceItemTableComponent implements OnInit {
  
  @Input('items') items;
  @Input('type') type: string;
  @Output() lineItemChanged = new EventEmitter<any>();

  columns: any[] = [
    { label: null, width: 35, },
    { label: 'Item', width: 114 },
    { label: 'Description', width: 204 },
    { label: 'Qty', width: 50 },
    { label: 'Unit Price', width: 73 },
    { label: 'Disc %', width: 50 },
    { label: 'Account', width: 147 },
    { label: 'Tax Rate', width: 117 },
    { label: 'Amount', width: 68 },
    { label: null, width: 35 }
  ]

  constructor() { }

  rowItemSelected(row) {
    row.quantity = 1;

    if (this.type === 'acc_rec' && row.item.sale_account) {

      row.account_id = row.item.sale_account.data.id;
      row.description = row.item.sale_description;
      row.unit_price = row.item.sale_unit_price;
      row.account = row.item.sale_account ? row.item.sale_account.data : row.account ;
      row.tax_rate = row.item.sale_tax ?  row.item.sale_tax.data : row.tax_rate;
      row.tax_rate_id = row.item.sale_tax ? row.item.sale_tax.data.id : row.tax_rate.id
    } else if (this.type === 'acc_pay' && row.item.purhcase_account) {
      
      row.account_id = row.item.purhcase_account.data.id;
      row.description = row.item.purchase_description;
      row.unit_price = row.item.purchase_unit_price;
      row.account = row.item.purchase_account ? row.item.purchase_account.data : row.account ;
      row.tax_rate = row.item.purchase_tax ?  row.item.purchase_tax.data : row.tax_rate;
    }

    this.calculateLineAmount(row)
  }

  calculateLineAmount(row) {
    let discount = 0;
    if (row.discount && row.unit_price) discount = (row.discount/100) * row.unit_price;

    row.amount = (row.unit_price * row.quantity) - discount;
    this.lineItemChanged.emit(row);
  }

  ngOnInit() {
  }

}
