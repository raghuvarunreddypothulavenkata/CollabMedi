/**
 * Created by harishyayi on 4/8/16.
 */
var Groups = require('../models/Groups');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');


module.exports.create = function (req, res) {

  var userid = req.params.userid;
  var admins = [];
  admins.push(userid);
  var members = [];
  members.push(userid);

  var group = Groups({
    _id: new ObjectId(),
    name: req.body.name,
    description: req.body.description,
    admins: admins,
    members: members,
    requests: [],
    rejects: [],
    pic_link: req.body.pic_link,
    posts: []
  });

  group.save(function (err) {
    res.status(201).send({ message: 'Group created!' });
  })
}


// post creation in a group
module.exports.createPost = function (req, res) {

  var groupId = req.params.groupid;

  var post = {
    id: new ObjectId(),
    content: req.body.content,
    type: req.body.type,
    posted_by: req.body.posted_by,
    date: new Date().getTime()
  }
  Groups.findById(groupId, function (err, resp) {
    resp.posts.push(post);
    Groups.findByIdAndUpdate(groupId, resp, function (err, docs) {
      res.status(204).send(resp);
    })
  });
}


// put comment to a post in group
module.exports.putComment = function (req, res) {

  var postId = req.params.postid;
  var userId = req.params.userid;

  var comment = {
    commented_by: userId,
    content: req.body.content,
    date: new Date().getTime()
  }
  Groups.findOne({
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
    Groups.findByIdAndUpdate(resp._id, resp, function (err, docs) {
      res.status(204).send(resp);
    })
  });

}


// group details
module.exports.getAll = function (req, res) {
  var groupId = req.params.groupid;
  Groups.findById(groupId, function (err, resp) {
    if(!resp.posts.isEmpty) {
      var posts = resp.posts;
      posts.reverse();
    }
    res.status(200).json(resp);
  });
}


// join group
module.exports.joinGroup = function (req, res) {

  var groupId = req.params.groupid;
  var userId = req.params.userid;

  Groups.findById(groupId
    , function (err, resp) {
      resp.members.push(userId);
      Groups.findByIdAndUpdate(resp._id, resp, function (err, docs) {
        res.status(204).send();
      })
    });
}


// join group
module.exports.getMembers = function (req, res) {

  var groupId = req.params.groupid;

  Groups.findById(groupId
    , function (err, resp) {
      res.status(200).json(resp.members);
    });
}

module.exports.getAllGroups = function (req,res) {
  Groups.find({},function (err, groups) {
    if (err)
      res.send(err);
    res.status(200).json(groups);
  });
}