import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

enum LineAmountTypes {
  EXCLUSIVE = <any>'exclusive',
  INCLUSIVE = <any>'inclusive',
  NONE = <any>'no_tax'
}

@Component({
  selector: 'app-line-amount-type-select',
  templateUrl: './line-amount-type-select.component.html',
  styleUrls: ['./line-amount-type-select.component.scss']
})
export class LineAmountTypeSelectComponent implements OnInit, OnChanges {

  @Input('selected') selected;

  @Output() onTypeSelect = new EventEmitter();

  selectedOption;

  lineAmountTypeOptions: any[] = [
    { label: 'Tax Exclusive', value: LineAmountTypes.EXCLUSIVE },
    { label: 'Tax Inclusive', value: LineAmountTypes.INCLUSIVE },
    { label: 'No Tax', value: LineAmountTypes.NONE }
  ]

  constructor() { }

  select(option) {
    this.selectedOption = option.label;
    this.onTypeSelect.emit(option.value);
  }

  ngOnInit() {
    this.selectedOption = this.selected ? this.selected : this.lineAmountTypeOptions[0].label;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

}
