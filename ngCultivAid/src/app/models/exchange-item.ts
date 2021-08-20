// import { Exchange } from "./exchange";
import { Exchange } from "./exchange";
import { GardenItem } from "./garden-item";

export class ExchangeItem {

	quantity: number;
  active: boolean;
  exchange: Exchange;
  gardenItem:GardenItem;

  constructor(
    quantity = 0,
    active = true,
    exchange = new Exchange(),
    gardenItem = new GardenItem()
  ){
    this.quantity = quantity;
    this.active = active;
    this.exchange = exchange;
    this.gardenItem = gardenItem;
  }

}
