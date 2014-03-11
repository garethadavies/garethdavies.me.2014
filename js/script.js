/*
Main Application Script
*/

/*
Requires:
  * jQuery/Zepto
Author(s):
  * Gareth Davies @GarethDavies_Me
*/

;(function(window, document, $, undefined) {

	if ($(document).scrollTop() > 50) {

		$('.trophy-wrapper').addClass('trophy-fixed');

	}
	else {

		$('.trophy-wrapper').removeClass('trophy-fixed');

	}

	$('#icon-menu').on('click', function() {

		var
		menu = $('#main-menu-small'),
		trophy = $('.trophy-wrapper');

		menu.toggle();
		trophy.toggle();

	});

	// Resize

	$(window).on('resize', function() {

		$('#main-menu-small').removeAttr('style');

		$('.trophy-wrapper').removeAttr('style');

	});

	// Scroll

	$(window).on('scroll', function() {

		if ($(document).scrollTop() > 50) {

			$('.trophy-wrapper').addClass('trophy-fixed');

		}
		else {

			$('.trophy-wrapper').removeClass('trophy-fixed');

		}

	});

	// Charts

	if ($('body').hasClass('about')) {

	var options = {

		animation: false

	};

	var data = [
		{
			value: 25,
			color: "#999"
		},
		{
			value : 30,
			color : "#666"
		},
		{
			value : 25,
			color : "#222"
		},
		{
			value : 10,
			color : "#ccc"
		}
	];

	var dataUX = [
		{
			value: 33,
			color: "#999"
		},
		{
			value : 33,
			color : "#666"
		},
		{
			value : 34,
			color : "#222"
		}
	];

	var dataCode = [
		{
			value: 30,
			color: "#999"
		},
		{
			value : 30,
			color : "#666"
		},
		{
			value : 30,
			color : "#222"
		},
		{
			value : 10,
			color : "#ccc"
		}
	];

	var dataScript = [
		{
			value: 80,
			color: "#999"
		},
		{
			value : 10,
			color : "#666"
		},
		{
			value : 10,
			color : "#222"
		}
	];

	var dataLibs = [
		{
			value: 30,
			color: "#999"
		},
		{
			value : 30,
			color : "#666"
		},
		{
			value : 10,
			color : "#222"
		},
		{
			value : 30,
			color : "#ccc"
		}
	];

	var dataVisual = [
		{
			value: 60,
			color: "#999"
		},
		{
			value : 30,
			color : "#666"
		},
		{
			value : 10,
			color : "#222"
		}
	];

	var dataData = [
		{
			value: 60,
			color: "#999"
		},
		{
			value : 30,
			color : "#666"
		},
		{
			value : 10,
			color : "#222"
		}
	];

	var
	chartUX = document.getElementById("chartUX").getContext("2d"),
	chartCode = document.getElementById("chartCode").getContext("2d"),
	chartScript = document.getElementById("chartScript").getContext("2d"),
	chartLibs = document.getElementById("chartLibs").getContext("2d"),
	chartVisual = document.getElementById("chartVisual").getContext("2d"),
	chartData = document.getElementById("chartData").getContext("2d");

	
	new Chart(chartUX).Doughnut(dataUX, {

		percentageInnerCutout: 60

	});
	new Chart(chartCode).Doughnut(dataCode, {

		percentageInnerCutout: 60

	});
	new Chart(chartScript).Doughnut(dataScript, {

		percentageInnerCutout: 60

	});
	new Chart(chartLibs).Doughnut(dataLibs, {

		percentageInnerCutout: 60

	});
	new Chart(chartVisual).Doughnut(dataVisual, {

		percentageInnerCutout: 60

	});
	new Chart(chartData).Doughnut(dataData, {

		percentageInnerCutout: 60

	});

}

})(this, document, jQuery);

