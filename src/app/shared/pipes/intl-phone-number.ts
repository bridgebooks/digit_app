import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumber } from 'google-libphonenumber';

@Pipe({ name: 'intlPhoneNumber' })
export class IntlPhoneNumberPipe implements PipeTransform {

    phoneNumberUtil = PhoneNumberUtil.getInstance();

    transform (value: PhoneNumber) {
        return this.phoneNumberUtil.format(value, PhoneNumberFormat.E164);
    }

    parse (value: any, region: string) {
        try {
            return this.phoneNumberUtil.parse(value, 'NG');
        } catch (e) {
            return null;
        }
    }
}