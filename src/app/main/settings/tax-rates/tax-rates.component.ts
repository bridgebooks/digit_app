import { Component, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService } from '../../../services';
import { State } from 'clarity-angular/data/datagrid'
import { TaxRate } from '../../../models/data/tax-rate';

import 'clarity-icons';
import 'clarity-icons/shapes/essential-shapes';

@Component({
  selector: 'app-tax-rates',
  templateUrl: './tax-rates.component.html',
  styleUrls: ['./tax-rates.component.scss']
})
export class TaxRatesComponent implements OnInit {

  rates: TaxRate[] = [];
  selected: TaxRate[] = [];

  org: any;
  perPage: number = 30;
  currentPage: number;
  total: number;
  loading: boolean = false;

  enableBulkOptions: boolean;

  constructor(private alertService: AlertService, private session: SessionService, private orgService: OrgService) { }

  onSelectedChange(selected: Account[]) {
    this.enableBulkOptions = selected.length > 0 ? true : false;
  }

  refresh(state: State) {
    this.loading = true;

    state.sort = state.sort || {
      by: 'name',
      reverse: false
    }

    const options = {
      include: 'components',
      page: this.currentPage,
      perPage: this.perPage,
    }

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.orgService
      .getTaxRates(this.org.id, options)
      .subscribe(response => {
        this.rates = response.data;
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
