import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';

@Pipe({
  name: 'sortMessage'
})
export class SortMessagePipe implements PipeTransform {

  transform(messageList: Message[]): Message[] {
    return messageList.sort((a: Message, b: Message) => {
      console.log(a.createTime);
      console.log(b.createTime);
      if (a.createTime < b.createTime) {
        return 1;
      }
      else if (a.createTime > b.createTime) {
        return -1;
      }
      else {
        return 0;
      }
    });
  }


}
