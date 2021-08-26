import { Pipe, PipeTransform } from '@angular/core';
import { GardenItem } from '../models/garden-item';

@Pipe({
  name: 'sortAdminItems'
})
export class SortAdminItemsPipe implements PipeTransform {

  transform(gardenItems: GardenItem[]): GardenItem[] {
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

    for (let i = 0; i < gardenItems.length; i++) {
      let dates = [];
      dates.push(gardenItems[i].createdDate);                  //Push gardenItem create date and exchange dates create dates to dates array for garden Item
      gardenItems[i].exchangeItems.forEach(exchangeItem => {
        dates.push(exchangeItem.exchange.createDate);
        dates.push(exchangeItem.exchange.exchangeDate);
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
    ItemsAndDateArray.forEach(element => {          //push new order to all Users
      allGardenItems.push(element.item);
    });
    return allGardenItems;
  }




}
