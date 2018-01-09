import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from '@clr/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { SettingsModule } from '../settings/settings.module';
import { PayrollRoutingModule } from './payroll-routing.module';

import {
  EventbusService,
  SessionService,
  AlertService,
  SearchService, 
  EmployeeService, 
  PayrunService,
  PayslipService,
  OrgService 
} from '../../services';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeBulkactionDropdownComponent } from './employee-bulkaction-dropdown/employee-bulkaction-dropdown.component';
import { EmployeeSearchboxComponent } from './employee-searchbox/employee-searchbox.component';
import { PayrunsComponent } from './payruns/payruns.component';
import { PayrunFormComponent } from './payrun-form/payrun-form.component';
import { PayrunListComponent } from './payrun-list/payrun-list.component';
import { PayrunComponent } from './payrun/payrun.component';
import { PayslipEditorComponent } from './payslip-editor/payslip-editor.component';
import { PayitemInputComponent } from './payitem-input/payitem-input.component';
import { PayitemAmountInputComponent } from './payitem-amount-input/payitem-amount-input.component';
import { SetupModalComponent } from './setup-modal/setup-modal.component';
import { PayrunReviewComponent } from './payrun-review/payrun-review.component';
import { PayrunDetailComponent } from './payrun-detail/payrun-detail.component';
import { PayslipComponent } from './payslip/payslip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule.forRoot(),
    MyDatePickerModule,
    SharedModule,
    SettingsModule,
    PayrollRoutingModule
  ],
  entryComponents: [
    SetupModalComponent
  ],
  declarations: [
    EmployeeFormComponent, 
    EmployeeListComponent, 
    EmployeeDetailComponent,
    EmployeeBulkactionDropdownComponent,
    EmployeeSearchboxComponent,
    PayrunsComponent,
    PayrunFormComponent,
    PayrunListComponent,
    PayrunComponent,
    PayslipEditorComponent,
    PayitemInputComponent,
    PayitemAmountInputComponent,
    SetupModalComponent,
    PayrunReviewComponent,
    PayrunDetailComponent,
    PayslipComponent
  ],
  providers: [
    SessionService,
    AlertService,
    SearchService,
    EmployeeService,
    PayrunService,
    PayslipService,
    OrgService
  ]
})
export class PayrollModule { }
