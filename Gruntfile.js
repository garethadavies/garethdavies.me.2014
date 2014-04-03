module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Let's make sure the JavaScript is ok
    jshint: {
      all: ['./_site/js/script.js']
    },
    //
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          './_site/js/script.js': ['./_site/js/script.js']
        }
      }
    },
    // 
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      combine: {
        files: {
          './_site/css/main.css': ['./_site/css/main.css']
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
          master: ['./_site/index.html']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the cache manifest plugin
  grunt.loadNpmTasks('grunt-manifest');

  // Load the jshint plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'manifest']);

}