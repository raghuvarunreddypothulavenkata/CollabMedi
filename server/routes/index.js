var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('../controllers/Users.js');
var post = require('../controllers/Posts.js');
var group = require('../controllers/Groups.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login); // login API

/*
 * Routes related to Projects module
 */
router.get('/rest/v1/users', user.getAll); // Get users
router.get('/rest/v1/users/:userId', user.getOne); // Get user details
router.post('/rest/v1/users', user.create); // create user
router.put('/rest/v1/users/:userId', user.update); // Update user
router.delete('/rest/v1/users/:userId', user.delete); // Delete user

router.get('/rest/v1/posts', post.getAll); // newsfeed
router.post('/rest/v1/posts/:userid', post.create); // create user post
router.post('/rest/v1/comments/:postid/:userid', post.putComment); // Add comments to user post

router.get('/rest/v1/groups/posts/:groupid', group.getAll); // newsfeed
router.get('/rest/v1/groups/members/:groupid', group.getMembers); // get all members in group
router.post('/rest/v1/groups/:userid', group.create); // create group
router.post('/rest/v1/groups/posts/:groupid', group.createPost); // create group post
router.post('/rest/v1/groups/comments/:postid/:userid', group.putComment); // Add comments to user post
router.post('/rest/v1/groups/join/:groupid/:userid', group.joinGroup); // join group


module.exports = router;

