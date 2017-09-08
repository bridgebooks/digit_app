import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { InvoiceEditorComponent } from './invoice-editor/invoice-editor.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ContactSelectComponent } from './contact-select/contact-select.component';

import { AlertService, SearchService, ContactService, OrgService } from '../../services';
import { LineAmountTypeSelectComponent } from './line-amount-type-select/line-amount-type-select.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    MyDatePickerModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesComponent, 
    InvoiceEditorComponent, 
    InvoiceEditComponent, 
    InvoiceListComponent, 
    ContactSelectComponent, 
    LineAmountTypeSelectComponent
  ],
  providers: [
    AlertService,
    SearchService,
    ContactService,
    OrgService
  ]
})
export class SalesModule { }