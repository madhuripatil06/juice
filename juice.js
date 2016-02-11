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
	var chart = d3.select('.bar_chart')
				.attr('height',height)
				.attr('width',width);
	var x = d3.scale.linear()
		.domain([0,d3.max(juices,function(d){return d.values})])
		.range([0,width]);
	var bar = chart.selectAll('g')
			.data(juices)
			.enter().append('g')
			 .attr("transform", function(d, i) {return "translate(0," + i * barHeight + ")"; });
	bar.append('rect')
		.attr('width',function(d){return x(d.values)})
		.attr('height',barHeight-2);

	bar.append("text")
    .attr("x", function(d) { return x(d.values); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.key; });

};




