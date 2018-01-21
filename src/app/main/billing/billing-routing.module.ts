
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [  
    {
        path: 'subscription',
        component: SubscriptionComponent,
        data: {
            title: 'Active Subscription - Bridgebooks'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
