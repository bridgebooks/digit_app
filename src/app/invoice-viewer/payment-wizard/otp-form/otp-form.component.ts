import { 
  ViewChild, 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges, 
  OnInit, 
  AfterViewInit,
  OnChanges 
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { InvoicePayment } from '../../../models/responses/invoice-payment';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('form') form: ControlContainer;
  @Input('response') paymentResponse: InvoicePayment;
  @Output() formValid: EventEmitter<boolean> = new EventEmitter()
  formValid$: Subscription;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.formValid$ = this.form.statusChanges
      .distinctUntilChanged()
      .subscribe(state => {
        const valid = state === 'VALID' ? true : false;
        this.formValid.emit(valid);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.paymentResponse = changes.response ? changes.response.currentValue : this.paymentResponse
  }
}
