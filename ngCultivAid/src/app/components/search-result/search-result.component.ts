import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private apiExt: ApiExternalService,
    private gardenItemSvc: GardenItemService,
    private userService: UserService,
    private currentRoute: ActivatedRoute
  ) { }

  searchByZipForm = {
    zip: 0,
    distance: 0
  };
  gardenItemsAndDistance: any[] = [];

  ngOnInit(): void {
    if (this.currentRoute.snapshot.paramMap.get('zip') !== null) {
      let zipCode: string = this.currentRoute.snapshot.params.zip;
      this.searchByZipForm.zip = Number.parseInt(zipCode);
    }
    if (this.currentRoute.snapshot.paramMap.get('miles') !== null) {
      let miles: string = this.currentRoute.snapshot.params.miles;
      this.searchByZipForm.distance = Number.parseInt(miles);
    }

    this.searchByZip();

  }

  searchByZip() {
    this.apiExt.getLocationForZip(this.searchByZipForm.zip).subscribe(
      (data) => {
        let lat = data.results[0].geometry.location.lat;
        let long = data.results[0].geometry.location.lng;

        this.gardenItemSvc.getItemsWithinDistanceOfZip(lat, long, this.searchByZipForm.distance).subscribe(
          (data) => {
            this.gardenItemsAndDistance = data;
          },
          (err) => {
            console.error('SearchResultComponent.searchByZip(): error getting items');
            this.router.navigateByUrl('/home');
          }
        );


      },
      (err) => {
        console.error('SearchResultComponent.searchByZip(): error getting location');
        this.router.navigateByUrl('/home');
      }
    );
  }

  getUser(username: string){
    this.userService.getUserByUsername(username).subscribe(
      user => {
        this.userService.reroute(user);
      },
      fail=> {
        console.error('publicUserProfileComponent: error getting user by username');
      }

    )
  }
  }
