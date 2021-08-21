import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortRecent'
})
export class SortRecentPipe implements PipeTransform {

  transform(array: any[]): any[] {
    array.sort((a: any, b: any) => {
      if (a[0].createdDate < b[0].createdDate) {
        return 1;
      }
      else if (a[0].createdDate > b[0].createdDate) {
        return -1;
      }
      else {
        return 0;
      }
    });
    if (array.length > 5) {
      array.length = 5;
    }
    return array;
  }

}
