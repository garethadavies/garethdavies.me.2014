---
layout: post
title:  "05. Application State Object"
date:   2014-01-24 10:13:00
---

One of the best things about the Marionette application object is that you can extend it to add your own functionality. This came in very useful recently on a project that required me to be able to store, retrieve and update specific application settings throughout the application.

### The Requirements

The requirements set for this system were to be able to:

1. Create a state object on the main application object
2. Make the state object available throughout the application
3. Store data within the state object as and when I require
4. Retrieve data from the state object to use within the application
5. Update the state object whenever it is required

### The Tools

My application requires Backbone, Underscore, MarionetteJS and RequireJS.

I make use of the Marionette's Application object, along with the request/response framework and command execution system.

You can read up on all this via the [Marionette Documentation](https://github.com/marionettejs/backbone.marionette).

### Creating the state object

The first task was to extend the Marionette application object and take advantage of its ```onInitializeBefore``` event that lets us pre-process any data we require just before initialization.

All we require is the creation of a state object via ```this.state = {};```. You can call this object whatever makes more sense to you.

```js
define([

	'backbone',
	'marionette',
	'requests/requests.vent',
	'commands/commands.vent'

], function(Backbone, Marionette, Requests, Commands) {

	'use strict';

	return _.extend(Marionette.Application.prototype, {

		onInitializeBefore: function() {

			this.state = {};

		}

	});

});
```

With this in place, I can now require that file within my main application file.

```js
define([

	'backbone',
	'marionette',
	'config/marionette/config.marionette.application'

], function(Backbone, Marionette, ApplicationConfig) {

	'use strict';

	var App = new Backbone.Marionette.Application();

});
```

### Get/Set state properties

#### Set properties

The ability to set properties on the state object is handled by a Marionette Command object.

##### Command handler

```js
define([

	'commands/commands.vent'

], function(Commands) {

	'use strict';

	return {

		initialize: function() {

			return Commands.setHandler('set:state:data', function(options) {

				var App = require('app');

				if (options.properties) {

					if (_.isObject(options.properties)) {

						_.each(options.properties, function(value, key) {

							App.state[key] = value;

						});

					}
					else {

						return;

					}

				}
				else {

					return;

				}

			});

		}

	};

});
```

First we register the command, providing a name for the command to handle and a callback method. In this case, we provide the name ```set:state:data``` and create a callback function that takes an ```options``` parameter with which we can pass our properties in as an object.

We require the ```App``` object in this module, so that we can access the state object. This is done by using the string-argument form of require.

```js
var App = require('app');
```

There is some simple validation of the properties supplied to make sure that is not undefined and I use the Underscore ```_.isObject``` object function to make sure I am dealing with an object as expected.

The ```options.properties``` object is then iterated over via the Underscore ```_.each()``` function and the value in the state object is either replaced or created (if it does not already exist).

##### Command execution

With the command handler finished, we can now execute it within any part of the application we require. Just remember to require it within any dependant module.

The example below shows how I set a default date format on the application state object within my application. This value can be updated at any point using the same code.

```js
Commands.execute('set:state:data', {

  properties: {

    dateFormat: 'ddd DD MMM YYYY'

  }

});
```

#### Request properties

The ability to request properties of the state object is handled by a Marionette RequestResponse object.

```js
define([

	'requests/requests.vent'

], function(Requests) {

	'use strict';

	return {

    initialize: function() {

			return Requests.setHandler('get:state:data', function(options) {

				var App = require('app');

				if (options.properties) {

					if (_.isArray(options.properties)) {

						var properties = {};

						_.each(options.properties, function(property, index) {

							properties[property] = App.state[property];

						});

						return properties;

					}
					else if (options.properties === 'all') {

						return App.state;

					}
					else {

						return App.state[options.properties];

					}

				}
				else {

					return;

				}

			});

    }

  };

});
```

First we register the request handler, providing a name and a callback method. In this case, we provide the name ```get:state:data``` and create a callback function that takes an ```options``` parameter with which we can pass a list of properties we require as a string or an array.

Like we did in the ```get:state:data``` module, we also require the ```App``` object in this module. This is again done by using the string-argument form of require.

```js
var App = require('app');
```

There is some simple validation of the properties supplied to make sure that is not undefined.

There are 3 options for the value of the ```options.properties``` parameter:

1. Supply a string value of a single property name to be returned
2. Supply an array of property names to be returned
3. Supply 'all' to request the whole state object (Not necessary, but I included it anyway)

I use the Underscore ```_.isArray``` object function to check if I am dealing with an array. If I am, I loop through the array and add the properties requested to an object that is returned.

I then check if 'all' has been supplied and simply return the whole state object.

If neither of these have been supplied, I simply return the value of the property requested.

##### Requesting the data

With the request handler finished, we can now request data from the state object within any part of the application we require. Again, just remember to require it within any dependant module.

The example below shows how I set a request the current date format from the application state object within my application.

```js
Requests.request('get:state:data', {

  properties: 'dateFormat'

});
```