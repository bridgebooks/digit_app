import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import COUNTRIES from './countries';

export const CountrySelectComponentValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CountrySelectComponent),
  multi: true
};

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  providers: [CountrySelectComponentValueAccessor]
})
export class CountrySelectComponent implements OnInit, ControlValueAccessor {
  countries = COUNTRIES
  private _selectValue: any = '';
  private _inputValue;
  private hasValue;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

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

  ngOnInit() {}

}
