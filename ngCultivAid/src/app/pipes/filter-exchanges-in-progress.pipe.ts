import { Pipe, PipeTransform } from '@angular/core';
import { Exchange } from '../models/exchange';

@Pipe({
  name: 'filterExchangesInProgress'
})
export class FilterExchangesInProgressPipe implements PipeTransform {

  transform(exchanges: Exchange[]): Exchange[] {
    let filteredExchanges: Exchange[] = [];

    for(let i=0; i<exchanges.length; i++){
      if(exchanges[i].accepted && !exchanges[i].complete){
        filteredExchanges.push(exchanges[i]);
      }
    }
    return filteredExchanges;
  }
}
