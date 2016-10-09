/**
 * Created by Manoranjan on 4/8/2016.
 */


module.exports.getAllTrends= function(req,res)
{
    var Twitter = require('twitter');
    var oAuth =require('../../config/twitterAuth');

    var client = new Twitter({
        consumer_key: oAuth['consumer_key'],
        consumer_secret: oAuth['consumer_secret'],
        access_token_key: oAuth['access_token_key'],
        access_token_secret: oAuth['access_token_secret']
    });
    var params = { q:'healthcare',result_type:'popular',count:'10'};
    var out =client.get('search/tweets', params, function(error, tweets, response){
        if (!error) {
            var response = new Array(params['count']);
            for(var value in tweets['statuses'])
            {
                response[value]= {
                    text:tweets['statuses'][value]['text'],
                    source:tweets['statuses'][value]['source']
                }
            }
            res.status(200).json(response);
        }
        else {
            res.status(200).json([]);
        }
    });

}