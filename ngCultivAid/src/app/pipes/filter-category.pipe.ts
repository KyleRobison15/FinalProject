import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(items: any[], category: string): any[] {
    let result: any[] = [];
    items.forEach(item => {
      if (item[0].produce.category.name === category || category === '') {
        result.push(item);
      }
    });
    return result;
  }

}
