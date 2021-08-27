# CultivAid

### Full-Stack Spring/REST/JPA/Angular Project All About Eliminating Food Waste
![Image of Fresh Produce](https://images.unsplash.com/photo-1518843875459-f738682238a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1926&q=80)

## Authors

* Steven Laupan
* Chris Riddle
* Kyle Robison
* Matthew Lee

## About CultivAid

This easy to use Application allows the entire Community to come together! Local Growers can list and offer any Harvest surplus they may have to the Community and anyone in turn may be provided with fresh produce.

The result? Reduced waste!!!

#### Creating an Account
To create an Account with CultivAid, simply select 'Login' on the 'Home' Page. Once there, select 'Create an Account' on the bottom of the 'Login' Form. Lastly, fill out the required information and begin your search for local Produce!

#### Searching for Listings
A 'Search' feature is available to scan your Local Region for fresh produce!

On the 'Home' Page, simply enter your ZIP Code and the search radius you wish to search. The results will show all of the local produce you may view.

A 'Filter' is available to specify: 'ZIP Code', 'Search Radius', 'Category'(Vegetables, Fruits, etc), and 'Produce' (Lettuce, Tomatoes, etc).

#### Creating a Listing
If you are a Grower and wish to offer surplus from your Harvest, simply go to your 'Profile' Page. Once there, you may select 'Create New Listing'. A 'Variety', 'Amount', and 'Produce Type' must be selected in order to submit your Listing. Once done, select 'Create Listing'. If successful, your Listing will be posted for the public view!

Please note that Duplicate Listings cannot be added.

#### Managing Listings
Growers are able to manage the Listings available for the public view. After 'Creating a Listing', Growers can 'Update' their Listings on their 'Profile' Dashboard.

If a Grower wishes to remove their Listing, they will simply select 'Remove'. A Warning will show to check if this is what the Grower wishes to do. If confirmed, the Grower's Listing will be removed from public view and moved to an 'Inactive Table'. They may always 'Reactivate' their Listing.

#### Exchanges
A Requester (person requesting for the surplus Produce) would propose an assortment of exchange items from a Grower

An exchange gets initiated when a Grower accepts an exchange request from a Requester

After the Grower accepts the request, the "Exchange Item" gets added to the Exchange and a Message is sent to the Requester.

Growers can manage their active Exchanges in their 'Profile' Page. The Grower and Requester will coordinate the pickup via Message on the Application. Once completed, the Grower will mark the Exchange as 'Complete'. 

#### Post Exchange and Reviews
Once a Grower marks an Exchange as 'Complete', the Requester may leave a 'Review' which consists of:

    * Rating (1-5 Stars)
    * Review Comment
    * Images of the Produce they received

Once submitted, the Review will show on the Grower's 'Public Profile' Page.

## Technologies Used

* Java
* Junit5 Testing
* Spring: Boot/Security/Data
* MySQL
* Angular and Typescript
* Javascript
* HTML/CSS
* Unix

## Agile Development
In order to implement effective practices for a constructive and efficient sprint and overall project, Agile methodology was used.

Before any code was created and implemented, the Team collaborated on project ideas. Once the idea for CultivAid was conceived, the Team then began planning the sprint to lay out Tasks needed to achieve a viable product, who would be assigned these Tasks, and the order in which they would be done in. Lastly, Testing methods were designed - no Task can be sent into Production without passing. The documentation of these Tasks were placed on a Kanban Board - specifically Trello.

During the sprint, daily Stand-up Meetings were conducted each Morning. The Scrum Master asked each Team Member:

 * What that Team member accomplished since the last meeting
 * What is currently being worked on
 * Any difficulties they are experiencing

When each Task was completed, it went from the "In Progress" section of Trello to "In Test". As stated above, Tasks had to pass testing before being placed into "Done".

When the team felt we had achieved a viable product, we were then able to work on a few extra features for the app that really took it above and beyond. Lastly, the Team met for a final Sprint Review and a complete and comprehensive walkthrough was done to rehearse presentation and as a final test of site functionality. Once done, the final code base was built into a WAR File and deployed to an AWS Server for public release.

## REST Endpoints

| HTTP Verb | URI                                 | Request Body                           | Response Body                        | Purpose                          |
|-----------|-------------------------------------|----------------------------------------|--------------------------------------|----------------------------------|
| GET       | `/gardenitems`                      |                                        | Garden items for non-authenticated   | Get all garden item listings     |
| GET       | `/api/gardenitems`                  |                                        | Garden items for authenticated user  | Get all garden item listings     |
| GET       | `/api/gardenitems/{distance}`       |                                        | Garden item listings for given distance | Get all listings for given distance|
| POST      | `/api/gardenitems`                  | Representation of a garden item        | Representation of created garden item | Create a new garden item        |
| PUT       | `/api/gardenitems`                  | Representation of a garden item        | Representation of updated garden item | Update a garden item            |
| GET       | `/api/users`                        |                                        | List of all users                     | Get all users for Admin view    |
| GET       | `/api/users/{username}`             |                                        | Representation of single user         | Get a single user               |
| POST      | `/api/register`                     | Representation of a user               | Representation of registered user     | Register a new User             |
| PUT       | `/api/users`                        | Representation of logged in user       | Representation of updated user        | Allow users to update their info |
| PUT       | `/api/users/password`               | Representation of logged in user       | Representation of updated user        | Allow users to change their password|
| GET       | `/api/exchanges`                    |                                        | List of all exchanges                 | Get all exchanges                |
| POST      | `/api/exchanges`                  | Representation of an exchange            | Representation of created exchange    | Create a new exchange            |
| PUT       | `/api/exchanges`                  | Representation of an exchange            | Representation of updated exchange    | Update an exchange               |
| GET      | `/api/exchange/{id}/exchangeitems`  |                                         | List of exchange items for an exchange| Get exchange items for an exchange |
| POST      | `/api/exchange/{id}/exchangeitems`  | List of exchange items for an exchange | Representation of an exchange         | Add exchange items for an exchange |
| GET      | `/api/exchange/{id}/exchangeimages`  |                                        | List of exchange images for an exchange| Get exchange images for an exchange |
| POST      | `/api/exchange/{id}/exchangeimages`  | List of exchange images for an exchange | Representation of an exchange       | Add exchange images for an exchange |
| GET       | `/api/messages`                     |                                          | List of all messages                  | Get all messages                 |
| GET       | `/api/messages/{uid}`               |                                          | List of all messages for a given user | Get all messages for a given user|
| POST      | `/api/messages/{uid}`               | Representation of a new message          | Representation of created message     | Create a new message to another user|
| GET       | `/api/produce`                      |                                        | List of all produce                  | Get all produce                   |
| POST      | `/api/produce`                      | Representation of a produce            | Representation of created produce    | Create a new produce              |
| PUT       | `/api/produce`                      | Representation of a produce            | Representation of updated produce    | Update a produce                  |
| GET       | `/api/wishlist`                     |                                        | List of all produce                  | Get all produce                   |
| POST      | `/api/wishlist`                     | Representation of a wishlist produce   | Representation of created wishlist produce | Create a new wishlist produce |
| PUT       | `/api/wishlist`                     | Representation of a wish list produce  | Representation of updated wishlist produce | Update wishlist produce       |
| POST      | `/api/gardenitems/{id}/comments`    | Representation of comment                 | Representation of added comment       | Get comment for given garden item  |
