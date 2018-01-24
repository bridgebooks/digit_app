import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarWidgetComponent } from './calendar-widget/calendar-widget.component';
import { ExpensechartWidgetComponent } from './expensechart-widget/expensechart-widget.component';

import { SessionService, OrgService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxChartsModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    DashboardComponent, 
    CalendarWidgetComponent, 
    ExpensechartWidgetComponent
  ],
  providers: [
    SessionService,
    OrgService
  ]
})
export class DashboardModule { }