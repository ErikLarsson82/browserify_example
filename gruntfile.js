var _ = require('underscore');

module.exports = function (grunt) {

  var babelConfig = [{
    expand: true,
    cwd: 'intermediaries/',
    src: '*.js',
    dest: 'output',
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
        src: 'src/source.js',
        dest: 'intermediaries/bundle.js'
      }
    },
    copy: {
      main: {
        files: [
          { src: ['html/index.html'], dest: 'output/index.html', filter: 'isFile' },
          { src: ['json/pushbot.json'], dest: 'intermediaries/pushbot.json', filter: 'isFile' },
          { src: ['lib/text.js'], dest: 'intermediaries/text.js', filter: 'isFile' },
          { src: ['lib/json.js'], dest: 'intermediaries/json.js', filter: 'isFile' },
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

  grunt.registerTask('default', ['clean:prepare', 'copy', 'browserify', 'babel', 'clean:cleanup']);
};