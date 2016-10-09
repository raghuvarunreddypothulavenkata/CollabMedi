
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var userSchema = new Schema({

    _id: {type: String, required: true},
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    doctor_id: {type: String, required: false},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: false},
    //todo
    connections: [{
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

var Users = mongoose.model('User', userSchema);
module.exports = Users;
