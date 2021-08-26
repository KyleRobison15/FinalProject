import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GardenItem } from '../models/garden-item';
import { AuthService } from './auth.service';
import { GardenItemService } from './garden-item.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateListingService {

  // private baseUrl = 'http://localhost:8095/';
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/gardenitems'

  constructor(
    private userSvc: UserService,
    private gardenItemSvc: GardenItemService,
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public update(gardenItem:GardenItem): Observable<GardenItem> {
    return this.http.put<GardenItem>(this.url, gardenItem, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error updating Listing ' + err);
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
