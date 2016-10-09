/**
 * Created by harishyayi on 4/10/16.
 */

var Users = require('../models/Users');
var Groups = require('../models/Groups');
var Blogs = require('../models/Blogs');

var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');
var q = require('q');

module.exports.findAll = function (req, res) {
  function findAllUsers(){

    var deferred = q.defer();

    Users.find({}, '_id fname', function(err,resp){
      deferred.resolve(resp);
    })

    return deferred.promise;


  }

  function findAllGroups(){

    var deferred = q.defer();

    Groups.find({}, '_id name', function(err,resp){
      deferred.resolve(resp);
    })

    return deferred.promise;

  }

  function findAllBlogs(){

    var deferred = q.defer();

    Blogs.find({}, '_id name author', function(err,resp){
      deferred.resolve(resp);
    })

    return deferred.promise;

  }


  q.all([
    findAllUsers(),
    findAllGroups(),
    findAllBlogs()
  ]).then(function(data){
    var response = [];
    for(var i=0; i < data[0].length; i++) {
      var tempUser = {};
      tempUser.type='User';
      tempUser.id=data[0][i]._id;
      tempUser.name=data[0][i].fname;
      response.push(tempUser);
    }
    for(var j=0; j < data[1].length; j++) {
      var tempGroup = {};
      tempGroup.type='Group';
      tempGroup.id=data[1][j]._id;
      tempGroup.name=data[1][j].name;
      response.push(tempGroup);
    }
    for(var k=0; k < data[2].length; k++) {
      var tempBlog = {};
      tempBlog.type='Blog';
      tempBlog.id=data[2][k]._id;
      tempBlog.name=data[2][k].name;
      response.push(tempBlog);
    }
    res.status(200).json(response);
  });

}
