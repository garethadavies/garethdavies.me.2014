---
layout: post
title:  "04. Marionette Template Helpers"
subtitle: "Inject some magic into your HTML templates"
date:   2014-01-10 10:13:00
---

If you are developing a Marionette application, there is a very useful attribute called ```templateHelpers``` available on all Marionette views that render a template.

I have used Marionette for a while now, but had never had need for this feature until I started to build a date formatting system into a recent application.

### The Requirements

The requirements set for this system were to be able to:

1. Request a date be formatted via model data being supplied to any template
2. Receive back a valid formatted date and display it in the same template
3. Set an application-wide default date format
4. Request a bespoke format for any date when required
5. Get a clear visual warning if the date supplied is invalid

### The Tools

Along with Backbone, Underscore, MarionetteJS and RequireJS, I decided to use the [Moment.js](http://momentjs.com) date manipulation library. This made formatting the dates much easier and I would suggest you check out the website to see the library's full capabilities.

### The Data

I was being supplied all dates via an API in ```2013-12-13 00:00:00``` format. This dates were added to Backbone models and then supplied to the views for displaying in the view's template.

### Default Date Format

The first task was to declare an application-wide default date format value. In my applications, I attach a 'state' object to my Marionette application object named 'App'. To this state object, I then attach an values or settings i deem required throughtout the application.

It is to this state object that i assign a 'dateFormat' value. This value is usual either set by me before the application is initialised, or is set from a value provided by a datasource.

With this set, I then started creating the date format request handler.

### Request Handler

I first planned and created the Marionette Request Handler. My applications use RequireJS and my request handlers are all initialised and vented, so that they are available application-wide.

```js
define([

	'underscore',
	'requests/requests.vent',
	'moment'

], function(_, Requests, Moment) {

	'use strict';

	return {

		initialize: function() {

			return Requests.setHandler('get:formatted:date', function(options) {

				// Set some defaults for date and format used
				_.defaults(options, {

					date: Moment(),
					format: App.state.dateFormat

				});

				return Moment(options.date).format(options.format);

			});

		}

	};

});
```

I firstly require Underscore, the requests vent module and Moment.js.

I return the request handler when the application calls it's initialise method, providing a name for the command to handle and a callback function.

The callback requires an options object that will contain the date to be formatted and an optional format value.

I use the Underscore ```defaults``` object function to set a default date (today) and format value. The format value is the value that has been set in the application state object.

I then use the Moment library to format the supplied date correctly. If an invalid date is supplied, a 'Invalid date' message is returned, making any errors easy to spot in the UI.

With the request handler complete, it is time to add our template helper to the view.

### Template Helper

I now added the ```templateHelper``` attribute to my view, which, in this case, is a Marionette layout.

```js
define([

  'marionette',
  'requests/requests.vent',
  'tpl!templates/templates.test.tmpl'

], function(Marionette, Requests, Template) {

	'use strict';

	return Marionette.Layout.extend({

		template: Template,

		templateHelpers: {

			formatDate: function(date, format) {

				var formattedDate = Requests.request('get:formatted:date', {

					date: date,
					format: format

				});

				return formattedDate;

			}

		}

	});

});
```

I created a method called ```formatDate``` which makes a request to the date format request handler, passing along the date and format parameters supplied from the view's template.

The response from the request handler will then be sent back to the template for displaying.

With this done, I now moved onto creating the template file.

### Template

The template was required to show a date in the applications default date format and again in ```HH:mm``` format.

The template helper is now available and can be accessed by simply calling it as you would any method ```formatDate(params)```

In the first case, the ```formatDate``` helper is called and the original ```date``` value from the view's model is passed on as a parameter.

The second use of ```formatDate``` supplied both the original ```date``` value and a required format. This example would display the hours and minutes of the date value.

```html
<b><%= formatDate(date) %></b> at <b><%= formatDate(date, 'HH:mm') %></b>
```

### Base View

Although what I have done works fine, it still requires me to add the ```templateHelpers``` attribute to any views in which I want to format a date. This is not DRY at all. But luckily, the base Marionette view can be extended and any template helpers can be added to it, making them accessible to all views in our application.

I created a base view file and added the ```formatDate``` method. This method is then returned when the base view file is required by my main application file.

```js
define([

	'marionette',
	'requests/requests.vent'

], function(Marionette, Requests) {

	'use strict';

	return _.extend(Marionette.View.prototype, {

		templateHelpers: function() {

			return {

				formatDate: function(date, format) {

					var formattedDate = Requests.request('get:formatted:date', {

						date: date,
						format: format

					});

					return formattedDate;

				}

			};

		}

	});

});
```

With this is place, you can now format any date from any Marionette view template without having to add extra code to the view.