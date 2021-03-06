$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/weather/actual",
		init: function(){
			this.drawWeatherRainOfYear("widForecastRight1", {
				url:"weather/right/getRainOfYear.do"
			}, {
				group:'1'
			}, {
				width : 910,
				height : 400
			});
			
			this.drawweatherSynthesisKPI("widForecastRight2", {
				url:"weather/right/getSynthesisKPI.do"
			}, {
				mode : "one"
			}, {
				width : 910,
				height : 330
			});
			this.drawweatherSynthesisKPI("widForecastRight3", {
				url:"weather/right/getDisasters.do"
			}, {
				mode : "two"
			}, {
				width : 910,
				height : 330
			});
		}
	});
	
	zhnx.rightObj = new right();
});