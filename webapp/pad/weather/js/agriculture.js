$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/weather/agriculture",
		cuCityCode:"640100000000",
		init: function(){
			this.initMap();
			this.initWithoutMap();
		},
		initMap: function(){
			this.drawWidWeatherMap("widgetWeatherMap");
		},
		initWithoutMap: function(){

		},
		drawWidWeatherMap: function(widgetID){
			this.drawWeatherMap(widgetID, {
				
			}, {
				isPad: true,
				mapTypes:[{
					type:'Forecast',
					text:"农业气象"
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