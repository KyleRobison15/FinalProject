import { Address } from "./address";
import { Exchange } from "./exchange";
import { GardenItem } from "./garden-item";
import { Message } from "./message";

export class User {

  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  active: boolean;
  imageUrl: string;
  role: string;
  address: Address;
  exchanges: Exchange [];
  gardenItems: GardenItem [];
  receivedMessages: Message [];
  sentMessages: Message[];
  createDate: Date | null;

  constructor(id: number = 0, firstName: string = '', lastName: string = '', phone: string = '', email: string = '', username: string = '',
              password: string = '', active: boolean = true, role: string = '', imageUrl: string = '', address: Address = new Address(),
    exchanges: Exchange[] = [], gardenItems: GardenItem[] = [], receivedMessages: Message[] = [], sentMessages: Message[] = [], createDate: Date | null = null)
  {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.active = active;
    this.role = role;
    this.imageUrl = imageUrl;
    this.address = address;
    this.exchanges = exchanges;
    this.gardenItems = gardenItems;
    this.receivedMessages = receivedMessages;
    this.sentMessages = sentMessages;
    this.createDate = createDate;
  }

}
