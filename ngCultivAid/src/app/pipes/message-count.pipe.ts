import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageCount'
})
export class MessageCountPipe implements PipeTransform {

  transform(count: string): string | null{
    return localStorage.getItem('messageCount');
  }

}
