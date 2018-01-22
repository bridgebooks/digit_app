import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

import { SessionService, SearchService, OrgService, ContactService } from '../../services';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactBulkActionDropdownComponent } from './contact-bulk-action-dropdown/contact-bulk-action-dropdown.component';
import { ContactSearchBoxComponent } from './contact-search-box/contact-search-box.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactGroupSelectComponent } from './contact-group-select/contact-group-select.component';
import { ContactInvoicesComponent } from './contact-invoices/contact-invoices.component';
import { ContactBillsComponent } from './contact-bills/contact-bills.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    SharedModule,    
    MomentModule,
    ContactsRoutingModule
  ],
  declarations: [
    ContactsComponent, 
    ContactFormComponent,
    ContactListComponent, 
    ContactDetailComponent, 
    ContactBulkActionDropdownComponent, 
    ContactSearchBoxComponent, 
    ContactGroupSelectComponent, 
    ContactInvoicesComponent, 
    ContactBillsComponent
  ],
  providers: [
    SessionService,
    SearchService, 
    OrgService,
    ContactService
  ]
})

export class ContactsModule { }

