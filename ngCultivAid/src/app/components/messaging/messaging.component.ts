import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  messages: Message[] = [];
  selected: Message | null = null;

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
  }

}
