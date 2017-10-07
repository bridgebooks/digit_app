import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'invoice-edit-button',
  templateUrl: './invoice-edit-button.component.html',
  styleUrls: ['./invoice-edit-button.component.scss']
})
export class InvoiceEditButtonComponent implements OnInit {
  @Input('invoice') invoice;
  hidden: boolean;

  constructor() { }

  ngOnInit() {
    this.hidden = ['paid','voided'].indexOf(this.invoice.status) !== -1
  }

}
