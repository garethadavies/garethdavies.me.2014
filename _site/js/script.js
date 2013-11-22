/*
Initialise
by Gareth Davies
*/

// Initialise the lazy load script

$(function() {
	$('img').lazyload({
		effect : 'fadeIn'
	});
});

// Hide the address bar in mobile devices

window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});

