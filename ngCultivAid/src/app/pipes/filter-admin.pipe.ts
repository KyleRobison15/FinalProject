import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterAdmin'
})
export class FilterAdminPipe implements PipeTransform {

  transform(userList: User[]): User[] {
    let allUsers: User[] = [];
    let userAndDateArray: any[] = [];

    for (let i = 0; i < userList.length; i++) {
      let dates = [];
      dates.push(userList[i].createDate);                  //Push user create date dates array for user
      userList[i].gardenItems.forEach(item => {            // For each garden Item belonging to user...
        dates.push(item.createdDate);                      // Push garden item created date to date array
        for (let k = 0; k < userList[i].exchanges.length; k++) {              // For users exchanges
          for (let z = 0; z < userList[i].exchanges[k].exchangeItems.length; z++) {    // For each exchange item in each exchange
            if (userList[i].exchanges[k].exchangeItems[z].gardenItem.id == item.id) {      // if the exchange items garden item matches the garden item we are on belonging to user
              dates.push(userList[i].exchanges[k].createDate);          // push the exchange dates to this user
              dates.push(userList[i].exchanges[k].exchangeDate);
            }

          }
        }
        // item.exchangeItems.forEach(exchangeItem => {
        //   dates.push(exchangeItem.exchange.createDate);
        //   dates.push(exchangeItem.exchange.exchangeDate);
        // });
      });

      dates.sort((a: any, b: any) => {              //Sort dates array
        if (a < b || a == null) {
          return 1;
        }
        else if (a > b || b == null) {
          return -1;
        }
        else {
          return 0;
        }
      });

      dates.slice(1);          //Reduce dates to one date
      userAndDateArray.push({ user: userList[i], date: dates[0] });          // push user and one date to userAndDatesArray
    }
    userAndDateArray.sort((a: any, b: any) => {        //Sort user and dates array by date
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
    userAndDateArray.forEach(element => {          //push new order to all Users
      allUsers.push(element.user);
    });

    return allUsers;
  }

}
