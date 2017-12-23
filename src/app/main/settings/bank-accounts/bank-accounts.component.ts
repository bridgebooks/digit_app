import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertService, SessionService, BankAccountService } from '../../../services';
import { State } from '@clr/angular/data/datagrid'
import { BankAccount } from '../../../models/data/bank-account';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {
  accounts: BankAccount[] = [];

  org: any;
  perPage: number = 30;
  currentPage: number;
  total: number;
  loading: boolean = true;

  deleteConfirmModalVisible: boolean = false;
  deleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;
  toDelete: BankAccount;

  constructor(private alertService: AlertService, 
    private session: SessionService, 
    private bankAccountService: BankAccountService,
    private cdRef: ChangeDetectorRef) { }

  onDelete(account: BankAccount) {
     this.deleteConfirmModalVisible = true;
     this.toDelete = account;
  }

  delete() {
    this.deleteProcessing = true;
    this.deleteBtnDisabled = true;
    this.bankAccountService.delete(this.org.id, this.toDelete.id)
      .subscribe(response => {
        this.deleteConfirmModalVisible = false;
        this.deleteProcessing = false;
        this.deleteBtnDisabled = false;
        this.refresh({});
      },
      err => {
        this.deleteProcessing = false;
        this.deleteBtnDisabled = false;
      })
  }

  refresh(state: State) {
    state.sort = state.sort || {
      by: 'name',
      reverse: false
    }

    const options = {
      page: this.currentPage,
      perPage: this.perPage,
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.bankAccountService
      .all(this.org.id, options)
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

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.currentPage = 1;
  }

}
