$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/weather/traffic",
		cuCityCode:"640100000000",
		flagNum:0,
		init: function(){
			this.initNav();
			this.initMap();
			this.initWithoutMap();
		},
		//jq选择器找到li标签设置监听
		initNav: function(){
			var that = this;
			d3.select(".main_with_map").selectAll("li").on("click", function(d, i){
				that.navigationClick(i);
			});
		},
		//点击事件进行图像绘制
		navigationClick : function(idx){
			var that = this;
			var idx = idx.toString();
			$(that.selector).find(".main_with_map li").removeClass("active");
			var str = ".main_with_map li[Idx='"+idx+"']";
			$(str).addClass("active");
			switch (idx) {
			case "0":
				that.initPageRoad();
				break;
			case "1":
				that.initPageTraffic();
				break;
			}
			this.flagNum = idx;
		},
		
		//路段天气
		initPageRoad:function(){
			this.removeComponent("weatherTriffic0");
			this.removeComponent("weatherTriffic1");
			this.removeComponent("weatherTriffic2");
			this.removeComponent("weatherTriffic3");
			//时间
			this.drawCityAndTime("weatherTriffic1");
			//路段天气
			this.drawWeatherHighwayForecastDao("weatherTriffic2");
			//this.drawWeatherRoadForecastDao("weatherTriffic3");
				
		},
		
		//交通气象站
		initPageTraffic:function(){
			this.removeComponent("weatherTriffic0");
			this.removeComponent("weatherTriffic1");
			this.removeComponent("weatherTriffic2");
			this.removeComponent("weatherTriffic3");
			//交通气象
			this.drawWeatherTrifficStationDao("weatherTriffic0");
			this.drawCityAndTime("weatherTriffic1");
		},
		initMap:function(){
			this.drawWeatherMap("widgetWeatherMap", { }, {
				mapTypes:[{
					type:'TrafficRoad',text:"路段天气预报"
				}, {
					type:'TrafficWeatherStation',text:"交通气象站"
				}],
				frame: 'short',
				flowFrameDisplay: false,
				viewBox: "0 0 736 940",
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
				},
			}, {width: 1067.2,
				height: 1363});
		},
		initWithoutMap: function(){
			var that = this;
			switch (this.flagNum) {
			case "0":
				that.initPageRoad();
				break;
			case "1":
				that.initPageTraffic();
				break;
			}
			that.initPageRoad();
		},
			
		drawWeatherTrifficStationDao:function(widgetID){
			this.drawWeatherTrifficStation(widgetID, {
				url: zhnx.resource.getUrl("weather/traffic/getTrifficStation.do")
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
				dataClickOuter: function(idx, ico){
					zhnx.centerObj.getComponent("weatherTriffic3").chartClick(idx, ico);
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
				},
				//960,290
				viewBox: "0 0 960 266 "
			}, {
				width : 1200,
				height : 357.5
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
				url:zhnx.resource.getUrl("weather/traffic/getHighwayForecast.do")
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
					}, commandArgs);
					zhnx.websocket.send(command);
				},
				viewBox: "0 0 960 656"
			}, {
				width: 990,
				height: 718
			});
		},
		//添加了夜间多云
		drawWeatherRoadForecastDao:function(widgetID, siteId, stationId, siteStationName){
			this.drawWeatherRoadForecast(widgetID, {
				url: zhnx.resource.getUrl("weather/traffic/getRoadOrStationForecast.do"),
				data: {
					siteID: siteId,
					stationID: stationId
				}
			}, {
				title: siteStationName,
				viewBox: "0 0 960 846"
			}, {
				width : 1050,
				height : 925
			});	
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});



