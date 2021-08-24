import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  unreadMessageCount: number = 0;

  constructor(private auth: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessageCount();
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  getMessageCount(){
    this.messageService.index().subscribe(
      data => {
        data.forEach( (message) => {
          if (message.viewed) {
            this.unreadMessageCount += 1;
          }
        });
      },
      err => {
        console.error('Error getting messages from service: ' + err);
      }
    );
  }

}
