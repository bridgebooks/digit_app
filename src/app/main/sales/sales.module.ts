import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule
  ],
  declarations: [SalesComponent]
})
export class SalesModule { }