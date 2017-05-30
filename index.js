'use strict';
var csv2array = require('csv2array'),
fs = require('fs'),
path = require('path'),
pkg = require('./package.json'),
_ = require('underscore');


var file = path.join(__dirname, 'data', 'zips.csv');
if(!fs.existsSync(file)) throw new Error('Data source not available: ' + file);

var raw = fs.readFileSync(file, {encoding : 'ascii'});
var rows = csv2array(raw);
rows.shift();
    
var columns = ['zipcode','type','city','state','latitude','longitude'];  
var data = _.chain(rows).map(function(row){ 
  return [
    row[0], // zip code
    row[1], // zip code type
    row[2], // city
    row[3], // state
    row[5], // lat
    row[6]  // long
  ];
}).map(function(row){ // format data
  if(row[1]) row[1] = row[1].toLowerCase();
  if(row[2]){
    if( (row[2].length === 3) && (row[2].substr(1) == 'PO')){ } //continue;
    else row[2] = row[2].replace(/\w\S*/g, function(s){return (s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()); });
  }
  return row;
}).value();

module.exports.version = pkg.version;
module.exports.length = _.memoize(function(){ return data.length; });
module.exports.random = function(){
  var num = (_.first(arguments) || 1);
  var returner =  _.chain(data).sample(num).map(function(d){ return _.object(columns, d); }).toArray().value();
  if(num === 1) return returner[0];
  else return returner;
};

function toKey(obj){
  return _.toArray(obj).join('_').toLowerCase();
}

var getIndexedByCols = _.memoize(function(){
  var cols = _.toArray(arguments);
  var indexedData = {};
  data.forEach(function(d){
    var key = toKey(_.map(cols, function(i){ return d[i]; }));
    indexedData[key] = d;
  });
  return indexedData;
}, function(){
  var hash =_.toArray(arguments).join('-');
  return hash;
});

_.each({
  'zipcode' : [0],
  'citystate' : [2,3],
  'latlong' : [4,5]
}, function(cols, name){
  exports[name] = function(){
    var indexed = getIndexedByCols.apply(null, cols);

    var args = _.toArray(arguments); 
    var callback = (((typeof _.last(args)) === 'function') ? args.pop() : undefined);

    var key = toKey(args);
    var returner = {};
    if(_.has(indexed,key)) returner = _.object(columns, indexed[key]);
    
    if(callback){
      var err = null;
      if(_.isEmpty(returner)) err = new Error(name + ' lookup on [' + args.join(', ') + '] has no results');
      return callback(err, returner);
    }else return returner;
  };
});
    
