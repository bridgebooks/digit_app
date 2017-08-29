import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Contact } from '../../../models/data/contact';
import { JwtService, OrgService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  route$: Subscription;
  orgID: string;
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

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService, 
    private orgService: OrgService, 
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

    this.orgService
      .getContacts(this.orgID, options)
      .subscribe(response => {
        this.total = response.total
        this.contacts = response.data;
        this.currentPage = response.current_page;

        this.loading = false;
        this.cdRef.detectChanges();
      },
      err => {
        this.loading = false;
        this.cdRef.detectChanges();
      })
  }

  onDeleteSelected() {
    console.log(this.selected);
  }

  onAddtoGroup() {
    console.log(this.selected);
  }

  ngOnInit() { 
    this.orgID = this.jwtService.getToken().orgs[0].id;
    this.loading = true;

    this.route$ = this.route.params
      .filter(params => params.type)
      .subscribe(params => {
        this.type = params.type;
        this.refresh({});
      })
  }

  onSelectedChange(selected: Contact[]) {
    this.enableBulkOptions = selected.length > 0 ? true : false;
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
