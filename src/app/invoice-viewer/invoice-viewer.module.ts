import { NgModule } from '@angular/core';
import {Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { MomentModule } from 'angular2-moment';


import { InvoiceService } from '../services';

import { InvoiceViewerRoutingModule } from './invoice-viewer-routing.module';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ClarityModule.forRoot(),
    InvoiceViewerRoutingModule
  ],
  declarations: [ViewerComponent],
  providers: [Title, InvoiceService]
})
export class InvoiceViewerModule { }
