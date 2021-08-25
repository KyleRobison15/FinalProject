import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Produce } from '../models/produce';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProduceService {

    // private baseUrl = 'http://localhost:8095/';
    private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/produce'
  // private baseUrl = environment.baseUrl;

  private produceList: Produce[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  public index(){
    return this.http.get<Produce[]>(this.url, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting produce ' + err);
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
