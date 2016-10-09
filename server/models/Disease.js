
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var diseaseSchema = new Schema({

  _id: {type: String, required: true},
  disease: {type: String, required: false},
  symptoms: [{
    type: String
  }]
});

var Diseases = mongoose.model('Disease', diseaseSchema);
module.exports = Diseases;
