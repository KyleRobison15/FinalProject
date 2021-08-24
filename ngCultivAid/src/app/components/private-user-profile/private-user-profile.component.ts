import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange';
import { User } from 'src/app/models/user';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { resourceLimits } from 'worker_threads';
import { isConstructorDeclaration } from 'typescript';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';


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


  reviewedExchange: Exchange[] = [];


  editing: boolean = false;
  editingPicture: boolean = false;

  closeResult = '';

  passwordChangeForm = {
    curPassword: '',
    newPassword: '',
    matchPassword: '',
  };

  constructor(
    private userService: UserService,
    private exchangeService: ExchangeService,
    private router: Router,
    private modalService: NgbModal,
    private authSvc: AuthService,
    private messageService: MessageService
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
      }
    );
  }

  goToPublicProfile() {
    this.router.navigateByUrl('publicProfile');
  }


  acceptIncomingExchange(exchange: Exchange) {

    //send default message to user here
    let message: Message = new Message();
    message.content = this.user.username + " accepted your request";
    message.subject = this.user.username + " has accepted your request! Send them a message to coordinate a pickup.";
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
      exchanges => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
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
    this.userService.editUser(this.editedUser).subscribe(
      (user) => {
        this.user = user;
        this.editedUser = Object.assign({}, user);
        this.editedUser.address = Object.assign({}, user.address);
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


}
