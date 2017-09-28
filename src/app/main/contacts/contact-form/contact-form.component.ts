import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Contact } from '../../../models/data/contact';
import { ObjectUtils } from '../../../shared';
import { JwtService, AlertService, ContactService } from '../../../services';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  @ViewChild('contactForm') form;
  orgID: string;
  modelID: string;
  editing: boolean;
  processing: boolean = false;
  loading: boolean = false;
  model: any = {};
  types: object[] = [
    { label: 'Vendor', value: 'vendor' },
    { label: 'Customer', value: 'customer' }
  ];

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private jwtService: JwtService,
    private contactService: ContactService,
  ) { }

  onBankChange($event) {
    this.model.bank_id = $event;
    (this.form.controls['bank_id'] as FormControl).markAsDirty()    
  }

  getContact(id: string) {
    this.loading = true;
    this.contactService
      .get(id, {})
      .subscribe(response => {
        this.model = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  onSubmit() {
    this.processing = true;
    let model = ObjectUtils.getDirtyValues(this.form)  

    if (this.editing) {

      this.contactService
        .update(this.model.id, model)
        .subscribe(response => {
          this.model = response.data;
          this.processing = false;
          this.alertService.success('Contact', 'Contact sucessfully updated', { timeOut: 5000 })
        }, err => {
          this.processing = false;
        })
    } else {
      this.model.org_id = this.orgID;
      this.contactService
        .add(this.model)
        .subscribe(response => {
          this.model = response.data;
          this.processing = false;
          this.alertService.success('Contact', 'Contact sucessfully created', { timeOut: 3000 })
          this.form.resetForm();
        }, err => {
          this.processing = false;
        })
    }
  }

  ngOnInit() {
    this.orgID = this.jwtService.getToken().orgs[0].id;

    this.route.params
      .filter(params => params.id)
      .subscribe(params => {
        this.editing = params.id ? true : false;
        this.modelID = params.id ? params.id : null;

        if (this.editing) this.getContact(this.modelID);
      })
  }

  ngOnDestroy() {
  }
}
