import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GardenItem } from 'src/app/models/garden-item';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { GardenItemService } from 'src/app/services/garden-item.service';

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
    private gardenItemSvc: GardenItemService
  ) {}

  searchByZipForm: number[] = [];
  gardenItemsAndDistance: any[] = [];

  ngOnInit(): void {}

  searchByZip(form: NgForm) {

    this.router.navigateByUrl(`searchResult/${form.value.zip}/${form.value.distance}`);

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
}
