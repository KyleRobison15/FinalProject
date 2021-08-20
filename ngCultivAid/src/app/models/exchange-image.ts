import { Exchange } from "./exchange";

export class ExchangeImage {

  imageUrl: string;
  active: boolean;
  exchange: Exchange;

  constructor(
    imageUrl: string = '',
    active: boolean = true,
    exchange: Exchange = new Exchange()
  ){
    this.imageUrl = imageUrl;
    this.active = active;
    this.exchange = exchange;
  }

}
