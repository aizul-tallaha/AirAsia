var mysql = require('mysql');
var session = require('express-session');
var express = require('express');
var api_handler = express.Router();
var path = require('path');
var token_handler = require('./token_handler.js');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456',
	database : 'airasia'
});

api_handler.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

api_handler.get('/test', function(req, res) {
var response = token_handler.generateAccessToken("TEST");
res.writeHead(200,{'x-auth-token':'Auth Token'});
res.write(JSON.stringify({message: response}));
res.end();
});

api_handler.get('/users/:id/roles', function(req, res) {

});

api_handler.get('/roles', function(req, res) {
      var sql_cmd = "SELECT * FROM Roles";
      connection.query(sql_cmd, function(err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res.status(200).json({ status:"OK", result:result });
        }
      });
});

api_handler.post('/roles', function(req, res) {
  var role_name = req.body.roleName;
  var permission_array = req.body.permissionsArr;

  if (role_name && permission_array) {
    for (var i=0; i< permission_array.length; i++) {
      var sql_cmd = "INSERT INTO Roles (roleName, permissionId) VALUES ('" + role_name + "', '" + permission_array[i] + "');";
      connection.query(sql_cmd, function (err, result) {
        if (err) throw err;
      });
    }
    res.status(200)({ status:"OK", result:"New roles with permissions inserted"}));

  } else {
    res.status(400).json({ status: "OK", result: "Empty Role Name or Permissions sent"}));
  }
});


api_handler.get('/permissions', function(req, res) {
      var sql_cmd = "SELECT * FROM Permissions";
      connection.query(sql_cmd, function(err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res.status(200).json({ status:"OK", result:result });
        }
      });
});

api_handler.post('/permissions', function(req, res) {
  var permission_name = req.body.permissionName;

  if (permission_name) {
    var sql_cmd = "INSERT INTO Permissions (permissionName) VALUES ('" + permission_name + "');";

    connection.query(sql_cmd, function (err, result) {
      if (err) throw err;

      res.status(200).json({ status:"OK", result:"New permission='" + permission_name + "' inserted" }));
    });
  } else {
    res.status(400).json({ status:"NG", result:"Empty permission sent" });
  }
});

api_handler.post('/signup', function(req, res){
  var user_name = req.body.userName;
  var user_email = req.body.userEmail;
	var user_pwd1 = req.body.userPwd1;
  var user_pwd2 = req.body.userPwd2;
  var user_role = "User"; //at default, admin will set it later

	if (user_name && user_email && user_pwd1 && user_pwd2) {
    if (user_pwd1 != user_pwd2) {
      res.status(400).json({ status:"NG", result:"Password and Repeat Password do not match" }));
    } else {
      var sql_cmd = "INSERT INTO Users (userName, userPwd, userEmail, userRole) VALUES ('" + user_name + "', '" + user_pwd1 + "', '" + user_email + "', '" + user_role + "');";

      connection.query(sql_cmd, function (err, result) {
        if (err) throw err;

        //res.redirect('/user/signup_successful');
        res.status(200).json({ status:"OK", result:"Username= '" + user_name + "' inserted" }));
      });
    }
	} else {
    res.status(400).json({ status:"NG", result:"Form not complete" });
	}
});

api_handler.post('/login', function(req, res){
  var user_name = req.body.userName;
	var user_pwd = req.body.userPwd;

	if (user_name && user_pwd) {
    var sql_cmd = "SELECT * FROM Users WHERE userName = '" + user_name + "' AND userPwd = '" + user_pwd + "';";

    connection.query(sql_cmd, function(err, result, fields) {
      if (err) throw err;

      if (result.length > 0) {
        var token = token_handler.generateAccessToken(user_name);
        //res.redirect('/user/dashboard');
        res.status(200).json({ status:"OK", result:token });
      }
    });

	} else {
    res.status(400).json({ status:"NG", result:"Blank User Name or Password" });
	}
});

module.exports = api_handler;
