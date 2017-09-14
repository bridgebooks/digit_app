
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
    { path: '', component: SalesComponent },
    {
      path: 'invoices',
      component: InvoiceListComponent,
      data: {
        title: 'Invoices - Bridge Books'
      }
    },
    { 
      path: 'edit',
      component: InvoiceEditComponent,
      data: {
        title: 'Edit Invoice - Bridge Books'
      }
    },
    {
      path: 'items',
      component: InventoryComponent,
      data: {
        title: 'Inventory - Bridge Books'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
