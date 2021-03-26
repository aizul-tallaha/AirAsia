const PORT = 8080;

var express = require('express');
var app = express();
var api_handler = require('./api/api_handler.js');
var web_handler = require('./api/web_handler.js');

var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api', api_handler);
app.use('/web', web_handler);
app.use(express.static('public'))



app.get('/', function(req, res) {
  res.redirect('/user/login');
});

app.listen(PORT, () => console.log(`AirAsia server currently running on port ${PORT}`));
