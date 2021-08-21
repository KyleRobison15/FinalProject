import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GardenItem } from 'src/app/models/garden-item';
import { Produce } from 'src/app/models/produce';
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
  produceItem: Produce = new Produce();

  constructor(
    private gvc: GardenItemService,
    private router: Router,
    private produceSvc: ProduceService,
    private userSvc: UserService
    ) { }

  ngOnInit(): void {
    this.produceSvc.index().subscribe(
      data => {
        this.produces = data;
      },
      err => {
        console.error('Could not retrieve produce list');
      });
    }

  addGardenItem(){

    console.log(this.produceItem.id);
    console.log(this.newListing);

    this.newListing.produce = this.produceItem; //For Produce assignment
    console.log(this.newListing);

    this.userSvc.getLoggedInUser().subscribe(
      data => {
        this.newListing.user = data;
        this.persist();
      },
      error => {
        console.error('Cannot find User');
      }
    );

  }

  persist() {
    this.gvc.create(this.newListing).subscribe(
      data => {
        console.log("Successfully created Garden Item Listing");
        console.log("Items resetted");
      },
      fail => {
        console.log(this.newListing);
        console.error('Failed to Create Garden Item Listing');
        console.error(fail);
      });

      this.newListing = new GardenItem();
      this.produceItem = new Produce();
  }

}
