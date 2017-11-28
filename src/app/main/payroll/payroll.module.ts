import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { PayrollRoutingModule } from './payroll-routing.module';

import {
  SessionService,
  AlertService,
  SearchService, 
  EmployeeService, 
  OrgService 
} from '../../services';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeBulkactionDropdownComponent } from './employee-bulkaction-dropdown/employee-bulkaction-dropdown.component';
import { EmployeeSearchboxComponent } from './employee-searchbox/employee-searchbox.component';
import { PayrunsComponent } from './payruns/payruns.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    PayrunsComponent
  ],
  providers: [
    SessionService,
    AlertService,
    SearchService,
    EmployeeService,
    OrgService
  ]
})
export class PayrollModule { }
