import { Pipe, PipeTransform } from '@angular/core';
import { Exchange } from '../models/exchange';

@Pipe({
  name: 'filterBuyerExchanges'
})
export class FilterBuyerExchangesPipe implements PipeTransform {

  transform(exchanges: Exchange[]): Exchange[] {
    let results = [];

    for(let i=0; i<exchanges.length; i++){
      if(exchanges[i].active){
        results.push(exchanges[i]);
      }
    }
    return results;
  }

}
