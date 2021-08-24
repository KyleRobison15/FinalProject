import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../models/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8095/';
  private url = this.baseUrl + 'api/messages'
  // private baseUrl = environment.baseUrl;

  private messages: Message[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  public index(){
    console.log('in Index');

    return this.http.get<Message[]>(this.url, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting messages ' + err);
      })
    );
  }

  public create(message: Message){
    console.log(message.receivingUser.username);

    return this.http.post<Message>(`${this.url}/${message.receivingUser.username}`, message, this.getHttpOptions())
    .pipe(catchError((err: any) => {
      console.log(err);
      return throwError(`Error creating todo: ${err}`);
    })
    );
  }

  getHttpOptions(){
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Basic ${credentials}`
      })
    };
    return httpOptions;
  }

}
