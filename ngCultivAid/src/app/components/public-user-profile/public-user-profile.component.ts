import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exchange } from 'src/app/models/exchange';
import { ExchangeImage } from 'src/app/models/exchange-image';
import { ExchangeItem } from 'src/app/models/exchange-item';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ApiExternalService } from 'src/app/services/api-external.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { MessageService } from 'src/app/services/message.service';
import { UpdateListingService } from 'src/app/services/update-listing.service';
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
    private authService: AuthService,
    private updateListingService: UpdateListingService
  ) {}

  ngOnInit(): void {
    let username = this.currentRoute.snapshot.paramMap.get('username');

    //If viewing own public profile
    if (!username) {
      username = this.authService.getLoggedInUsername();
    }

    if(username){
      this.userService.getUserByUsername(username).subscribe(
        user => {
          this.user = user;
          this.searchByZip();

            this.checkViewingOwnProfile();

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

    //subtract exchange item amounts from garden item amounts



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
        this.checkForOpenExchange();

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

  largePictureUrl: string = "";

  openPicture(addOrder: any, imageUrl: string) {
    this.largePictureUrl = imageUrl;
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

  isViewingOwnProfile: boolean = false;

  checkViewingOwnProfile(){
    console.log("In checkViewingOwnProfile()");
    this.userService.getLoggedInUser().subscribe(
      userToCheck => {
        if(this.user.username == userToCheck.username){
          this.isViewingOwnProfile = true;
        }
        else{
          this.checkForOpenExchange();
        }
        console.log("IS VIEWING OWN PROFILE? : " + this.isViewingOwnProfile);
      },
      fail => {
        console.log("In public profile: failed to get user in checkViewingOwnProfile()");

      }
    )
  }

  hasOpenExchange: boolean = false;
  userExchange: Exchange = new Exchange();

  checkForOpenExchange(){
    console.log("In checkForOpenExchange()");

    this.userService.getLoggedInUser().subscribe(
      loggedInUser => {
        console.log("LOGGED IN USER: ");
        console.log(loggedInUser);
            this.exchangeSvc.getSellerExchangesByUser(this.user).subscribe(
              sellerExchanges => {
                console.log("USER PROFILE EXCHANGES: ");
                console.log(sellerExchanges);
                for(let i=0; i<sellerExchanges.length; i++){
                  if(sellerExchanges[i].active && !sellerExchanges[i].complete && sellerExchanges[i].buyer.username == loggedInUser.username){
                    this.hasOpenExchange = true;
                    this.userExchange = sellerExchanges[i];
                    console.log("HAS OPEN EXCHANGE: " + this.hasOpenExchange);
                  }
                }
              },
              fail => {
                console.log("In public profile: failed to get sellerExchanges in checkForOpenExchange()");
              }
            )
          },
      fail => {
        console.log("In public user profile: Could not get loggedInUser in checkForOpenExchange()");
      }
    )


  }

  // alreadyHasOpenExchange: boolean = false;

  // checkForOpenExchange(){
  //   let loggedInUser = new User();

  //   this.userService.getLoggedInUser().subscribe(
  //     loggedUser =>{
  //       loggedInUser = loggedUser;

  //       for(let i=0; i<this.user.exchanges.length; i++){
  //         for(let j=0; j<loggedInUser.exchanges.length; i++){
  //           if(loggedInUser.exchanges[j].active){
  //             if(loggedInUser.exchanges[j].id == this.user.exchanges[i].id){
  //               this.alreadyHasOpenExchange = true;
  //             }
  //           }
  //         }
  //       }
  //     },
  //     fail =>{
  //       console.log("In public user profile: Failed to get logged in user");
  //     }
  //   )
  //   //if logged in user already has active but not completed exchange with user on page
  //   //if loggedInUser.exchanges.id == userOnProfile.exchanges.id
  //   //return true
  // }

}
