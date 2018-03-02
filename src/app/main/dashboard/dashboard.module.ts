import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { SessionService, OrgService } from '../../services';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarWidgetComponent } from './calendar-widget/calendar-widget.component';
import { ExpensechartWidgetComponent } from './expensechart-widget/expensechart-widget.component';
import { InvoicesWidgetComponent } from './invoices-widget/invoices-widget.component';
import { RecievablesWidgetComponent } from './recievables-widget/recievables-widget.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme)

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CalendarModule.forRoot(),
    FusionChartsModule
  ],
  declarations: [
    DashboardComponent,
    CalendarWidgetComponent,
    ExpensechartWidgetComponent,
    InvoicesWidgetComponent,
    RecievablesWidgetComponent
  ],
  providers: [
    SessionService,
    OrgService
  ]
})
export class DashboardModule { }
