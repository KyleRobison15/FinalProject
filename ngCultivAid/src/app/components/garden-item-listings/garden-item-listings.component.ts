import { Component, OnInit } from '@angular/core';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { GardenItem } from '../../models/garden-item';

@Component({
  selector: 'app-garden-item-listings',
  templateUrl: './garden-item-listings.component.html',
  styleUrls: ['./garden-item-listings.component.css']
})
export class GardenItemListingsComponent implements OnInit {

  items: GardenItem[] = [];
  gardenItem : GardenItem | null = new GardenItem();

  constructor(private itemService : GardenItemService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.itemService.index().subscribe(
      data => {
        this.items = data;
      },
      fail => {
        console.error('Failed to Load Garden Items');
        console.error(fail);
      }
    );
  }

}
