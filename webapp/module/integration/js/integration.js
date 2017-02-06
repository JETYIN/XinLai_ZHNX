$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		init: function(){
			$(".hashTabber-nav li").on("click", function(){
				$(".hashTabber-nav li").removeClass("active");
				$(this).addClass("active");
				var dataPair = $(this).attr("data-pair");
				
				$(".hashTabber-data .Content").removeClass("active");
				
				$(".hashTabber-data .Content[data-pair='" + dataPair + "']").addClass("active");
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});