Author: Aizul Tallaha
Email: aizul.tallaha@gmail.com
Title: POC for AirAsia assessment

NodeJS
-------
To start the microservice
$ npm start

MySQL
--------
DB structure and data can be found at /db/airasia_20210326.sql
This file can be imported into the local MySQL.
The credentials used in the code are as below:
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'airasia'

Postman
-------
Postman collection can be found at /postman/AirAsia.postman_collection.json.
This file can be imported into local postman to run test on APIs below:
  /api/signup
  /api/login
  /api/permissions
  /api/roles
  /api/users/:id/roles

The format of data send to the service can be found in the postman collection.

JWT
----
JWT is return upon correct user name and password via API /api/login

Below APIs are protected by JWT and required to be present in the request header x-auth-token
/api/permissions
/api/roles
/api/users/:id/roles

Notes:
-------
1) Current implementation is only for backend service, front end not available.
2) For /api/users/:id/roles, since it is not stated, the :id is assumed to be the user name.
3) Author not able to complete the /api/users/:id/permissions in the current given timeframe, sorry...
