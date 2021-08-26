import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Exchange } from 'src/app/models/exchange';
import { GardenItem } from 'src/app/models/garden-item';
import { User } from 'src/app/models/user';
import { ExchangeService } from 'src/app/services/exchange.service';
import { GardenItemService } from 'src/app/services/garden-item.service';
import { UpdateListingService } from 'src/app/services/update-listing.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { isTemplateHead } from 'typescript';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userSvc: UserService, private gardenItemSvc: GardenItemService, private updateGISvc: UpdateListingService, private exchSvc: ExchangeService) { }

  private baseUrl = environment.redirectUrl;

  allUsers: User[] = [];
  totalUsers: number | null = null;
  usersTraversed: number = 0;


  ngOnInit(): void {
    this.userSvc.getAllUsers().subscribe(
      list => {
        this.totalUsers = list.length;
        this.allUsers = list;
        this.buildUserList();
      },
      err => {
        console.log("Error getting all users");
      }
    );
  }

  changeActiveStatus(user: User) {
    user.active = !user.active;
    this.userSvc.editUser(user).subscribe(
      user => {
        let index = this.allUsers.indexOf(user);
        this.allUsers.splice(index, 1);
        this.allUsers.push(user);
      },
      err => {
        console.log("Error changing user active status")
      }
    );
  }

  changeItemActiveStatus(gardenItem: GardenItem) {
    gardenItem.active = !gardenItem.active;
    this.updateGISvc.update(gardenItem).subscribe(
      item => {
        this.allUsers = [];
        this.ngOnInit();
      },
      err => {
        console.log("Error changing garden item active status")
      }
    );
  }

  goToUserProfile(username: string){
    window.open(this.baseUrl + "#/publicProfile/" + username, "_blank");
  }

  buildUserList() {
    this.allUsers.forEach(user => {
      this.exchSvc.getSellerExchangesByUser(user).subscribe(
        exchanges => {
          console.log(exchanges);
          user.exchanges = [];
          exchanges.forEach(exchange => {
            user.exchanges.push(exchange);
          });
          this.usersTraversed += 1;
        },
        err => {
          console.error("Cannot get exchanges")
        }
      );
    });
  }
}
