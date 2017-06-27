import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

export function PhoneNumberValidator(): ValidatorFn {
    const phoneNumberUtil = PhoneNumberUtil.getInstance();

    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if(!control.value) {
            return null;
        } else {
            try {
                const phoneNumberProto = phoneNumberUtil.parse(control.value, 'NG');
                const isValid = phoneNumberUtil.isValidNumber(phoneNumberProto);
                return isValid ? null : { 'phone': true };
            } catch (e) {
                return { 'phone': true };
            }
        }
    };
}