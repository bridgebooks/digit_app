import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { MomentModule, DateFormatPipe } from 'angular2-moment';

import { SalesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceEditorComponent } from './invoice-editor/invoice-editor.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ContactSelectComponent } from './contact-select/contact-select.component';

import {
  AlertService,
  SearchService,
  ContactService,
  OrgService,
  ItemService,
  InvoiceService
} from '../../services';
import { LineAmountTypeSelectComponent } from './line-amount-type-select/line-amount-type-select.component';
import { InvoiceItemTableComponent } from './invoice-item-table/invoice-item-table.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { CellItemSelectComponent } from './cell-item-select/cell-item-select.component';
import { CellItemDescriptionComponent } from './cell-item-description/cell-item-description.component';
import { CellAccountSelectComponent } from './cell-account-select/cell-account-select.component';
import { CellTaxrateSelectComponent } from './cell-taxrate-select/cell-taxrate-select.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEmailButtonComponent } from './invoice-email-button/invoice-email-button.component';
import { InvoiceStatusButtonComponent } from './invoice-status-button/invoice-status-button.component';
import { InvoicePrintButtonComponent } from './invoice-print-button/invoice-print-button.component';
import { InvoiceEditButtonComponent } from './invoice-edit-button/invoice-edit-button.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    SharedModule,
    MomentModule,
    MyDatePickerModule,
    SalesRoutingModule
  ],
  entryComponents: [
    ItemModalComponent,
    ContactModalComponent
  ],
  declarations: [
    InvoicesComponent,
    InvoiceEditorComponent,
    InvoiceEditComponent,
    InvoiceListComponent,
    ContactSelectComponent,
    LineAmountTypeSelectComponent,
    InvoiceItemTableComponent,
    InventoryComponent,
    ItemModalComponent,
    InventoryDetailComponent,
    CellItemSelectComponent,
    CellItemDescriptionComponent,
    CellAccountSelectComponent,
    CellTaxrateSelectComponent,
    InvoiceDetailComponent,
    InvoiceEmailButtonComponent,
    InvoiceStatusButtonComponent,
    InvoicePrintButtonComponent,
    InvoiceEditButtonComponent,
    ContactModalComponent
  ],
  providers: [
    AlertService,
    SearchService,
    ContactService,
    OrgService,
    ItemService,
    InvoiceService,
    DateFormatPipe
  ]
})
export class InvoicesModule { }
