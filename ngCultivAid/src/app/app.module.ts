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
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterProducePipe } from './pipes/filter-produce.pipe';
import { AgmCoreModule } from '@agm/core';


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
    SortRecentPipe,
    FilterCategoryPipe,
    FilterProducePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2vR3KlcL9cbjPNUv1oHPb65w9hyh0TuI'
    })
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
