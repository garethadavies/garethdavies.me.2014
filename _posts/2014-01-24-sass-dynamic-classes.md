---
layout: post
title:  "06. SASS Dynamic Classes"
subtitle: "Make producing and maintaining your CSS easier"
date:   2014-01-24 10:13:00
---

I have recently moved over to using [SASS](http://sass-lang.com) rather than [LESS](http://lesscss.org) in my projects. I had use LESS for quite a while and it pretty much did everything I wanted it to.

Being in charge of (and being the only person working on) a fairly large and complex front-end has meant that I have been trying to make all of my work as easy to complete and maintain as possible.

After researching the benefits of both [SASS](http://sass-lang.com) and LESS, I decided that a switch over to [SASS](http://sass-lang.com) was probably a good idea for 2 reasons, [Compass](http://compass-style.org) and its ability to handle conditional statements. I realised that I could write dynamic classes very easily via a ```for {}``` loop and even use ```if { } else { }``` statements to control the output of each iteration.

This post describes how I used this technique to create classes for a menu based on how many menu items it contains.

### The Process

#### Variables

The first task was to set a variable to control how many classes the code will generate.

I knew that I only required 7 classes be created, but I wanted the class name to contain numbers 2 to 8. So with this in mind, I set the ```$limit``` variable to 8.

```css
$limit: 8;
```

#### Shared Styles

The purpose of this particular code is to style the first level of `li` elements in the menu. But as well as having differing styles, I knew they shared some styles as well. So instead of creating another seperate class to handle these styles, I created a placeholder selector that would be extended when each class was created via the ```for {}``` loop.

```css
%menu-item-group-styles {
	text-align: center;
	border-left: 1px solid gray;
}
```

#### The Mixin

Using the ```@mixin``` directive, I defined the 'menu-item-group' mixin. In the mixin I added a ```@for``` directive that would loop 7 times an execute the the code within it. Remember that I required the numbers 2 to 8 added to the dynamic classes, so that is why I set loop to iterate from 2 to the ```$limit``` of 8.

Each of the classes created will take the form of '.menu-item-group-' with the current value of the ```$i``` variable added the the end via the ```#{}``` interpolation syntax.

I also use the same ```$i``` variable to control the percentage width of the list item via the ```percentage()``` function. For example, if the ```$i``` variable is currently 2, the min-width and width values will be set to 50% of the container elements width.

Lastly, We need to extend the shared styles we set out previously via the ```@extend``` directive, so each class we create gets these styles.

```css
@mixin menu-item-group {

	@for $i from 2 through $limit {

		.menu-item-group-#{$i} {

			> li {

				min-width: percentage(1/$i);
				width: percentage(1/$i);
				@extend %menu-item-group-styles;

			}

		}

	}

}
```

#### Include it

With all the required code set up, all there is left to do is to include the mixin via the ```@include``` directive.

```css
@include menu-item-group;
```

### The Final Code

#### SASS

```css
$limit: 8;

%menu-item-group-styles {
	text-align: center;
	border-left: 1px solid gray;
}

@mixin menu-item-group {

	@for $i from 2 through $limit {

		.menu-item-group-#{$i} {

			> li {

				min-width: percentage(1/$i);
				width: percentage(1/$i);
				@extend %menu-item-group-styles;

			}

		}

	}

}

@include menu-item-group;
```

#### CSS

Below is the CSS code that is generated.

```css
.menu-item-group-2 > li,
.menu-item-group-3 > li,
.menu-item-group-4 > li,
.menu-item-group-5 > li,
.menu-item-group-6 > li,
.menu-item-group-7 > li,
.menu-item-group-8 > li {
  text-align: center;
  border-left: 1px solid gray;
}

.menu-item-group-2 > li {
  min-width: 50%;
  width: 50%;
}

.menu-item-group-3 > li {
  min-width: 33.33333%;
  width: 33.33333%;
}

.menu-item-group-4 > li {
  min-width: 25%;
  width: 25%;
}

.menu-item-group-5 > li {
  min-width: 20%;
  width: 20%;
}

.menu-item-group-6 > li {
  min-width: 16.66667%;
  width: 16.66667%;
}

.menu-item-group-7 > li {
  min-width: 14.28571%;
  width: 14.28571%;
}

.menu-item-group-8 > li {
  min-width: 12.5%;
  width: 12.5%;
}
```

This code would be fairly time consuming to create and maintain with pure CSS, so hurray for [SASS](http://sass-lang.com) I say!