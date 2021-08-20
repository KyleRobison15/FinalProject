import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiExternalService {
  private geotagBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private mapsKey = '&key=AIzaSyBTIpKik_QLi-7lMw73oqiNABd7tV-JMgY';
  // private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLocationForAddress(user: User): Observable<any> {
    // Get Lat and Long for User Address
    let address = user.address.address;
    let city = user.address.city;
    let state = user.address.stateAbbr;
    let addrRequestString = `${address}+${city}+${state}`
    let component = `&components=postal_code:${user.address.postalCode}`
    let requestString = `${this.geotagBaseUrl}${addrRequestString}${component}${this.mapsKey}`;

    return this.http.get<any>(requestString)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ApiExternal.assignLocation(): error getting coordinates.');
      })
    );
  }

  getLocationForZip(zip: number): Observable<any> {
    // Get Lat and Long for User Address
    let addrRequestString = `${zip}`
    let component = `&components=postal_code:${zip}`
    let requestString = `${this.geotagBaseUrl}${addrRequestString}${component}${this.mapsKey}`;
    console.log(requestString);

    return this.http.get<any>(requestString)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ApiExternal.assignLocation(): error getting coordinates.');
      })
    );
  }
}
