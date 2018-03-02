import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { MomentModule, DateFormatPipe } from 'angular2-moment';

import {
  AlertService,
  UserService,
  PlanService
} from '../../services';

import { BillingRoutingModule } from './billing-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BillingNavComponent } from './billing-nav/billing-nav.component';
import { PlanPickerComponent } from './plan-picker/plan-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    SharedModule,
    MomentModule,
    BillingRoutingModule
  ],
  declarations: [
    SubscriptionComponent,
    BillingNavComponent,
    PlanPickerComponent
  ],
  providers: [
    AlertService,
    UserService,
    PlanService
  ]
})
export class BillingModule { }
