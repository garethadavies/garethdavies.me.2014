I recently found myself needing to extract models based on an attribute value (Boolean) from a Backbone collection and add them into 2 seperate collections.

This may sound simple enough, but I had to do this for data that would be included in each response from the API.

### The Requirements

The requirements for this feature were to be able to:

1. Divide up items in an object array based on an attribute value
2. Add the seperated data to 2 new Backbone collections
3. Perform this process after each response from the API
4. Perform this process on collections and object arrays in models

### The Tools

My application requires Backbone, Underscore, MarionetteJS and RequireJS.

### The data

This is an example of the kind of JSON data I am dealing with.

```json
{
  "myAlerts": [
    {
      "alertId": 12345,
      "alertType": "warning",
      "headline": "Foo Bar",
      "text": "Foo bar",
      "link": null,
      "global": true
    },
    {
      "alertId": 1234567,
      "alertType": "success",
      "headline": "Foo Bar",
      "text": "Foo bar",
      "link": null,
      "global": false
    },
    {
      "alertId": 123456,
      "alertType": "error",
      "headline": "Foo Bar",
      "text": "Foo bar",
      "link": "foo/bar/12345",
      "global": false
    }
  ],
  "myData": { ... }
}
```

You can see that there is a ```global``` property for each alert that is either set to true or false. It is via this value that I am going to divide the objects up.

### Base Collection

I decided to extend the Backbone collection prototype so I could utilise the collection [parse method](http://backbonejs.org/#Collection-parse) to hijack how the application sends back data fetched from the server.

The reason I did this was that I knew that I had to perform this process after each request to the API. So it made sense to use a base collection rather than having to write the same code in each collection module in the application.

```js
define([

  'backbone',
  'alerts/alerts.collection'

], function(Backbone, Collection) {

  'use strict';

	return _.extend(Backbone.Collection.prototype, {

		parse: function(response) {

			if (response.myData) {

				if (response.myAlerts) {

					var
          trueData = _.where(response.myAlerts, {

						global: true

					}),
          falseData = _.where(response.myAlerts, {

						global: false

					});

					var
          collectionTrue = new Collection(trueData),
          collectionFalse = new Collection(falseData);

				}

				return response.myData;

			}
			else {

				return response;

			}

		}

	});

});
```

After extending the collection prototype, I do some simple validation to check that the response is definitely from the API by checking the ```myData``` object exists. I also check if the ```myAlerts``` object exists as alerts are not required to be sent in the JSON.

If the ```myData``` object does not exists, I just return the response unchanged.

If alerts data has been supplied, I use the [Underscore 'where' function](http://underscorejs.org/#where) to extract the objects an add them to either ```trueData``` or ```falseData``` depending on the value of the ```global``` property. I then create 2 collections and pass in the appropriate data.

With this, we will have 2 seperate collections that you can validate or pass on to show in a view etc.

#### Require the base collection

Simply require the base collection in your main application file and everytime a collection is fetched from the server, a check for alerts will take place as required.

```js
define([

  'backbone',
  'marionette',
  '_base/collections/backbone/base.collections.backbone.collection'

], function(Backbone, Marionette, BaseCollection) {

  'use strict';

});
```

### Base model

Although this post only covers using a Backbone collection, I also created exactly the same process for Backbone models. I created a base model that basically copied the base collection parse method code to check for alerts.

### The command

I vent all my commands so I can require them in any module as ```Command```.

#### Keeping it DRY

I did not want to duplicate the same code in the base collection and model files, so I moved the code into a [Marionette command](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.commands.md) and just passed the ```response.myAlerts``` data to the command as a parameter.

```js
define([

	'backbone',
	'commands/commands.vent',
	'alerts/alerts.collection'

], function(Backbone, Commands, Collection) {

  'use strict';

  return {

    initialize: function() {

			return Commands.setHandler('show:alerts', function(options) {

				var
				trueData = _.where(options.data, {

					global: true

				}),
				falseData = _.where(options.data, {

					global: false

				});

				var
				trueCollection = new Collection(trueData),
				falseCollection = new Collection(falseData);

				// Do whatever you want with the collections....

			});

    }

  };

});
```

This is the new base collection that executes the ```show:alerts``` command if any alerts are supplied:

```js
define([

  'backbone',
  'commands/commands.vent'

], function(Backbone, Commands) {

  'use strict';

	return _.extend(Backbone.Collection.prototype, {

		parse: function(response) {

			if (response.myData) {

				if (response.myAlerts) {

					Commands.execute('show:alerts', {

            data: response.myAlerts

          });

				}

				return response.myData;

			}
			else {

				return response;

			}

		}

	});

});
```

This is the final base model that executes the ```show:alerts``` command if any alerts are supplied:

```js
define([

  'backbone',
  'commands/commands.vent'

], function(Backbone, Commands) {

  'use strict';

	return _.extend(Backbone.Model.prototype, {

		parse: function(response) {

			if (response.myData) {

				if (response.myAlerts) {

					Commands.execute('show:alerts', {

            data: response.myAlerts

          });

				}

				return response.myData;

			}
			else {

				return response;

			}

		}

	});

});
```