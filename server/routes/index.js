var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('../controllers/Users.js');
var blog = require('../controllers/Blogs.js');
var post = require('../controllers/Posts.js');
var group = require('../controllers/Groups.js');
var search = require('../controllers/Search.js');
var trend = require('../controllers/Trends.js');
var truemd = require('../controllers/Truemd.js');
var chat = require('../controllers/Chat.js');
var disease = require('../controllers/Disease.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/rest/v1/login', auth.login); // login API

/*
 * Routes related to Projects module
 */
router.get('/rest/v1/users', user.getAll); // Get users
router.get('/rest/v1/users/:userId', user.getOne); // Get user details
router.post('/rest/v1/users', user.create); // create user
router.put('/rest/v1/users/:userId1/:userID2', user.sendRequest); // Update user
router.put('/rest/v1/users/friend/:userId1/:userId2', user.acceptRequest); // Update user


router.get('/rest/v1/posts', post.getAll); // newsfeed
router.post('/rest/v1/posts/:userid', post.create); // create user post
router.post('/rest/v1/comments/:postid/:userid', post.putComment); // Add comments to user post


router.post('/rest/v1/blogs/:userId', blog.create); // create blog
router.post('/rest/v1/blogs/comments/:blogId/:userId', blog.addComments); // add comments to blog
router.get('/rest/v1/blogs/:blogId', blog.getBlogDetails);
router.get('/rest/v1/blogs/', blog.getAllBlogs);


router.get('/rest/v1/groups/', group.getAllGroups);
router.get('/rest/v1/groups/posts/:groupid', group.getAll); // group details
router.get('/rest/v1/groups/members/:groupid', group.getMembers); // get all members in group
router.post('/rest/v1/groups/:userid', group.create); // create group
router.post('/rest/v1/groups/posts/:groupid', group.createPost); // create group post
router.post('/rest/v1/groups/comments/:postid/:userid', group.putComment); // Add comments to user post
router.post('/rest/v1/groups/join/:groupid/:userid', group.joinGroup); // join group


router.get('/rest/v1/trends', trend.getAllTrends);

router.get('/rest/v1/truemd/medicineAlternatives/:id', truemd.medicineAlternatives);
router.get('/rest/v1/truemd/medicineSuggestions/:id', truemd.medicineSuggestions );

router.post('/rest/v1/checkd', disease.checkd); // disease predictor


router.get('/rest/v1/search', search.findAll); // search all

router.get('/rest/v1/msgHistory/:fromID/:toID/', chat.msgHistory);
router.get('/rest/v1/sendMsg/:fromID/:toID/:msg/', chat.sendMsg);
router.get('/rest/v1/getMsg/:toID/', chat.getMsg);
router.get('/rest/v1/users/listOnlineConnections/:userId', user.listOnlineConnections);

module.exports = router;