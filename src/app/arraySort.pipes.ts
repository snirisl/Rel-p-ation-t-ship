import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortArray'
})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<any>): Array<any> {
    array.sort((a: any, b: any) => {
      if (a.status > b.status) {
        return -1;
      } else if (a.status < b.status) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
