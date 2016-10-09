/**
 * Created by adwant on 4/10/2016.
 */
"use strict"

var Blogs = require('../models/Blogs');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');


module.exports.create = function (req,res) {
    var blog = Blogs({
        _id:new ObjectId(),
        created_by: req.params.userId,
        name:req.body.name,
        description:req.body.description,
        author: req.body.author
    });
    blog.save(function (err) {
        if (err)
            res.send(err);
        res.status(201).json({ message: 'Blog created!' });
    });
}

module.exports.addComments = function(req,res) {
    var userId = req.params.userId;

    Blogs.findByIdAndUpdate(
        req.params.blogId,
        {$push: {'comments': {commented_by: userId,content: req.body.content,date: new Date().getTime()}}},
        { upsert: true},
        function(err, model) {
        if (err) {
            return res.send(err);
        }
        return res.status(204).json(model);
    });
}

module.exports.getAllBlogs = function (req,res) {
    Blogs.find({},function (err, blogs) {
            if (err)
                res.send(err);
            res.status(200).json(blogs);
        });
}

// blog details
module.exports.getBlogDetails = function (req, res) {
    var blogId = req.params.blogId;
    Blogs.findById(blogId, function (err, resp) {
        res.status(200).json(resp);
    });
}