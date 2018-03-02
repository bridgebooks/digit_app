import { 
  Component, 
  ViewChild,
  Input,
  Output, 
  EventEmitter, 
  OnInit
} from '@angular/core';
import { merge } from 'lodash';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CardFormComponent } from './card-form/card-form.component';
import { OtpFormComponent } from './otp-form/otp-form.component';
import { SuccessComponent } from './success/success.component';
import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../../services';
import { InvoicePayment } from '../../models/responses/invoice-payment';
import { MoneywaveResponse } from './moneywave-response';

@Component({
  selector: 'payment-wizard',
  templateUrl: './payment-wizard.component.html',
  styleUrls: ['./payment-wizard.component.scss']
})

export class PaymentWizardComponent implements OnInit {

  @ViewChild('contactForm') contactForm: ContactFormComponent;
  @ViewChild('cardForm') cardForm: CardFormComponent;
  @ViewChild('otpForm') otpForm: OtpFormComponent;
  @ViewChild('successPane') successPane: SuccessComponent;
  @Input('invoice') invoice;
  @Output() paymentSuccess: EventEmitter<any> = new EventEmitter();

  paymentResponse: InvoicePayment;
  paymentErrorMessage: string;
  paymentError = false;
  showWizard: boolean = false;
  disableActionBtn = true;
  nextBtnText = 'Next';
  currentStep = 'summary';
  nextStep = 'contact';
  previousStep: string;
  processing = false;

  model: any = {}

  constructor(private invoices: InvoiceService) {}

  open() {
    this.showWizard = true;
  }

  canCancel(step: string) {
    return ['summary', 'contact', 'card'].indexOf(step) !== -1 ? true : false;
  }

  resetWizard(done: boolean) {
    this.showWizard = false;
    this.model = {};
    this.currentStep = 'summary';
    this.nextStep = 'contact';
    this.paymentError = false;

    if (done) this.paymentSuccess.emit(true);
  }

  goNext(step: string) {
    switch(step) {
      case 'summary':
      this.gotoContactForm()
      break;
      case 'contact':
      this.gotoCardForm()
      break;
      case 'card':
      this.initPayment()
      break;
      case 'otp':
      this.validatePayment()
      break;
      case 'success':
      this.resetWizard(true);
      break;
    }
  }

  gotoContactForm() {
    this.currentStep = this.nextStep;
    this.previousStep = 'summary';
    this.nextStep = 'card'
    this.disableActionBtn = true;
    this.nextBtnText = 'Next'
  }

  gotoCardForm() {
    this.model = merge(this.model, this.contactForm.model);
    this.currentStep = this.nextStep;
    this.nextStep = 'otp';
    this.previousStep = 'card';
    this.disableActionBtn = true;
    this.nextBtnText = 'Pay'
  }

  gotoOtpForm() {
    this.currentStep = this.nextStep;
    this.nextStep = 'success'
    this.disableActionBtn = true;
    this.nextBtnText = 'Confirm Payment';
  }

  gotoSuccessPane() {
    this.currentStep = this.nextStep;
    this.nextBtnText = 'Done';
  }

  initPayment() {
    this.model = merge(this.model, this.cardForm.transformModel());
    this.processing = true;
    this.disableActionBtn = true;

    this.invoices.initPayment(this.invoice.id, this.model)
      .subscribe(response => {
        this.processing = false;
        this.disableActionBtn = false;
        this.paymentResponse = response;

        if ([ '02', '0', '00' ].indexOf(response.transfer.flutterChargeResponseCode) !== -1) {
          this.paymentError = false;
          if ([ '0', '00' ].indexOf(response.transfer.flutterChargeResponseCode) !== -1) {
            // show success message
          } else if (response.transfer.flutterChargeResponseCode === '02' && response.pendingValidation) {
            // check if authUrl is set
            if (response.authurl) {
              // redirect to auth url
              this.redirectToAuthURL(response.authurl);
            } else if (!response.authurl || response.chargeMethod === 'PIN') {
              // show otp form
              this.gotoOtpForm();
            }
          }
        } else {
          this.paymentError = true
          this.paymentErrorMessage = MoneywaveResponse.get(response.transfer.flutterChargeResponseCode);
        }
      }, err => {
        this.processing = false;
        this.disableActionBtn = false;
        this.paymentError = true;
        this.paymentErrorMessage = err.error.message;
      })
  }

  validatePayment() {
    const model = this.otpForm.model;
    this.processing = true;
    this.disableActionBtn = true;
    this.paymentError = false;

    this.invoices.verifyPayment(this.invoice.id, model)
      .subscribe(response => {
        this.processing = false;
        this.disableActionBtn = false;
        this.paymentError = false

        if ([ '0', '00', 'RR-00' ].indexOf(response.flutterChargeResponseCode) !== -1) {
          this.gotoSuccessPane();
        } else {
          this.paymentError = true
          this.paymentErrorMessage = MoneywaveResponse.get(response.flutterChargeResponseCode);
        }
      }, err => {
        this.processing = false;
        this.disableActionBtn = false;
        this.paymentError = true;
        this.paymentErrorMessage = err.error.message;
        this.resetWizard(false);
      })
  }

  redirectToAuthURL(url: string) {
    window.location.href = url;
  }

  onContactFormValid($event: boolean) {
   this.disableActionBtn = this.currentStep === 'contact' && $event ? false : true;
  }

  onCardFormValid($event: boolean) {
    this.disableActionBtn = this.currentStep === 'card' && $event ? false : true;
  }

  onOtpFormValid($event: boolean) {
    this.disableActionBtn = this.currentStep === 'otp' && $event ? false : true;
  }

  ngOnInit() {
  }
}
