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
          './_site/js/script.min.js': ['./_site/js/script.js']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['./_site/js/lib/jquery-1.8.2.min.js', './_site/js/lib/Chart.js', './_site/js/script.min.js'],
        dest: './_site/js/main.min.js',
      },
    },
    // 
    cssmin: {
      combine: {
        files: {
          './_site/css/main.min.css': ['./_site/css/main.css']
        }
      }
    },
    // Hash our minified files and update any references to them
    hashres: {
      prod: {
        src: [
          './_site/js/main.min.js',
          './_site/css/main.min.css'
        ],
        dest: './_site/index.html'
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
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //
  grunt.loadNpmTasks('grunt-hashres');

  // Load the cache manifest plugin
  grunt.loadNpmTasks('grunt-manifest');

  // Load the jshint plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'cssmin', 'hashres', 'manifest']);

}