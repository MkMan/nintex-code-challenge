const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// config
const port = 3000;
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};

// server setup
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

// serve static files like scenarios page
app.use(express.static(path.join(__dirname, 'static')));

// endpoints
app.get('/products', (req, res) => {
  // TODO
});

app.get('/discounts', (req, res) => {
  switch(req.cookies.discounts) {
    case 'all':
      res.json(require('./responses/discounts/1.json'));
      return;
    case 'one':
      res.json(require('./responses/discounts/2.json'));
      return;
  }
});

// Tell me you're alive please
app.listen(port, () => console.log(`Nintex API listening on port ${port}!`));
