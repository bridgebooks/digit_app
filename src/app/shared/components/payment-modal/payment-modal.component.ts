import {
  ViewChild,
  Input,
  Output,
  Component,
  OnInit
} from '@angular/core';
import { Modal } from '@clr/angular';
import { PaymentsService } from '../../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  @ViewChild('modal') modal: Modal;
  @Input('amount') amount: number;
  invoice_id: string;
  invoice_type: string;
  reference: string;
  paid_at: string;
  processing: boolean = false;

  constructor(
    private paymentsService: PaymentsService
  ) { }

  submit() {
    const payload = {
      invoice_id: this.invoice_id,
      invoice_type: this.invoice_type,
      reference: this.reference,
      amount: this.amount,
      paid_at: moment(this.paid_at).format('YYYY-MM-DD')
    }

    this.processing = true;

    this.paymentsService
      .receive(payload)
      .subscribe(response => {
        this.processing = false;
        console.log(response);
      }, error => {
        this.processing = false;
      })
  }

  ngOnInit() {
  }
}
