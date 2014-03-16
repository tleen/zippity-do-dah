'use strict';

var pkg = require('../package.json'),
should = require('should'),
zipdb = require('..'),
_ = require('underscore');

describe('versioning', function(){
  it('should have a version', function(){
    zipdb.should.have.property('version');
  });

  it('should equal package version', function(){
    zipdb.version.should.be.exactly(pkg.version);
  });
});

describe('random()', function(){
  it('should return a single entry', function(){
    zipdb.random().should.be.ok.and.an.Object.and.have.properties('zipcode', 'type', 'city', 'state', 'latitude', 'longitude');
  });

  it('should return an array of entries', function(){
    zipdb.random(5).should.be.ok.and.an.Array.and.have.lengthOf(5);
  });

});

var datasets = [
  {zipcode: '04107', type: 'standard', city: 'Cape Elizabeth', state: 'ME', latitude: '43.56', longitude: '-70.20'},
  {zipcode: '06611', type: 'standard', city: 'Trumbull', state: 'CT', latitude: '41.25', longitude: '-73.20' }
];

var functions = [
  { name : 'zipcode', args : ['zipcode'] },
  { name : 'citystate', args : ['city', 'state'] },
  { name : 'latlong', args : ['latitude', 'longitude'] }
];

functions.forEach(function(func){
  datasets.forEach(function(data){
    describe(func.name, function(){
      var args = _.chain(data).pick(func.args).toArray().value();
      if(args.join('') === '') return; // force skip of test data n/a to this function
      describe('should match expected results for ' + func.name + '(' + _.toArray(args).join(',') + ')', function(){

	it('sync', function(){
	  var results = zipdb[func.name].apply(null, args);
	  should(results).be.ok.and.an.Object;
	  results.should.eql(data);
	});

	it('async', function(done){
	  args.push(function(err, results){
	    should(results).be.ok.and.an.Object;
	    results.should.eql(data);
	    return done();
	  });
	  zipdb[func.name].apply(null, args);
	});

      });
    });
  });
});


/*
describe('zipcode()', function(){
  describe('should return proper data', function(){
    var expecting = 

    it('in sync', function(){
      var data = zipdb.zipcode('04107');     
      should(data).be.ok.and.be.an.Object;
      data.should.eql(expecting);
    });

    it('callback', function(done){
      zipdb.zipcode('04107', function(err, data){
	should(data).be.ok.and.be.an.Object;
	data.should.eql(expecting);
	return done();
      });     
    });
  });
});
*/
