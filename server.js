const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fallback = require('./node_modules/express-history-api-fallback');

require('dotenv').config();

let app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const root = path.join(__dirname, './build');

// serve static files built by react
app.use(express.static(root));

// Serve react main aplication
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.get('/get-api-vars', (req, res) => {
  res.send({'API_KEY': process.env.API_KEY, 'API_URL': process.env.API_URL})
});

app.use(fallback('index.html', { root }));

app.use((req, res, next) => {
  console.log('404 - Error handler: ' + req.headers.host + req.url);
  res.status(404).send({
    message: 'Resource not found',
    type: 'internal'
  });
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log('err');
  }
  console.log('==> Listening on port '+port+'. Open up https://0.0.0.0:'+port+'/ in your browser.');
});
