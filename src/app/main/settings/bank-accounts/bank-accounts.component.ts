import { Component, OnInit } from '@angular/core';
import { AlertService, SessionService, BankAccountService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid'
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
  loading: boolean = false;

  deleteConfirmModalVisible: boolean = false;
  deleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;

  constructor(private alertService: AlertService, private session: SessionService, private bankAccountService: BankAccountService) { }

  delete(account: BankAccount) {
    
  }

  refresh(state: State) {
    this.loading = true;

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
        
        this.loading = false;
      },
      err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.currentPage = 1;
  }

}
