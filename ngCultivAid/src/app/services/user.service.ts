import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //////////
  //Fields

  private baseUrl = 'http://localhost:8095/';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ///////////
  //Methods

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/users', this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): error getting logged in user.');
      })
    );
  }

  getHttpOptions() {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Basic ${credentials}`
      }),
    };
    return httpOptions;
  }
}
