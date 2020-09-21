const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use('/', express.static('client/public'));

app.get('/rp-module', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/bundle.js'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
