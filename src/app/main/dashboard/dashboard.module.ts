import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SessionService, OrgService, StatsService } from '../../services';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    SessionService,
    OrgService,
    StatsService
  ]
})
export class DashboardModule { }
