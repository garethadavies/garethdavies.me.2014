---
layout: post
title:  "10. Backbone Mutators"
subtitle: "Take your logic out of your templates"
date:   2014-03-23 10:13:00
---

Do you find yourself writing logic into your templates and thinking "There must be a better way!?!?".

Well, let me introduce you to [backbone.mutators](https://github.com/asciidisco/Backbone.Mutators)

#### Requirements

The requirements set were to:

1. Remove as much logic from my templates as possible
2. Make the extracted logic reusable

#### Dependencies

* jQuery (>=1.9.1) - http://jquery.com
* Backbone (>=1.1.0) - http://backbonejs.org
* Underscore (>=1.5.2) - http://underscorejs.com
* Marionette (>=1.7.2) - http://marionettejs.com
* backbone.mutators (>=0.4.1) - https://github.com/asciidisco/Backbone.Mutators

#### Original code

In one of my templates, I am checking the value of model attribute and outputting a specific icon and text based on the value. The original code looked like this:

```
<% if (status === 'ended') { %>
	<i class="icon-cancel text-red"></i> This system has no active installations
<% } else if (status === 'lost') { %>
	<i class="icon-attention text-orange"></i> This system has not updated within the last 2 hours
<% } else { %>
	<i class="icon-ok text-green"></i> This system is working correctly
<% } %>
```

Messy, and as I have found out, unnecessary.

#### Backbone Mutators

The backbone.mutators github repo asks:

> Ever wanted Backbone to have getters and setters you can override with your own logic?

Yes. And now I will show you how.

#### Usage

##### Integrate

I use requirejs, so I added the plugin via my application's main.js file:

```js
require.config({
  paths: {
    jquery: 'components/jquery/jquery',
    underscore: 'components/underscore/underscore',
    backbone: 'components/backbone/backbone',
    marionette: 'components/marionette/lib/backbone.marionette',
    tpl: 'components/requirejs-tpl/tpl',
    'backbone.mutators': 'components/backbone.mutators/backbone.mutators'

    ...

    'backbone.mutators': {
      deps: ['backbone']
    }

    ...
```

One of the requirements I set out, was that the logic I create can be reusable. So adding the logic code to the model in question seemed the best solution. This way, I can use the same model multiple times and the logic will always be available to me.

This led me to produce this code:

```js
define([

  'backbone',
  'backbone.mutators'

], function(Backbone, Mutators) {

  'use strict';

  return Backbone.Model.extend({

    idAttribute: 'fooId',

    url: '/foo',

    statusClassLookups: {

      live: 'icon-ok text-green',
      lost: 'icon-attention text-orange',
      ended: 'icon-cancel text-red'

    },

    statusTextLookups: {

      live: 'This system is working correctly',
      lost: 'This system has not updated within the last 2 hours',
      ended: 'This system has no active installations'

    },

    mutators: {

      statusClass: function() {

        if (this.get('status')) {

          return this.statusClassLookups[this.get('status')];

        }

      },

      statusText: function() {

        if (this.get('status')) {

          return this.statusTextLookups[this.get('status')];

        }

      }

    }

  });

});
```

Looking at the original code, I knew I required the correct class value and text content. I could have just built the HTML in the model, but I prefer not to do this if possible.

Working out the correct value of both is easy enough via 2 lookup hashes (`statusClassLookups` & `statusTextLookups`). These are attached directly as a property of the model.

We can now add `mutators` properties of `statusClass` and `statusText` to the model. These properties will return the class and text values of the lookup hashes depending on the value of the model's `status` attribute. For example, if the model's attribute `status` is set to 'lost', `statusClass` will return a value of 'icon-attention text-orange' and `statusText` will return a value of 'This system has not updated within the last 2 hours'.

#### New code

The use of backbone.mutators has let me remove the original logic, leaving just:

```
<i class="<%= statusClass %>"></i> <%= statusText %>
```

This keeps the template clean and makes the logic reusable. Smashing.