import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private apiExt: ApiExternalService,
    private gardenItemSvc: GardenItemService,
    private userService: UserService,
    private currentRoute: ActivatedRoute
  ) {}

  loggedInUser: User = new User();

  searchByZipForm = {
    zip: 0,
    distance: 0,
    category: '',
    produce: '',
  };

  lat: number = 0;
  lng: number = 0;
  categories: string[] = [''];
  produce: string[] = [''];
  gardenItemsAndDistance: any[] = [];

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (err) => {
        console.log('error getting logged in user');
      }
    );

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
        this.lat = data.results[0].geometry.location.lat;
        this.lng = data.results[0].geometry.location.lng;

        this.gardenItemSvc
          .getItemsWithinDistanceOfZip(this.lat, this.lng, this.searchByZipForm.distance)
          .subscribe(
            (data) => {
              this.gardenItemsAndDistance = data;
              for (let i = 0; i < this.gardenItemsAndDistance.length; i++) {
                if (
                  !this.categories.includes(
                    this.gardenItemsAndDistance[i][0].produce.category.name
                  )
                ) {
                  this.categories.push(
                    this.gardenItemsAndDistance[i][0].produce.category.name
                  );
                }
                if (
                  !this.produce.includes(
                    this.gardenItemsAndDistance[i][0].produce.name
                  )
                ) {
                  this.produce.push(
                    this.gardenItemsAndDistance[i][0].produce.name
                  );
                }
                if (
                  this.gardenItemsAndDistance[i][0].user.id ===
                  this.loggedInUser.id
                ) {
                  this.gardenItemsAndDistance.splice(i, 1);
                  i--;
                }
              }
            },
            (err) => {
              console.error(
                'SearchResultComponent.searchByZip(): error getting items'
              );
              this.router.navigateByUrl('/home');
            }
          );
      },
      (err) => {
        console.error(
          'SearchResultComponent.searchByZip(): error getting location'
        );
        this.router.navigateByUrl('/home');
      }
    );
  }

  getUser(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        this.userService.reroute(user);
      },
      (fail) => {
        console.error(
          'publicUserProfileComponent: error getting user by username'
        );
      }
    );
  }
}
