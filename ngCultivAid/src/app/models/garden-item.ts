import { Produce } from "./produce";
import { User } from "./user";

export class GardenItem {

  id: number;
  description: string;
  growMethod: string;
  dateExpected: string;
  amount: number;
  variety: string;
  pesticides: boolean;
  fertilizers: boolean;
  active: boolean;
  createdDate: string;
  user: User;
  // gardenItemComments
  // exchangeItems
  produce: Produce;


  constructor(id: number = 0, description: string = '', growMethod: string = '', dateExpected: string = '', amount: number = 0, variety: string = '',
              pesticides: boolean = false, fertilizers: boolean = false, active: boolean = true, createdDate: string = '',
              user: User = new User(), produce: Produce = new Produce ())
  {
    this.id = id;
    this.description = description;
    this.growMethod = growMethod;
    this.dateExpected = dateExpected;
    this.amount = amount;
    this.variety = variety;
    this.pesticides = pesticides;
    this.fertilizers = fertilizers;
    this.active = active;
    this.createdDate = createdDate;
    this.user = user;
    this.produce = produce;
  }
}
