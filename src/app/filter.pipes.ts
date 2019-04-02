import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arrangement: any[], text: string, column: string): any[] {
    console.log(
      text + ' ' + column
    );
    if (text === '') {
      return arrangement;
    }

    text = text.toLowerCase();

    return arrangement.filter(item => {
      return item.status.toLowerCase().includes(text);
    });
  }
}
