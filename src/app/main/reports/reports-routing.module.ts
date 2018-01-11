import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AgedReceivablesComponent } from './aged-receivables/aged-receivables.component';
import { AgedPayablesComponent } from './aged-payables/aged-payables.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportsComponent,
    data: {
      title: 'Reports - Bridgebooks',
      acl: 'reports'
    }
  },
  {
    path: 'balance-sheet',
    component: BalanceSheetComponent,
    data: {
      title: 'Balance Sheet - Bridgebooks',
      acl: 'reports'
    }
  },
  {
    path: 'profit-loss',
    component: ProfitLossComponent,
    data: {
      title: 'Profit & Loss - Bridgebooks',
      acl: 'reports'
    }
  },
  {
    path: 'aged-receivables',
    component: AgedReceivablesComponent,
    data: {
      title: 'Aged Receivables - Bridgebooks',
      acl: 'reports'
    }
  },
  {
    path: 'aged-payables',
    component: AgedPayablesComponent,
    data: {
      title: 'Aged Payables - Bridgebooks',
      acl: 'reports'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportsRoutingModule { }
