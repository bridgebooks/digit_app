import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS} from '@angular/forms';
import { PhoneNumber } from 'google-libphonenumber';

import { PhoneNumberValidator } from './phone.validator';
import { IntlPhoneNumberPipe } from '../../pipes/intl-phone-number';

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
    @Output() ngModelChange = new EventEmitter();

    private valFn = PhoneNumberValidator();

    private el: HTMLInputElement;
    private parsed: PhoneNumber;

    constructor(
        private elementRef: ElementRef,
        private intlPhoneNumberPipe: IntlPhoneNumberPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value) {
        const parsed = this.intlPhoneNumberPipe.parse(this.el.value, 'NG');
        this.el.value = this.intlPhoneNumberPipe.transform(parsed);

        this.ngModelChange.emit(this.el.value);
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
