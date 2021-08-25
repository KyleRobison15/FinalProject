import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GardenItem } from '../models/garden-item';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GardenItemService {
    // private baseUrl = 'http://localhost:8095/';
    private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/gardenitems'
  private altUrl = this.baseUrl + 'gardenitems'

  // private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthService, private userSvc: UserService) { }

  public index(): Observable<GardenItem[]> {
    return this.http.get<GardenItem[]>(this.altUrl, this.getHttpOptions())
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error saving changes ' + err);
      })
    );
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

}//Service Class
