---
layout: post
title:  "12. Router Events"
subtitle: "Add before and after events to your routers"
date:   2014-03-31 00:00:10
---

I was recently asked to incorporate a 'last item viewed' feature into a web application. The goal was to style a previously selected list item in some manner after the user had viewed a detail view and then returned back to the list.

An example of this would be the mail app on ios7 devices. If you select a message, it turns grey and goes to the message detail view. Now, if you go back to the list by clicking on '< Messages', you will see that the item you clicked is still grey but quickly fades out back to normal.

This small, nonintrusive UI effect lets the user know which item they previously clicked on.

#### Requirements

The requirements set were to:

1. Record previous and current route params
2. Request the previous and current route params from any view that requires it
3. Detect params that are relevant to the current view
4. Add a class to the view if the current relevant param (id) matched the model id
5. Present the user with a fade background color from grey to white effect via a CSS animation

#### Dependencies

* jQuery (>=1.9.1) - http://jquery.com
* Backbone (>=1.1.0) - http://backbonejs.org
* Underscore (>=1.5.2) - http://underscorejs.com
* Marionette (>=1.7.2) - http://marionettejs.com
* backbone.routefilter (>=0.2.0) - https://github.com/boazsender/backbone.routefilter

#### Backbone.routefilter

I needed to set the current and previous params on every route event. These events are not current supplied by Backbone or Marionette, so after a bit of research I came across [backbone.filterroute](https://github.com/boazsender/backbone.routefilter). This plugin provides:

> Before and after filters for Backbone.Router

This is just what I was looking for, so many thanks go to [@boazsender](https://twitter.com/boazsender) for creating it.

#### Base router

I wanted to set the current and previous params on each routing event, so I decided to create a base router that extended the `Marionette.AppRouter` class and made it a dependency of my main app.js script.

```js
define([

  'backbone',
  'marionette',
  'app/base/routers/marionette/base.routers.marionette.router'

], function(Backbone, Marionette, BaseRouter) {

  'use strict';

  ...
```

This meant that any routers I create further into the app, will inherit the base router's methods.

My application features a 'state' model that I use to record various constants and changing values. I use a [Marionette.Command](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.commands.md) to set the model's values and a [Marionette.Request](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.requestresponse.md) to retrieve the model's values. This is where I will store the current and previous param values as objects.

```js
define([

  'marionette',
  'app/app.vent',
  'app/commands/commands.vent',
  'app/requests/requests.vent'

], function(Marionette, Vent, Commands, Requests) {

  'use strict';

  return _.extend(Marionette.AppRouter.prototype, {

    before: function(route, params) {

      Commands.execute('set:state:data', {

        previousParams: Requests.request('get:state:data').get('currentParams')

      });
    },

    after: function(route, params) {

      Commands.execute('set:state:data', {

        currentParams: this.getRouteParams(route, params)

      });

    },

    getRouteParams: function(route, params) {

      var
      paramsObject = {},
      regExp = /\:([^/]+)/g,
      matches = route.match(regExp);

      _.each(matches, function(value, index) {

        var objKey = value.replace(/[^A-Za-z]+/g, '');

        paramsObject[objKey] = params[index];

      });

      return paramsObject;

    }

  });

});
```

The `before` and `after` methods receive 2 parameters:

1. route: The current route (e.g. 'team/:teamId/user/:userId')
2. params: The current params passed in from the route (e.g. ['1234','5678'])

##### Before

The `before` method executes a command that will update the state model via the attributes and values I send to it. In this example, I will simply set the `previousParams` attribute with the `currentParams` value I am requesting. Initially, this will be `undefined`, but on subsequent route events, it will be set to the previous param values.

##### After

The `after` method executes the same command as the `before` method, but this time we update the state model's `currentParams` attribute with the newly requested route's params.

I turn the params into an object via the `getRouteParams` method, which uses a regular expression to detect the param's original identifier in the route and push it into an object with its param value.

#### Styling

To achieve the fading effect, I used created a class called 'selected-row' that I intended to add to any item that I detected as a match to the previously viewed item.

```css
.selected-row {
  animation-name: fadeOutBackground;
  animation-delay: 0;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
}

@keyframes fadeOutBackground {
  from {
    background-color: #cccccc;
  }
  to {
    background-color: white;
  }
}
```

#### Integration

##### List view

I decided to test the code via a Marionette.CompositeView and utilise `itemViewOptions` and specify it as a function so that I can do some checks before returning `fooId` an object literal if `fooId` exists as a previous param.

```js
define([

  'marionette',
  'app/commands/commands.vent',
  'app/requests/requests.vent',
  'app/modules/foo/views/foo.views.item',
  'tpl!app/modules/foo/templates/foo.templates.list.tmpl'

], function(Marionette, Commands, Requests, ItemView, Template) {

  'use strict';

  return Marionette.CompositeView.extend({

    template: Template,

    itemView: ItemView,

    itemViewContainer: '#foo-list',

    itemViewOptions: function() {

      var previousParams = Requests.request('get:state:data').get('previousParams');

      if (previousParams.fooId) {

        return {

          fooId: parseInt(previousParams.fooId, 10)

        };

      }
      else {

        return;

      }

    }

  });

});
```

The `itemViewOptions` function first requests the application's state model `previousParams` attribute's value.

I then do some simple checks to ascertain if the `fooId` param exists. If it does, I add it to the object literal to be sent into the item view.

##### Item view

With `fooId` now being sent into the item view, we can access it by turning the view's `className` into a function and retrieving the value via `this.options.fooId`

```js
define([

  'marionette',
  'tpl!app/modules/foo/templates/foo.templates.item.tmpl'

], function(Marionette, Template) {

  'use strict';

  return Marionette.ItemView.extend({

    template: Template,

    tagName: 'tr',

    className: function() {

      if (this.options.fooId === this.model.get('fooId')) {

        return 'selected-row';

      }
      else {

        return;

      }

    }

    ...
```

The `className` function checks for a matching value for `fooId` and the model's id. If there is a match, a class of 'selected-row' is added to the view.

The fading out effect now occurs when I navigate back to the list view from a detail view.