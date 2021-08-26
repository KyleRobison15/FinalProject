import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange';
import { GardenItem } from 'src/app/models/garden-item';
import { User } from 'src/app/models/user';
import { CreateListingService } from 'src/app/services/create-listing.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { resourceLimits } from 'worker_threads';
import { isConstructorDeclaration } from 'typescript';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Produce } from 'src/app/models/produce';
import { ProduceService } from 'src/app/services/produce.service';
import { UpdateListingService } from 'src/app/services/update-listing.service';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { ExchangeImage } from 'src/app/models/exchange-image';
import { ExchangeImageService } from 'src/app/services/exchange-image.service';

@Component({
  selector: 'app-private-user-profile',
  templateUrl: './private-user-profile.component.html',
  styleUrls: ['./private-user-profile.component.css'],
})
export class PrivateUserProfileComponent implements OnInit {
  isBuyerCollapsed: boolean[] = [];
  isSellerCollapsed: boolean[] = [];
  isInProgressCollapsed: boolean[] = [];
  isReviewCollapsed: boolean[] = [];

  user: User = new User();
  editedUser: User = new User();

  buyerExchanges: Exchange[] = [];

  buyerExchangesLoaded: boolean = false;

  sellerExchanges: Exchange[] = [];

  //For Index and Update Methods
  items: GardenItem[] = [];
  activeListings: GardenItem[] = [];

  //For Remove Method
  itemToRemove: GardenItem | null = null;
  removeListItems: GardenItem[] = [];
  inactiveListings: GardenItem[] = [];
  reviewedExchange: Exchange[] = [];


  editing: boolean = false;
  editingPicture: boolean = false;

  closeResult = '';

  passwordChangeForm = {
    curPassword: '',
    newPassword: '',
    matchPassword: ''
  };

