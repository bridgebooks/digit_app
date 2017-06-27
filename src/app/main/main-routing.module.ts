import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                data: {
                    title: 'Dashboard - DigIT',
                    showSideNav: false,
                    sidenavComponent: null
                }
            },
            {
                path: 'sales',
                loadChildren: './sales/sales.module#SalesModule',
                data: {
                    title: 'Sales - DigIT',
                    showSideNav: true,
                    sidenavComponent: 'sales'
                }
            },
            {
                path: 'purchases',
                loadChildren: './purchases/purchases.module#PurchasesModule',
                data: {
                    title: 'Purchases - DigIT',
                    showSideNav: true,
                    sidenavComponent: 'purchases'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
