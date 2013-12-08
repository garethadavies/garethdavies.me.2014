/*
Initialise
by Gareth Davies
*/

$(function() {

	$('#icon-menu').on('click', function() {

		$('#main-menu').toggle();

	});

	//

	var data = [
		{
			value: 30,
			color:"#F7464A"
		},
		{
			value : 50,
			color : "#E2EAE9"
		},
		{
			value : 100,
			color : "#D4CCC5"
		},
		{
			value : 40,
			color : "#949FB1"
		},
		{
			value : 120,
			color : "#4D5360"
		}

	];

	var
	chart1 = document.getElementById("myChart").getContext("2d"),
	chart2 = document.getElementById("myChart2").getContext("2d"),
	chart3 = document.getElementById("myChart3").getContext("2d");

	new Chart(chart1).Doughnut(data);
	new Chart(chart2).Doughnut(data);
	new Chart(chart3).Doughnut(data);

});

