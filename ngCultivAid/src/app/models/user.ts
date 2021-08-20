import { Address } from "./address";
import { Exchange } from "./exchange";
import { GardenItem } from "./garden-item";

export class User {

  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  imageUrl: string;
  role: string;
  address: Address;
  exchanges: Exchange [];
  gardenItems: GardenItem [];

  constructor(id: number = 0, firstName: string = '', lastName: string = '', phone: string = '', email: string = '', username: string = '',
              password: string = '', enabled: boolean = true, role: string = '', imageUrl: string = '', address: Address = new Address(),
              exchanges: Exchange[] = [], gardenItems: GardenItem[] = [])
  {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.imageUrl = imageUrl;
    this.address = address;
    this.exchanges = exchanges;
    this.gardenItems = gardenItems;
  }

}
