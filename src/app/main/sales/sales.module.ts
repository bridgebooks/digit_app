import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { InvoiceEditorComponent } from './invoice-editor/invoice-editor.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ContactSelectComponent } from './contact-select/contact-select.component';

import { AlertService, SearchService, ContactService, OrgService } from '../../services'

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    SalesRoutingModule
  ],
  declarations: [
    SalesComponent, 
    InvoiceEditorComponent, 
    InvoiceEditComponent, 
    InvoiceListComponent, 
    ContactSelectComponent
  ],
  providers: [
    AlertService,
    SearchService,
    ContactService,
    OrgService
  ]
})
export class SalesModule { }