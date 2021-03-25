var express = require('express');
var web_handler = express.Router();
var path = require('path');

web_handler.get('/dashboard', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/html/dashboard.html'));
});

web_handler.get('/signup', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/html/signup.html'));
});

web_handler.get('/signup_successful', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/html/signup_successful.html'));
});

web_handler.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/html/login.html'));
});

module.exports = web_handler;
