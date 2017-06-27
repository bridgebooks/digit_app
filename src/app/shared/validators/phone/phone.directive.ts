import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { PhoneNumberValidator } from './phone.validator';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[phone]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PhoneNumberDirective,
            multi: true
        }
    ]
})
export class PhoneNumberDirective implements Validator {
    private valFn = PhoneNumberValidator();

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}