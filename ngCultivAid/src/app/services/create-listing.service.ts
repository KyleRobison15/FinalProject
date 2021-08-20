import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GardenItem } from '../models/garden-item';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateListingService {
  private baseUrl = 'http://localhost:8095/';
  private url = this.baseUrl + 'api/createListings'

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

  create(gardenItem: GardenItem): Observable<GardenItem> {
    gardenItem.active = true;
    return this.http.post<GardenItem>(this.url, gardenItem, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('GardenItemService.create(): error creating gardenItem');
        return throwError(err);
      })
    );
  }

    //Get Http Options
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
