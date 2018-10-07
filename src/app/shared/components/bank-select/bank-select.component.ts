import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BankService } from '../../../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

export const BankSelectComponentValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankSelectComponent),
  multi: true
};

@Component({
  selector: 'app-bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.scss'],
  providers: [BankSelectComponentValueAccessor]
})
export class BankSelectComponent implements OnInit, ControlValueAccessor {
  banks$: Observable<any[]>;
  loading;
  private _selectValue: any = '';
  private _inputValue;
  private hasValue;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

  constructor(private banks: BankService) {
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
    this.banks$ = this.banks.all().map(response => response.data);
  }

}
