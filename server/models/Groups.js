
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var GroupSchema = new Schema({

    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    admins: [{
        type: String
    }],
    members: [{
        type: String
    }],
    requests: [{
        type: String
    }],
    rejects: [{
        type: String
    }],
    pic_link: {type: String, required: false},
    posts: {
        type: [{
            id: {type: String, required: true},
            type: {type: String, required: true},
            content: {type: String, required: true},
            comments: {
                type: [{
                    commented_by: {type: String, required: true},
                    content: {type: String, required: true},
                    date: {type: String, required: true}
                }],
                default: []
            },
            date: {type: String, required: true}
        }],
        default: []
    }
});

var Groups = mongoose.model('Groups', GroupSchema);
module.exports = Groups;
