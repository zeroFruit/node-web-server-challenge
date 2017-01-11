const express = require('express');
const path    = require('path');
const fs      = require('fs');
const moment  = require('moment');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use((req, res, next) => {
  var now = moment().format('YYYY-MM-DD HH:mm:ss').toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log(`Connected to ${port} port`);
});
