$(document).ready(function(){
	d3.json('./juice_orders',function(err,data){
		if(err) console.log('err is ',err);
		var juice =d3.nest()
			.key(function(d){
				return d.drinkName
			})
			.rollup(function(v) {
				return d3.sum(v, function(d) { return d.quantity; })
			})
			.entries(data);
			juice = juice.filter(function(d){return d.key != 'CTL' && d.key != 'Register User' && d.key != 'Fruits' && d.key != 'ctl'})
		visualiseIt(juice);
	});
});


var visualiseIt = function(juices){
	var width = 9000;
	var height = 1000;
	var barHeight = 20;
	var body = d3.select('body');
	body.append('svg')
		.attr('class','bar_chart')
		
	d3.select('.bar_chart')
		.data(juices)
		.enter()
		.append('div')
		.style('width',function(d){return d.values+'px'})
		.style('height',barHeight+'px')
		.style('background-color','gray')
		.style('margin','1px')
		.text(function(d){return d.key});
	var bar = d3.selectAll('div');
	var chart = d3.select('.bar_chart')
				.attr('height',height)
				.attr('width',width);
};
