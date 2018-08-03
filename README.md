
# Bamazon
-------------------------------------------------
# My Bamazon Store Front


#### OverView
-------------------------------------------------
##### In this project, I utilized the MySQL and NPM Node packages such as Inquirer and Cli-table. The purpose of the app is to act as a virtual store front and allows customers to view the products available, as well as the price and inventory amount. The customer is then able to purchase the item they want and the amount they desire. Using the MySQL database, the purchase is fullfilled and the response is the total ordered and the price paid as well as the database is refreshed automatically.

#### Screenshot
---------------------------------
##### Here is a clip of the typical interaction the customer would have when placing an order.

![customer11](https://user-images.githubusercontent.com/34924373/43660388-d9b549b0-972c-11e8-8afc-debb34c7913c.gif)


##### When you order an item, it returns the item name and the amount ordered as well as how much the order costs. If there is not enough of the item in the inventory it will return "there is not enough inventory for your order".


#### Manager Sheet

##### The manager has the prompt choices to view all of the products in the table, check a list of all items with a low inventory of less than 5 in a table, choice to add to inventory of any item that you choose, or the option to create your own item to add to the store. When adding an item, you are prompted to add the item name, then the item department it belongs in, as well as the price, and finally the amount to place in stock. All of these choices are immediatly logged into the MySQL database and reflected back into the stores information. The final option is to exit, which just allows you to quit the app.


![manager11](https://user-images.githubusercontent.com/34924373/43668023-badfc5bc-9748-11e8-85c0-8f1bd2724cbd.gif)




