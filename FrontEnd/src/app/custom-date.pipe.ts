import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) return '';

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateParts = value.split('-');
    const month = months[parseInt(dateParts[1]) - 1];
    const day = parseInt(dateParts[2]);
    const year = parseInt(dateParts[0]);

    return `${day}   ${month}  ${year}`;
  }
}
