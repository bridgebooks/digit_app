import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';

@NgModule({
  imports: [
    CommonModule,
    PurchasesRoutingModule
  ],
  declarations: [PurchasesComponent]
})
export class PurchasesModule { }
