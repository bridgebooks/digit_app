import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { ChartAccountsComponent } from './chart-accounts/chart-accounts.component';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
    { path: '', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'account', component: AccountComponent },
    { path: 'org', component: OrgProfileComponent },
    { 
      path: 'accounts',
      component: ChartAccountsComponent,
      data: {
        title: 'Chart Of Accounts - Bridge Books'
      }
    },
    {
      path: 'taxes',
      component: TaxRatesComponent,
      data: {
        title: 'Tax Rates - Bridge Books'
      }
    },
    {
      path: 'banking',
      component: BankAccountsComponent,
      data: {
        title: 'Banking - Bridge Books'
      }
    },
    {
      path: 'invoices',
      component: InvoicesComponent,
      data: {
        title: 'Invoice Settings - Bridge Books'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
