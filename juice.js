$(document).ready(function(){
	d3.json('./juice_orders',function(err,data){
		if(err) console.log('err is ',err);
		var juice =d3.nest()
			.key(function(d){return d.drinkName})
			.rollup(function(v) {
				return d3.sum(v, function(d) { return d.quantity; })
			})
			.entries(data);
			console.log(juice);
		visualiseIt(juice);
	});
});


var visualiseIt = function(){

};



