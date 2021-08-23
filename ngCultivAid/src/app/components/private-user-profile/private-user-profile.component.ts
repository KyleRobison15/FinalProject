import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange';
import { User } from 'src/app/models/user';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-private-user-profile',
  templateUrl: './private-user-profile.component.html',
  styleUrls: ['./private-user-profile.component.css']
})
export class PrivateUserProfileComponent implements OnInit {

  isBuyerCollapsed: boolean[] = [];
  isSellerCollapsed: boolean[] = [];
  isInProgressCollapsed: boolean[] = [];
  isReviewCollapsed: boolean[] = [];

  user: User = new User();

  buyerExchanges: Exchange[] = [];

  buyerExchangesLoaded: boolean = false;

  sellerExchanges: Exchange[] = [];


  constructor(private userService: UserService, private exchangeService: ExchangeService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      user => {
        this.user = user;
        console.log("Logged In User: " + this.user.username);
      },
      fail => {
        console.log('Invalid User ');
        this.router.navigateByUrl('notFound');
      }
    )

    this.exchangeService.getBuyerExchanges().subscribe(
      exchanges => {
        this.buyerExchanges = exchanges;
        console.log("in exchangeService init call private profile");
        for(let i=0; i<exchanges.length; i++){
          this.isBuyerCollapsed.push(true);
          this.isReviewCollapsed.push(true);
          this.buyerExchangesLoaded = true;
        }
      },
      fail => {
        console.log('In Private Profile Init(): Could not get buyer exchanges ');
        this.router.navigateByUrl('notFound');
      }
    )

    this.exchangeService.getSellerExchanges().subscribe(
      exchanges => {
        this.sellerExchanges = exchanges;
        console.log("in exchangeService init call private profile");
        for(let i=0; i<exchanges.length; i++){
          this.isSellerCollapsed.push(true);
          this.isInProgressCollapsed.push(true);
        }
      },
      fail => {
        console.log('In Private Profile Init(): Could not get seller exchanges ');
        this.router.navigateByUrl('notFound');
      }
    )

  }




  goToPublicProfile(){
    this.router.navigateByUrl('publicProfile');
  }

  acceptIncomingExchange(exchange: Exchange){
    exchange.accepted = true;
    this.exchangeService.updateExchange(exchange).subscribe(
      exchanges => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      fail => {
        console.log('In Private Profile acceptIncomingExchange(): Could not update exchange ');
        this.router.navigateByUrl('notFound');
      }
    )
  }

  denyIncomingExchange(exchange: Exchange){
    exchange.accepted = false;
    exchange.active = false;
    this.exchangeService.updateExchange(exchange).subscribe(
      exchanges => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      fail => {
        console.log('In Private Profile acceptIncomingExchange(): Could not update exchange ');
        this.router.navigateByUrl('notFound');
      }
    )
  }

  completeExchange(exchange: Exchange){
    exchange.complete = true;
    this.exchangeService.updateExchange(exchange).subscribe(
      exchanges => {
        //this.sellerExchanges = exchanges;
        //console.log("in exchangeService init call private profile");
      },
      fail => {
        console.log('In Private Profile acceptIncomingExchange(): Could not update exchange ');
        this.router.navigateByUrl('notFound');
      }
    )
  }

  getOutgoingExchangeStatus(exchange: Exchange): string{

    if(!exchange.accepted && !exchange.complete){
      return"pending";
    }
    if(!exchange.accepted && exchange.complete){
      return "denied";
    }
    if(exchange.accepted && !exchange.complete){
      return "accepted";
    }
    if(exchange.complete && exchange.accepted){
      return "complete";
    }
    else{
      return "";
    }
  }

  displayExchangeDetails(): string{

    return "details details details";

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
      }
    );
  }

}
