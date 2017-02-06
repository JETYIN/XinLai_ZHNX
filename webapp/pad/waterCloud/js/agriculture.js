$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/waterCloud/agriculture",
		areaCode: "640000000000",
		init: function(){
			var that = this;
			this.initMap();
		},
		initMap: function(){
			this.drawWeatherMap("widgetWeatherMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Wather',
					text:"地图",
					clickable: false,
					zoomable: false
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});