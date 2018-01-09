
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { PayrunsComponent } from './payruns/payruns.component';
import { PayrunComponent } from './payrun/payrun.component';
import { PayrunReviewComponent } from './payrun-review/payrun-review.component';
import { PayrunDetailComponent } from './payrun-detail/payrun-detail.component';
import { PayslipComponent } from './payslip/payslip.component';

const routes: Routes = [
    { 
        path: 'employees', 
        component: EmployeeListComponent,
        data: {
            title: 'Employees - Bridgebooks'
        }
    },
    {
        path: 'employees/edit',
        component: EmployeeFormComponent,
        data: {
            title: 'Add Employee - Bridgebooks'
        }
    },
    {
        path: 'employees/edit/:id',
        component: EmployeeFormComponent,
        data: {
            title: 'Edit Employee - Bridgebooks'
        }
    },
    {
        path: 'employees/view/:id',
        component: EmployeeDetailComponent,
        data: {
            title: 'Employee - Bridgebooks'
        }
    },
    {
        path: 'runs',
        component: PayrunsComponent,
        data: {
            title: 'Payruns - Bridgebooks'
        }
    },
    {
        path: 'runs/:id',
        component: PayrunComponent,
        data: {
            title: 'Payrun - Bridgebooks'
        }
    },
    {
        path: 'runs/:id/view',
        component: PayrunDetailComponent,
        data: {
            title: 'Payrun - Bridgebooks'
        }
    },
    {
        path: 'runs/:id/review',
        component: PayrunReviewComponent,
        data: {
            title: 'Review Payrun - Bridgebooks'
        }
    },
    {
        path: 'payslips/:id',
        component: PayslipComponent,
        data: {
            title: 'Payslip - Bridgebooks'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
