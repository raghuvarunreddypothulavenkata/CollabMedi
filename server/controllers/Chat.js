/**
 * Created by Manoranjan on 4/9/2016.
 */
var outh = require('../../config/ChatServer');
var http = require('http');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : outh['host'],
    user     : outh['user'],
    password : outh['password'],
    database : outh['database']
});

module.exports.msgHistory = function(req,res) {
    console.log('Getting message history.');
    var query ='select * from ChatHistory where fromID=\''+req.params.fromID
        +'\' and toID=\''+req.params.toID
        +'\' UNION ALL select * from ChatHistory where toID=\''
        +req.params.fromID+'\' and fromID=\''+req.params.toID+'\' ORDER BY id desc limit 10';
    connection.query(query, function(err, rows, fields) {
        if (!err) {
            res.status(200).json(rows);
        }
        else {
            console.log('Error while performing Query.');
            res.status(401).json([]);
        }
    });

};

module.exports.sendMsg = function(req,res) {
    var query = 'INSERT INTO ChatHistory  (fromID,toID,message) values ('+'\''
        +req.params.fromID+'\', \''+req.params.toID+'\', \''+req.params.msg+'\')';

    connection.query(query, function(err) {
        if (!err) {
            msg=req.params.msg.toString();
            if(true) {
                for(var i=0;i<msg.length;i++) {
                    msg = msg.replace(' ', "%20");
                }
            }
            var path ='/rest/v1/getMsg/'+req.params.toID+'/?fromID='+req.params.fromID+'&msg='+msg+'/';
            console.log(path);
            var options = {
                host: 'localhost',
                port: 3000,
                path: path,
                method: 'GET'
            };
            http.request(options, function(response) {
                var result = {
                    fromID:req.param('fromID'),
                    msg:req.param('msg')
                };
                console.log(result);
                res.status(200).json(result);
            }).end();
        }
        else {
            console.log('Error while performing Query.');
            res.status(401).json([]);
        }
    });
}

module.exports.getMsg = function(req,res) {
    console.log(req.param('msg'));
    if(true) {
        var result = {
            fromID:req.param('fromID'),
            mssg:req.param('msg')
        };
        console.log(result);
        res.json(result);
    }
}