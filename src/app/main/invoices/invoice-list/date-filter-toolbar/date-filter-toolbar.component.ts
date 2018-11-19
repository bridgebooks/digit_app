import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ClrModal } from '@clr/angular';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-filter-toolbar',
  templateUrl: './date-filter-toolbar.component.html',
  styleUrls: ['./date-filter-toolbar.component.scss']
})
export class DateFilterToolbarComponent implements OnInit {
  @ViewChild('rangepicker') rangePickerModal: ClrModal;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  useCustomRange = false;
  customRangeModel = {
    to: null,
    from: null
  }
  active = {
    label: 'Last 7 days',
    active: true,
    isCustom: false,
    to: moment().endOf('d'),
    from: moment().subtract(7, 'd').startOf('d')
  };

  options = [
    {
      label: 'Last 7 days',
      hasOptions: false,
      active: true,
      isCustom: false,
      to: moment().endOf('d'),
      from: moment().subtract(7, 'd').startOf('d')
    },
    {
      label: 'Last 30 days',
      active: false,
      isCustom: false,
      to: moment().endOf('d'),
      from: moment().subtract(30, 'd').startOf('d')
    }
  ]
  constructor() { }

  optionSelected(option) {
    this.options = this.options.map(o => {
      o.active = false;
      return o;
    });
    option.active = true;
    this.active = option;
    this.useCustomRange = option.isCustom ? true : false;
    this.selected.emit(option);
  }

  setCustomRange() {
    this.rangePickerModal.close();
    const format = 'YYYY-MM-DD';
    const from = moment(this.customRangeModel.from);
    const to = moment(this.customRangeModel.to);
    const label = `${from.format(format)} - ${to.format(format)}`;

    const option = {
      label,
      active: false,
      to,
      isCustom: true,
      from
    }

    this.options.push(option);
    this.optionSelected(option);
  }

  clearCustomRange() {
    this.useCustomRange = false;
    this.active = this.options[0];
    this.customRangeModel = {
      to: null,
      from: null
    }
    this.options.pop();
    this.optionSelected(this.options[0]);
  }

  ngOnInit() {
    this.selected.emit(this.active);
  }
}
