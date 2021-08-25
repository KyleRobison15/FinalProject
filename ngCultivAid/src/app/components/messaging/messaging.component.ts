import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  user: User = new User ();
  messages: Message[] = [];
  sentMessages: Message [] = [];
  receivedMessages: Message [] = [];
  selected: Message | null = null;
  sendingMessage: boolean = false;
  viewingInbox: boolean = true;
  viewingSent: boolean = false;
  newMessage: Message = new Message();
  closeResult = '';
  activeTab: string = 'inbox';
  messageToDelete: Message = new Message();
  unreadMessageCount: number = 0;
  usernames: string[] = [];

  constructor(private messageService: MessageService,
              private modalService: NgbModal,
              private userService: UserService) { }

  ngOnInit(): void {
    this.reload();

    this.userService.getLoggedInUser().subscribe(
      user => {
        this.user = user;
        console.log("Logged In User: " + this.user.username);
        console.log("User Messages:" + this.user.receivedMessages);

      },
      fail => {
        console.log('Invalid User ');
      }
    );

    this.userService.getAllUsernames().subscribe(
      usernames => {
        this.usernames = usernames;
      },
      fail => {
        console.log('Invalid User ');
      }
    );
  }

  reload(){
    this.messageService.index().subscribe(
      data => {
        this.messages = data;
        data.forEach( (message) => {
          if (message.receivingUser.id === this.user.id) {
            this.receivedMessages.push(message);
          }
          if (message.sendingUser.id === this.user.id) {
            this.sentMessages.push(message);
          }

          this.messageService.getMessageCount();

        });
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

  // getMessageCount(user: User){
  //   this.messageService.index().subscribe(
  //     data => {
  //       data.forEach( (message) => {

  //         if (message.viewed === false && message.receivingUser.id === user.id && message.active === true) {
  //           this.unreadMessageCount += 1;
  //         }

  //       });
  //     },
  //     err => {
  //       console.error('Error getting message count from service: ' + err);
  //     }
  //   );
  // }

  markRead(message: Message){
    if (message.viewed === false) {
      return 'notViewed';
    }
    else{
      return '';
    }
  }

  markAsViewed(message: Message){
    this.messageService.markAsViewed(message).subscribe(
      data => {
        this.receivedMessages = [];
        this.sentMessages = [];
        this.reload();
      },
      error =>{
        console.log(error);
        console.log("MessagingComponent.markAsViewed(): Error marking message as viewed");
      }
    );
  }

  deactivateMessage(message: Message){
    this.messageService.deactivateMessage(message).subscribe(
      data => {
        this.receivedMessages = [];
        this.sentMessages = [];
        this.reload();
      },
      error =>{
        console.log(error);
        console.log("MessagingComponent.deactivateMessage(): Error deactivating message");
      }
    );
  }

  createMessage(){
    this.messageService.create(this.newMessage).subscribe(
      data => {
        this.receivedMessages = [];
        this.sentMessages = [];
        this.reload();
      },
      error =>{
        console.log(error);
        console.log("Error");
      }
    );
    this.newMessage = new Message();
  }

  openNewMessage(newMessage: any) {
    this.modalService.open(newMessage, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
    );
  }

  openDeleteMessage(message: any) {
    this.modalService.open(message, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
    );
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.usernames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, this.usernames.length + 1))
  )

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
