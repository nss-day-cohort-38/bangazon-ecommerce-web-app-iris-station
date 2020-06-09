## What does Iris Station offer?
Iris Station is an E-commerce application that allows a logged in user to do the following:

- Sell A Product
    - Create a new product listing
    - Set products to be available for local delivery/pickup (optional)
    - Upload an image (stored and retrieved from back-end API media folder)
- My Products
    - View the products that a logged in user has posted to sell
    - View the amount of times a product has been sold
    - View the current Stock
    - Users can Remove a product they have for sale Product
- Reports
    - User can see errors where a customer has multiple open orders. It shows their full name and how many open orders they have.
- My Cart
    - View the cart and products in it
    - Remove Products within your cart
    - Complete an order
    - Cancel an order and delete products in an order
    - If a product is deleted by the seller, all products in carts will be deleted. However, if you look at past orders where that product was already bought it still exists there. 
    - The inventory for products bought will be reflected
- Search Products By Categories
    - See all the product categories and the top three items in that category. 
    - Click on the category name to see all products in that category
    - Click product name to view the product details
- Search for Products to Buy
    - Search by product or city
    - View a list of all products for sell on Iris Station
    - View the 20 most recent product listings
- Profile
    - Add a payment type
    - View all payment types for a user
    - Delete a payment type
    - Edit user information (address, phone number, email, etc.)
    - View past orders
- User can Register and login if not already logged in
- Dark Mode
    - Just toggle it and see what it does :wink:

## Want to use Iris Station? Follow the instructions below to run the application.

1. Create a new directory in your terminal. Clone down this repository by clicking the "Clone or Download" button above, copying the SSH key, and running the following command in your terminal `git clone sshKeyGoesHere`.

1. `cd bangazon-ecommerce-web-app-iris-station`.

1. Run `npm install` and wait for all dependencies to be installed.

1. enter the following code into your terminal 
    `cd src/modules && touch baseurl.js`

1. you just created a file to hold your API url. The next step will tell you how to start that. Once it is running take the url for the API and insert in the baseurl.js file like so....
`const baseurl = "http://localhost:8000"`
`export default baseurl`

1. note: typically the url for our app is the one listed above, however, it could change so keep that in mind.

1. Go to https://github.com/nss-day-cohort-38/bangazon-ecommerce-api-iris-station and follow the instructions to set up the API in a seperate directory from the Bangazon Client directory. Then complete the next two steps.


1. Run `npm start` to verify that installation was successful and start the application.


1. Go to http://localhost:3000/ to view the app. 

## Tech Stack
1. React
1. HTML
1. CSS 
1. Javascript
1. JSX
1. Material UI 
1. Semantic UI
1. ReactStrap



## Contributors
- Kurt Krafft
- Andrew Green
- Trinity Terry
- Keith Potempa
- Matt Crook
