import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercaseFirstChar' })
export class UppercaseFirstCharacterPipe implements PipeTransform {

    transform (value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}