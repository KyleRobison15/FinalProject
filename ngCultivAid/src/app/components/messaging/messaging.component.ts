import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  messages: Message[] = [];
  selected: Message | null = null;
  sendingMessage: boolean = false;
  receivingUser: User = new User();
  newMessage: Message = new Message();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.messageService.index().subscribe(
      data => {
        this.messages = data;
      },
      err => {
        console.error('Error getting messages from service: ' + err);
      }
    );
  }

  displaySingleMessage(message: Message): void {
    this.selected = message;
  }

  displayAllMessages(): void {
    this.selected = null;
    this.reload();
  }

  displayNewMessage(): void {
    this.selected = null;
    this.sendingMessage = true;
  }

  markRead(message: Message){
    if (message.viewed === true) {
      return 'viewed';
    }
    else{
      return '';
    }
  }

  createMessage(){
    this.messageService.create(this.newMessage).subscribe(
      data => {
        this.reload();
      },
      error =>{
        console.log(error);
        console.log("Error");
      }
    );
    this.newMessage = new Message();
  }

}
