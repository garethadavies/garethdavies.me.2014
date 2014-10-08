---
layout: post
title:  "16. Add Backbone to your website"
subtitle: "Adding Backbone inspired goodness to a large-scale website"
date:   2014-10-06 11:27:10
---

After moving from developing a Backbone application to working on a large-scale website, I found myself desperate to start including some of the good practices and patterns I had learnt from 2 years of web application development.

The website is component based. Each component has its own JavaScript file alongside companion HTML and CSS files.

A few of the issue I encountered with the codebase were:

1. A lack of consistency in coding style
2. The repetition of same code over many files
3. Lack on encapsulation causing bugs in other components

I have always liked Backbone's inheritance model (Read more about this here: [http://www.erichynds.com/blog/backbone-and-inheritance](http://www.erichynds.com/blog/backbone-and-inheritance)) and wanted to use something very similar for the website's components.

To achieve this, I did the following:

1. Introduced underscore.js into the codebase
3. Created a base component file
4. Move any code used over all components into the base file
4. Created the components by extending from the base file

#### Base File

The base component file consists of a constructor function, a few shared methods that are inherited by all components and some code copied over from Backbone itself that allows me to extend the base component.

The construtor is used to:

1. Add a unique id to the component instance
2. Define any option defaults
3. Check that the container element actually exists
4. Ensure the component has been named
5. Create a jQuery version of the element
6. Register any UI elements
7. Set up any event listeners
8. Initialise the component

The idea of registering UI elements and events via a properties of the component, is an idea taken from [Marionette.js Views](http://marionettejs.com/docs/marionette.view.html). This reduces common tasks down to configuration, which is always good.

```js
var Component = App.Component = function(options) {

	// Add a unique id
	this.cid = _.uniqueId(options.component);

	// make sure there is a options object
	options || (options = {});

	// Set options defaults
	_.defaults(options, {
        
        component: undefined,
		element: undefined

	});

	// We need an element and component name
    if (!options.element || !options.component) return false;

	// Add the option to the instance
	this.options = options;

	// Attach the target element via jQuery
	this.$element = $(this.options.element);

	// Define all the UI elements supplied
	this.registerEvents.apply(this, arguments);

	// Register all events supplied
	this.defineUiElements.apply(this, arguments);

	// Initialise the script and send it this and arguments
	this.init.apply(this, arguments);

};

_.extend(Component.prototype, {

	init: function() {},

	/*
    @method defineUiElements
    */
	defineUiElements: function() {

		var
		that = this,
		uiElements = this.ui;

        // Reset the UI object
		this.ui = {};

		// For each element defined in component
		_.each(uiElements, function(value, key) {

			// Add the jQuery object version to the ui object
            that.ui[key] = $(value, that.$element);
				
		});

    },

    /*
    @method registerEvents
    */
    registerEvents: function() {

        var that = this;

        // For each element defined in component
		_.each(this.events, function(value, key) {

            var
            splitted,
            separator = '';

            // Detect a class or id selector
            if (key.indexOf('.') !== -1) {

            separator = '.';

            // Split the key value
            splitted = key.split(separator);

            }
            else if (key.indexOf('#') !== -1) {

                separator = '#';

                // Split the key value
                splitted = key.split(separator);

            }
            else {

                separator = ' ';

                // Split the key value
                splitted = key.split(separator);

            }

            // Listen for the supplied event
            $(separator + splitted[1], that.$element).off().on(splitted[0], function(e) {

                e.preventDefault();

                // Execute the method supplied and pass on the event object
                that[value](e);

            });

        });

    }

});

/* Extend Helper - Lifted from Backbone.js */

// Helper function to correctly set up the prototype chain, for subclasses. Similar to goog.inherits, but uses a hash of prototype properties and class properties to be extended.

var extend = function(protoProps, staticProps) {

    var parent = this;
	var child;
		
	// The constructor function for the new subclass is either defined by you (the “constructor” property in your extend definition), or defaulted by us to simply call the parent’s constructor.
	if (protoProps && _.has(protoProps, 'constructor')) {

		child = protoProps.constructor;

	}
	else {

		child = function() {

			return parent.apply(this, arguments);

		};

    }
		
    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);
		
		// Set the prototype chain to inherit from parent, without calling parent‘s constructor function.
        var Surrogate = function() {

        this.constructor = child;

    };

    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
		
	// Add prototype properties (instance properties) to the subclass, if supplied.
	if (protoProps) {

		_.extend(child.prototype, protoProps);

	}
		
	// Set a convenience property in case the parent’s prototype is needed later.
	child.__super__ = parent.prototype;

	return child;

};
	
// Set up inheritance for the component
Component.extend = extend;
```

#### Example Component

With the base component file set up, it is now a simple task to create a new `MyComponent` component that extends the base file and inherits from its prototype.

As mentioned before, events and UI elements for this component are now all created via configuration set in the `events` and `ui` properties. Thank you Marionette!

```js
App.Components.MyComponent = App.Component.extend({

	// Declare any events and their callback method
    events: {
        'change select': '_onSelectChange'
    },

    // Declare component UI elements
	ui: {
		form: 'form'
	},

	init: function() {
    	 
        // Initialise methods for this component
         
	},
        
    _onSelectChange: function() {
            
        // The user has selected something so submit the form
        this.ui.form.submit();
            
    }

});
```

#### Usage

It is now a simple task to create an single instance of `MyComponent` or even create multiple instances via a shared classname.

```js
// Single component
new App.Components.MyComponent({

	component: 'myComponent',
	element: $('#my-component')

});

// Multiple components
$('.my-component').each(function() {

	new App.Components.MyComponent({

		component: 'myComponent',
		element: this

    });

});
```

#### Conclusion

Transferring some of the skills I learnt developing Backbone applications to a large-scale website, has let me create a more robust and efficient solution to creating new components within a large-scale website.