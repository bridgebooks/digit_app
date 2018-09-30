import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
import { URLValidator } from './url.validator';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[url]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: URLDirective,
            multi: true
        }
    ]
})
export class URLDirective implements Validator {
    @Output() ngModelChange = new EventEmitter();

    private valFn = URLValidator();

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
    ) {
        this.el = this.elementRef.nativeElement;
    }


    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
