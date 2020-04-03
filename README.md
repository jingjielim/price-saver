# PriceSaver

For all the price conscious consumers out there. This app helps you remember and compare all the prices at all your favourite shops.

![PriceSaveMain](https://media.git.generalassemb.ly/user/25408/files/e2ff6800-753f-11ea-9217-a08c200aa478)


### Technologies

- React
- Ruby on Rails
- Bootstrap
- JavaScript

### Dependencies
- [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)
- [react-bootstrap](https://react-bootstrap.github.io/)


### Rails database API
- [API Repo](https://github.com/jingjielim/price-saver-api)
- [API deployed](https://frozen-woodland-37664.herokuapp.com/)

## Setup
1. Fork and clone this repository.
2. Install dependencies with `npm install`.

## Application highlights

Once you sign in, you will be able to see all your saved items and their prices at one glance. A live search function allows you to quickly narrow down the price of the item you require
<kbd>
![LiveSearchPriceSaver](https://media.git.generalassemb.ly/user/25408/files/2efddd00-753f-11ea-94f0-8d8d563e32cf)
</kbd>

Filters also allows you to see the cheapest items at each of the stores.
<kbd>
![FilterPriceSaver](https://media.git.generalassemb.ly/user/25408/files/ad5a7f00-753f-11ea-947e-d7f79f927736)
</kbd>


## Planning Process

### Wireframes

**Login Page**
<kbd>
![Login](https://media.git.generalassemb.ly/user/25408/files/d9c2cb00-7540-11ea-8cd2-30a987815bd5)
</kbd>

**User Home Page**
<kbd>
![Slide2](https://media.git.generalassemb.ly/user/25408/files/da5b6180-7540-11ea-8a83-fb85ba42b131)
</kbd>

**Add New Price Page**
<kbd>
![Slide3](https://media.git.generalassemb.ly/user/25408/files/daf3f800-7540-11ea-9a42-07a1f90e5a48)

</kbd>

### User stories
- As a user, I want to be able to see all my items tracked
- As a user, I want to always see the lowest price store for each item
- As a user, I want to be able to update the price when it changes in store
- As a user, I want to see prices from other stores as well
- As a user, I want to be able to add new items
- As a user, I want to be able to add new stores
- As a user, I want to be able to add new prices. When adding a new price, if the item or store is not in the database, a new item or store will be created.

### Process

#### Idea
I wanted to create an app that solves an actual problem in real life. I realise that items in grocery stores around Boston are not generally cheaper at one store and more expensive at another. Sometimes, a store generally perceived to be more 'pricey' can have the cheapest price. An app that can trawl all the data from all the stores and do a price comparison for each item would be ideal.

#### Project Outline
Of course it would be impossible to build such an app in the limited time I had. So I broke it down into smaller problems first. 
- What are the resources required in the API?
>I need an item resource to keep all the items, a store resource to keep all the stores and finally a price resouce to link all the other resources up. 
- What are the most basic interface the user would require?
> The user must be able to create, update, read, destroy the resources.
- What is the basic function the user would require?
> The app must be able to compare prices of different stores.

Following these basic ideas, I started to code the backend API to CRUD the resources first. Postman was used to ensure that the API works, then a basic client was used to communicate with the API.

After successful CRUD for each resource, I started to customise the output returned by the resource to fit this use case.

Finally, styles were added using Bootstrap and react-bootstrap.

## For Future Versions

### Shopping list
User will be able to save items to a shopping list for convenience. The list shall allow the user to enter quantity of each items to be purchase and figure out the best store to visit for the whole list of items. Assumptions will be made if there are no price data for an item for a particular store.

### AWS photo upload
User will be able to add photos to each of the items

### Access Control List
All items shall be publicly readable. The database shall be updated by a list of people granted write-access privileges.