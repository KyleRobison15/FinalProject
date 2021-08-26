import { ExchangeImage } from "./exchange-image";
import { ExchangeItem } from "./exchange-item";
import { User } from "./user";

export class Exchange {

  id: number;
  rating: number;
	active: boolean;
	buyerComment: string;
	complete: boolean;
	accepted: boolean;
	exchangeDate: string;
	createDate: string;
	buyer: User;
  exchangeItems: ExchangeItem[] = [];
  exchangeImages: ExchangeImage[] = [];

  constructor(
    id: number = 0,
    rating: number = 0,
    active: boolean = true,
    buyerComment: string = '',
    complete: boolean = false,
    accepted: boolean = false,
    exchangeDate: string = '',
    createDate: string = '',
    buyer: User = new User(),
    exchangeItems: ExchangeItem[] = [],
    exchangeImages: ExchangeImage[] = []
  ){
    this.id = id;
    this.rating = rating;
    this.active = active;
    this.buyerComment = buyerComment;
    this.complete = complete;
    this.accepted = accepted;
    this.exchangeDate = exchangeDate;
    this.createDate = createDate;
    this.buyer = buyer;
    this.exchangeItems = exchangeItems;
    this.exchangeImages = exchangeImages;
  }

}
