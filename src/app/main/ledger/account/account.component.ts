import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { State } from '@clr/angular';
import { AccountTransaction } from '../../../models/data/transaction';
import { Account } from '../../../models/data/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  fetching: boolean = true;
  route$: Subscription;
  id: string;
  account: Account;
  transactions: AccountTransaction[] = [];
  perPage: number = 20;
  currentPage: number = 1;
  total: number;

  constructor(
    private accounts: AccountsService,
    private route: ActivatedRoute
  ) { }

  refresh(state: State) {
    state.sort = state.sort || {
      by: 'created_at',
      reverse: true
    }

    const options = {
      page: this.currentPage,
      perPage: this.perPage,
      include: 'source'
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.accounts
      .getTransactions(this.id, options)
      .subscribe(response => {
        this.total = response.total;
        this.transactions = response.data;
        this.currentPage = response.current_page;
        this.loading = false;
      }, err => {
        this.loading = false;
      })
  }

  fetchAccount(id: string) {
    this.accounts.get(id, { include: 'type,tax_rate' })
      .subscribe(response => {
        this.account = response.data;
        this.fetching = false;
      }, err => {
        this.fetching = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params.filter(params => params.id).subscribe(params => {
      this.id = params.id
      this.fetchAccount(params.id);
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
