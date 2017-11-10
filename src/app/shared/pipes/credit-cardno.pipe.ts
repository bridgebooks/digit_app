import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardno'
})
export class CreditCardnoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim(); 
    return value.replace(/(\d{4}(?!\s))/g, "$1 ");
  }

}
