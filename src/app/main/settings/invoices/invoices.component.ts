import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService, SessionService, OrgService } from '../../../services';
import { ObjectUtils } from '../../../shared';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  @ViewChild('invoiceSettingsForm') form;  
  org: any;
  model: any;
  loading: boolean = true;
  processing: boolean = false;
  paperSizes: any[] = [
    { label: 'A3', value: 'a3' },
    { label: 'A4', value: 'a4' },
    { label: 'A5', value: 'a5' },
    { label: 'Letter', value: 'letter' }
  ]

  constructor(private alert: AlertService, private session: SessionService, private orgService: OrgService) { }

  onAccountSelected($event) {
    this.model.org_bank_account_id = $event;
    (this.form.controls['org_bank_account_id'] as FormControl).markAsDirty() 
  }
  save() {
    const data = ObjectUtils.getDirtyValues(this.form)    
    this.processing = true;

    this.orgService.updateInvoiceSettings(this.org.id, data)
      .subscribe(response => {
        this.processing = false;
        this.model = response.data;

        this.alert.success('Invoice Settings', 'Settings updated successfully', {
          timeOut: 4000
        })
      },
      err => {
        this.processing = false;
      })
  }

  getSettings() {
    this.orgService
      .getInvoiceSettings(this.org.id)
      .subscribe(response => {
        this.model = response.data;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.getSettings();
  }

}
