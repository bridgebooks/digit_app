import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SessionService, OrgService, ContactService } from '../../../services';

@Component({
  selector: 'app-contact-group-select',
  templateUrl: './contact-group-select.component.html',
  styleUrls: ['./contact-group-select.component.scss']
})
export class ContactGroupSelectComponent implements OnInit {

  @Output() groupSelected = new EventEmitter();

  loading: boolean = false;
  org: any;
  groups: any[];
  selected: any;

  constructor(
    private sessionService: SessionService, 
    private orgService: OrgService,
    private contactService: ContactService) { }

  onGroupSelected($event) {
    this.groupSelected.emit(this.selected);
  }

  fetchGroups() {
    this.loading = true;
    this.orgService
      .getContactGroups(this.org.id)
      .subscribe(
        response => {
          this.groups = response.data
          this.loading = false;
        },
        err => {
          this.loading = false;          
        }
      )
  }

  ngOnInit() {
    this.org = this.sessionService.getDefaultOrg();
    this.fetchGroups();
  }
}
