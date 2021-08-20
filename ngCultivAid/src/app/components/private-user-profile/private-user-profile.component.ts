import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-private-user-profile',
  templateUrl: './private-user-profile.component.html',
  styleUrls: ['./private-user-profile.component.css']
})
export class PrivateUserProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        console.log("Logged In User: " + this.user.username);
      },
      fail => {
        console.log('Invalid User ');
        this.router.navigateByUrl('notFound');
      }
    )
  }

}
