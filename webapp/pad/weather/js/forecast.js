$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/weather/forecast",
		cuCityCode:"640100000000",
		init: function(){
			this.initMap();
			this.initWithoutMap();
		},
		initMap: function(){
			this.drawWidWeatherMap("widgetWeatherMap");
		},
		initWithoutMap: function(){
			this.clearComponents();
			this.drawweatherTrendForecast4Center("widForecast1");
			this.drawCityAndTime("widForecast3");
			this.drawWeatherTimeCenter("widForecast5");
		},
		clearComponents: function(){
			this.removeComponent("widForecast1");
			this.removeComponent("widForecast3");
			this.removeComponent("widForecast5");
		},
		drawWidWeatherMap: function(widgetID){
			this.drawWeatherMap(widgetID, {
				url: zhnx.resource.getUrl("weather/forecast/getMapInfo.do"),
				data: {
					areaCode: "640000000000"
				}
			}, {
				isPad: true,
				mapTypes:[{
					type:'Forecast',
					text:"天气预报"
				}],
				fFCollapseCommand: function(commandArgs){
					var command = $.extend({
						level: 2,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				fFExpandCommand: function(commandArgs){
					var command = $.extend({
						level: 2,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				fFSwitchCommand: function(commandArgs){
					var command = $.extend({
						level: 2,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				mapZoomCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				mapClickOuter: function(cuCityCode){
					if(zhnx.centerObj.cuCityCode != cuCityCode){
						zhnx.centerObj.cuCityCode = cuCityCode;
						zhnx.centerObj.initWithoutMap();
					}
				},
				forecastClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				}
			}, {
				width: 1067.2,
				height: 1363
			});
		},
		drawweatherTrendForecast4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherTrendForecast(widgetID, {
				url:zhnx.resource.getUrl("weather/forecast/getTrendForecast.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 626",
				site : cuCityName,
				selectChangeCommand: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				}
			}, {
				width : 1100,
				height : 743
			});
		},
		drawWeatherTimeCenter: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherTimePrediction(widgetID, {
				url:zhnx.resource.getUrl("weather/forecast/getTodayTrendForecast.do"),
				data:{
					areaCode:that.cuCityCode
				}
			},{
				viewBox: "0 0 970 626",
				cityName : cuCityName,
				titleText : cuCityName + "天气临近预报"
			},{
				width : 1100,
				height : 735
			});
		},
		drawCityAndTime: function(widgetID){
			var that = this; 
			var CityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;

			this.drawCityAndTimeInit(widgetID, {},{
				cityName : CityName
			},{
				width :300,
				height : 110
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});