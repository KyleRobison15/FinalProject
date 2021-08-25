import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exchange } from 'src/app/models/exchange';
import { ExchangeItem } from 'src/app/models/exchange-item';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-user-profile',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.css'],
})
export class PublicUserProfileComponent implements OnInit {
  user: User = new User();

  exchangeItems: ExchangeItem[] = []; //request body
  exchangeItem = new ExchangeItem();
  exchangeData: any[] = [];
  newMessage: Message = new Message();
  closeResult = '';

  lat: number = 38.83628;
  lng: number = -104.77553;

  isCollapsed: boolean = true;
  isReviewCollapsed: boolean[] = [];

  userExchanges: Exchange[] = [];
  rating:number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private exchangeSvc: ExchangeService,
    private apiExt: ApiExternalService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let username = this.currentRoute.snapshot.paramMap.get('username');

    if (!username) {
      username = this.authService.getLoggedInUsername();
    }
    if(username){
      this.userService.getUserByUsername(username).subscribe(
        user => {
            this.user = user;

            this.user.gardenItems.forEach((item) => {
                let exchangeObject = Object();
                exchangeObject['itemId'] = item.id;
                exchangeObject['amount'] = 0;
                exchangeObject['checked'] = false;
                this.exchangeData.push(exchangeObject);
                console.log(this.exchangeData);
              });

            this.exchangeSvc.getSellerExchangesByUser(this.user).subscribe(
                exchanges => {

                  for(let i=0; i<exchanges.length; i++){
                    if(exchanges[i].complete){
                      this.userExchanges.push(exchanges[i]);
                      this.isReviewCollapsed.push(true);
                    }
                  }

                  //this.userExchanges = exchanges;
                  console.log("User exchanges: " + this.userExchanges.length);
                  for(let exchange of this.userExchanges){
                    this.rating += exchange.rating;
                  }
                  this.rating /= this.userExchanges.length;
                },
                error => {
                  console.log('failed to create exchange and exchange items');
                }
              );
          },
          error => {
            console.log('failed to get user');
          }
      );
    }
    else{
      this.router.navigateByUrl("/notFound");
    }
}

  submitExchangeRequest() {
    console.log(this.exchangeData);
    this.exchangeData.forEach(dataRow => {
      if (dataRow.checked) {
        this.exchangeItem.gardenItem.id = dataRow.itemId;
        this.exchangeItem.quantity = dataRow.amount;
        this.exchangeItems.push(this.exchangeItem);
        this.exchangeItem = new ExchangeItem();
      }
    });
    this.exchangeSvc.createExchange(this.exchangeItems).subscribe(
      exchange => {
        console.log('succesfully created exchange and items');
        this.exchangeItems = [];
        this.exchangeItem = new ExchangeItem();
      },
      error => {
        console.log('failed to create exchange and exchange items');
      }
    );
  }

  searchByZip() {
    this.apiExt.getLocationForZip(Number.parseInt(this.user.address.postalCode)).subscribe(
      (data) => {
        this.lat = data.results[0].geometry.location.lat;
        this.lng = data.results[0].geometry.location.lng;
      },
      (err) => {
        console.error(
          'publicUserProfileComponent.searchByZip(): error getting location'
        );
      }
    );
  }

  createMessage(){
    this.messageService.create(this.newMessage).subscribe(
      data => {
        console.log("Message Created Successfully.");

      },
      error =>{
        console.log(error);
        console.log("Error");
      }
    );
    this.newMessage = new Message();
  }

  open(addOrder: any) {
    this.modalService.open(addOrder, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
