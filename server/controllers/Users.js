/*
 Author : Harish Yayi
 Description : This file contains all the functionalities related to Skills module like create,find,update and delete.
 Created On : July 7, 2015
 Last Edited : July 8,2015
 Last Edited By : Harish Yayi
 */

"use strict"

var Users = require('../models/Users');
var _ = require('underscore');

module.exports.create= function(req,res){
    var user = Users({
        _id: req.body._id,
        password:req.body.password,
        user_type:req.body.user_type,
        doctor_id:req.body.doctor_id,
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        phone:req.body.phone,
        pic_link:req.body.pic_link
    });

    Users.find({_id : req.body._id}, function (err, docs) {
        if (docs.length){
            res.status(401).send(err);
        }else{
            user.save(function(err) {
            if (err) {
                res.status(401).send(err);
            }
            res.status(201).json({ message: 'User created!' });
            });
        }
    });
}

module.exports.getAll = function(req,res){
    if (req.query.id == undefined) {
        Users.find({}, '_id', function (err, users) {
            if (err)
                res.send(err);
            res.status(200).json(users);
        });
    }
    else{

        Users.findOne({'_id':req.query.id},'connections',function(err, users) {

            var temp = users.connections;
            var connections = [];
            var friends = [];

            if (_.isEmpty(temp)) {
                res.status(200).json(friends);
            } else {
                _.each(temp, function (connection) {
                    connections.push({_id: connection});
                })
                Users.find({$or: connections}, function (err, users) {
                    _.each(users, function (user) {
                        var tempFriend = {};
                        tempFriend.fname = user.fname;
                        tempFriend.email = user.email;
                        friends.push(tempFriend)
                    });
                    res.status(200).json(friends);
                });
            }
        });
    }
}

module.exports.getOne = function(req,res) {
    Users.findById(req.params.userId , function(err,post){
        var posts = post.posts;
        posts.reverse();
        res.status(200).json(post);
    });
}

module.exports.sendRequest= function(req,res) {
    console.log(" In update friend put module");
    //goes into request field.
    Users.findByIdAndUpdate(
        req.params.userId1,
        {$push: {"requests": req.params.userID2}},
        {safe: true, upsert: true},
        function(err, model) {
            if(err){
                console.log(err);
                return res.status(401).send(err);
            }
            return res.status(201).json(model);
        }
    );


   /* Users.findById(req.params.userId1,function(err,post){
        post.connections = post.connections+","+ req.params.userID2;
        console.log(post.connections)
        var user = Users({
            connections:post.connections
        });
        user.save(function(err){
            return res.json({ message: 'User updated!' });
        });
    });*/
}

module.exports.acceptRequest= function(req,res) {
    Users.findByIdAndUpdate(
        req.params.userId1,
        {'$push': {"connections": req.params.userId2}},
        { upsert: true},
        function(err, model) {
            if(err){
                console.log(err);
                return res.send(err);
            }
            Users.findByIdAndUpdate(
                req.params.userId2,
                {'$push': {"connections": req.params.userId1}},
                { upsert: true},
                function(err, model) {
                    if (err) {
                        console.log(err);
                        return res.status(401).send(err);
                    }
                    return res.status(201).json(model);
                });
        }
    );
};

module.exports.listOnlineConnections= function(req,res) {
    console.log(req.params.userId);
    var result=[];
    var call = 0;
    if(req.params.userId !== 'undefined') {
        Users.find({email: req.params.userId}, function (err, userDetails) {
            if (!err) {
                console.log(userDetails[0].connections);
                for (var i = 0; i < userDetails[0].connections.length; i++) {
                    (function (i) {
                        Users.find({email: userDetails[0].connections[i]}, function (err, userDetail) {
                            if (!err) {
                                if (!(userDetail[0] === undefined)) {
                                    var test = {
                                        id: userDetail[0]['email'],
                                        name: userDetail[0]['fname'] + '   ' + userDetail[0]['lname']
                                    };
                                    result.push(test);
                                    console.log(result);
                                }
                            }
                            call++;
                            if (call > userDetails[0].connections.length - 1) {
                                completeRequest(res, result);
                            }
                        });
                    }(i));
                }
            }
            else {
                res.json(err);
            }
        });
    }
    else {
        res.json(result);
    }
};

function completeRequest(res, result) {
    res.json(result);
}




