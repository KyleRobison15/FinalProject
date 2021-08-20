import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exchange } from '../models/exchange';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  //////////
  //Fields

  private baseUrl = 'http://localhost:8095/';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ///////////
  //Methods

  getBuyerExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.baseUrl + 'api/exchanges/buyer', this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ExchangeService.getBuyerExchanges(): error getting buyer exchanges.');
      })
    );
  }

  getSellerExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.baseUrl + 'api/exchanges/seller', this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ExchangeService.getSellerExchanges(): error getting seller exchanges.');
      })
    );
  }

  updateExchange(exchange: Exchange){
    return this.http.put<Exchange>(this.baseUrl + 'api/exchanges/', exchange, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ExchangeService.updateExchange(): error updating exchange.');
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
