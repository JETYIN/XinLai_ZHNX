$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/integration/integrationRight",
		init: function(){
			
			this.drawIntegrationRight("integrationRight1", {}, {
				series : {
					type : ["接入专网系统数", "接入互联网系统数", "接入厅局单位个数", "厅局单位接入率", "门户网站个数", "新建系统个数", "上线系统个数"],
					value : [7, 176, 31, 100, 56, 57, 113],
					ratio : [3.8, 96.2, 100, 100, 30.6, 31.1, 61.7]
				}
			}, {
				width : 910,
				height : 1040
			});
			
		}
	});
	
	zhnx.rightObj = new right();
});