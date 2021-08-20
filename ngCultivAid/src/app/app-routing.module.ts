import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { GardenItemListingsComponent } from './components/garden-item-listings/garden-item-listings.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PrivateUserProfileComponent } from './components/private-user-profile/private-user-profile.component';
import { PublicUserProfileComponent } from './components/public-user-profile/public-user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'messages', component: MessagingComponent },
  { path: 'listings', component: GardenItemListingsComponent},
  { path: 'createListings', component: CreateListingComponent},
  { path: 'searchResult/:zip/:miles', component: SearchResultComponent },
  { path: 'privateProfile', component: PrivateUserProfileComponent },
  { path: 'publicProfile', component: PublicUserProfileComponent },
  { path: '**', component: NotFoundComponent } // '**' is a wild card catch all path. We use this for our 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
