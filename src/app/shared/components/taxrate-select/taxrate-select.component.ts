import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { OrgService } from '../../../services';
import { TaxRate } from '../../../models/data/tax-rate';

@Component({
  selector: 'taxrate-select',
  templateUrl: './taxrate-select.component.html',
  styleUrls: ['./taxrate-select.component.scss']
})
export class TaxrateSelectComponent implements OnInit, OnChanges {
  
  @Input('org') org;

  @Input('selected') selected;

  @Output() onRateSelected = new EventEmitter<any>();

  data: TaxRate[];

  constructor(private orgService: OrgService) { }

  filterChanged(selected: string) {
    this.onRateSelected.emit(selected)
  }

  ngOnInit() {
    this.selected = this.selected ? this.selected : -1;
    const options = {
      perPage: 50,
    }

    this.orgService
      .getTaxRates(this.org.id, options)
      .subscribe(response => {
        this.data = response.data;
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;    
  }
}
