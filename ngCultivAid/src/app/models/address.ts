
export class Address {

  address: string;
  address2: string;
  city: string;
  stateAbbr: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  active: boolean;

  constructor(

    address: string = '',
    address2: string = '',
    city: string = '',
    stateAbbr: string = '',
    postalCode: string = '',
    latitude: number | null = null,
    longitude: number | null = null,
    active: boolean = true

  )

  {

    this.address = address;
    this.address2 = address2;
    this.city = city;
    this.stateAbbr = stateAbbr;
    this.postalCode = postalCode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.active = active;

  }


}
