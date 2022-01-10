const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

const db = require('./db/database.js');

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// get all active (sts=1) products
app.post('/api/products', (req, res) => {
  const key = req.body.key;
  if (key === '12345') {
    db.all(`SELECT id as pid, id, uid, fullname as name, price, rate, images, stock_sizes as stock, sts FROM products WHERE sts = '1'`, (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    });
  }
})

// get one product (pid)
app.post('/api/products/single', (req, res) => {
  const key = req.body.key;
  if (key === '12345') {
    let pid = req.body.pid;
    db.all(`SELECT id as pid, id, uid, fullname as name, price, onsale, rate, images, stock_sizes as stock, sts FROM products WHERE id = '${pid}' LIMIT 1`, (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows.length > 0) {
        let data = {
          status: 'success',
          ...rows[0]
        }
        data['stock'] = JSON.parse(data['stock'])['content'];
        data['onsale'] = JSON.parse(data['onsale'])['onsale'];
        console.log(data);
        res.json(data);
      }
      else
      {
        let data2 = {
          status: 'failed',
          message: 'Product not found'
        }
        console.log(data2);
        res.json(data2);
      }
    });
  }
  else
  {
    let data2 = {
      status: 'failed',
      message: 'Invalid key'
    }
    console.log(data2);
    res.json(data2);
  }
})


// get all products
app.post('/api/manager/products', (req, res) => {
  const key = req.body.key;
  const search = req.body.search && req.body.search !== 'null' ? ` WHERE fullname LIKE '%${req.body.search}%'` : '';

  if (key === '12345')
  {
    db.all(`SELECT id as pid, id, uid, fullname as name, price, rate, images, stock_sizes as stock, onsale, sts FROM products${search}`, (err, rows) => {
      if (err) {
        console.log(err);
      }

      for (let i = 0; i < rows.length; i++) {
        rows[i]['stock'] = JSON.parse(rows[i]['stock']);
        rows[i]['onsale'] = JSON.parse(rows[i]['onsale'])['onsale'];
      }

      var data = {
        status: 'success',
        data: rows
      }
      console.log(data);
      res.json(data);
    });
  }
})

// get one product (pid)
app.post('/api/manager/product', (req, res) => {
  const key = req.body.key;
  if (key === '12345') {
    let pid = req.body.pid;
    db.all(`SELECT id as pid, id, uid, fullname as name, description, price, onsale, rate, images, stock_sizes as stock, sts FROM products WHERE id = '${pid}' LIMIT 1`, (err, rows) => {
      if (err) {
        console.log(err);
        return res.json({
          status: 'failed',
          message: 'Product not found'
        });
      }
      // console.log(rows);

      if (rows.length > 0) {
        let data = {
          status: 'success',
          ...rows[0]
        }
        data['stock'] = JSON.parse(data['stock']);
        data['onsale'] = JSON.parse(data['onsale']);
        console.log(data);
        res.json(data);
      }
      else
      {
        let data2 = {
          status: 'failed',
          message: 'Product not found'
        }
        // console.log(data2);
        res.json(data2);
      }
    });
  }
  else
  {
    let data2 = {
      status: 'failed',
      message: 'Invalid key'
    }
    // console.log(data2);
    return res.json(data2);
  }
})

// update a product
app.post('/api/manager/product/save', (req, res) => {
  const key = req.body.key;
  if (key === '12345') {
    var pid = req.body.pid;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var onsale = req.body.onsale;
    
    var images = req.body.images;
    var stock = req.body.stock;
    var sts = req.body.sts;

    var sql = `UPDATE products SET fullname = '${name}', description = '${description}', price = '${price}', onsale = '${onsale}', images = '${images}', stock_sizes = '${stock}', sts = '${sts}' WHERE id = '${pid}'`;

    console.log(`sender: ${req.body} query: ${sql}`);

    db.run(sql, (err) => {
      if (err) {
        console.log(err);
      }
      res.json({ status: 'success' });
    });
  }
  else
  {
    let data2 = {
      status: 'failed',
      message: 'Invalid key'
    }
    console.log(data2);
    res.json(data2);
  }
})

// new product
app.post('/api/manager/product/new', (req, res) => {
  const key = req.body.key;
  if (key === '12345') {
    db.run("INSERT OR IGNORE INTO `products` (`uid`, `fullname`, `description`, `price`, `categories`, `images`, `sts`) VALUES "+
    "('"+uuidv4()+"', 'Product Name', 'Product description', '0.00', 'product example not-listable', './assets/images/shoes.png', '2');", (err) => {
      if (err)
      {
        console.log(err);
        res.json({ status: 'failed' });
      }
      else
      {
        db.all("SELECT last_insert_rowid()", (err, rows) => {
          if (err) {
            console.log(err);
            res.json({ status: 'failed' });
          }
          res.json({ status: 'success', pid: rows[0]['last_insert_rowid()'] });
        })
      }
    })
  }
})

app.get('/images/:image', (req, res) => {
  // stream
  var img = fs.readFile(`./assets/images/${req.params.image}`, {}, (err) => {});
  
  if (img) {
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  }
  else
  {
    res.status(404).send(req.params.image + ' Not found');
  }
})

app.get('/css/:css', (req, res) => {
  var path = __dirname + '/css/' + req.params.css;
  res.sendFile(path);
})