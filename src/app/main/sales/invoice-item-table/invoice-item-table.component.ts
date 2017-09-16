import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-item-table',
  templateUrl: './invoice-item-table.component.html',
  styleUrls: ['./invoice-item-table.component.scss']
})
export class InvoiceItemTableComponent implements OnInit {

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

  lineItems: any[] = [
    {},
    {},
    {},
    {},
    {}
  ]

  constructor() { }

  ngOnInit() {
  }

}
