import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GardenItemListingsComponent } from './components/garden-item-listings/garden-item-listings.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PrivateUserProfileComponent } from './components/private-user-profile/private-user-profile.component';
import { PublicUserProfileComponent } from './components/public-user-profile/public-user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { SortRecentPipe } from './pipes/sort-recent.pipe';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RatingModule } from 'ngx-bootstrap/rating';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    MessagingComponent,
    GardenItemListingsComponent,
    CreateListingComponent,
    SearchResultComponent,
    PrivateUserProfileComponent,
    PublicUserProfileComponent,
    SortRecentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
