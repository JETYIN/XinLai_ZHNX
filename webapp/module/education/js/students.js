$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/education/students",
		areaCode: "640000000000",
		init: function(){
			var that = this;
			this.loadBgFrame();
			this.initMap();
			this.initWithoutMap();
		},
		initMap: function(){
			var that = this;
			this.drawWeatherMap("widgetWeatherMap", { }, {
				mapTypes:[{
					type:'EduStu',
					text:"学生人数（人）"
				}],
				series: [{
					label: '学生人数',
					data: {
						"640300000000": 80995,//吴忠
						"640500000000": 47519,//中卫
						"640100000000": 114954,//银川
						"640200000000": 53904,//石嘴山
						"640400000000": 85838//固原
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
				mapSelectCollectorCommand: function(commandArgs){
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
			this.removeComponent("student0");
			this.removeComponent("student1");
			this.removeComponent("student2");
			this.removeComponent("student3");
			
			this.drawEduConstitute4Center("student0");
			this.drawEduBar4Center("student1");
			this.drawEduBar4Center("student2");
			this.drawEduBar4Center("student3");
		},
		drawEduConstitute4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			this.drawEduConstitute(widgetID, {
				url: "education/students/getEduConstitute.do",
				data: {
					areaCode: that.areaCode
				}
			}, {
				isNav : false,
				circleDataColor: ["rgb(5,170,234)","rgb(245,179,43)","rgb(225,1,126)"],
		        totalTitle: cuCityName + "学生构成",
		        waiCircleMultiple: 4,
		        isTableBeiShuH: 1.7,
		        isTableBeiShuW: 1.55,
		        lineHMultiple: 1.7,
		        tableName: ["学生总数量","中小学学生总数量","学前学生总数量","中职学生总数量"],
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
			var that = this, title, border, url;
			var cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			switch(widgetID){
			case "student1":
				title = "学生数据分析";
				border = "chartBorder";
				url = "education/students/getDataAnaly.do";
				break;
			case "student2":
				title = "中小学教育数据";
				border = "navBorder";
				url = "education/students/getPrimarySecondary.do";
				break;
			case "student3":
				title = "学前教育数据";
				border = "navBorder";
				url = "education/students/getPreSchool.do";
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
					}).text("宁夏回族自治区-学生情况")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});