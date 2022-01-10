const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.sqlite');
// const sqlinit = require('./ecomerce.sql');

function init() {
  const tableProducts=[
    "DROP TABLE IF EXISTS products",

    "CREATE TABLE IF NOT EXISTS `products` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , `uid` VARCHAR(128) NOT NULL UNIQUE , `fullname` VARCHAR(128) NOT NULL , `description` TEXT NULL , `price` FLOAT NOT NULL , `onsale` TEXT NULL DEFAULT '\{\"onsale\":\{\"isonsale\":true,\"old\":199.9,\"new\":99.9,\"dsc\":50\}\}' , `images` TEXT NULL , `categories` TEXT NULL , `stock_sizes` TEXT NOT NULL DEFAULT '\{\"amount\":20,\"content\":\[\{\"type\":\"colors\",\"name\":\"Cores\",\"values\":\[\[\"red\",\"vermelho\"\],\[\"green\",\"verde\"\]\]\},\{\"type\":\"sizes\",\"name\":\"Medidas\",\"values\":\[\[\"p\",\"P\"\],\[\"m\",\"M\"\]\]\}\]\}' , `rate` VARCHAR(10) NULL DEFAULT '2 2 2 1 0' , `created` DATETIME NULL , `sts` INTEGER NOT NULL DEFAULT 1)",

    "INSERT OR IGNORE INTO `products` (`uid`, `fullname`, `description`, `price`, `categories`, `images`) VALUES "+
    "('product-01', 'Product 1', 'Product 1 description', '100.00', 'product example not-listable', './assets/images/shoes.png'),"+
    "('product-02', 'Product 2', 'Product 2 description', '200.00', 'product example not-listable', './assets/images/shoes.png'),"+
    "('product-03', 'Product 3', 'Product 3 description', '300.00', 'product example not-listable', './assets/images/shoes.png');",
  ];

  tableProducts.forEach(p => {
    db.exec(p, (err) => {
      if (err) {
        throw `Error creating table: ${p} : ${err}`;
      }
    });
  });

  console.log('All tables created');
}

module.exports = db.serialize(() => {
  console.log('Database connected');
  // init();
  

  // db.all("SELECT * FROM `products`", (err, rows) => { 
  //   if (err) {
  //     console.log(`${err}`);
  //   }
  //   console.log(rows);
  // })
})