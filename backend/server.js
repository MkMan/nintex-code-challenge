const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// config
const port = 3000;

// server setup
const app = express();
app.use(cookieParser());

// allow cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// serve static files like scenarios page
app.use(express.static(path.join(__dirname, 'static')));

// endpoints
app.get('/products', (req, res) => {
  res.json(require('./responses/products/all.json'));
});

app.get('/promotions', (req, res) => {
  switch (req.cookies.promotions) {
    case 'all':
      res.json(require('./responses/promotions/all.json'));
      return;
    case 'one':
      res.json(require('./responses/promotions/one.json'));
      return;
    default:
      res.json(require('./responses/promotions/1.json'));
      return;
  }
});

// Tell me you're alive please
app.listen(port, () => {
  console.log(`Nintex API listening on port ${port}!`);
  console.log(`Open http://localhost:3000/index.html to start :)`);
});
