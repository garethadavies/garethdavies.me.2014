---
layout: post
title:  "15. Telling Stories"
subtitle: "Tell a tale with your code structure and comments"
date:   2014-10-02 11:27:10
---

We all know how difficult and frustrating it can be to open someone else's code and be faced with a jumbled unorganised mess that you now have to try and understand and probably fix!

I want any developer to be able to pick up my code and read it like a novel. With this in mind, I developed a file and comments structure based on the main features of an annotated novel, combined with the commenting syntax set out by the [YUIDoc JavaScript Documentation Tool](http://yui.github.io/yuidoc/).

#### Comparison

I took the features of an annotated novel and mapped them to their coding equivalents:

| Novel             | Code              |
| ----------------- | ----------------- |
| Title             | Title             |
| Contents          | Contents          |
| Author(s)         | Author(s)         |
| Edition           | Version           |
| Required reading  | Required files    |
| Prologue          | Notes & Usage     |
| Chapters          | Methods           |
| Sentences         | Code blocks       |
| Lines             | Code lines        |
| Epilogue          | Disabled code     |

Methods, Code blocks and code lines would all be commented (annotated).

#### Examples

##### Title & Version

```js
/*
My Site - My Module
v1.0.0
*/
```

##### Requirements

Not only do I list all the dependancies of the script, but I also include the version required and the order they should be in.

```js
/*
Requires:
* jQuery (>= 1.9.1)
* Underscore (>= 1.4.0)
* file.js
*/
```

##### Authors

Consisting of their full name and their Twitter handle. The Twitter handle can help when a person leaves the company as you will be able to contact them.

```js
/*
Author(s):
* Gareth Davies @GarethDavies_Me
* Joe Bloggs @MadeupName
*/
```

##### Content

The content lists all the main sections and methods of a script. This should be in chronological order.

```js
/*
Contents:
* initialize
* registerElements
* eventListeners
*/
```

##### Notes

I include any general notes that would be useful for another developer to be aware of.

```js
/*
Notes:
* This is a note to tell the next user something useful
*/
```

##### Usage

An example of how to use the script is very helpful. This usually consists of example HTML and JavaScript. I often also include a link to any accompanying documentation.

```js
/*
Usage:
HTML
<p class="form-error"></p>
JavaScript
$('.form-error').text('Sorry about this...');
*/
```

##### Methods

All methods should be titled descriptively and any parameters should be listed.

```js
/*
@method requestData
@param name {String} The name given to the param
@param exists {Boolean} Does the element exist
*/
```

##### Code Blocks

This comment would divide significant blocks of code.

```js
/* Request Data */
```

##### Code Lines

This comment is used to describe a lines of code that may be confusing to another developer uncommented.

```js
// This line of code detects the existence of an element
```

##### Disabled Code

Any disabled code that needs to be saved just in case, is commented out and moved to the end of the file until it is deemed unrequired and removed.

```js
// Disabled due to conflict with a plugin
// ...
// ...
// ...
// ...
```

#### Full Example

```js
/*
App - My Component
v1.0.0
*/

/*
Requires:
* jQuery
* Underscore
* component.js
Contents:
* initialize
* registerElements
* eventListeners
Author(s):
* Gareth Davies @GarethDavies_Me
* Joe Bloggs @MadeupName
Notes:
* This is a note
*/

/*
Usage:
HTML
<p class="form-error"></p>
JavaScript
$('.form-error').text('Sorry about this...');
*/

;(function($, _, window, document, undefined) {

    'use strict';

    App.Components.MyComponent = App.Component.extend({

        /*
        @method init
        @param name {String} The name given to the param
        @param exists {Boolean} Does the element exist
        */
        init: function(name, exists) {
            
            /* Initialisation */
            
            this.requestData(name);
            
            this.showData(exists);
            
        },
        
        /*
        @method requestData
        @param name {String} The name given to the param
        */
        requestData: function(name) {
            
            // Loop through each name in the array
            for(var i = 0; i < name.length; i++) {
                ...
            }
            
        },
        
        /*
        @method showData
        @param exists {Boolean} Does the element exist
        */
        showData: function(exists) {
            
            // Check if the element does not exist
            if (!exists) {
                ...
            }
            
        }

    });

})(jQuery, _, window, document);


// Disabled due to conflict with a plugin
// ...
// ...
// ...
// ...
```

#### Conclusion

This method of structuring and commenting JavaScript makes my script easy to read and understand. A little bit of effort put in when the file is created means a lot of saved time and energy further down the line.