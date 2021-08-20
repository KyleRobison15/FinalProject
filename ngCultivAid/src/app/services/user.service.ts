import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //////////
  //Fields
  public user: User = new User();
  private baseUrl = 'http://localhost:8095/';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ///////////
  //Methods

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/users', this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.getLoggedInUser(): error getting logged in user.');
      })
    );
  }

  getUserByUsername(username: string): Observable<User> {
    let result = this.http.get<User>(this.baseUrl + 'users/' + username, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.getUserByUsername(): error getting user by username.');
      })
    );
    return result;
  }

  reroute(user: User){
    this.user = user;
    this.router.navigateByUrl(`/publicProfile/${this.user.username}`);
  }


  getHttpOptions() {
    const credentials = this.auth.getCredentials();
    if (credentials) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Basic ${credentials}`
        }),
      };
      return httpOptions;
    }
    else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }),
      };
      return httpOptions;
    }
  }
}
