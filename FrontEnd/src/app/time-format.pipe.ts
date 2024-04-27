import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const [hours, minutes] = value.split(':');
    let period = 'AM';
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
      period = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }

    return `${formattedHours}:${minutes} ${period}`;
  }

}
