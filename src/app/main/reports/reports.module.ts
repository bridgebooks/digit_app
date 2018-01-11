import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from '@clr/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import {
  EventbusService,
  SessionService,
  AlertService,
  OrgService 
} from '../../services';
import { ReportsComponent } from './reports.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule.forRoot(),
    MyDatePickerModule,
    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsComponent],
  providers: [
    EventbusService,
    SessionService,
    AlertService,
    OrgService 
  ]
})
export class ReportsModule { }
