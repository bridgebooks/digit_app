
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';

const routes: Routes = [
    {
        path: 'view/:id',
        component: PaymentDetailComponent,
        data: {
            title: 'Payment - Bridgebooks'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
