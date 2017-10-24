import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { InvoiceService } from '../../../services';

@Component({
  selector: 'invoice-status-button',
  templateUrl: './invoice-status-button.component.html',
  styleUrls: ['./invoice-status-button.component.scss']
})
export class InvoiceStatusButtonComponent implements OnInit, OnChanges {

  @Input('invoice') invoice: any;
  @Output() statusChanged = new EventEmitter<any>();
  status: string;
  btnText: string;
  show: boolean = true;
  submitting: boolean = false;

  constructor(private invoices: InvoiceService) { }

  private getBtnText() {
    let message: string = '';
    let status: string = '';

    switch (this.invoice.status.toLowerCase()) {
      case 'draft':
        message =  'Submit';
        status = 'submitted';
        break;
      case 'submitted':
        message = 'Authorize';
        status = 'authorized';
        break;
      case 'authorized':
        message = 'Void';
        status = 'voided';
        break;
      case 'sent':
        message = 'Void';
        status = 'voided';
    }
    return { 
      message, status
     }
  }

  updateStatus() {
    this.submitting = true;
    this.invoices.update(this.invoice.id, { status: this.status })
      .subscribe(response => {
        this.submitting = false;
        this.invoice = response.data;
        this.btnText = this.getBtnText().message;
        this.status = this.getBtnText().status;
        this.statusChanged.emit(response.data.status);
      }, err => {
        this.submitting = false;
      })
  }

  ngOnInit() {
    this.btnText = this.getBtnText().message;
    this.status = this.getBtnText().status;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.invoice.status = changes.current ? changes.current.currentValue : this.invoice.status;

    this.btnText = this.getBtnText().message;
    this.status = this.getBtnText().status;
  }
}
