$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/weather/actual",
		cuCityCode:"640100000000",
		init: function(){
			this.loadBgFrame();
			this.initMap();
			this.initSpecail();
			this.initWithoutMap();
		},
		initMap:function(){
			this.drawWeatherAlert("widForecast0", { }, {
				title : "告警"
			}, {
				width : 2030,
				height : 105,
			});
			this.drawWeatherMap("widgetWeatherMap", {
				url: "weather/forecast/getMapInfo.do",
				data: {
					areaCode: "640000000000"
				}
			}, {
				mapTypes:[{
					type:'Forecast',
					text:"天气预报"
				}],
				frame: 'short',
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
			}, { });
		},
		initSpecail: function(){
			this.removeComponent("widForecast4");
			this.drawWeatherWarMsgRoll4Center("widForecast4");
		},
		initWithoutMap: function(){
			this.removeComponent("widForecast1");
			this.removeComponent("widForecast2");
			this.removeComponent("widForcecast3");
			this.removeComponent("widForecast5");
			
			this.drawweatherTrendForecast4Center("widForecast1");
			this.drawForecastIndex("widForecast2");
			//时间，城市
			this.drawCityAndTime("widForcecast3");
			this.drawWeatherTimeCenter("widForecast5");		
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
		},
		drawForecastIndex : function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherIndexOfLiving(widgetID, {
				url:"weather/actual/getLifeIndex.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				title : cuCityName + "生活指数"
			},{
				width : 960,
				height : 325
			});
		},
		drawweatherTrendForecast4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherTrendForecast(widgetID, {
				url:"weather/forecast/getTrendForecast.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
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
				width : 960,
				height : 650
			});
		},
		drawWeatherWarMsgRoll4Center: function(widgetID){
			this.drawWeatherWarMsgRoll(widgetID, {
				url:"weather/forecast/getWarMsgRoll.do"
			},{
				contentClickOuter: function(lng, lat){
					zhnx.centerObj.getComponent("widgetWeatherMap").outerMapZoom(lng, lat, 3);
				}
			},{
				width : 965,
				height : 275
			});
		},
		drawWeatherTimeCenter: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherTimePrediction(widgetID, {
				url:"weather/forecast/getTodayTrendForecast.do",
				data:{
					areaCode:that.cuCityCode
				}
			},{
				cityName : cuCityName,
				titleText : cuCityName + "天气临近预报"
			},{
				width : 970,
				height : 650
			});
		},
		loadBgFrame: function(){
			var that = this;
			// 加载背景主框
			zhnx.utils.loadSvg("svg/weather/common/center_main_frame.svg", function(importedNode){
				var plane = $(that.selector).get(0).appendChild(importedNode.cloneNode(true));
				var bgFrame = d3.select(plane).attr({
					"width": 2855,
					"height": 1070
				}).style({
					"position": "absolute",
					"left": "12.5px",
					"top": "-35px",
					"z-index": -1
				}).each(function(){
					var box = d3.select(this).select("#XMLID_4596_").node().getBBox();
					d3.select(this).append("text").attr({
						"x": box.x + box.width / 2,
						"y": box.y + box.height / 1.8,
						"fill": "#F0A000",
		        		"font-size": 45,
						"text-anchor": "middle",
						"dominant-baseline": "middle",
			            "font-family": "Microsoft Yahei"
					}).text("宁夏回族自治区-天气预报")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});