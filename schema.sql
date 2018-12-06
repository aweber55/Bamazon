
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;


USE bamazon;

CREATE TABLE products (
  item_ID INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price_to_customer DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(5) NOT NULL,
  PRIMARY KEY (item_ID)
);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("blue_shoes", "shoes", 10.42, 93);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("orange_shirts", "shirts", 9.25, 33);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("blue_pants", "pants", 20.33, 41);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("bell_bottom_pants", "pants", 18.15, 3);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("green_shoes", "shoes", 12.01, 90);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("purple_shirts", "shirts", 11.25, 80);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("black_hats", "hats", 11.53, 47);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("white_hats", "hats", 7.32, 77);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("colorful_socks", "socks", 14.72, 61);

INSERT INTO products (product_name, department_name, price_to_customer,stock_quantity)
VALUES ("plain_socks", "socks", 13.55, 2);

SELECT * FROM products;

