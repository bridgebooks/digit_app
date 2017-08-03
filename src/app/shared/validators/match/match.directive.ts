import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[match][formControlName],[match][formControl],[match][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValidator), multi: true }
    ]
})
export class MatchValidator implements Validator {
    constructor(
        @Attribute('match') public match: string,
        @Attribute('reverse') public reverse: string) {}

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true: false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;

        // control vlaue
        let e = c.root.get(this.match);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                'match': true
            }
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            return { 'match': false }
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            return { 'match': false }
        }

        return null;
    }
}