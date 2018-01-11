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
                    title: 'Dashboard - Bridgebooks',
                    showSideNav: false,
                    sidenavMenu: null
                }
            },
            {
                path: 'invoices',
                loadChildren: './invoices/invoices.module#InvoicesModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Invoices - Brigde Books',
                    showSideNav: true,
                    sidenavMenu: 'sales'
                }
            },
            {
                path: 'contacts',
                loadChildren: './contacts/contacts.module#ContactsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Contacts - Bridgebooks',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
                }
            },
            {
                path: 'payroll',
                loadChildren: './payroll/payroll.module#PayrollModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Payroll - Bridgebooks',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
                }
            },
            {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'Reports - Bridgebooks',
                    showSideNav: true,
                    sidenavMenu: 'contacts'
                }
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule',
                canActivate: [AuthGuard],
                data: {
                    title: 'General Settings - Bridgebooks',
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
