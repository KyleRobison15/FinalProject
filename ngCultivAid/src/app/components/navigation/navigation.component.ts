import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { MessagingComponent } from '../messaging/messaging.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  unreadMessageCount: string = '';
  user: User = new User();

  constructor(private auth: AuthService,
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {

    // this.userService.getLoggedInUser().subscribe(
    //   user => {
    //     this.user = user;
    //     this.getMessageCount(user);
    //   },
    //   fail => {
    //     console.log('Invalid User ');
    //   }
    // )

  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
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
  //       console.error('Error getting messages from service: ' + err);
  //     }
  //   );
  // }

}
