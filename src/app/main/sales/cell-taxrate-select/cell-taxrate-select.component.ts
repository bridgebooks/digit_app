import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { SessionService, OrgService } from '../../../services';
import { Subject } from 'rxjs';

@Component({
  selector: 'cell-taxrate-select',
  templateUrl: './cell-taxrate-select.component.html',
  styleUrls: ['./cell-taxrate-select.component.scss']
})
export class CellTaxrateSelectComponent implements OnInit {

  @Input('selected') selected: any;
  
  @Input('row') row: any;

  @Output() rateSelected = new EventEmitter<any>();

  org: any;
  rates: any[] = [];
  hideRateSelector: boolean = true;
  fetching: boolean = false;
  fetching$: Subject<any> = new Subject();

  constructor(private session: SessionService, private orgService: OrgService) { }

  isSelected(id) {
    return this.selected === id;
  }

  showSelector() {
    this.hideRateSelector = false;
    if (this.rates.length < 1) this.refresh(); 
  }

  hideSelector() {
    this.hideRateSelector = true;
    this.fetching$.next();
  }

  selectItem(rate) {
    this.selected = rate.id;
    this.row.tax_rate_id = rate.id;
    this.row.tax_rate = rate;

    this.rateSelected.emit(this.row)

    this.hideRateSelector = true;
  }

  refresh() {
    this.fetching = true;

    this.orgService
      .getTaxRates(this.org.id, { perPage: 100 })
      .takeUntil(this.fetching$)
      .subscribe(response => {
        this.rates = response.data;
        this.fetching = false;
      },
      err => {
        this.fetching = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.selected);
    this.selected = changes.selected.currentValue;
    this.row = changes.row ? changes.row.currentValue : this.row;
  }

  ngOnDestroy() {
    this.fetching$.next();
    this.fetching$.complete();
  }

}
