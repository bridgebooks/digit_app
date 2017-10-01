import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService, AccountsService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid'
import { Account } from '../../../models/data/account';
import { TaxRate } from '../../../models/data/tax-rate';

import 'clarity-icons';
import 'clarity-icons/shapes/essential-shapes';

@Component({
  selector: 'app-chart-accounts',
  templateUrl: './chart-accounts.component.html',
  styleUrls: ['./chart-accounts.component.scss']
})

export class ChartAccountsComponent implements OnInit {

  accounts: Account[] = [];
  selected: Account[] = [];
  rates: TaxRate[] = [];
  types: any[] = [];

  org: any;
  perPage: number = 30;
  currentPage: number;
  total: number;
  loading: boolean = true;

  enableBulkOptions: boolean = false;
  deleteConfirmModalVisible: boolean = false;
  accountDeleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;
  toDelete: Account[] | Account | null;

  constructor(private alertService: AlertService, 
    private session: SessionService, 
    private orgService: OrgService, 
    private accountService: AccountsService,
    private cdRef: ChangeDetectorRef) { }
  
  onDeleteSelected($event) {
    this.delete(this.selected);
  }

  delete(selection: Account[] | Account) {
    this.deleteConfirmModalVisible = true;

    if (Array.isArray(selection)) {
      this.toDelete = selection.filter((account) => {
        return !account.is_system;
      });
    }

    this.toDelete = selection;
  }

  deleteSelection() {
    this.accountDeleteProcessing = true;
    this.deleteBtnDisabled = true;

    if (Array.isArray(this.toDelete)) {
      const ids = []
      this.toDelete.forEach(contact => ids.push(contact.id)) 
      this.accountService
        .deleteMany(ids)
        .subscribe(response => {
          this.alertService.success('Delete', 'Account(s) successfully deleted', { timeOut: 5000 })
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.accountDeleteProcessing = false;
          this.toDelete = []

          this.refresh({})
        }, err => {
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.accountDeleteProcessing = false;
        })
    } else {
      this.accountService
        .delete(this.toDelete.id)
        .subscribe(response => {
          this.alertService.success('Delete', 'Contact successfully deleted', { timeOut: 5000 })
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.accountDeleteProcessing = false;
          this.toDelete = []

          this.refresh({})
        }, err => {
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.accountDeleteProcessing = false;
        })
    }
  }

  onSelectedChange(selected: Account[]) {
    this.enableBulkOptions = selected.length > 0 ? true : false;
  }
  
  refresh(state: State) {
    state.sort = state.sort || {
      by: 'code',
      reverse: false
    }

    const options = {
      include: 'type,tax_rate',
      page: this.currentPage,
      perPage: this.perPage,
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.orgService
      .getAccounts(this.org.id, options)
      .subscribe(response => {
        this.accounts = response.data;
        this.total = response.total;
        this.currentPage = response.current_page;        
      },
      err => {
      },
      () => {
        this.loading = false;
        this.cdRef.detectChanges();
      })
  }

  fetchOrgTaxRates() {
    this.orgService.getTaxRates(this.org.id).subscribe(response => {
      this.rates = response.data
    })
  }

  fetchAccountTypes() {
    this.accountService.types().subscribe(response => {
      this.types = response.data;
    });
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.currentPage = 1;

    this.fetchAccountTypes();
    this.fetchOrgTaxRates();
  }

}
