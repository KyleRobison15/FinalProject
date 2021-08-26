import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeImage } from '../models/exchange-image';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeImageService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private baseUrl = 'http://localhost:8095/';

  addExchangeImages(exchangeImages: ExchangeImage[]){
    return this.http.post<ExchangeImage[]>(this.baseUrl + 'exchangeImages', exchangeImages, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ExchangeService.getBuyerExchanges(): error getting buyer exchanges.');
      })
    );
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
