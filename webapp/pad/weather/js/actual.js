$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/weather/actual",
		cuCityCode:"640100000000",
		cuMapType: "METAR",
		init: function(){
			this.initMap();
			this.initMETAR();
		},
		initMap: function(){
			this.drawWidWeatherMap("widgetWeatherMap");
		},
		initMETAR: function(){
			this.clearComponents();
			this.drawWidActual1("widActual1");
			this.drawCityAndTime("widActual12");
			this.drawWidActual6("widActual6");
			this.drawWidActual7("widActual7");
			this.drawWidActual8("widActual8");
		},
		initPrecipitation: function(){
			this.clearComponents();
			this.drawWidActual1("widActual1");
			this.drawCityAndTime("widActual12");
			this.drawWidActual2("widActual2");
			this.drawWidPrec("widActual3");
			this.drawWidPrec("widActual4");
			this.drawWidPrec("widActual5");
			this.drawWidActual8("widActual10");
		},
		initWind: function(){
			this.clearComponents();
			this.drawWidActual1("widActual1");
			this.drawCityAndTime("widActual12");
			this.drawWidActual2("widActual2");
			this.drawWidWind("widActual3");
			this.drawWidWind("widActual4");
			this.drawWidWind("widActual5");
			this.drawWidActual7("widActual11");
		},
		initTemperature: function(){
			this.clearComponents();
			this.drawWidActual1("widActual1");
			this.drawCityAndTime("widActual12");
			this.drawWidActual2("widActual2");
			this.drawWidTemp("widActual3");
			this.drawWidTemp("widActual4");
			this.drawWidTemp("widActual5");
			this.drawWidActual6("widActual9");
		},
		clearComponents: function(){
			this.removeComponent("widActual1");
			this.removeComponent("widActual2");
			this.removeComponent("widActual3");
			this.removeComponent("widActual4");
			this.removeComponent("widActual5");
			this.removeComponent("widActual6");
			this.removeComponent("widActual7");
			this.removeComponent("widActual8");
			this.removeComponent("widActual9");
			this.removeComponent("widActual10");
			this.removeComponent("widActual11");
			this.removeComponent("widActual12");
		},
		drawWidWeatherMap: function(widgetID){
			this.drawWeatherMap(widgetID, {
				
			}, {
				viewBox: "0 0 736 940",
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
						switch (zhnx.centerObj.cuMapType) {
						case "METAR":
							zhnx.centerObj.initMETAR();
							break;
						case "Precipitation":
							zhnx.centerObj.initPrecipitation();
							break;
						case "Wind":
							zhnx.centerObj.initWind();
							break;
						case "Temperature":
							zhnx.centerObj.initTemperature();
							break;
						}
					}
				},
				fFSwitchOuter: function(d){
					zhnx.centerObj.cuMapType = d.type;
					switch(d.type){
					case "METAR":
						zhnx.centerObj.initMETAR();
						break;
					case "Precipitation":
						zhnx.centerObj.initPrecipitation();
						break;
					case "Wind":
						zhnx.centerObj.initWind();
						break;
					case "Temperature":
						zhnx.centerObj.initTemperature();
						break;
					}
				},
				mapTypes:[{
					type:'METAR',
					text:"天气实况"
				},{
					type:'Precipitation',
					text:"逐时降水图"
				},{
					type:'Wind',
					text:"逐时风向图"
				},{
					type:'Temperature',
					text:"逐时气温图"
				}],
				series:[{
					data: {
						"640300000000": {
							weather: 'clear',
							min: 0,
							max: 10
						},//吴忠
						"640500000000": {
							weather: 'clear',
							min: 0,
							max: 10
						},//中卫
						"640100000000": {
							weather: 'clear',
							min: 0,
							max: 10
						},//银川
						"640200000000": {
							weather: 'clear',
							min: 0,
							max: 10
						},//石嘴山
						"640400000000": {
							weather: 'clear',
							min: 0,
							max: 10
						}//固原
					}
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
		},
		drawWidActual1: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherActual(widgetID, {
				url:zhnx.resource.getUrl("weather/actual/getActualWeather.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 626",
				title : cuCityName + "实时天气情况",
				isPad : true
			}, {
				width : 1100,
				height : 743,
			});
		},
		drawWidActual2: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherIndexOfLiving(widgetID, {
				url:zhnx.resource.getUrl("weather/actual/getLifeIndex.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 300",
				title : cuCityName + "生活指数",
				isPad : true
			},{
				width : 1100,
				height : 369
			});
		},
		drawWidActual6: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:zhnx.resource.getUrl("weather/actual/getTempHistory.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 226",
				option:{
					title:{
						text : cuCityName + "逐时气温"
					}
				},
				isPad : true
			}, {
				width : 1100,
				height : 284
			});
		},
		drawWidActual7: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:zhnx.resource.getUrl("weather/actual/getWindHistory.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 226",
				option:{
					title:{
						text : cuCityName + "逐时风速风向"
					},
					area:{
						dotStyle:{
							type : 'circle'
						},
					}
				}
			}, {
				width : 1100,
				height : 284
			});
		},
		drawWidActual8: function(widgetID, areaCode){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:zhnx.resource.getUrl("weather/actual/getPrecHistory.do"),
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				viewBox: "0 0 960 226",
				option:{
					title:{
						text : cuCityName + "逐时降雨"
					},
					area:{
						dotStyle:{
							type : 'ring'
						},
					}
				}
			}, {
				width : 1100,
				height : 284
			});
		},
		drawWidTemp: function(widgetID){
			var that = this;
			var chartargs = {isPad : true}, url;
			switch (widgetID) {
			case "widActual3":
				chartargs.title = "当前最高气温";
				url = "weather/actual/getMaxTemp.do";
				break;
			case "widActual4":
				chartargs.title = "当前最低降气温";
				url = "weather/actual/getMinTemp.do";
				break;
			case "widActual5":
				chartargs.title = "当前平均气温";
				url = "weather/actual/getAvgTemp.do";
				break;
			};
			this.drawWeatherThermometer(widgetID, {
				url:zhnx.resource.getUrl(url),
				data:{
					areaCode:that.cuCityCode
				}
			},$.extend({
				viewBox: "0 0 288 150",
				type : "T",
				imgUrl : "svg/weather/thermometer.svg",
			}, chartargs),{
				width : 330,
				height : 197
			});
		},
		drawWidWind: function(widgetID){
			var that = this;
			var chartargs = {isPad : true}, url;
			switch (widgetID) {
			case "widActual3":
				chartargs.title = "当前最大风速";
				url = "weather/actual/getMaxWind.do";
				break;
			case "widActual4":
				chartargs.title = "当前最小风速";
				url = "weather/actual/getMinWind.do";
				break;
			case "widActual5":
				chartargs.title = "当前平均风速";
				url = "weather/actual/getAvgWind.do";
				break;
			};
			this.drawWeatherThermometer(widgetID, {
				url:zhnx.resource.getUrl(url),
				data:{
					areaCode:that.cuCityCode
				}
			},$.extend({
				viewBox: "0 0 288 150",
				type : "W",
				imgUrl : "svg/weather/windSpeed.svg",
			}, chartargs),{
				width : 330,
				height : 197
			});
		},
		drawWidPrec: function(widgetID){
			var that = this;
			var chartargs = {isPad : true}, url;
			switch (widgetID) {
			case "widActual3":
				chartargs.title = "当前最大降雨量";
				url = "weather/actual/getMaxPrec.do";
				break;
			case "widActual4":
				chartargs.title = "当前最低降雨量";
				url = "weather/actual/getMinPrec.do";
				break;
			case "widActual5":
				chartargs.title = "当前平均降雨量";
				url = "weather/actual/getAvgPrec.do";
				break;
			};
			this.drawWeatherThermometer(widgetID, {
				url:zhnx.resource.getUrl(url),
				data:{
					areaCode:that.cuCityCode
				}
			}, $.extend({
				viewBox: "0 0 288 150",
				type : "R",
				imgUrl : "svg/weather/measuringCylinder.svg",
			}, chartargs),{
				width : 330,
				height : 197
			});
		},
		drawCityAndTime: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawCityAndTimeInit(widgetID, {},{
//				site : cuCityName
				cityName : cuCityName
			},{
				width :300,
				height : 110
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});