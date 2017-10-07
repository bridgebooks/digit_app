import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { InvoiceService } from '../../../services';

@Component({
  selector: 'invoice-print-button',
  templateUrl: './invoice-print-button.component.html',
  styleUrls: ['./invoice-print-button.component.scss']
})
export class InvoicePrintButtonComponent implements OnInit, OnChanges {

  @Input('invoice') invoice;

  show: boolean;
  downloading: boolean;

  constructor(private invoices: InvoiceService) { }

  download() {
    this.downloading = true;
    this.invoices.download(this.invoice.id).subscribe(response => {
      this.downloading = false;
      window.open(response.data.url, this.invoice.invoice_no);
    }, err => {
      this.downloading = false;
    })
  }

  ngOnInit() {
    this.show = true;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.invoice = changes.invoice ? changes.invoice.currentValue : this.invoice;
  }
}
