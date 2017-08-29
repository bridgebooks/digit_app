import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { OrgService } from '../../services';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactBulkActionDropdownComponent } from './contact-bulk-action-dropdown/contact-bulk-action-dropdown.component';
import { ContactSearchBoxComponent } from './contact-search-box/contact-search-box.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent, ContactListComponent, ContactDetailComponent, ContactBulkActionDropdownComponent, ContactSearchBoxComponent, EmployeeListComponent],
  providers: [OrgService]
})

export class ContactsModule { }

