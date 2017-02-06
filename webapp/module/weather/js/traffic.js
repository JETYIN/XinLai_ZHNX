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
			this.initWithoutMap();
		},
			
		initMap:function(){
			this.drawWeatherAlert("widTriffic0", { }, {
				title : "告警"
			}, {
				width : 2030,
				height : 105,
			});
			this.drawWeatherMap("widgetWeatherMap", { }, {
				mapTypes:[{
					type:'TrafficRoad',text:"路段天气预报"
				}, {
					type:'TrafficWeatherStation',text:"交通气象站"
				}],
				frame: 'short',
				flowFrameDisplay: false,
				//添加同步命令
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
						//zhnx.centerObj.initWithoutMap();
					}
				}
			}, { });
		},
		initWithoutMap:function(){
			this.removeComponent("weatherTriffic0");
			this.removeComponent("weatherTriffic1");
			this.removeComponent("weatherTriffic2");
			this.removeComponent("weatherTriffic3");
			
			this.drawWeatherTrifficStationDao("weatherTriffic0");
			this.drawCityAndTime("weatherTriffic1");
			this.drawWeatherHighwayForecastDao("weatherTriffic2");
//			this.drawWeatherRoadForecastDao("weatherTriffic3");
		},
		drawWeatherTrifficStationDao:function(widgetID){
			this.drawWeatherTrifficStation(widgetID, {
				url: "weather/traffic/getTrifficStation.do"
			}, {
				title : "交通气象站",
				series : {
					icons : ["PavementTemperature", "RoadbedTemperature", "precipitation", "VisibilityIndex", "windSpeed"]
				},
				navClickOuter: function(idx, stationId, stationName){
					zhnx.centerObj.getComponent("widgetWeatherMap").initTrafficWeatherStationOuter(idx);
					zhnx.centerObj.removeComponent("weatherTriffic3");
					zhnx.centerObj.drawWeatherRoadForecastDao("weatherTriffic3", null, stationId, stationName + "气象站");
				},
				dataClickOuter: function(idx,ico){
					zhnx.centerObj.getComponent("weatherTriffic3").chartClick(idx,ico);
				},
				/*navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},*/
				navClickOuterCommand:function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs)
					zhnx.websocket.send(command);
				},
				
				dataClickOuterCommand:function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs)
					zhnx.websocket.send(command);
				}
			}, {
				width : 960,
				height : 290
			});
		},
		drawCityAndTime: function(widgetID){
			var that = this,cityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;

			this.drawCityAndTimeInit(widgetID, {},{
				cityName : cityName
			},{
				width :300,
				height : 110
			});
		},
		drawWeatherHighwayForecastDao:function(widgetID){
			this.drawWeatherHighwayForecast(widgetID, {
				url:"weather/traffic/getHighwayForecast.do"
			}, {
				title : "路段天气预报",
				navClickOuter: function(idx){
					var HoGoS = idx == 0 ? "H" : idx == 1 ? "G" : "S";
					zhnx.centerObj.getComponent("widgetWeatherMap").initTrafficRoadOuter(HoGoS);
					zhnx.centerObj.getComponent("weatherTriffic2").bgRectClick(0);
				},
				bgRectClickOuter: function(siteId, siteName, roadName){
					zhnx.centerObj.removeComponent("weatherTriffic3");
					zhnx.centerObj.drawWeatherRoadForecastDao("weatherTriffic3", siteId, null, roadName + siteName + "段");
				},
				navClickOuterCommand:function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs)
					zhnx.websocket.send(command);
				},
				dataClickOuterCommand:function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs)
					zhnx.websocket.send(command);
				}
			}, {
				width: 960,
				height: 680
			});
		},
		//添加了夜间多云
		drawWeatherRoadForecastDao:function(widgetID, siteId, stationId, siteStationName){
			this.drawWeatherRoadForecast(widgetID, {
				url: "weather/traffic/getRoadOrStationForecast.do",
				data: {
					siteID: siteId,
					stationID: stationId
				}
			}, {
				title: siteStationName
			}, {
				width : 960,
				height : 870
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
					}).text("宁夏回族自治区-交通气象")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});