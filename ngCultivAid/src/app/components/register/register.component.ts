import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.auth.register(this.newUser).subscribe( //this newUser has the clear text username and password. Register sends back a registered user with an encrypted password.
      user => {
        console.log('RegisterComponent.register(): user registered.');
        // Auto log in after creating an account
        this.auth.login(this.newUser.username, this.newUser.password).subscribe( //We always send the clear text password when logging in! Must use newUser here. Not the user we got back from registering.
          loggedInUser => {
            console.log('RegisterComponent.register(): user logged in, routing to /home');
            this.router.navigateByUrl('/home'); //
          },
          error => {
            console.error('RegisterComponent.register(): error logging in.');
            this.router.navigateByUrl('/login');
          }
        );
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        this.router.navigateByUrl('/register');
      }
    );
  }

}
