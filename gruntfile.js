var _ = require('underscore');

module.exports = function (grunt) {

  var babelConfig = [{
    expand: true,
    cwd: '.',
    src: '*.js',
    dest: 'intermediaries',
    ext: '.js'
  }]

  grunt.initConfig({
    babel: {
      dev: {
        options: {
          sourceMap: false,
          presets: ['es2015']
        },
        files: babelConfig
      }
    },
    browserify: {
      main: {
        src: 'intermediaries/source.js',
        dest: 'output/bundle.js'
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, src: ['index.html'], dest: 'output/', filter: 'isFile' },
          { src: ['lib/Box2D.js'], dest: 'intermediaries/Box2D.js', filter: 'isFile' },
        ]
      }
    },
    clean: {
      prepare: ['output'],
      cleanup: ['intermediaries']
    }
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['clean:prepare', 'copy', 'babel', 'browserify', 'clean:cleanup']);
};