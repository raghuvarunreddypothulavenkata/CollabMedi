// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var dev = require('./config/db-secret');


// configuration ===========================================

// config files
//var dev = require('./config/development');
var config = require('config');
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

// set our port
var listening_port = process.env.VCAP_APP_PORT || 3000;

mongoose.connect(dev.dbUrl.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// enabling CORS
app.all('/', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


// routes ==================================================

app.use('/', require('./server/routes'));

// start app ===============================================
require('http').createServer(app).listen(
    listening_port,
    function () {
        console.log('Listening on port ' + listening_port);
    }
);
