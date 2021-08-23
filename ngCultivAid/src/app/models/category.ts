export class Category {

  id: number;
  name: string;
  active: boolean;

  constructor (
    id: number = 0,
    name: string = '',
    active: boolean = true,
  )
  {
    this.id = id;
    this.name = name;
    this.active = active;
  }

}
