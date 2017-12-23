import { Component, OnInit } from '@angular/core';
import { AlertService, SessionService, OrgService, TaxRateService } from '../../../services';
import { State } from '@clr/angular/data/datagrid'
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
  deleteConfirmModalVisible: boolean = false;
  deleteProcessing: boolean = false;
  deleteBtnDisabled: boolean = false;
  toDelete: TaxRate[] | TaxRate | null;

  constructor(
    private alertService: AlertService, 
    private session: SessionService, 
    private orgService: OrgService, 
    private taxRateService: TaxRateService) { }

  onDeleteSelected($event) {
    this.delete(this.selected)
  }

  delete(selection: TaxRate[] | TaxRate) {
    this.deleteConfirmModalVisible = true;

    if (Array.isArray(selection)) {
      this.toDelete = selection.filter((rate) => {
        return !rate.is_system;
      });
    }

    this.toDelete = selection;
  }

  deleteSelection() {
    this.deleteProcessing = true;
    this.deleteBtnDisabled = true;

    if (Array.isArray(this.toDelete)) {
      const ids = []
      this.toDelete.forEach(contact => ids.push(contact.id)) 
      this.taxRateService
        .deleteMany(ids)
        .subscribe(response => {
          this.alertService.success('Delete', 'Tax Rate(s) successfully deleted', { timeOut: 5000 })
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.deleteProcessing = false;
          this.toDelete = []

          this.refresh({})
        }, err => {
          this.deleteConfirmModalVisible = false;
          this.deleteBtnDisabled = false;
          this.deleteProcessing = false;
        })
    }
  }

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
      page: this.currentPage,
      perPage: this.perPage,
      include: 'components'      
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
