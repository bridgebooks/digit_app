import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SessionService, SearchService, OrgService } from '../../../services';
import { Contact } from '../../../models/data/contact';

enum BtnStatus {
  DEFAULT = <any>'Select contact'
}

@Component({
  selector: 'app-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.scss']
})

export class ContactSelectComponent implements OnInit {
  btnText;
  selectModalVisible: boolean = false;
  results: Contact[] | any[];
  fetching: boolean;
  org: any;
  @Output() onContactSelected = new EventEmitter();

  constructor(
    private session: SessionService, 
    private searchService: SearchService, 
    private orgService: OrgService) { }

  selectContact(contact) {
    this.onContactSelected.emit(contact);
    this.btnText = contact.name;
    this.selectModalVisible = false;
  }

  openSelectModal() {
    this.selectModalVisible = true;
    this.fetchContacts();
  }

  fetchContacts() {
    this.fetching = true;

    this.orgService
      .getContacts(this.org.id, {})
      .subscribe(response => {
        this.results = response.data
        this.fetching = false;
      }, (err) => {
        this.fetching = false;
      })
  }

  ngOnInit() {
    this.btnText = BtnStatus.DEFAULT;
    this.org = this.session.getDefaultOrg();    
  }
}
