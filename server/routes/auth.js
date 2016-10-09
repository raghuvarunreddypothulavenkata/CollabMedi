/*
 Author : Harish Yayi
 Description : This file contains all the functionalities related to login, token generation
 Created On : Fri June 11, 2015
 Last Edited : Thu July 2 ,2015
 Last Edited By : Harish Yayi
 */

var Users = require('../models/Users');
var q = require('q');
var async = require('async');


var auth = {

    login: function (req, res) {

      var userid = req.body.id;
      var password = req.body.password;
      Users.findById(userid, function (err, resp) {
          if(resp != null) {
              if(resp._id === userid && resp.password === password) {
                  res.status(201).json(resp);
              }
              else {
                  res.status(401).send(err);
              }
          }
          else {
              res.status(401).send(err);
          }
      });
    }
};

module.exports = auth;