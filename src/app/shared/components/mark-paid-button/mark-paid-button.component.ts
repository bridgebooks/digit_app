import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-mark-paid-button',
  templateUrl: './mark-paid-button.component.html',
  styleUrls: ['./mark-paid-button.component.scss']
})
export class MarkPaidButtonComponent implements OnInit, OnChanges {
  @Input('data') data: any;
  @Input('type') type:  'invoice' | 'payrun' | 'payslip';
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();
  processing: boolean = false;

  constructor(private payments: PaymentsService) { }

  private buildPayload() {
    const payload = {
      type: this.type,
      ref: this.data.id
    }

    return payload;
  }

  markPaid() {
    this.processing = true;

    this.payments
      .receive(this.buildPayload())
      .subscribe(response => {
        this.processing = false;
        this.onSuccess.emit(response);
      }, error => {
        this.processing = false;
      })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
