const express = require('express');
const fetch = require('node-fetch');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/api/product', (req, res) => {
  const apiUrl = 'https://whitechdevs.github.io/reactjs-test/products.json';
  fetch(apiUrl)
    .then(result => result.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.redirect('/error', err);
    });
});

app.listen(PORT, HOST);
