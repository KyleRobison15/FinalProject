# CultivAid

### Full-Stack Spring/REST/JPA/Angular Project for Skill Distillery
![Image of Fresh Produce](https://images.unsplash.com/photo-1518843875459-f738682238a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1926&q=80)

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
| GET       | `/api/gardenitems/{id}/comments`    |                                           | List of comments for given garden item| Get comments for given garden item |
| POST      | `/api/gardenitems/{id}/comments`    | Representation of comment                 | Representation of added comment       | Get comment for given garden item  |










# Exchanges
The buyer would propose an assortment of exchange items from a seller
An exchange gets initiated when a seller accepts an exchange request from a buyer
After seller accepts the request, the List<ExchangeItem> gets added to the Exchange

Sellers have a list of all their listings throughout time
Sellers can mark their listing as "sold" / "out of stock"
Sellers can edit their listings (especially amount in stock)
When a listing gets marked as sold or out of stock, an exchange gets generated
