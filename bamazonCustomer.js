var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,


    user: "root",


    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId + "\n");
    displayMain();
})

function displayTable(res) {
    var table = new Table({
        style: {
            head: ['green']
        },
        head: ['apple'],
        head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price_to_customer, res[i].stock_quantity]);

    }
    console.log(table.toString());
}

function displayMain() {

    connection.query('SELECT * FROM products', function (err, res) {
        displayTable(res);
        if (err) throw err;
        console.log("=====================");
        console.log("welcome to Bamazon");
        console.log("====================");

        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
        }

        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "What is the ID of the product you would like?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Quantity",
                type: "input",
                message: "How many would you like?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            }
        ]).then(function (answer) {

            console.log(answer);
            var itemID = answer.item;
            console.log(itemID);
            var chosenItem = res[itemID - 1];
            console.log(chosenItem);

            var newQuantity = chosenItem.stock_quantity - answer.Quantity;
            console.log(newQuantity);
            if (newQuantity >= 0) {
                connection.query('UPDATE products SET ? WHERE item_ID = ? ', [{
                    stock_quantity: newQuantity
                }, itemID]);
                console.log("You bought " + answer.Quantity + " " + chosenItem.product_name + " and there are " + newQuantity + " left");
                displayMain();
            } else {

                console.log("There is not enough inventory available, check back next week.");
                displayMain();
            }

        })
    })
}