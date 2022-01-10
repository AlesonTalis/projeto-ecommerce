const sqlite3 = require('sqlite3').verbose();
const initsql = new sqlite3.Database('./database.sqlite');


function run ()
{
  const sqls = [
    "DROP TABLE IF EXISTS categories;",
    "DROP TABLE IF EXISTS products;",
    "DROP TABLE IF EXISTS product_category;",
    "DROP TABLE IF EXISTS product_details;",
    "DROP TABLE IF EXISTS product_image;",
    "DROP TABLE IF EXISTS product_price;",
    "DROP TABLE IF EXISTS product_sizes;",
    "DROP TABLE IF EXISTS product_stock;",


    "CREATE TABLE IF NOT EXISTS `categories` (`id` int(11) NOT NULL,`name` varchar(128) NOT NULL, `description` text NOT NULL, `image` varchar(128) NULL, `sts` int(1) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",
    
    "CREATE TABLE IF NOT EXISTS `products` (`id` int(11) NOT NULL, `uid` varchar(128) NOT NULL,`created` datetime NOT NULL, `sts` int(2) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_category` (`id` int(11) NOT NULL, `pid` int(11) NOT NULL, `cid` int(11) NOT NULL, `sts` int(1) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_details` (`id` int(11) NOT NULL, `pid` int(11) NOT NULL, `fullname` text NOT NULL, `description` text NOT NULL, `created` datetime NOT NULL, `sts` int(2) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_image` (`id` int(11) NOT NULL, `pid` int(11) NOT NULL, `type` VARCHAR(16) DEFAULT 'img', `image` varchar(128) NOT NULL, `size` int(4) NOT NULL, `sts` int(1) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_price` (`id` int(11) NOT NULL, `pid` int(11) NOT NULL, `price` float NOT NULL,  `sale` float DEFAULT 0, `created` datetime NOT NULL, `sts` int(2) NOT NULL, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_sizes` (`id` int(11) DEFAULT NULL, `pid` int(11) NOT NULL, `type` varchar(64) NOT NULL, `value` text NOT NULL, `sts` int(1) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",

    "CREATE TABLE IF NOT EXISTS `product_stock` (`id` int(11) NOT NULL,`pid` int(11) NOT NULL,`sid` int(11) DEFAULT NULL, `amount` int(5) NOT NULL DEFAULT 99999, `sts` int(1) NOT NULL DEFAULT 1, PRIMARY KEY (`id`));",


    "CREATE UNIQUE INDEX `product_uid` ON `products` (`uid`);",


    // "ALTER TABLE `categories` ADD PRIMARY KEY (`id`);",

    // "ALTER TABLE `products` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `product_uid` (`uid`);",

    // "ALTER TABLE `product_category` ADD PRIMARY KEY (`id`);",

    // "ALTER TABLE `product_details` ADD PRIMARY KEY (`id`);",

    // "ALTER TABLE `product_image` ADD PRIMARY KEY (`id`);",

    // "ALTER TABLE `product_price` ADD PRIMARY KEY (`id`);",

    

    
    "INSERT INTO `categories` (`id`, `name`, `description`, `image`, `sts`) VALUES (NULL, 'Tenis', 'Lorem Ipsum', NULL, 1);",
    
    "INSERT INTO `products` (`id`, `uid`, `created`, `sts`) VALUES (NULL, '6aed6996-70c1-11ec-90d6-0242ac120003', '2022-01-08 21:26:41', 1), (NULL, '7beda544-70c1-11ec-90d6-0242ac120003', '2022-01-08 21:26:41', 1);",
    
    "INSERT INTO `product_category` (`id`, `pid`, `cid`, `sts`) VALUES (NULL, 1, 1, 1);",

    "INSERT INTO `product_details` (`id`, `pid`, `fullname`, `description`, `created`, `sts`) VALUES (NULL, 1, 'Tenis Nike 1', 'Lorem Ipsum', '2022-01-08 21:27:19', 1), (NULL, 2, 'Tenis Nike 2', 'Lorem Ipsum', '2022-01-08 21:27:19', 1);",

    "INSERT INTO `product_image` (`id`, `pid`, `type`, `image`, `size`, `sts`) VALUES (NULL, 1, 'img', './assets/images/shoes.png', 500, 1), (NULL, 2, 'img', './assets/images/shoes.png', 500, 1);",

    "INSERT INTO `product_price` (`id`, `pid`, `price`, `sale`, `created`, `sts`) VALUES (NULL, 1, 99.9, 0, '2022-01-08 21:37:04', 1), (NULL, 2, 129.9, 0, '2022-01-08 21:37:04', 1);",

    "INSERT INTO `product_stock` (`id`, `pid`, `sid`, `amount`, `sts`) VALUES (NULL, 1, NULL, 99999, 1), (NULL, 2, NULL, 99999, 1);",

  ]

  initsql.serialize(() => {
    // sqls.forEach(sql => {
    //   initsql.run(sql, (err) => {
    //     if (err) 
    //     {
    //       console.log(err);
    //     }
    //     // console.log(`${sql} executed`);
    //   });
    // });

    // const sqlq = "SELECT products.id as id, product_details.fullname as name, product_details.description as description, product_price.price as price, product_image.image as image, product_category.cid as category, product_category.sts as category_sts FROM products INNER JOIN product_details ON products.id = product_details.pid INNER JOIN product_price ON products.id = product_price.pid INNER JOIN product_image ON products.id = product_image.pid INNER JOIN product_category ON products.id = product_category.pid WHERE products.sts = 1";

    const sqlq = "SELECT * FROM products";

    initsql.all(sqlq, (err, rows) => {
      if (err) 
      {
        console.log(err);
      }
      console.log(JSON.stringify(rows));
    });
  })
}

module.exports = {
  run
}