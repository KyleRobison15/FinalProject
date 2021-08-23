import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduce'
})
export class FilterProducePipe implements PipeTransform {

  transform(items: any[], produce: string): any[] {
    let result: any[] = [];
    items.forEach(item => {
      if (item[0].produce.name === produce || produce === '') {
        result.push(item);
      }
    });
    return result;
  }

}
