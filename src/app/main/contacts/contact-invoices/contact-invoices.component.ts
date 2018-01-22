import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../../services/index';
import { State } from '@clr/angular/data/datagrid';

@Component({
  selector: 'app-contact-invoices',
  templateUrl: './contact-invoices.component.html',
  styleUrls: ['./contact-invoices.component.scss']
})
export class ContactInvoicesComponent implements OnInit, OnDestroy {

  @Input('contact') contact: string;
  @Input('type') type: string;
  loading: boolean = true;
  invoices: any[] = [];

  constructor(
    private contacts: ContactService
  ) { }

  refresh(state: State) {
    
    this.contacts.invoices(this.contact, { type: this.type })
      .subscribe(response => {
        this.loading = false;
        this.invoices = response.data;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
