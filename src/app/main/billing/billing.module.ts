import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { MomentModule, DateFormatPipe } from 'angular2-moment';

import {
  AlertService,
  UserService
} from '../../services';

import { BillingRoutingModule } from './billing-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BillingNavComponent } from './billing-nav/billing-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SharedModule,
    MomentModule,
    BillingRoutingModule
  ],
  declarations: [
    SubscriptionComponent,
    BillingNavComponent
  ],
  providers: [
    AlertService,
    UserService
  ]
})
export class BillingModule { }
