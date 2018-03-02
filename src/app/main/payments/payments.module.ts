import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from '@clr/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { InvoiceService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule,
    MyDatePickerModule,
    SharedModule,
    PaymentsRoutingModule
  ],
  declarations: [PaymentDetailComponent],
  providers: [
    InvoiceService
  ]
})
export class PaymentsModule { }
