module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Let's make sure the JavaScript is ok
    jshint: {
      all: ['./js/script.js']
    },
    //
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          './js/script.min.js': ['./js/script.js']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['./js/lib/jquery-1.8.2.min.js', './js/lib/Chart.js', './js/script.min.js'],
        dest: './js/main.min.js',
      },
    },
    // 
    cssmin: {
      combine: {
        files: {
          './css/main.min.css': ['./css/main.css']
        }
      }
    },
    // Create a cache manifest
    manifest: {
      generate: {
        options: {
          basePath: './',
          network: ['http://*', 'https://*'],
          preferOnline: true,
          timestamp: true,
          master: ['index.html']
        },
        src: [
          '*.html',
          'js/.js',
          'css/*.css'
        ],
        dest: './manifest.appcache'
      }
    }
  });

  // 
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the cache manifest plugin
  grunt.loadNpmTasks('grunt-manifest');

  // Load the jshint plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'cssmin', 'manifest']);

}