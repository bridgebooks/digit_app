import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from 'clarity-angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { PayrollRoutingModule } from './payroll-routing.module';

import {
  SessionService,
  AlertService,
  SearchService, 
  EmployeeService, 
  PayrunService,
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule.forRoot(),
    MyDatePickerModule,
    SharedModule,
    PayrollRoutingModule
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
    PayslipEditorComponent
  ],
  providers: [
    SessionService,
    AlertService,
    SearchService,
    EmployeeService,
    PayrunService,
    OrgService
  ]
})
export class PayrollModule { }
