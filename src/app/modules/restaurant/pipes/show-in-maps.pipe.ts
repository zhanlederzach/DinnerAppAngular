import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterBlacklist'
})
export class FilterBlacklistPipe implements PipeTransform {

  blacklist = ['bitch', 'fuck'];

  transform(value: string, ...args: any[]): string {
    return value.split(' ')
      .map((word) => {
          this.blacklist.forEach(bad => {
            word = word.replace(bad, '*****');
          });
          return word;
        }
      ).join(' ');
    // return value + ' <a href="https://maps.google.com/?q=' + value + '> Show in maps </a>';
  }

}
