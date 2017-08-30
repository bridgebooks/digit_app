import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from 'clarity-angular';

import { SearchService, OrgService, ContactService } from '../../services';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactBulkActionDropdownComponent } from './contact-bulk-action-dropdown/contact-bulk-action-dropdown.component';
import { ContactSearchBoxComponent } from './contact-search-box/contact-search-box.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SharedModule,    
    ContactsRoutingModule
  ],
  declarations: [
    ContactsComponent, 
    ContactFormComponent,
    ContactListComponent, 
    ContactDetailComponent, 
    ContactBulkActionDropdownComponent, 
    ContactSearchBoxComponent, 
    EmployeeListComponent
  ],
  providers: [
    SearchService, 
    OrgService,
    ContactService
  ]
})

export class ContactsModule { }

