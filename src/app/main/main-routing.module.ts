import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Dashboard - DigIT',
                    showSideNav: false,
                    sidenavMenu: null
                }
            },
            {
                path: 'sales',
                loadChildren: './sales/sales.module#SalesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Sales - DigIT',
                    showSideNav: true,
                    sidenavMenu: 'sales'
                }
            },
            {
                path: 'purchases',
                loadChildren: './purchases/purchases.module#PurchasesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Purchases - DigIT',
                    showSideNav: true,
                    sidenavMenu: 'purchases'
                }
            },
            {
                path: 'contacts',
                loadChildren: './contacts/contacts.module#ContactsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Contacts - DigIT',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
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