  constructor(
    private userService: UserService,
    private exchangeService: ExchangeService,
    private router: Router,
    private createListing: CreateListingService,
    private gardenItemSvc: GardenItemService,
    private modalService: NgbModal,
    private authSvc: AuthService,
    private messageService: MessageService,
    private exchangeImageService: ExchangeImageService,
    private bsmodalService: BsModalService,
    private produceSvc: ProduceService,
    private updateSvc: UpdateListingService
  ) {}


  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      (user) => {
        this.user = user;
        this.editedUser = Object.assign({}, user);
        this.editedUser.address = Object.assign({}, user.address);
        console.log('Logged In User: ' + this.user.username);
      },
      (fail) => {
        console.log('Invalid User ');
        this.router.navigateByUrl('notFound');
      }
    );

    this.exchangeService.getBuyerExchanges().subscribe(
      (exchanges) => {
        this.buyerExchanges = exchanges;
        console.log('in exchangeService init call private profile');
        for (let i = 0; i < exchanges.length; i++) {
          this.isBuyerCollapsed.push(true);
          this.isReviewCollapsed.push(true);
          this.buyerExchangesLoaded = true;
        }
      },
      (fail) => {
        console.log(
          'In Private Profile Init(): Could not get buyer exchanges '
        );
        this.router.navigateByUrl('notFound');
      }
    );

    this.exchangeService.getSellerExchanges().subscribe(
      (exchanges) => {
        this.sellerExchanges = exchanges;
        console.log('in exchangeService init call private profile');
        for (let i = 0; i < exchanges.length; i++) {
          this.isSellerCollapsed.push(true);
          this.isInProgressCollapsed.push(true);
        }
      },
      (fail) => {
        console.log(
          'In Private Profile Init(): Could not get seller exchanges '
        );
        this.router.navigateByUrl('notFound');
      });

    //Show all of a User's Specific Garden Item Listings
    this.indexGardenItems();

    //For Update Listing Form
    this.produceSvc.index().subscribe(
      data => {
        this.produces = data;
      },
      fail => {
        console.log("Failed to load list of produce for update form");
        console.log(fail);
      }
    )
  }

  goToPublicProfile() {
    this.router.navigateByUrl('publicProfile');
  }


  acceptIncomingExchange(exchange: Exchange) {
    console.log(exchange);
    //send default message to user here
    let message: Message = new Message();
    message.subject = this.user.username + " accepted your request";
    message.content = this.user.username + " has accepted your request! Send them a message to coordinate a pickup.";
    message.receivingUser = exchange.buyer;
    //message.sendingUser = this.user;

    console.log("==========================")
    console.log(message);
    console.log(message.receivingUser.username);
    console.log(message.sendingUser.username);
    console.log("==========================")


    this.messageService.create(message).subscribe(
      (message) => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      (fail) => {
        console.log(
          'In Private Profile acceptIncomingExchange(): Could not send message '
        );
        this.router.navigateByUrl('notFound');
      }
    );

    exchange.accepted = true;
    this.exchangeService.updateExchange(exchange).subscribe(
      (exchanges) => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      (fail) => {
        console.log(
          'In Private Profile acceptIncomingExchange(): Could not update exchange '
        );
        this.router.navigateByUrl('notFound');
      }
    );
  }

  denyIncomingExchange(exchange: Exchange) {
    exchange.accepted = false;
    exchange.active = false;
    this.exchangeService.updateExchange(exchange).subscribe(
      (exchanges) => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      (fail) => {
        console.log(
          'In Private Profile acceptIncomingExchange(): Could not update exchange '
        );
        this.router.navigateByUrl('notFound');
      }
    );
  }

  completeExchange(exchange: Exchange) {
    exchange.complete = true;
    //exchange.exchangeDate = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();
    let date = new Date();
    exchange.exchangeDate = date.toISOString();
    console.log(exchange);
    this.exchangeService.updateExchange(exchange).subscribe(
      (exchanges) => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      (fail) => {
        console.log(
          'In Private Profile acceptIncomingExchange(): Could not update exchange '
        );
        this.router.navigateByUrl('notFound');
      }
    );
  }

  getOutgoingExchangeStatus(exchange: Exchange): string {
    if (!exchange.accepted && !exchange.complete) {
      return 'pending';
    }
    if (!exchange.accepted && exchange.complete) {
      return 'denied';
    }
    if (exchange.accepted && !exchange.complete) {
      return 'accepted';
    }
    if (exchange.complete && exchange.accepted) {
      return 'complete';
    } else {
      return '';
    }
  }

  displayExchangeDetails(): string {
    return 'details details details';
  }


  deactivateExchange(exchange: Exchange){
    exchange.active = false;
    this.exchangeService.updateExchange(exchange).subscribe(
      exchanges => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      fail => {
        console.log('In Private Profile acceptIncomingExchange(): Could not update exchange ');
        this.router.navigateByUrl('notFound');
      });
    }

  getUser(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        this.userService.reroute(user);
      },
      (fail) => {
        console.error(
          'publicUserProfileComponent: error getting user by username'
        );

      }
    );
  }


  updateExchangeReview(exchange: Exchange){

    exchange.active = false;
    exchange.rating = this.rate;

    this.exchangeService.updateExchange(exchange).subscribe(
      exchange => {
        if (typeof this.ImageBaseData == 'string') {
          console.log("IS STRING");
          this.addImageInput();
          console.log("NUM IMAGES: " + this.imageBaseDataArray.length);

          let exchangeImages: ExchangeImage[] = [];
          for(let i=0; i<this.imageBaseDataArray.length; i++){
            let exchangeImage: ExchangeImage = new ExchangeImage();
            exchangeImage.imageUrl = this.imageBaseDataArray[i];
            exchangeImage.active = true;
            exchangeImage.exchange = exchange;
            exchangeImages.push(exchangeImage);
            console.log(exchangeImage);
          }

          this.exchangeImageService.addExchangeImages(exchangeImages).subscribe(
            exchangeImages => {
              this.ImageBaseData = null;
              this.imageBaseDataArray = [];
              this.imageFields = [1];
            },
            fail => {
              console.log('In Private Profile acceptIncomingExchange(): Could not add image');
              this.router.navigateByUrl('notFound');
            });

        }

      },
      fail => {
        console.log('In Private Profile acceptIncomingExchange(): Could not update exchange ');
        this.router.navigateByUrl('notFound');
      });
  }

  /////////////////////// Star Rating Variables /////////////////////
  max = 5;
  rate = 7;
  isReadonly = false;

  overStar: number | undefined;
  percent: number = 0;

  /////////////////////////////////////////////////////////////////////

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }

  saveEdit() {
    if (typeof this.ImageBaseData == 'string') {
      console.log("IS STRING");
      this.editedUser.imageUrl = this.ImageBaseData;
    }
    this.userService.editUser(this.editedUser).subscribe(
      (user) => {
        this.user = user;
        this.editedUser = Object.assign({}, user);
        this.editedUser.address = Object.assign({}, user.address);
        this.ImageBaseData = null;
      },
      (fail) => {
        console.error(fail);
        console.error(
          'privateUserProfileComponent: error updating user information'
        );
      }
    );
  }
  cancelEdit() {
    this.editedUser = Object.assign({}, this.user);
    this.editedUser.address = Object.assign({}, this.user.address);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'Save click') {
            if (this.authSvc.getCredentials() === btoa(this.user.username + ':' + this.passwordChangeForm.curPassword)) {
              this.editedUser.password = this.passwordChangeForm.matchPassword;
              this.userService.resetPassword(this.editedUser).subscribe(
                (userResult) => {
                  this.authSvc.logout();
                  this.login(userResult.username, this.editedUser.password);
                },
                (err) => {
                  console.log(err);
                }
              );
            }
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  login(username: string, password: string) {
    this.authSvc.login(username, password).subscribe(
      (loggedInUser) => {
        this.router.navigateByUrl('/privateProfile');
      },
      (fail) => {
        console.error('LoginComponent.login(): login failed');
      }
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

  //Modal for Updating a User's Listing
  message: string = '';
  modalRef: BsModalRef | undefined;
  produces: Produce[] = [];
  produce: Produce = new Produce();
  listingToUpdate: GardenItem = new GardenItem();
  failedToUpdate: Boolean = false;
  listItems: GardenItem[] = [];

  openModal(template: TemplateRef<any>, itemId:number) {
    this.gardenItemSvc.index().subscribe(
      data => {
        this.listItems = data;
        for (let item of this.listItems) {
          if(item.id == itemId) {
            this.listingToUpdate = item;
          }
          console.log("Successfully reassigned to listingToUpdate");
        }
      },
      fail => {
        console.log("Failed to load Garden Items for Update Modal");
      }
    );

    this.modalRef = this.bsmodalService.show(template, {class: 'modal-sm'});
  }

  decline() {
    this.message = 'Cancel Update Listing Request';
    this.listingToUpdate = new GardenItem();
    this.bsmodalService.hide();
  }

  updateListing(listingToUpdate:GardenItem) {
    this.updateSvc.update(this.listingToUpdate).subscribe(
      data => {

        this.message = 'Updated!';
        this.listingToUpdate = new GardenItem();

        //Reloads the User's Garden Item Listings
        this.indexGardenItems();

        this.bsmodalService.hide();
        this.router.navigateByUrl('/privateProfile');

      },
      fail => {
        this.failedToUpdate = true;
        console.error('Failed to Update Listing');
        console.error(fail);
      });
  }

  //Will set Listing to Inactive and move it to an 'Inactive Table'
  remove(itemId:number) {

    this.gardenItemSvc.index().subscribe(
      items => {
        for (let item of items) {
          if(item.id === itemId) {
            item.active = false;

            this.updateSvc.update(item).subscribe(
              data => {
                console.log("Listing is inctive");
                console.log("Item status is: " + item.active);
                console.log("Item User is: " + item.user.username);

                this.inactiveListings.push(item);
                this.indexGardenItems();
              },
              fail => {
                console.log("Failed to inactivate listing");
                console.log(fail);
              });

          }
        }
      },
      fail => {
        //Fail index GardenItems for Remove...not essential
      });//Fail for index()
  }

  activateListing(inactiveItemId:number) {

    this.gardenItemSvc.index().subscribe(
      items => {
        for (let inactiveItem of items) {
          if(inactiveItem.id === inactiveItemId) {

            inactiveItem.active = true; //Sets Listing to 'active'
            console.log("Test for Activate Listing");

            this.updateSvc.update(inactiveItem).subscribe(
              data => {
                console.log("Listing is active");
                this.activeListings.push(inactiveItem);
                this.indexGardenItems();
              },
              fail => {
                console.log("Failed to activate listing");
                console.log(fail);
              });
          }
        }
      },
      fail => {
        //Fail index GardenItems for Remove...not essential
      });//Fail for index()
  }

  indexGardenItems() {
    this.gardenItemSvc.index().subscribe(
      data => {

        this.items = data;
        console.log("Getting all Items: " + this.items);

        this.activeListings = [];
        this.inactiveListings = [];

        for (let item of this.items) {

            if (item.user.id == this.user.id) {

              console.log("After filter: " + item);


            if(item.active === true) {
                this.activeListings.push(item); //For Active Listings
            } else if(item.active === false) {
                this.inactiveListings.push(item);//For Inactive Listings
            }

          }//Checks for ID
        }
      },
      fail => {
        console.log("Failure retrieving list of Garden Items for this User");
        console.log(fail);
      });
  }

  ImageBaseData: string | ArrayBuffer | null = null;


  onFileChanged($event: any) {
    let me = this;
    let file = $event.target.files[0]
    let reader: FileReader = new FileReader();
    reader.onload = function () {
      me.ImageBaseData = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
  }

  getExchangeStatusBadge(status: string){
    if(status == "complete"){
      return "badge-primary";
    }
    if(status == "pending"){
      return "badge-warning";
    }
    if(status == "accepted"){
      return "badge-success";
    }
    else{
      return "";
    }

  }

  imageBaseDataArray: string[] = [];
  imageFields = [1];

  addImageInput(){
    if (typeof this.ImageBaseData == 'string') {
      console.log("ImageBaseData is a STRING!");
      this.imageBaseDataArray.push(this.ImageBaseData);
      this.imageFields.push(1);
    }
  }

  buttons: number[] = [];

  addButton(i: number){
    this.buttons.push(i);
  }


}//Component Class


