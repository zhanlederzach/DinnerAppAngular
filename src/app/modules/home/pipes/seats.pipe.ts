import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seats'
})
export class SeatsPipe implements PipeTransform {

  transform(value: number, arg: number): any {
    if (value < arg) {
      return `${value}`;
    } else {
      return `${arg}+`;
    }
  }
}
