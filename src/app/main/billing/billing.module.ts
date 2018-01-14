import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

import { BillingRoutingModule } from './billing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SharedModule,
    BillingRoutingModule
  ],
  declarations: []
})
export class BillingModule { }
