import { Category } from "./category";
import { GardenItem } from "./garden-item";

export class Produce {

  id: number;
  name: string;
  avgItemWeight: number;
  imageUrl: string;
  active: boolean;
  gardenItems: GardenItem [];
  category: Category;

  constructor(
    id: number = 0,
    name: string = '',
    avgItemWeight: number = 0,
    imageUrl: string = '',
    active: boolean = true,
    gardenItems: GardenItem [] = [],
    category: Category = new Category()
  )
  {
    this.id = id;
    this.name = name;
    this.avgItemWeight = avgItemWeight;
    this.imageUrl = imageUrl;
    this.active = active;
    this.gardenItems = gardenItems;
    this.category = category;
  }

}
