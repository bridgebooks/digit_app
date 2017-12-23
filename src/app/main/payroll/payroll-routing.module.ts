
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { PayrunsComponent } from './payruns/payruns.component';
import { PayrunComponent } from './payrun/payrun.component';

const routes: Routes = [
    { 
        path: 'employees', 
        component: EmployeeListComponent,
        data: {
            title: 'Employees - Bridge Books'
        }
    },
    {
        path: 'employees/edit',
        component: EmployeeFormComponent,
        data: {
            title: 'Add Employee - Bridge Books'
        }
    },
    {
        path: 'employees/edit/:id',
        component: EmployeeFormComponent,
        data: {
            title: 'Edit Employee - Bridge Books'
        }
    },
    {
        path: 'employees/view/:id',
        component: EmployeeDetailComponent,
        data: {
            title: 'Employee - Bridge Books'
        }
    },
    {
        path: 'runs',
        component: PayrunsComponent,
        data: {
            title: 'Payruns - Bridge Books'
        }
    },
    {
        path: 'runs/:id',
        component: PayrunComponent,
        data: {
            title: 'Payrun - Bridge Books'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
