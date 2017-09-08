import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService, ContactService } from '../../../services';

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
  group = {
    name: null
  }
  showGroupForm: boolean = false;
  processing: boolean = false;
  addBtnDisable: boolean = false;

  constructor(
    private alertService: AlertService,
    private sessionService: SessionService, 
    private orgService: OrgService,
    private contactService: ContactService) { }

  addGroup() {
    this.processing = true;
    this.addBtnDisable = true;

    this.orgService.addContactGroup(this.org.id, this.group)
      .subscribe(response => {
        this.groups.unshift(response.data)
        this.processing = false;
        this.addBtnDisable = false;
        this.showGroupForm = false;
        this.group.name = null;
      }, err => {
        this.processing = false;
        this.addBtnDisable = false;
      })
  }

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
