var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var BlogSchema = new Schema({

    _id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    author: {type: String, required: true},
    comments: {
        type: [{
            commented_by: {type: String, required: true},
            content: {type: String, required: true},
            date: {type: String, required: true}
        }],
        default: []
    },
});

var Blogs = mongoose.model('Blogs', BlogSchema);
module.exports = Blogs;