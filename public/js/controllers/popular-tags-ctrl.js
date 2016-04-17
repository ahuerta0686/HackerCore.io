/** 
 * Login Controller
 */

angular
	.module('HackerCore.io')
	.controller('PopularTagsCtrl', PopularTagsCtrl);

PopularTagsCtrl.$inject = ['projectservice'];

function PopularTagsCtrl(projectservice) {
	var vm = this;
	vm.loading = false;

	activate();

	function activate() {
		vm.loading = true;
		projectservice.tags()
		.then(function (data) {
			vm.loading = false;
			var fill = d3.scale.category20();
			var layout = d3.layout.cloud()
			    .size([1150, 650])
			    .words(Object.keys(data).map(function(d) {
			    	if (data[d] > 20)
				      return {text: d, size: data[d] / 2.5};
				  	else
				  	  return {text: '', size: 0};
			    }))
			    .padding(5)
			    .rotate(function() { return ~~(Math.random() * 2) * 90; })
			    .font("Impact")
			    .fontSize(function(d) { return d.size; })
			    .on("end", draw);

			layout.start();

			function draw(words) {
			  d3.select("#popular-cloud").append("svg")
			      .attr("width", layout.size()[0])
			      .attr("height", layout.size()[1])
			    .append("g")
			      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
			    .selectAll("text")
			      .data(words)
			    .enter().append("text")
			      .style("font-size", function(d) { return d.size + "px"; })
			      .style("font-family", "Impact")
			      .style("fill", function(d, i) { return fill(i); })
			      .attr("text-anchor", "middle")
			      .attr("transform", function(d) {
			        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			      })
			      .text(function(d) { return d.text; });
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}