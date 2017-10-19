import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '../../shared';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { ChartAccountsComponent } from './chart-accounts/chart-accounts.component';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { UsersComponent } from './users/users.component';
import { UserinviteFormComponent } from './userinvite-form/userinvite-form.component';

const routes: Routes = [
    { path: '', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'account', component: AccountComponent },
    { path: 'org', component: OrgProfileComponent },
    { 
      path: 'accounts',
      component: ChartAccountsComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Chart Of Accounts - Bridge Books',
        acl: 'settings.accounts'
      }
    },
    {
      path: 'taxes',
      component: TaxRatesComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Tax Rates - Bridge Books',
        acl: 'settings.tax_rates'
      }
    },
    {
      path: 'banking',
      component: BankAccountsComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Banking - Bridge Books',
        acl: 'settings.bank_accounts'
      }
    },
    {
      path: 'invoices',
      component: InvoicesComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Invoice Settings - Bridge Books',
        acl: 'settings.invoices'
      }
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Users - Bridge Books',
        acl: 'settings.users'
      }
    },
    {
      path: 'users/add',
      component: UserinviteFormComponent,
      canActivate: [ACLGuard],
      data: {
        title: 'Invite User - Bridge Books',
        acl: 'settings.users'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ACLGuard]
})
export class SettingsRoutingModule { }
