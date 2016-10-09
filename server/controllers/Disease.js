/**
 * Created by harishyayi on 5/8/16.
 */
var Diseases = require('../models/Disease');
var _ = require('underscore');


module.exports.checkd = function (req,res) {

  function predicatBy(prop){
    return function(a,b){
      if( a[prop] > b[prop]){
        return 1;
      }else if( a[prop] < b[prop] ){
        return -1;
      }
      return 0;
    }
  }

  var symptoms = req.body.symptoms;
  var updatedDiseases = [];
  Diseases.find({ symptoms : { $in : symptoms }}, function (err, diseases) {
    for(var i =0;i<diseases.length;i++){
      var disease = {};
      disease.disease = diseases[i].disease;
      disease.symptoms = diseases[i].symptoms;
      disease.count =0;
      var symp = disease.symptoms;
      _.each(symp,function(sym){
        "use strict";
        if(symptoms.indexOf(sym)>=0){
          disease.count++;
        }
      })
      updatedDiseases.push(disease);
    }

    updatedDiseases.sort( predicatBy("count") ).reverse();

    res.status(200).json(updatedDiseases);
  });

}