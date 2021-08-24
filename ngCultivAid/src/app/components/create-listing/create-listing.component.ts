import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GardenItem } from 'src/app/models/garden-item';
import { Produce } from 'src/app/models/produce';
import { User } from 'src/app/models/user';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { ProduceService } from 'src/app/services/produce.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  newListing: GardenItem = new GardenItem();
  produces: Produce[] = [];
  produce: Produce = new Produce();

  //Will save Form Fields for Variety and Produce Name
  produceName: string = "";
  varietyName: string = "";

  noProduceName: Boolean = false;
  noVarietyName: Boolean = false;
  successfulAdd: Boolean = false;

  user: User = new User();

  constructor(
    private gvc: GardenItemService,
    private router: Router,
    private produceSvc: ProduceService,
    private userSvc: UserService
    ) { }

    ngOnInit(): void {

      this.userSvc.getLoggedInUser().subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error('Cannot find User');
        });

      this.produceSvc.index().subscribe(
        data => {
        this.produces = data;
      },
      err => {
        console.error('Could not retrieve produce list');
      });
    }//ngOnInit Method

    checkForCopy() {

      console.log("WE GOT TO CHECK FOR A COPY");
      console.log(this.produce);

      for (let item of this.user.gardenItems) {

        if(this.produce.name == item.produce.name){
          console.log(this.produce.name + "==" + item.produce.name);

          if(this.varietyName == item.variety) {
            console.log(this.varietyName + "==" + item.variety);
            console.log(".....Cannot add.....");
            return false;
          }
        }
      }

      return true;
  }

  addGardenItem(canAdd:Boolean) {

    // if(this.newListing.produce.id == 0 || this.produce.id == 0){
    //   this.noProduceName = true;
    // } else {
    //   this.noProduceName = false;
    // }

    // if(this.varietyName == "" || this.varietyName == null){
    //   this.noVarietyName = true;
    // } else {
    //   this.noVarietyName = false;
    // }

    if(canAdd) {

    this.newListing.produce.id = this.produce.id; //For Produce assignment
    this.newListing.variety = this.varietyName;
    this.newListing.user = this.user;
    this.persist();

      }
    }//Add Garden Item

  persist() {

    this.gvc.create(this.newListing).subscribe(
      data => {
        console.log("Successfully created Garden Item Listing");
        console.log("Items resetted");
        this.noProduceName = false;
        this.noVarietyName = false;
        this.successfulAdd = true;
        this.newListing = new GardenItem();
        this.produce = new Produce();
        this.varietyName = "";
      },
      fail => {
        console.log(this.newListing);
        console.error('Failed to Create Garden Item Listing');
        console.error(fail);
    });
  }

}
