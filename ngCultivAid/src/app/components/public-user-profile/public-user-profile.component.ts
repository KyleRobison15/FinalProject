import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-user-profile',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.css']
})
export class PublicUserProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.user = this.userService.user;
      console.log(this.user);

    }

    // this.userService.getUser().subscribe(
    //   user => {
    //     this.user = user;
    //     console.log("Logged In User: " + this.user.username);
    //   },
    //   fail => {
    //     console.log('Invalid User ');
    //     this.router.navigateByUrl('notFound');
    //   }
    // )
  }
