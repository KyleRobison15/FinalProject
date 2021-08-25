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
  produceId: number = 0;

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

        if(this.produceId == item.produce.id){
          console.log(this.produce.id + "==" + item.produce.id);

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

    if(canAdd) {

    this.produce.id = this.produceId;
    this.newListing.produce = this.produce; //For Produce assignment
    this.newListing.variety = this.varietyName;
    this.newListing.user = this.user;

    console.log(this.newListing);
    console.log(this.newListing.description);
    console.log("Just the ID here: " + this.produceId);
    console.log("New Produce ID: " + this.newListing.produce.id);
    console.log(this.newListing.variety);
    console.log(this.newListing.growMethod);



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
