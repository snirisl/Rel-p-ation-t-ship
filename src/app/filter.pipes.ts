import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arrangement: any[], text: string, column: string): any[] {
    // if (text === '') {
    //   return arrangement;
    // }
    if (!arrangement) {
      return arrangement;
    }
    text = text.toLowerCase();

    return arrangement.filter(item => {
      return item.status.toLowerCase().includes(text);
    });
  }
}
