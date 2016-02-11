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
	var width = 1500;
	var height = 1000;
	var barHeight = 20;
	var body = d3.select('body');
	body.append('svg')
		.attr('class','bar_chart');
	var chart = d3.select('.bar_chart')
				.attr('height',height)
				.attr('width',width);
	var x = d3.scale.ordinal()
			.rangeRoundBands([0,width]);
	var y = d3.scale.linear()
			.range([height,0]);
	x.domain(juices.map(function(juice){return juice.key}));
	y.domain([0,d3.max(juices,function(juice){return juice.values})])

	var bar = chart.selectAll('g')
			.data(juices)
			.enter().append('g')
			.attr("transform", function(d) {return "translate(" + x(d.key) + ",0)"; });
	bar.append('rect')
		.attr('y',function(d){return y(d.values)})
		.attr('height',function(d){return height - y(d.values)})
		.attr('width',x.range().length);

	bar.append('text')
		.attr('y',function(d){return y(d.values)})
		.attr("dy", ".75em")
      	.text(function(d) { return d.values; });


};



