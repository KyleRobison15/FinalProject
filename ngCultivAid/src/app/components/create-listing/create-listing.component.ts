import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GardenItem } from 'src/app/models/garden-item';
import { AuthService } from 'src/app/services/auth.service';
import { GardenItemService } from 'src/app/services/garden-item.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  newListing: GardenItem = new GardenItem();

  constructor(private gvc: GardenItemService, private router: Router) { }

  ngOnInit(): void {
  }

  addGardenItem(){
    this.gvc.create(this.newListing).subscribe(
      data => {
        console.log("Successfully created Garden Item Listing");
      },
      fail => {
        console.error('Failed to Create Garden Item Listing');
        console.error(fail);
      });

      this.newListing = new GardenItem();
  }

}
