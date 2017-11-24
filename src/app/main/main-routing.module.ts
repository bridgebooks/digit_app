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
                    title: 'Dashboard - Bridge Books',
                    showSideNav: false,
                    sidenavMenu: null
                }
            },
            {
                path: 'sales',
                loadChildren: './sales/sales.module#SalesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Sales - Brigde Books',
                    showSideNav: true,
                    sidenavMenu: 'sales'
                }
            },
            {
                path: 'purchases',
                loadChildren: './purchases/purchases.module#PurchasesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Purchases - Bridge Books',
                    showSideNav: true,
                    sidenavMenu: 'purchases'
                }
            },
            {
                path: 'contacts',
                loadChildren: './contacts/contacts.module#ContactsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Contacts - Bridge Books',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
                }
            },
            {
                path: 'payroll',
                loadChildren: './payroll/payroll.module#PayrollModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Payroll - Bridge Books',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
                }
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module.ts#SettingsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'General Settings - Bridge Books',
                    showSideNav: true,
                    sidenavMenu: 'settings'
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
