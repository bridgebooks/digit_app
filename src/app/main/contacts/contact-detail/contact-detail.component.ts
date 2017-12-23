import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService, ContactService } from '../../../services';

import { Contact } from '../../../models/data/contact';

import '@clr/icons';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/travel-shapes';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  route$: Subscription
  contact: Contact;
  loading: boolean = true;
  showGroupDeleteModal: boolean = false;
  modalProcessing: boolean = false;
  modalActionBtnDisabled: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private alertService: AlertService, 
    private contactService: ContactService) { }

  deleteContact() {
    if (window.confirm('Are sure you want to delete this contact?')) {
      this.alertService.info('Delete contact', 'Please wait, contact is being deleted', { timeOut: 3000 });
      this.contactService.delete(this.contact.id)
        .subscribe(response => {
          this.alertService.success('Delete contact', 'Contact successfully delete', { timeOut: 5000 })
          this.router.navigate(['/contacts/customer']);
        }, err => {
        })
    }
  }

  removeGroup() {
    this.modalProcessing = true;
    this.modalActionBtnDisabled = true;

    this.contactService.update(this.contact.id, { contact_group_id: null })
      .subscribe(response => {
        this.contact = response.data
        this.modalProcessing = false;
        this.showGroupDeleteModal = false;
        this.modalActionBtnDisabled = false;        
        this.alertService.success('Contact group', 'Contact group successfully removed', { timeOut: 5000 });
      }, err => {
        this.modalProcessing = false;
        this.modalActionBtnDisabled = false;
      })
  }

  fetchContact(id: string) {
    this.contactService
      .get(id, { ref: 'contacts', include: 'bank' })
      .subscribe(response => {
        this.contact = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.fetchContact(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
