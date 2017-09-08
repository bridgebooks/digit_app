import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ContactService } from '../../../services';

import { Contact } from '../../../models/data/contact';

import 'clarity-icons';
import 'clarity-icons/shapes/social-shapes';
import 'clarity-icons/shapes/technology-shapes';
import 'clarity-icons/shapes/travel-shapes';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

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
      .get(id, { include: 'bank' })
      .subscribe(response => {
        this.contact = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route.params
    .filter(params => params.id)
    .subscribe(params => {
      this.fetchContact(params.id);
    })
  }

}
