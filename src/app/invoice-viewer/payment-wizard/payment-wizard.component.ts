import { 
  Component, 
  ViewChild,
  Input, 
  Output, 
  EventEmitter, 
  OnInit
} from '@angular/core';
import * as _ from 'lodash';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CardFormComponent } from './card-form/card-form.component';
import { OtpFormComponent } from './otp-form/otp-form.component';
import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../../services';
import { InvoicePayment } from '../../models/responses/invoice-payment';

@Component({
  selector: 'payment-wizard',
  templateUrl: './payment-wizard.component.html',
  styleUrls: ['./payment-wizard.component.scss']
})

export class PaymentWizardComponent implements OnInit {

  @ViewChild('contactForm') contactForm: ContactFormComponent;
  @ViewChild('cardForm') cardForm: CardFormComponent;
  @ViewChild('otpForm') otpForm: OtpFormComponent;
  @Input('invoice') invoice;

  paymentResponse: InvoicePayment;
  showWizard: boolean = false;
  disableActionBtn: boolean = true;
  nextBtnText: string = 'Next';
  currentStep: string = 'contact';
  nextStep: string = 'card';
  previousStep: string;
  processing: boolean = false;

  model: any = {}

  constructor(private invoices: InvoiceService) {}

  open() {
    this.showWizard = true;
  }

  goNext() {
    if (this.currentStep === 'contact') {
      this.model = _.merge(this.model, this.contactForm.model);
      this.currentStep = this.nextStep;
      this.nextStep = 'card';
      this.previousStep = 'contact';
      this.disableActionBtn = true;
      this.nextBtnText = 'Pay'
    }
    else if (this.currentStep === 'card') {
      this.model = _.merge(this.model, this.cardForm.transformModel());
      this.processing = true;
      this.disableActionBtn = true;
            
      this.invoices.initPayment(this.invoice.id, this.model)
        .subscribe(response => {
          this.processing = false;
          this.disableActionBtn = false;
          this.nextStep = 'otp';

          if (response.pendingValidation) {
            this.currentStep = this.nextStep;
            this.previousStep = 'card';
            this.disableActionBtn = true
            this.nextBtnText = 'Verify';
            this.paymentResponse = response;
          }
        }, err => {
          this.processing = false;
        })
    }
  }

  onContactFormValid($event: boolean) {
   this.disableActionBtn = this.currentStep === 'contact' && $event ? false : true;
  }

  onCardFormValid($event: boolean) {
    this.disableActionBtn = this.currentStep === 'card' && $event ? false : true;
  }

  onOtipFormValid($event: boolean) {
    this.disableActionBtn = this.currentStep === 'otp' && $event ? false: true;
  }

  ngOnInit() {
  }
}
