
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

const routes: Routes = [
    { path: '', component: InvoicesComponent },
    {
      path: 'view/:id',
      component: InvoiceDetailComponent,
      data: {
        title: 'Invoice - Bridge Books'
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
      path: 'edit/:id',
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
    },
    {
      path: ':type',
      component: InvoiceListComponent,
      data: {
        title: 'Invoices - Bridge Books'
      }
    },
    {
      path: 'items/:id',
      component: InventoryDetailComponent,
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
