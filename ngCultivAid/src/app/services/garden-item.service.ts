import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GardenItem } from '../models/garden-item';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GardenItemService {
  private baseUrl = 'http://localhost:8095/';
  private url = this.baseUrl + 'api/gardenitems'
  // private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthService, private userSvc: UserService) { }

  index(): Observable<GardenItem[]> {
    return this.http.get<GardenItem[]>(this.url, this.getHttpOptions());
  }

  getItemsWithinDistanceOfZip(lat: number, lng: number, distance: number) : Observable<GardenItem[]> {
    return this.http.get<GardenItem[]>(`${this.baseUrl}gardenitems/zipsearch/${lat}&${lng}&${distance}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GardenItemService.getItemsWithinDistanceOfZip(): error getting items');
      })
    );
  }

  getItemsWithinDistanceOfUser(distance: number): Observable<GardenItem[]> {
    return this.http.get<GardenItem[]>(`${this.baseUrl}api/gardenitems/distancesearch/${distance}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GardenItemService.getItemsWithinDistanceOfZip(): error getting items');
      })
    );
  }



  create(gardenItem: GardenItem): Observable<GardenItem> {
    return this.http.post<GardenItem>(this.url, gardenItem, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('GardenItemService.create(): error creating gardenItem');
        return throwError(err);
      })
      );
    }

    //Get Http Options
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
