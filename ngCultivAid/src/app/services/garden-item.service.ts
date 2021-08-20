import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GardenItem } from '../models/garden-item';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GardenItemService {
  private baseUrl = 'http://localhost:8095/';
  // private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getItemsWithinDistanceOfZip(lat: number, lng: number, distance: number) : Observable<GardenItem[]> {
    return this.http.get<GardenItem[]>(`${this.baseUrl}gardenitems/zipsearch/${lat}&${lng}&${distance}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('GardenItemService.getItemsWithinDistanceOfZip(): error getting items');
      })
    );
  }


}
