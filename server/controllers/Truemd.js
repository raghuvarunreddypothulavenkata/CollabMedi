/**
 * Created by Manoranjan on 4/15/2016.
 */

var request = require('request');

module.exports.medicineSuggestions= function(req,res) {
    var id=req.params.id;
    console.log(req.param('id'));
    if(true) {
        for(var i=0;i<id.length;i++) {
            id=req.params.id.toString().replace("\%", "\%25");
        }
    }
    var out =request ({
        uri: 'http://www.truemd.in/api/medicine_suggestions?id='+id+'&key=6397f2cc17c7d97f3cd02ef6f7df7f&limit=10',
        method: "GET",
        'content-type' : 'application/json',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(err, response, body) {
        if(!err) {
            console.log(JSON.parse(body));
            res.json(JSON.parse(body).response.suggestions);
        }
        else {
            console.log(err.body);
            res.json([]);
        }
    });

}

module.exports.medicineAlternatives= function(req,res) {
    try {
        console.log(req.params.id);
        var out =request ({
            uri: 'http://www.truemd.in/api/medicine_alternatives?id='+req.params.id+'&key=6397f2cc17c7d97f3cd02ef6f7df7f&limit=10',
            method: "GET",
            'content-type' : 'application/json',
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        }, function(err, response, body) {
            if(!err) {
                console.log(JSON.parse(body).response.medicine_alternatives);
                res.json(JSON.parse(body).response.medicine_alternatives);
            }
            else {
                res.json([]);
                console.log(err.body)
            }
        });
    }
    catch (e) {
        res.json([]);
    }
}
