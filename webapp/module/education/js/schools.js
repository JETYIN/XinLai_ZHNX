$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/education/schools",
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
					type:'EduSch',
					text:"学校数量（所）"
				}],
				series: [{
					label: '学校数量',
					data: {
						"640300000000": 2557,//吴忠
						"640500000000": 1194,//中卫
						"640100000000": 3783,//银川
						"640200000000": 1828,//石嘴山
						"640400000000": 2736//固原
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
			this.removeComponent("school0");
			this.removeComponent("school1");
			this.removeComponent("school2");
			this.removeComponent("school3");
			
			this.drawEduConstitute4Center("school0");
			this.drawEduBar4Center("school1");
			this.drawMixtureChart4Center("school2");
			this.drawMixtureChart4Center("school3");
		},
		drawEduConstitute4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			this.drawEduConstitute(widgetID, {
				url: "education/schools/getEduConstitute.do",
				data: {
					areaCode: that.areaCode
				}
			}, {
				isNav : false,
				circleDataColor: ["rgb(11,227,216)","rgb(252,223,1)","rgb(233,115,35)"],
		        totalTitle: cuCityName + "学校构成",
		        waiCircleMultiple: 4,
		        isTableBeiShuH: 1.7,
		        isTableBeiShuW: 1.55,
		        lineHMultiple: 1.7,
		        tableUnit: "所",
		        tableName: ["学校总数量","中小学学校总数量","学前学校总数量","中职学校总数量"],
		        pathClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
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
						level: 4,
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
			}, {
				width : 965,
				height : 500
			});
		},
		drawEduBar4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			this.drawEduBar(widgetID, {
				url: "education/schools/getDataAnaly.do",
				data: {
					areaCode: that.areaCode
				}
			}, {
				title : cuCityName + "学校数据分析",
				border : "chartBorder",
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
		drawMixtureChart4Center: function(widgetID){
			var that = this, chartType, title, url, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			switch(widgetID){
			case "school2":
				title = "中小学教育数据";
				chartType = ["ring", "bar", "bar", "bar"];
				url = "education/schools/getPrimarySecondary.do";
				break;
			case "school3":
				title = "学前教育数据";
				chartType = ["bar", "bar", "bar", "bar", "ring"];
				url = "education/schools/getPreSchool.do";
				break;
			}

			this.drawMixtureChart(widgetID, {
				url: url,
				data: {
					areaCode: that.areaCode
				}
			}, {
				title : cuCityName + title,
				chartType : chartType,
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
//				pathClickCommand: function(commandArgs){
//					var command = $.extend({
//						level: 4,
//						mutexSameLevel: true,
//						mutexNextLevel: true,
//						ignoreHistory: true
//					}, commandArgs);
//	            	zhnx.websocket.send(command);
//				},
				pathXchartClickCommand: function(commandArgs){
//					console.log(commandArgs)
					var command = $.extend({
						level: 7,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				pathBgXchartClickCommand: function(commandArgs){
					var command = $.extend({
						level: 6,
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
					}).text("宁夏回族自治区-学校情况")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});