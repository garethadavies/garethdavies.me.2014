---
layout: post
title:  "08. Backbone Crudder"
subtitle: "Make your Backbone application CRUD operations even easier"
date:   2014-02-07 10:13:00
---

Backbone.Crudder is a Backbone plugin I have created to make CRUD operations easier over large applications. You can set application wide fetch/save/delete callbacks that cut down boilerplate code.

Feel free to use and change this plugin as you wish as it has been developed to suit my own application, but maybe not yours. It has been used in live applications, so I can guarantee it works, but I am happy if people wish to change the code to suit your own needs.

### Requirements

The requirements for this plugin were to:

1. Cut down the amount of boilerplate code needed to perform CRUD operations
2. Be able to define what happens when particular events occur
3. Be able to provide a callback function to deal with the response

#### Dependancies

* jQuery (>=1.8.3) - http://jquery.com
* Backbone (>=1.0.0) - http://backbonejs.org
* Underscore (>=1.4.4) - http://underscorejs.com

### Getting up and running

#### Download the script

* [backbone.crudder.js](https://raw.github.com/garethadavies/backbone.crudder/master/backbone.crudder.js)

#### Reference the script

This script requires jQuery, Backbone and Underscore, so make sure you add it after those files.

&lt;script src=&quot;path/to/file/backbone.crudder.js&quot;&gt;&lt;/script&gt;

#### Extend Crudder
You can extend Crudder and define what you want to happen when the jQuery AJAX ```beforeSend```, ```complete```, ```success``` and ```error``` functions are fired.

```js
_.extend(Backbone.Crudder.prototype, {

  beforeSend: function() {

    // What you want to happen before any request is sent

  },

  onComplete: function() {

    // What you want to happen when the request is complete

  },

  onSuccess: function(options) {

    // What you want to happen on a success request

  },

  onError: function(options) {

    // What you want to happen when a request errors

  }

});
```

Make sure that you include the backbone.crudder.js file before you extend it.

#### Initialise Crudder
When you initialise crudder, you can state which of the functions you wish to be activated.

```js
Backbone.Crudder.initialize({

  beforeSendActivated: true,
  onCompleteActivated: false,
  onSuccessActivated: true,
  onErrorActivated: true

});
```

### Using Crudder

#### Options

Each type of Crudder request types share the following options:

```js
{
	enitity: this.model // The model or collection you wish to perfom the operation on {model or collection}
	successMessage: 'User data has been fetched', // The message to display on a successful request {String}
	errorMessage: 'Error accessing user data', // The message to display on a request error {String}
}
```

The success and error messages are passed into the ```onSuccess``` and ```onError``` methods, for you to display them however your wish.

The creating/updating/deleting requests share the following options:

```js
{
	wait: true, // Do we want to wait for a server response? (Boolean, Default: true)
	silent: true, // Do we want to prevent the built-in Backbone event from being triggered (Boolean, Default: false)
}
```

The creating/updating request has the following options:

```js
{
	entityData: {} // The data to send to the server (Object)
}
```

#### Example Fetch

##### Options

```js
Backbone.Crudder.reading({

  entity: this.collection,
  successMessage: 'User data has been fetched',
  errorMessage: 'Error accessing user data',

}, function(options) {

  // Callback function
  // Do whatever you require to do here

  // Has the request been successful?
  if (options.success) {

  }

});
```

#### Example Save

```js
Backbone.Crudder.creatingUpdating({

  entity: this.model,
  entityData: {

    name: 'Gareth',
    email: 'gareth@me.com'

  },
  wait: true,
  silent: true,
  successMessage: 'The user has been saved',
  errorMessage: 'Unable to save the user'

}, function(options) {

  // Callback function
  // Do whatever you require to do here

  // Has the request been successful?
  if (options.success) {

  }

});
```

You may want to look at Derick Bailey's [Backbone.Syphon](https://github.com/derickbailey/backbone.syphon) as an easy way to serialise the forms in your backbone application.

#### Example Delete

```js
Backbone.Crudder.deleting({

  entity: this.model,
  wait: true,
  silent: true,
  successMessage: 'The user has been removed',
  errorMessage: 'Unable to remove the user'

}, function(options) {

  // Callback function
  // Do whatever you require to do here

  // Has the request beed successful?
  if (options.success) {

  }

});
```