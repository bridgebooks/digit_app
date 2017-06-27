import { AbstractControl } from '@angular/forms';
import { PhoneNumberValidator } from './phone.validator';

describe('Phone number Validator', () => {

  const validatorFn = PhoneNumberValidator;

  it('empty string is invalid', () => {
    const control = { value: '' }
    const result = validatorFn(control as AbstractControl);
    expect(result !== null).toBe(true);
    expect(result['phone']).toBe('');
  });
});