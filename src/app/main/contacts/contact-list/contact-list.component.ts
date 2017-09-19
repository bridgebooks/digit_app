import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Contact } from '../../../models/data/contact';
import { SessionService, AlertService, OrgService, ContactService } from '../../../services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  route$: Subscription;
  org: any;
  type: string;
  contacts: Contact[];
  perPage: number = 30;
  currentPage: number = 1;
  total: number;
  orderBy: string = 'name';
  sortedBy: string = 'asc';
  loading: boolean;
  selected: Contact[] = [];

  enableBulkOptions: boolean = false;
  deleteConfirmModalVisible: boolean = false;
  contactDeleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;
  toDelete: Contact[] | Contact | null;

  contactGroupModalVisible: boolean = false;
  contactGroupProcessing: boolean = false;
  contactGroupBtnDisabled: boolean = true;
  selectedContactGroup: string;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private session: SessionService, 
    private orgService: OrgService, 
    private contactService: ContactService,
    private cdRef: ChangeDetectorRef) { 
  }

  refresh(state: any) {
    const options = {
      type: this.type,
      page: this.currentPage,
      perPage: this.perPage,
      orderBy: this.orderBy,
      sortedBy: this.sortedBy
    }
    this.loading = true;
    this.selected = [];

    this.orgService
      .getContacts(this.org.id, options)
      .subscribe(response => {
        this.total = response.total
        this.contacts = response.data;
        this.currentPage = response.current_page;

        this.loading = false;
        //this.cdRef.detectChanges();
      },
      err => {
        this.loading = false;
        this.cdRef.detectChanges();
      })
  }

  onDeleteSelected($event) {
    this.delete(this.selected);
  }

  onAddtoGroup($event) {
    this.contactGroupModalVisible = true;
  }

  delete(selection: Contact | Contact[]) {
    this.deleteConfirmModalVisible = true;
    this.toDelete = selection;
  }

  onSelectedChange(selected: Contact[]) {
    this.enableBulkOptions = selected.length > 0 ? true : false;
  }

  onContactGroupSelect($event) {
    if ($event) {
      this.contactGroupBtnDisabled = false;
      this.selectedContactGroup = $event;
    }
  }

  addToContactGroup() {
    this.contactGroupProcessing = true;
    this.contactGroupBtnDisabled = true;

    const contacts = [];
    this.selected.forEach(contact => contacts.push(contact.id));

    this.contactService
      .addToGroup(this.selectedContactGroup, contacts)
      .subscribe(response => {
        this.contactGroupModalVisible = false;
        this.contactGroupProcessing = false;
        this.contactGroupBtnDisabled = true;
        this.selectedContactGroup = '';
        this.selected = []
        this.alertService.success('Group', 'Contact(s) successfully added to group', { timeOut: 5000 })        

        this.refresh({});
        this.cdRef.detectChanges();
      }, err => {
        this.contactGroupProcessing = false;
        this.contactGroupBtnDisabled = false;
        this.cdRef.detectChanges();
      })
  }

  deleteSelection() {
    this.contactDeleteProcessing = true;
    this.deleteBtnDisabled = true;

    if (Array.isArray(this.toDelete)) {
      const ids = []
      this.toDelete.forEach(contact => ids.push(contact.id)) 
      this.contactService
        .deleteMany(ids)
        .subscribe(response => {
          this.alertService.success('Delete', 'Contact(s) successfully deleted', { timeOut: 5000 })
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.contactDeleteProcessing = false;
          this.toDelete = []

          this.refresh({})
          this.cdRef.detectChanges();
        }, err => {
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.contactDeleteProcessing = false;
          this.cdRef.detectChanges();
        })
    } else {
      this.contactService
        .delete(this.toDelete.id)
        .subscribe(response => {
          this.alertService.success('Delete', 'Contact successfully deleted', { timeOut: 5000 })
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.contactDeleteProcessing = false;
          this.toDelete = []

          this.refresh({})
          this.cdRef.detectChanges();
        }, err => {
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.contactDeleteProcessing = false;
          this.cdRef.detectChanges();
        })
    }
  }

  ngOnInit() { 
    this.org = this.session.getDefaultOrg()
    this.loading = true;

    this.route$ = this.route.params
      .filter(params => params.type)
      .subscribe(params => {
        this.type = params.type;
        this.refresh({});
      })
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
