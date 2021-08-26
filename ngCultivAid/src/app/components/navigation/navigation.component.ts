import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: User = new User();

  constructor(private auth: AuthService,
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {

  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  updateMessageCount() {
    return localStorage.getItem('messageCount');
  }

  isAdmin() {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    else {
      return false;
    }
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
