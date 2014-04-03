module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Let's make sure the JavaScript is ok
    jshint: {
      all: ['./_site/js/script.js']
    },
    // Minify the javascript
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
    // Minify the css
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
          basePath: './_site/',
          network: ['http://*', 'https://*'],
          preferOnline: true,
          timestamp: true,
          master: ['index.html']
        },
        src: [
          '**/*.html',
          'js/**/*.js',
          'css/*.css'
        ],
        dest: 'manifest.appcache'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'manifest']);

}