import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SessionService, OrgService, StatsService } from '../../services';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SalesWidgetComponent } from './sales-widget/sales-widget.component';
import { PeriodSelectorComponent } from './period-selector/period-selector.component';
import { ClarityModule } from '@clr/angular';
import { ExpensesWidgetComponent } from './expenses-widget/expenses-widget.component';
import { ProfitLossWidgetComponent } from './profit-loss-widget/profit-loss-widget.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { InvoicesWidgetComponent } from './invoices-widget/invoices-widget.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClarityModule
  ],
  declarations: [
    DashboardComponent,
    SalesWidgetComponent,
    PeriodSelectorComponent,
    ExpensesWidgetComponent,
    ProfitLossWidgetComponent,
    BarChartComponent,
    InvoicesWidgetComponent
  ],
  providers: [
    SessionService,
    OrgService,
    StatsService
  ]
})
export class DashboardModule { }
