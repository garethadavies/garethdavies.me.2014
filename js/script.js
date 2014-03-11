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

		// if (menu.is(':visible')) {

		// 	menu.addClass('hide');

		// }
		// else {

		// 	menu.addClass('hide');

		// }

		menu.toggle();
		trophy.toggle();

	});

	$(window).on('resize', function() {

		$('#main-menu-small').removeAttr('style');

		$('.trophy-wrapper').removeAttr('style');

	});

	$(window).on('scroll', function() {

		//console.log($(document).scrollTop());

		if ($(document).scrollTop() > 50) {

			$('.trophy-wrapper').addClass('trophy-fixed');

		}
		else {

			$('.trophy-wrapper').removeClass('trophy-fixed');

		}

	});

	//

	/*

	Doughnut.defaults = {
		//Boolean - Whether we should show a stroke on each segment
		segmentShowStroke : true,
		
		//String - The colour of each segment stroke
		segmentStrokeColor : "#fff",
		
		//Number - The width of each segment stroke
		segmentStrokeWidth : 2,
		
		//The percentage of the chart that we cut out of the middle.
		percentageInnerCutout : 50,
		
		//Boolean - Whether we should animate the chart	
		animation : true,
		
		//Number - Amount of animation steps
		animationSteps : 100,
		
		//String - Animation easing effect
		animationEasing : "easeOutBounce",
		
		//Boolean - Whether we animate the rotation of the Doughnut
		animateRotate : true,

		//Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale : false,
		
		//Function - Will fire on animation completion.
		onAnimationComplete : null
	}

	*/

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

	/*

	Bar.defaults = {
				
	//Boolean - If we show the scale above the chart data			
	scaleOverlay : false,
	
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : false,
	
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : null,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : null,
	//Number - The scale starting value
	scaleStartValue : null,

	//String - Colour of the scale line	
	scaleLineColor : "rgba(0,0,0,.1)",
	
	//Number - Pixel width of the scale line	
	scaleLineWidth : 1,

	//Boolean - Whether to show labels on the scale	
	scaleShowLabels : true,
	
	//Interpolated JS string - can access value
	scaleLabel : "<%=value%>",
	
	//String - Scale label font declaration for the scale label
	scaleFontFamily : "'Arial'",
	
	//Number - Scale label font size in pixels	
	scaleFontSize : 12,
	
	//String - Scale label font weight style	
	scaleFontStyle : "normal",
	
	//String - Scale label font colour	
	scaleFontColor : "#666",	
	
	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,
	
	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",
	
	//Number - Width of the grid lines
	scaleGridLineWidth : 1,	

	//Boolean - If there is a stroke on each bar	
	barShowStroke : true,
	
	//Number - Pixel width of the bar stroke	
	barStrokeWidth : 2,
	
	//Number - Spacing between each of the X value sets
	barValueSpacing : 5,
	
	//Number - Spacing between data sets within X values
	barDatasetSpacing : 1,
	
	//Boolean - Whether to animate the chart
	animation : true,

	//Number - Number of animation steps
	animationSteps : 60,
	
	//String - Animation easing effect
	animationEasing : "easeOutQuart",

	//Function - Fires when the animation is complete
	onAnimationComplete : null
	
}

	*/

	/*

	if ($('body').hasClass('about')) {

	var data = {
		
		labels: [
			"UX",
			"HTML",
			"CSS",
			"SASS",
			"JavaScript",
			"Backbone",
			"Marionette",
			"Require",
			"Grunt",
			"Git"
		],
		datasets: [
			{
				fillColor: "rgba(0,0,0,0.9)",
				data: [90,90,100,50,40,80,50,80,40,60]
			}
		]
	};

	new Chart(document.getElementById("barChart").getContext("2d")).Bar(data, {

		//Boolean - If we show the scale above the chart data			
	scaleOverlay : false,
	
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 2,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : 50,
	//Number - The scale starting value
	scaleStartValue : 0,

	//String - Colour of the scale line	
	scaleLineColor : "rgba(0,0,0,.2)",
	
	//Number - Pixel width of the scale line	
	scaleLineWidth : 1,

	//Boolean - Whether to show labels on the scale	
	scaleShowLabels : true,
	
	//Interpolated JS string - can access value
	scaleLabel : "<%=value%>%",
	
	//String - Scale label font declaration for the scale label
	scaleFontFamily : "'Arial'",
	
	//Number - Scale label font size in pixels	
	scaleFontSize : 12,
	
	//String - Scale label font weight style	
	scaleFontStyle : "normal",
	
	//String - Scale label font colour	
	scaleFontColor : "#222",

	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : false,
	
	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,0)",
	
	//Number - Width of the grid lines
	scaleGridLineWidth : 0,

	//Boolean - If there is a stroke on each bar	
	barShowStroke : false,
	
	//Number - Pixel width of the bar stroke	
	barStrokeWidth : 2,
	
	//Number - Spacing between each of the X value sets
	barValueSpacing : 5,
	
	//Number - Spacing between data sets within X values
	barDatasetSpacing : 1,
	
	//Boolean - Whether to animate the chart
	animation : true,

	//Number - Number of animation steps
	animationSteps : 60,
	
	//String - Animation easing effect
	animationEasing : "easeOutQuart",

	//Function - Fires when the animation is complete
	onAnimationComplete : null

	});

}*/

})(this, document, jQuery);

