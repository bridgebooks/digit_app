import {
  ViewChild,
  Component,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { SessionService, SearchService, OrgService } from '../../../services';
import { Contact } from '../../../models/data/contact';
import { Modal } from '@clr/angular';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { Subject } from 'rxjs/Subject';

enum BtnStatus {
  DEFAULT = <any>'Select Contact'
}

@Component({
  selector: 'app-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.scss']
})

export class ContactSelectComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal: Modal;
  @ViewChild('modalcontainer', { read: ViewContainerRef }) modalContainer;
  contactModalComponentRef: ComponentRef<ContactModalComponent>;

  btnText;
  searchTerm$: Subject<string> = new Subject();
  results: any[] = [];
  fetching: boolean;
  org: any;

  @Input('selected') selected;
  @Input('type') type: string;
  @Output() onContactSelected = new EventEmitter();

  constructor(
    private resolver: ComponentFactoryResolver,
    private session: SessionService,
    private searchService: SearchService,
    private orgService: OrgService) { }

  showContactModal() {
    this.modalContainer.clear();
    const factory: ComponentFactory<ContactModalComponent> = this.resolver.resolveComponentFactory(ContactModalComponent);
    this.contactModalComponentRef = this.modalContainer.createComponent(factory);

    this.modal.close();
    this.contactModalComponentRef.instance.model.org_id = this.org.id;
    this.contactModalComponentRef.instance.model.type = this.type;
    this.contactModalComponentRef.instance.modal.open();

    this.contactModalComponentRef.instance.modal.
      _openChanged.subscribe(open => {
        if (!open) {
          this.modal.open();
        }
      });
  }

  selectContact(contact) {
    this.onContactSelected.emit(contact);
    this.btnText = contact.name;
    this.modal.close();
  }

  fetchContacts() {
    this.fetching = true;

    this.orgService
      .getContacts(this.org.id, {
        orderBy: 'created_at',
        sortedBy: 'desc',
        perPage: 5,
        ...(this.type && { type: this.type })
      })
      .subscribe(response => {
        this.results = response.data
        this.fetching = false;
      }, (err) => {
        this.fetching = false;
      })
  }

  ngOnInit() {
    this.btnText = (this.selected && this.selected.data) ? this.selected.data.name : BtnStatus.DEFAULT;
    this.org = this.session.getDefaultOrg();

    this.modal._openChanged.subscribe(open => {
      if (open) {
        this.fetchContacts();
      }
    })

    this.searchService
      .search(this.searchTerm$, { index: 'contacts', org_id: this.org.id })
      .subscribe(result => {
        this.results = result.data;
      });
  }

  ngOnDestroy() {
    if (this.contactModalComponentRef) {
      this.contactModalComponentRef.destroy();
    }
  }
}
