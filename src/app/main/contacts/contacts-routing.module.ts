
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";

const routes: Routes = [
    { path: '', component: ContactsComponent },
    { 
      path: 'edit', 
      component: ContactFormComponent, 
      data: {
        title: 'Add Contact - Bridge Books'
      }
    },
    { 
      path: 'edit/:id', 
      component: ContactFormComponent,
      data: {
        title: 'Edit Contact - Bridge Books'
      }
    },
    { path: 'view/:id', component: ContactDetailComponent },
    { 
      path: ':type', 
      component: ContactListComponent,
      data: {
        title: 'Contacts - Bridge Books'
      }
    },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
