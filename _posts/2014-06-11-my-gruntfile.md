---
layout: post
title:  "14. My Gruntfile"
subtitle: "Automating your application tasks via grunt.js"
date:   2014-06-11 11:27:10
---

One of the keys to surviving in a fast-paced industry like ours is automating repetitive tasks. The more you automate this mundane work, the more time you can spend doing fun things like writing unit tests or talking to clients about why their cat doesn’t like your design! 

[Grunt.js](http://gruntjs.com) is an amazing task runner that has hundreds of plugins that allow you to do pretty much anything you require to your application before deployment via a single command in your terminal.

In this article, I will write about one of my more simple grunt files that will give you a great starting point for you to extend as required.

#### Requirements

The requirements were to:

1. Hint/Lint my code
2. Minify and concatenate my code
3. Produce documentation via YUIDoc
4. Produce a report via Plato
5. Cache-bust the current code to ensure the user always sees the latest version
6. Move the production-ready code to a ‘dist’ folder

#### Dependencies

* Node [http://nodejs.org](http://nodejs.org)
* Grunt [http://gruntjs.com](http://gruntjs.com)

#### Getting started

The [Grunt.js](http://gruntjs.com) website has a great guide to getting started with Grunt at: [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)

Please read this guide before continuing.

#### Plugins

[Grunt.js](http://gruntjs.com) provides a [library of plugins](http://gruntjs.com/plugins) where you can search for the plugins that your require.

These are the plugins I decided to use in my grunt file:

##### JSHint

[https://www.npmjs.org/package/grunt-contrib-jshint](https://www.npmjs.org/package/grunt-contrib-jshint)

This plugin will hint the code and let me know of any fixes required.

```js
jshint: {
	all: [‘./path/to/code’]
}
```

##### RequireJS

[https://www.npmjs.org/package/grunt-contrib-requirejs](https://www.npmjs.org/package/grunt-contrib-requirejs)

My application uses require.js, so this plugin will be used to navigate through the dependency tree and minify and concatenate all the code.

```js
requirejs: {
	compile: {
		options: {
			appDir: './path/to/app’,
			baseUrl: './path/to/base’,
			skipDirOptimize: true,
			removeCombined: true,
			mainConfigFile: './path/to/code/main.js',
			dir: './path/to/dist',
			name: 'main',
			fileExclusionRegExp: /^README.md|.editorconfig|.gitattributes|.gitignore|package.json|yuidoc.json|Gruntfile.js|node_modules|sandbox|test|scss|documentation|report|.sass-cache|web.config|.orig|.git$/
		}
	}
}
```

For a full list of possible options, see the [r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

##### YUIDoc

[https://www.npmjs.org/package/grunt-contrib-yuidoc](https://www.npmjs.org/package/grunt-contrib-yuidoc)

[YUIDoc](http://yui.github.io/yuidoc/) Is a JavaScript documentation tool that produces a functional web application built using special block comment syntax.

```js
yuidoc: {
	compile: {
		name: '<%= pkg.name %>',
		description: '<%= pkg.description %>',
		version: '<%= pkg.version %>',
		url: '<%= pkg.homepage %>',
		logo: './path/to/image’,
		options: {
			linkNatives: false,
			outdir: './path/to/documentation',
			paths: './path/to/code',
			tabtospace: 2
		}
	}
}
```

##### Plato

[https://www.npmjs.org/package/grunt-plato](https://www.npmjs.org/package/grunt-plato)

Plato is a JavaScript source code visualisation, static analysis, and complexity tool. Basically, it lets you know if your code needs refactoring.

```js
plato: {
	report: {
		files: {
			'./path/to/report': ['./path/to/code']
		}
	}
}
```

##### Hashres

[https://www.npmjs.org/package/grunt-hashres](https://www.npmjs.org/package/grunt-hashres)

This plugin hashes JS and CSS files and renames the script and link declarations that refer to them.

```js
hashres: {
	prod: {
		src: [
			'./path/to/main.js',
			'./path/to/main.css'
		],
		dest: './path/to/index.html'
	}
}
```

#### The Result

All I now need to do to run these tasks is open Terminal in my root directory, type in ‘grunt’ and hit the big key on the right of my keyboard.

##### Package.json

```json
{
	"name": “Application",
	"version": “1.0.0”,
	"homepage": "http://www.app.com”,
	"description": "This is the my Application... Boom!",
	"logo": "../assets/logo.png",
	"devDependencies": {
		"grunt": "~0.4.2",
		"grunt-cli": "~0.1.11",
		"grunt-contrib-jshint": "~0.8.0",
		"grunt-contrib-requirejs": "~0.4.3",
		"grunt-contrib-yuidoc": "~0.5.0",
		"grunt-plato": "~0.2.1",
		"grunt-hashres": "~0.3.4"
	}
}
```

##### Gruntfile.js

```js
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [‘./path/to/code’]
		},
		requirejs: {
			compile: {
				options: {
					appDir: './path/to/app’,
					baseUrl: './path/to/base’,
					skipDirOptimize: true,
					removeCombined: true,
					mainConfigFile: './path/to/code/main.js',
					dir: './path/to/dist',
					name: 'main',
					fileExclusionRegExp: /^README.md|.editorconfig|.gitattributes|.gitignore|package.json|yuidoc.json|Gruntfile.js|node_modules|sandbox|test|scss|documentation|report|.sass-cache|web.config|.orig|.git$/
				}
			}
		},
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				logo: './path/to/image’,
				options: {
					linkNatives: false,
					outdir: './path/to/documentation',
					paths: './path/to/code',
					tabtospace: 2
				}
			}
		},
		plato: {
			report: {
				files: {
					'./path/to/report': ['./path/to/code']
				}
			}
		},
		hashres: {
			prod: {
				src: [
					'./path/to/main.js',
					'./path/to/main.css'
				],
				dest: './path/to/index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-plato');
	grunt.loadNpmTasks('grunt-hashres');

	grunt.registerTask('default', ['jshint', 'yuidoc', 'plato', 'requirejs', 'hashres']);

};
```