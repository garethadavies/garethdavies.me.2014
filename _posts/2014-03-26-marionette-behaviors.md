---
layout: post
title:  "11. Marionette Behaviors"
subtitle: "Mixing common user interactions into any view"
date:   2014-03-26 10:13:00
---

The latest version of Marionette includes a new utility class called Marionette.Behaviors that:

> ...takes care of glueing your behavior instances to their given View.

A Behavior is described as:

> ...an isolated set of DOM / user interactions that can be mixed into any View. Behaviors allow you to blackbox View specific interactions into portable logical chunks, keeping your views simple and your code DRY.

Now, I am a massive fan of keeping code DRY, so I decided to try and move a common UI interaction into a Marionette behavior. The chosen interaction is a user clicking on a calendar icon, causing a Mobiscroll calendar to be shown.

#### Dependencies

* jQuery (>=1.9.1) - http://jquery.com
* Backbone (>=1.1.0) - http://backbonejs.org
* Underscore (>=1.5.2) - http://underscorejs.com
* Marionette (>=1.7.2) - http://marionettejs.com

#### The Behavior

I use requirejs in my application, so I created a file called `behaviors.showCalendar.js` and added this code to it:

```js
define([

	'marionette'

], function(Marionette) {

  'use strict';

	return Marionette.Behavior.extend({

    events: {

       'click .show-calendar': 'showCalendar'

    },

    showCalendar: function(e) {

    	// Show the datepicker
      $(e.currentTarget).next('input').mobiscroll('show');

    	e.preventDefault();

    }

	});

});
```

I simply require Marionette and then return the behavior consisting of an event hash and a method that is called when the user clicks on an element with the class of `show-calendar`.

Pretty simple, but without Marionette behaviors, this code would have to be written in all the views in which I wanted to use the calendar widget.

The corresponding HTML code would be:

```html
<a href="#" class="show-calendar"><i class="icon-calendar"></i></a>
```

#### Using the behavior

With the behavior now available, I can require it into any view I wish:

```js
define([

  'marionette',
  'app/behaviors/behaviors.showCalendar',
  'mobiscroll',
  'moment'

], function(Marionette, ShowCalendar, Mobiscroll) {

  'use strict';

  ...
```

I then add the behaviors property to the view and pass in the `ShowCalendar` behavior.

Note the use of the `behaviorClass` property. This is required as ShowCalendar is a dependency of the view.

```js
behaviors: {

	ShowCalendar: {

		behaviorClass: ShowCalendar

	}

}
```

#### The Result

A click on any element in the view that has a class of `show-calendar`, will cause the `showCalendar` method of the behavior to be called and the calendar to be shown.

Pretty great!

#### Useful Links

[Marionette.Behaviors](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behaviors.md)

[Marionette.Behavior](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behavior.md)