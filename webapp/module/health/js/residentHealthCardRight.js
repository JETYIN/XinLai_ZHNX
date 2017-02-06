$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/education/resourcePlatform",
		init: function(){
//			this.drawRightTitle("teacherRight1", {}, {
//				title : "全区总体情况"
//			}, {
//				width : 320,
//				height : 110
//			});
			
		}
	});
	
	zhnx.rightObj = new right();
});