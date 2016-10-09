/**
 * Created by harishyayi on 4/8/16.
 */
var Users = require('../models/Users');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');


module.exports.create = function (req, res) {

  var userid = req.params.userid;

  var post = {
    id: new ObjectId(),
    content: req.body.content,
    type: req.body.type,
    date: new Date().getTime(),
    posted_by: req.body.posted_by
  }
  Users.findById(userid, function (err, resp) {
    resp.posts.push(post);
    Users.findByIdAndUpdate(userid, resp, function (err, docs) {
      res.status(204).send();
    })
  });

}

module.exports.putComment = function (req, res) {

  var postId = req.params.postid;
  var userId = req.params.userid;

  var comment = {
    commented_by: userId,
    content: req.body.content,
    date: new Date().getTime()
  }
  Users.findOne({
    'posts': {
      $elemMatch: {
        'id': postId
      }
    }
  }, function (err, resp) {

    _.each(resp.posts, function (post) {
      if (post.id == postId) {
        post.comments.push(comment)
      }

    });
    Users.findByIdAndUpdate(resp._id, resp, function (err, docs) {
      res.status(204).send();
    })
  });

}

module.exports.getAll = function (req, res) {

  var userId = req.query.userid;

  Users.findById(userId, function (err, resp) {

    if(resp.connections==undefined){
      res.status(200).json([]);
    }else{
      var temp = resp.connections;

      var connections = [];
      var posts = [];

      if (_.isEmpty(temp)) {
        res.status(200).json(posts);
      } else {
        _.each(temp, function (connection) {
          connections.push({_id: connection});
        })
        Users.find({$or: connections}, function (err, users) {
          _.each(users, function (user) {
            _.each(user.posts, function (post) {
              posts.push(post)
            })

          });
          posts.reverse();
          res.status(200).json(posts);
        });
      }
   }

  });
}
