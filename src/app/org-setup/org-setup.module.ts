import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { JwtService, SessionService, IndustryService, OrgService } from '../services';
import { OrgSetupRoutingModule } from './org-setup-routing.module';
import { OrgSetupComponent } from './org-setup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    OrgSetupRoutingModule,
  ],
  declarations: [OrgSetupComponent],
  providers: [SessionService, JwtService, IndustryService, OrgService]
})

export class OrgSetupModule { }
