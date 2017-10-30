import { AbstractControl, ValidatorFn } from '@angular/forms';
import { number } from 'card-validator';

export function CreditCardNumberValidator(): ValidatorFn {
    const cardValidator = number

    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if(!control.value) {
            return null;
        } else {
            const isValid = cardValidator(control.value).isValid
            return isValid ? null : { 'cc-no': true }
        }
    };
}