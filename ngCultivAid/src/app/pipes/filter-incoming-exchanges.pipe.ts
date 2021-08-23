import { Pipe, PipeTransform } from '@angular/core';
import { Exchange } from '../models/exchange';

@Pipe({
  name: 'filterIncomingExchanges'
})
export class FilterIncomingExchangesPipe implements PipeTransform {

  transform(exchanges: Exchange[]): Exchange[] {
    let results: Exchange[] = [];

    for(let i=0; i<exchanges.length; i++){
      if(exchanges[i].active && !exchanges[i].accepted){
        results.push(exchanges[i]);
      }
    }
    return results;
  }
}
