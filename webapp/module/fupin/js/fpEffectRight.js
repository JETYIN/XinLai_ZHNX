$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/fupin/fpEffect",
		init: function(){
			this.loadRight();
		},
		loadRight: function(){
			var that = this;
			d3.xml("svg/fupin_right_target.svg", function(error, xmlDocument){
				$(that.selector).empty().append($(xmlDocument.documentElement).attr("id","fupin_right_target_svg"));
				d3.select("#fupin_right_target_svg").selectAll("text")
				.attr({
					"font-family":"Microsoft Yahei"
				});
			});
		}
	});
	zhnx.rightObj = new right();
});