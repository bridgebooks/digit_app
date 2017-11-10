import { Directive, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS} from '@angular/forms';
import { CreditCardNumberValidator } from './credit-cardno.validator';
import { CreditCardnoPipe } from '../../pipes/credit-cardno.pipe';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[cc-no]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CreditCardNumberDirective,
            multi: true
        }
    ]
})
export class CreditCardNumberDirective implements Validator {
    @Output() ngModelChange = new EventEmitter();

    private valFn = CreditCardNumberValidator();

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private creditCardNumberPipe: CreditCardnoPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('keypress', ['$event.target.value'])
    onKeyPress(value) {
        this.el.value = this.creditCardNumberPipe.transform(value);
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value) {
        this.el.value = this.creditCardNumberPipe.transform(value);                
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}