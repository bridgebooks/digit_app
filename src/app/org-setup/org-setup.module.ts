import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { JwtService, SessionService, IndustryService, OrgService } from '../services';
import { OrgSetupRoutingModule } from './org-setup-routing.module';
import { OrgSetupComponent } from './org-setup.component';
import { OrgBasicComponent } from './org-basic/org-basic.component';
import { SharedModule } from '../shared/shared.module';
import { BankingComponent } from './banking/banking.component';
import { AccountingComponent } from './accounting/accounting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    SharedModule,
    OrgSetupRoutingModule,
  ],
  declarations: [OrgSetupComponent, OrgBasicComponent, BankingComponent, AccountingComponent],
  providers: [SessionService, JwtService, IndustryService, OrgService]
})

export class OrgSetupModule { }
