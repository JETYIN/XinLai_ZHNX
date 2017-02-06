$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/weather/actual",
		cuCityCode:"640100000000",
		cuMapType: "METAR",
		init: function(){
			this.initMap();
			this.initWithoutMap();
			this.loadBgFrame();
		},
		initMap: function(){
			this.drawWidActual0("widActual0");
			this.drawWidWeatherMap("widgetWeatherMap");
		},
		initWithoutMap: function(){
			this.removeComponent("widActual1");
			this.removeComponent("widActual2");
			this.removeComponent("widActual3");
			this.removeComponent("widActual4");
			this.removeComponent("widActual5");
			this.removeComponent("widActual6");
			this.removeComponent("widActual7");
			this.removeComponent("widActual8");
			this.removeComponent("widActual9");
			
			this.drawWidActual1("widActual1");
			this.drawWidActual2("widActual2");
			this.initActualPWT();
			this.drawWidActual6("widActual6");
			this.drawWidActual7("widActual7");
			this.drawWidActual8("widActual8");
			this.drawCityAndTime("widActual9");
		},
		drawWidWeatherMap: function(widgetID){
			this.drawWeatherMap(widgetID, {
				url: "weather/actual/getMapInfo.do",
				data: {
					areaCode: "640000000000"
				}
			}, {
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
				fFSwitchOuter: function(d){
					zhnx.centerObj.cuMapType = d.type;
					zhnx.centerObj.mapFFSwitchOuter();
				},
				mapClickOuter: function(cuCityCode){
					if(zhnx.centerObj.cuCityCode != cuCityCode){
						zhnx.centerObj.cuCityCode = cuCityCode;
						zhnx.centerObj.initWithoutMap();
					}
				}
			}, {});
		},
		mapFFSwitchOuter: function(){
			var winHeight = 225, winWidth = 960, padding = 20, maxHeight = 280, minHeight = 200;
			// 气温
			var windowTemp = zhnx.centerObj.getWindow("widActual6");
			var chartTemp = zhnx.centerObj.getComponent("widActual6");
			// 风向
			var windowWind = zhnx.centerObj.getWindow("widActual7");
			var chartWind = zhnx.centerObj.getComponent("widActual7");
			// 降水
			var windowPrec = zhnx.centerObj.getWindow("widActual8");
			var chartPrec = zhnx.centerObj.getComponent("widActual8");
			// 最顶部
			var maxWinTop = d3.min([windowTemp.position().top, windowWind.position().top, windowPrec.position().top]), mapType = zhnx.centerObj.cuMapType;
			if(mapType == 'Precipitation'){
				zhnx.centerObj.initActualPWT();
				// 变高
				d3.select(windowPrec.get(0)).transition().duration(350).style({
					"top" : maxWinTop + "px",
					"height": maxHeight + "px"
				});
				d3.select(windowPrec.find(".widget-content").get(0)).transition().duration(350).style({
					"height": maxHeight + "px"
				});
				d3.select(windowPrec.get(0)).select("svg").transition().duration(350).attr({
					"height": maxHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowWind.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + 10) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowWind.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowWind.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowTemp.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + minHeight + 20) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowTemp.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowTemp.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
			} else if(mapType == 'Wind'){
				zhnx.centerObj.initActualPWT();
				d3.select(windowWind.get(0)).transition().duration(350).style({
					"top" : maxWinTop + "px",
					"height": maxHeight + "px"
				});
				d3.select(windowWind.find(".widget-content").get(0)).transition().duration(350).style({
					"height": maxHeight + "px"
				});
				d3.select(windowWind.get(0)).select("svg").transition().duration(350).attr({
					"height": maxHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowPrec.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + 10) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowPrec.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowPrec.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowTemp.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + minHeight + 20) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowTemp.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowTemp.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
			} else if(mapType == 'Temperature'){
				zhnx.centerObj.initActualPWT();
				d3.select(windowTemp.get(0)).transition().duration(350).style({
					"top" : maxWinTop + "px",
					"height": maxHeight + "px"
				});
				d3.select(windowTemp.find(".widget-content").get(0)).transition().duration(350).style({
					"height": maxHeight + "px"
				});
				d3.select(windowTemp.get(0)).select("svg").transition().duration(350).attr({
					"height": maxHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowWind.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + 10) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowWind.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowWind.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 变矮
				d3.select(windowPrec.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + maxHeight + minHeight + 20) + "px",
					"height": minHeight + "px"
				});
				d3.select(windowPrec.find(".widget-content").get(0)).transition().duration(350).style({
					"height": minHeight + "px"
				});
				d3.select(windowPrec.get(0)).select("svg").transition().duration(350).attr({
					"height": minHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
			} else if(mapType == 'METAR'){
				zhnx.centerObj.initActualPWT();
				// 恢复
				d3.select(windowTemp.get(0)).transition().duration(350).style({
					"top" : maxWinTop + "px",
					"height": winHeight + "px"
				});
				d3.select(windowTemp.find(".widget-content").get(0)).transition().duration(350).style({
					"height": winHeight + "px"
				});
				d3.select(windowTemp.get(0)).select("svg").transition().duration(350).attr({
					"height": winHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 恢复
				d3.select(windowWind.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + winHeight + 10) + "px",
					"height": winHeight + "px"
				});
				d3.select(windowWind.find(".widget-content").get(0)).transition().duration(350).style({
					"height": winHeight + "px"
				});
				d3.select(windowWind.get(0)).select("svg").transition().duration(350).attr({
					"height": winHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
				// 恢复
				d3.select(windowPrec.get(0)).transition().duration(350).style({
					"top" : (maxWinTop + winHeight + winHeight + 20) + "px",
					"height": winHeight + "px"
				});
				d3.select(windowPrec.find(".widget-content").get(0)).transition().duration(350).style({
					"height": winHeight + "px"
				});
				d3.select(windowPrec.get(0)).select("svg").transition().duration(350).attr({
					"height": winHeight,
					"viewBox": "0 0 " + winWidth + " " + winHeight,
		    		"preserveAspectRatio": "none"
				});
			}
		},
		initActualPWT: function(){
			var mapType = this.cuMapType;
			if(mapType == 'METAR'){
				this.clearThermometer();
				this.drawWidTemp("widActual3");
				this.drawWidTemp("widActual4");
				this.drawWidTemp("widActual5");
			} else if(mapType == 'Temperature'){
				this.clearThermometer();
				this.drawWidTemp("widActual3");
				this.drawWidTemp("widActual4");
				this.drawWidTemp("widActual5");
			} else if(mapType == 'Wind'){
				this.clearThermometer();
				this.drawWidWind("widActual3");
				this.drawWidWind("widActual4");
				this.drawWidWind("widActual5");
			} else if(mapType == 'Precipitation'){
				this.clearThermometer();
				this.drawWidPrec("widActual3");
				this.drawWidPrec("widActual4");
				this.drawWidPrec("widActual5");
			}
		},
		initActualPWTLine: function(){
			
		},
		drawWidActual0: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAlert(widgetID, { }, {
				title : "告警"
			}, {
				width : 2030,
				height : 105,
			});
		},
		drawWidActual1: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawweatherActual(widgetID, {
				url:"weather/actual/getActualWeather.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				title : cuCityName + "实时天气情况"
			}, {
				width : 960,
				height : 650,
			});
		},
		drawWidActual2: function(widgetID){
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
		drawWidTemp: function(widgetID){
			var that = this;
			var chartargs = {}, url;
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
				url:url,
				data:{
					areaCode:that.cuCityCode
				}
			},$.extend({
				type : "T",
				imgUrl : "svg/weather/thermometer.svg",
			}, chartargs),{
				width : 288,
				height : 175
			});
		},
		drawWidWind: function(widgetID){
			var that = this;
			var chartargs = {}, url;
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
				url:url,
				data:{
					areaCode:that.cuCityCode
				}
			},$.extend({
				type : "W",
				imgUrl : "svg/weather/windSpeed.svg",
			}, chartargs),{
				width : 288,
				height : 175
			});
		},
		drawWidPrec: function(widgetID){
			var that = this;
			var chartargs = {}, url;
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
				url:url,
				data:{
					areaCode:that.cuCityCode
				}
			}, $.extend({
				type : "R",
				imgUrl : "svg/weather/measuringCylinder.svg",
			}, chartargs),{
				width : 288,
				height : 175
			});
		},
		drawWidActual6: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:"weather/actual/getTempHistory.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				option:{
					title:{
						text : cuCityName + "逐时气温"
					},
					line:{
						lineStyle: {
							strokeColor:"#32ff00"
						},
					},
					area:{
						fillStyle:{
							startColor : '#299F29',
							endColor : '#0F313C',
							id : 'areaFill1',
						},
						dotStyle:{
							fill : '#32ff00'
						}
					}
				}
			}, {
				width : 960,
				height : 250
			});
		},
		drawWidActual7: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:"weather/actual/getWindHistory.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				option:{
					title:{
						text : cuCityName + "逐时风速风向"
					},
					line:{
						lineStyle: {
							strokeColor:"#3cffff"
						},
					},
					area:{
						fillStyle:{
							startColor : '#32A4BA',
							endColor : '#0C295E',
							id : 'areaFill2',
						},
						dotStyle:{
							fill : '#3cffff'
						}
					}
				}
			}, {
				width : 960,
				height : 250
			});
		},
		drawWidActual8: function(widgetID, areaCode){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.cuCityCode]].name;
			this.drawWeatherAreaLine(widgetID, {
				url:"weather/actual/getPrecHistory.do",
				data:{
					areaCode:that.cuCityCode
				}
			}, {
				option:{
					title:{
						text : cuCityName + "逐时降雨"
					},
					line:{
						lineStyle: {
							strokeColor:"#f4dd08"
						},
					},
					area:{
						fillStyle:{
							startColor : '#8E872C',
							endColor : '#222C3C',
							id : 'areaFill3',
						},
						dotStyle:{
							fill : '#f4dd08'
						}
					}
				}
			}, {
				width : 960,
				height : 250
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
		},
		clearThermometer: function(){
			this.removeComponent("widActual3");
			this.removeComponent("widActual4");
			this.removeComponent("widActual5");
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
					}).text("宁夏回族自治区-天气实况")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});