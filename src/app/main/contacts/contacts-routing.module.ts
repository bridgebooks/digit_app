
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

const routes: Routes = [
    { path: '', component: ContactsComponent },
    { path: 'view/:id', component: ContactDetailComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: ':type', component: ContactListComponent },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
