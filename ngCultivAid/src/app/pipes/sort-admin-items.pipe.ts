import { Pipe, PipeTransform } from '@angular/core';
import { GardenItem } from '../models/garden-item';
import { User } from '../models/user';

@Pipe({
  name: 'sortAdminItems'
})
export class SortAdminItemsPipe implements PipeTransform {

  transform(gardenItems: GardenItem[], user: User): GardenItem[] {
    // return gardenItems.sort((a: any, b: any) => {        //Sort user and dates array by date
    //   if (a.createdDate < b.createdDate || a.createdDate == null) {
    //     return 1;
    //   }
    //   else if (a.createdDate > b.createdDate || b.createdDate == null) {
    //     return -1;
    //   }
    //   else {
    //     return 0;
    //   }
    // });


    let allGardenItems: GardenItem[] = [];
    let ItemsAndDateArray: any[] = [];

    for (let i = 0; i < gardenItems.length; i++) {           // For each garden item (that belongs to user)
      let dates = [];
      dates.push(gardenItems[i].createdDate);                  //Push gardenItem create date to dates array for garden Item
      user.exchanges.forEach(exchange => {          // for each exchange of the garden items USER....
        for (let k = 0; k < exchange.exchangeItems.length; k++) {     // for each exchange item in the exchange
          if (exchange.exchangeItems[k].gardenItem.id == gardenItems[i].id) {     // if the exchange items garden item matches the garden item we are checking...
            dates.push(exchange.createDate);    // push the exchange dates to dates array
            dates.push(exchange.exchangeDate);
          }
        };
      });
      dates.sort((a: any, b: any) => {              //Sort dates array
        if (a < b) {
          return 1;
        }
        else if (a> b) {
          return -1;
        }
        else {
          return 0;
        }
      });
      dates.slice(1);          //Reduce dates to one date
      ItemsAndDateArray.push({ item: gardenItems[i], date: dates[0] });          // push gardenItem and one date to ItemsAndDatesArray
    }
    ItemsAndDateArray.sort((a: any, b: any) => {        //Sort item and dates array by date
      if (a.date < b.date || a.date == null) {
        return 1;
      }
      else if (a.date > b.date || b.date == null) {
        return -1;
      }
      else {
        return 0;
      }
    });
    ItemsAndDateArray.forEach(element => {          //push new order to all garden Items
      allGardenItems.push(element.item);
    });
    return allGardenItems;
  }




}
