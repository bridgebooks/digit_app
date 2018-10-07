import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IndustryService } from '../../../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

export const IndustrySelectComponentValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IndustrySelectComponent),
  multi: true
};

@Component({
  selector: 'app-industry-select',
  templateUrl: './industry-select.component.html',
  styleUrls: ['./industry-select.component.scss'],
  providers: [IndustrySelectComponentValueAccessor]
})
export class IndustrySelectComponent implements OnInit, ControlValueAccessor {
  industries$: Observable<any[]>;
  private _selectValue: any = '';
  private _inputValue;
  private hasValue;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

  constructor(private industries: IndustryService) {
  }

  get selectValue(): any {
    return this._selectValue;
  }
  set selectValue(value: any) {
    if (value !== this._selectValue) {
      this._inputValue = value;
      this._onChangeCallback(value);
    }

    this.hasValue = (value != null && value.length > 0)

    this._onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this._selectValue = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  ngOnInit() {
    this.industries$ = this.industries.all().map(response => response.data);
  }

}
