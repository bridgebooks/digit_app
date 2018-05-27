import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SessionService, OrgService, StatsService } from '../../services';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SalesWidgetComponent } from './sales-widget/sales-widget.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    SalesWidgetComponent
  ],
  providers: [
    SessionService,
    OrgService,
    StatsService
  ]
})
export class DashboardModule { }
