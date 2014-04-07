---
layout: post
title:  "13. Show Password Behavior"
subtitle: "Making a common UI feature easy with Marionette Behaviors"
date:   2014-04-07 00:00:10
---

In one of my [previous articles](http://garethdavies.me/2014/03/26/marionette-behaviors.html), I wrote about [Marionette.Behaviors](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behaviors.md) and how you can create reusable UI interactions. If you haven't read that article, I would suggest you do so before reading this article.

I recently created a simple form that allows a user to update their password. The user has to enter a new password and then confirm the password it in another textfield. To make it easier for the user to do this, I wanted to add a 'show passwords' checkbox that lets the user see the passwords they are entering to make sure they match before submitting the form.

I knew that I wanted this UI feature available throughout my application, so I decided to create a new behavior.

#### Requirements

The requirements set were to:

1. Allow the user to view the password(s) they have entered in a password input field
2. Target all passwords inputs or specific inputs defined by me
3. Have this behavior available for all views

#### Dependencies

* jQuery (>=1.9.1) - http://jquery.com
* Backbone (>=1.1.0) - http://backbonejs.org
* Underscore (>=1.5.2) - http://underscorejs.com
* Marionette (>=1.7.2) - http://marionettejs.com

#### Using the behavior

I can require the behavior as a dependency of my view:

```js
define([

  'marionette',
  'app/behaviors/behaviors.showPasswords'

], function(Marionette, ShowPasswords) {

  'use strict';

  return Marionette.ItemView.extend({

    behaviors: {

      ShowPasswords: {

        behaviorClass: ShowPasswords

      }

    }

    ...
```

In this particular view I know that I wanted to show passwords for all the password input fields in the view, so the above code will work just fine.

You can also set which inputs you want to show passwords in via the `targetInputs` option (See below). This value can be either an array of strings or a single string. The value must be the id of the input you want to affect.

```js
define([

  'marionette',
  'app/behaviors/behaviors.showPasswords'

], function(Marionette, ShowPasswords) {

  'use strict';

  return Marionette.ItemView.extend({

    behaviors: {

      ShowPasswords: {

        behaviorClass: ShowPasswords,
        targetInputs: ['password-confirm', 'password'],
        targetInputs: 'password'

      }

    }

    ...
```

An example of the HTML required would be:

```html
<fieldset>

	<legend>Password</legend>

	<label for="password">Enter a new password</label>
	<input type="password" name="password" id="password">

	<label for="password-confirm">Confirm your new password</label>
	<input type="password" name="passwordConfirm" id="password-confirm">

	<label for="passwords-show">
		<input type="checkbox" id="passwords-show" class="form-show-passwords"> Show passwords
	</label>

</fieldset>
```

#### The Behavior

I created a file called `behaviors.showPasswords.js` and added this code to it:

```js
define([

	'marionette'

], function(Marionette) {

  'use strict';

	return Marionette.Behavior.extend({

    events: {

       'click .form-show-passwords': 'showPasswords'

    },

    showPasswords: function() {

      var targetInputs = this.options.targetInputs;

      // Any target inputs supplied?
      if (targetInputs) {

        // Process each the found input
        var foundInputs = this.processInputs(targetInputs);

        // Process each the found input
        this.toggleInputs(foundInputs);

      }
      else {

        // Detect all password inputs
        targetInputs = this.view.$el.find(':password');

        // Any current inputs of type password?
        if (targetInputs.length > 0) {

          // Process each password input
          this.toggleInputs(targetInputs);

        }
        else {

          // Find any inputs that were previously of type password
          targetInputs = this.view.$el.find('[data-type="password"]');

          // Process each password input
          this.toggleInputs(targetInputs);

        }


      }

    },

    processInputs: function(targetInputs) {

      var
      that = this,
      foundInputs = [];

      // Are we dealing with an array?
      if (_.isArray(targetInputs)) {

        // Loop through each id
        _.each(targetInputs, function(value, index) {

          // Detect the input
          var foundInput = that.view.$el.find('#' + value)[0];

          // Push it to our new array
          foundInputs.push(foundInput);

        });

      }
      // Are we dealing with a string?
      else if (_.isString(targetInputs)) {

        // Detect the input
        var foundInput = that.view.$el.find('#' + targetInputs)[0];

        // Push it to our new array
        foundInputs.push(foundInput);

      }
      else {

        return;

      }

      return foundInputs;

    },

    toggleInputs: function(targetInputs) {

      // We require input!!
      if (targetInputs) {

        // Loop through each password input
        _.each(targetInputs, function(input) {

          var
          $input = $(input),
          isShown = ($input.attr('data-type') === 'password');

          // Are we currently showing this password?
          if (isShown) {

            // Add data attributes
            $input.removeAttr('data-type');

            // Change input to type password
            $input.prop('type', 'password');

          }
          else {

            // Add data attributes
            $input.attr('data-type', 'password');

            // Change input to type text
            $input.prop('type', 'text');

          }

        });

      }
      else {

        return;

      }

    }

	});

});
```

I listen for any click events on elements with a class of `.form-show-passwords` (See the HTML example). If this occurs, I call the `showPasswords` method and start off the process.

The code does various checks to detect what has, or has not, been supplied as options. If no target inputs have been supplied, the code will search the view's `$el` for all password fields and make sure they are all toggles from `type="password"` to `type="text"` or vice-versa, showing or hiding the password from the user. If target inputs have been supplied, only those inputs will be toggled.

#### The Result

I now have a totally reusable UI behaviour, that can be added to any view I wish. Nicey!