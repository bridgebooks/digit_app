import { Component, OnInit } from '@angular/core';
import { SessionService, OrgService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid'
import { Account } from '../../../models/data/account';

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

  org: any;
  perPage: number = 30;
  currentPage: number;
  total: number;
  loading: boolean = false;

  enableBulkOptions: boolean = false;
  deleteConfirmModalVisible: boolean = false;
  contactDeleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;
  toDelete: Account[] | Account | null;

  constructor(private session: SessionService, private orgService: OrgService) { }

  private 
  
  onDeleteSelected($event) {
    this.delete(this.selected);
  }

  delete(selection: Account | Account[]) {
    this.deleteConfirmModalVisible = true;
    this.toDelete = selection;
  }

  deleteSelection() {
  }

  onSelectedChange(selected: Account[]) {
    this.enableBulkOptions = selected.length > 0 ? true : false;
  }
  
  refresh(state: State) {
    this.loading = true;

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
