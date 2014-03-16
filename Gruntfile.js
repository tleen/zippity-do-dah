module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        "expr" : true,
        "node" : true,
        "smarttabs" : true,
	"predef" : [ // mocha test defs
          'after',
          'before',
          'describe',
          'it']
      },
      files: ['./*.js', 'test/*.js'] 
    },
    cafemocha: {
      options : {
        ui : 'bdd',
        require : [
          'should'
        ]
      },
      files: ['test/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('default', ['jshint', 'cafemocha']);
};
