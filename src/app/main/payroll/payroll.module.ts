import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'angular2-moment';
import { MyDatePickerModule } from 'mydatepicker';
import { AlertService, TourService, EmployeeService, OrgService, PaymentsService, PayrunService, PayslipService, SearchService, SessionService } from '../../services';
import { SharedModule } from '../../shared/shared.module';
import { SettingsModule } from '../settings/settings.module';
import { EmployeeBulkactionDropdownComponent } from './employee-bulkaction-dropdown/employee-bulkaction-dropdown.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeSearchboxComponent } from './employee-searchbox/employee-searchbox.component';
import { PayitemAmountInputComponent } from './payitem-amount-input/payitem-amount-input.component';
import { PayitemInputComponent } from './payitem-input/payitem-input.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrunDetailComponent } from './payrun-detail/payrun-detail.component';
import { PayrunFormComponent } from './payrun-form/payrun-form.component';
import { PayrunListComponent } from './payrun-list/payrun-list.component';
import { PayrunReviewComponent } from './payrun-review/payrun-review.component';
import { PayrunComponent } from './payrun/payrun.component';
import { PayrunsComponent } from './payruns/payruns.component';
import { PayslipEditorComponent } from './payslip-editor/payslip-editor.component';
import { PayslipComponent } from './payslip/payslip.component';
import { SetupModalComponent } from './setup-modal/setup-modal.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule,
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
    TourService,
    SessionService,
    AlertService,
    SearchService,
    EmployeeService,
    PayrunService,
    PayslipService,
    OrgService,
    PaymentsService
  ]
})
export class PayrollModule { }
