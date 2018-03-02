import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from '@clr/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { LedgerRoutingModule } from './ledger-routing.module';

import { AccountComponent } from './account/account.component';
import { AccountsService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule,
    MyDatePickerModule,
    SharedModule,
    LedgerRoutingModule
  ],
  declarations: [
    AccountComponent
  ],
  providers: [
    AccountsService
  ]
})
export class LedgerModule { }
