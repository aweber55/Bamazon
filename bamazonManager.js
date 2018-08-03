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
    displayManager();
})

function displayManager() {
    console.log("==========================");
    console.log("==========================");
    inquirer.prompt([{
        name: "menu",
        type: "list",
        message: "Hello manager, here you can check on the store.",
        choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }]).then(function (answer) {
        switch (answer.menu) {
            case "View Products For Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInv();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "Exit":
                stopAll();
                break;
        }
    })
}

function viewProducts() {

    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // var choiceArray = [];
        // for (var i = 0; i < res.length; i++) {
        //     choiceArray.push(res[i].product_name);
        // }
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
        displayManager();
    })

};

function viewLowInv() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // var choiceArray = [];
        // for (var i = 0; i < res.length; i++) {
        //     choiceArray.push(res[i].product_name);
        // }
        var table = new Table({
            style: {
                head: ['green']
            },
            head: ['apple'],
            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
            colWidths: [10, 30, 30, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price_to_customer, res[i].stock_quantity]);

            }
        }
        if (table.length > 0) {
           
            console.log(table.toString());
        } else {
            console.log("==========================");
            console.log("==========================");
            console.log("There are no products with low inventory at the moment.");
        }

        displayManager();
    })
};

function addInventory() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

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

        inquirer.prompt([{

            name: "addItem",
            type: "input",
            message: "Which item do you want to add to (Item ID)?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "amount",
            type: "input",
            message: "How much would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function (ans) {
            var newQuantity = parseInt(res[ans.addItem - 1].stock_quantity) + parseInt(ans.amount);
            connection.query('UPDATE products SET ? WHERE ?', [{

                        stock_quantity: newQuantity
                    },
                    {
                        item_ID: ans.addItem
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("==========================");
                    console.log("==========================");
                    console.log("Your Inventory has been updated.");
                    
                    
                    displayManager();
                }
            )
        })
    })

};

function addProduct() {

    inquirer.prompt([{

            name: "addName",
            type: "input",
            message: "What item would you like to add?"
        },
        {
            name: "addDepartment",
            type: "input",
            message: "What Department is this in?"
        },
        {
            name: "addPrice",
            type: "input",
            message: "What is the price of this item?"
        },
        {
            name: "addStock",
            type: "input",
            message: "How many are available?"
        }
    ]).then(function (ans) {
        connection.query('INSERT INTO products SET ?', {
            product_name: ans.addName,
            department_name: ans.addDepartment,
            price_to_customer: ans.addPrice,
            stock_quantity: ans.addStock

        }, function (err, res) {
            if (err) throw err;
            console.log("==========================");
            console.log("==========================");
            console.log("Your item '" + ans.addName + "' has been added to the store!");
           console.log("You can find it in '" + ans.addDepartment + "'");
           console.log("And it only costs $" + ans.addPrice);
           console.log("and there are " + ans.addStock + " in stock");
            displayManager();
        })
    })
}

function stopAll() {
    console.log("==========================");
    console.log("==========================");
    console.log("Thank you, Come again!");
    console.log("==========================");
    connection.end();
}