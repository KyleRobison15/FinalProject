import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GardenItem } from 'src/app/models/garden-item';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { ProduceService } from 'src/app/services/produce.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private apiExt: ApiExternalService,
    private gardenItemSvc: GardenItemService,
    private userService: UserService,
    private produceService: ProduceService
  ) {}

  searchByZipForm: number[] = [];
  gardenItemsAndDistance: any[] = [];
  defaultDistance: number = 50;
  loggedInCss: string = '';
  wastePrevented: number = 0;

  ngOnInit(): void {
    this.loggedInCss = '';
    if (this.loggedIn()) {
      this.loggedInCss = 'loggedInCss';
      this.gardenItemSvc
        .getItemsWithinDistanceOfUser(this.defaultDistance)
        .subscribe(
          (data) => {
            this.gardenItemsAndDistance = data;
          },
          (err) => {
            console.error('HomeComponent.searchByZip(): error getting items');
            this.router.navigateByUrl('/home');
          }
        );
    }

    this.getWasteSavings();

  }

  searchByZip(form: NgForm) {
    this.router.navigateByUrl(
      `searchResult/${form.value.zip}/${form.value.distance}`
    );

    // console.log(form.value);
    // this.apiExt.getLocationForZip(form.value.zip).subscribe(
    //   (data) => {
    //     let lat = data.results[0].geometry.location.lat;
    //     let long = data.results[0].geometry.location.lng;

    //     this.gardenItemSvc.getItemsWithinDistanceOfZip(lat, long, form.value.distance).subscribe(
    //       (data) => {
    //         this.gardenItemsAndDistance = data;
    //       },
    //       (err) => {
    //         console.error('HomeComponent.searchByZip(): error getting items');
    //         this.router.navigateByUrl('/home');
    //       }
    //     );

    //   },
    //   (err) => {
    //     console.error('HomeComponent.searchByZip(): error getting location');
    //     this.router.navigateByUrl('/home');
    //   }
    // );
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
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

  getWasteSavings(){
    this.produceService.calculateWasteSavings().subscribe(
      (total) => {
        this.wastePrevented = total;
      },
      (fail) => {
        console.error(
          'HomeComponent: error getting waste savings'
        );
      }
    );
  }

}
