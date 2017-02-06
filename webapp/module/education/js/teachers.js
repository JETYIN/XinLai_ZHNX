$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/education/teachers",
		areaCode: "640000000000",
		init: function(){
			this.loadBgFrame();
			this.initMap();
			this.initWithoutMap();
		},
		initMap: function(){
			var that = this;
			this.drawWeatherMap("widgetWeatherMap", { }, {
				mapTypes:[{
					type:'EduMFR',
					text:"教职工情况"
				}],
				series: [{
					label: '教职工数量',
					data: {
						"640300000000": 2000,
						"640500000000": 1500,
						"640100000000": 3000,
						"640200000000": 1789,
						"640400000000": 1178
					}
				}],
				mapZoomCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
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
				switchPCClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				mapClickOuter: function(cuCityCode){
					if(zhnx.centerObj.areaCode != cuCityCode){
						zhnx.centerObj.areaCode = cuCityCode;
						zhnx.centerObj.initWithoutMap();
					}
				},
				switchPCClickOuter: function(POC){
					switch (POC) {
					case "P":
						zhnx.centerObj.areaCode = "640000000000";
						zhnx.centerObj.initWithoutMap();
						break;
					}
				}
			}, {});
		},
		initWithoutMap: function(){
			this.removeComponent("teacher1");
			this.removeComponent("teacher2");
			this.removeComponent("teacher3");
			this.removeComponent("teacher4");
			
			this.drawEduBar4Center("teacher1");
			this.drawEduBar4Center("teacher2");
			this.drawEduConstitute4Center("teacher3");
			this.drawEduConstitute4Center("teacher4");
		},
		drawEduBar4Center: function(widgetID){
			var that = this, title, border, url;
			var cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;

			switch(widgetID){
			case "teacher1":
				title = "教职工数量";
				border = "chartBorder";
				url = "education/teachers/getTeacherCount.do";
				break;
			case "teacher2":
				title = "教职工年龄段统计";
				border = "chartBorder";
				url = "education/teachers/getTeacherAgeCount.do";
				break;
			}

			this.drawEduBar(widgetID, {
				url: url,
				data: {
					areaCode: that.areaCode
				}
			}, {
				title : cuCityName + title,
				border : border,
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				}
			}, {
				width : 965,
				height : 500
			});
		},
		drawEduConstitute4Center: function(widgetID){
			var that = this, title, border, url, chartargs;
			var cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			switch(widgetID){
			case "teacher3":
				title = "教育阶段教师分布";
				url = "education/teachers/getEduConstitute.do";
				chartargs = {
					isTable : false,
					isNav : false,
			        waiCircleMultiple: 4.5,
			        noneTableBeiShuH: 1.8,
			        noneTableBeiShuW: 2
				};
				break;
			case "teacher4":
				title = "教职工职称、学历分析";
				url = "education/teachers/getDataAnaly.do";
				chartargs = {
					isTable: false,
					neiCircleNum: 30,
					isDoubleCircle: false,
					noneTableBeiShuH: 1.7,
			        noneTableBeiShuW: 2,
			        lineHMultiple: 1.7,
			        dataInnerMultiple: 1.45,
			        neiInnerMultiple: 1.7,
			        navFontSize: 16,
			        circleColor: ["rgb(5,156,213)","#4981bc"],
			        neiOuterMultiple: 1.1,
			        circleDataColor: ["rgba(43,166,225,.5)","rgba(255,103,204,.5)","rgba(154,153,247,.5)","rgba(52,204,103,.5)","rgba(218,223,0,.5)","rgba(252,170,96,.5)","rgba(243,95,97,.5)"],
			        circleDataBorder: ["rgb(43,166,225)","rgb(255,103,204)","rgb(154,153,247)","rgb(52,204,103)","rgb(218,223,0)","rgb(252,170,96)","rgb(243,95,97)"],
			        circleDataBorderWidth: 2,
			        nav: ["教职工职称分析","教职工学历分析"]
				};
				break;
			}

			this.drawEduConstitute(widgetID, {
				url: url,
				data: {
					areaCode: that.areaCode
				}
			}, $.extend(chartargs, {
		        totalTitle: cuCityName + title,
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				pathClickCommand: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				 pathClickCommand: function(commandArgs){
						var command = $.extend({
							level: 6,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
		            	zhnx.websocket.send(command);
					},
					commandText: function(commandArgs){
						var command = $.extend({
							level: 6,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
		            	zhnx.websocket.send(command);
					}
			}), {
				width : 965,
				height : 500
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
					}).text("宁夏回族自治区-教职工情况")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});