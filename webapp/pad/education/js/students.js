$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/education/students",
		areaCode: "640000000000",
		cuMenuIdx: "0",
		init: function(){
			var that = this;
			this.initNav();
			this.initWithoutMap();
			this.initMap();
		},
		initNav: function(){
			var that = this;
			d3.select(".main_with_map").selectAll("li").on("click", function(d, i){
				that.navigationClick(i);
			});
		},
		navigationClick : function(idx){
			var that = this;
			var idx = idx.toString();
			$(that.selector).find(".main_with_map li").removeClass("active");
			var str = ".main_with_map li[Idx='"+idx+"']";
			$(str).addClass("active");
			switch (idx) {
			case "0":
				that.initPage0();
				break;
			case "1":
				that.initPage1();
				break;
			}
			this.cuMenuIdx = idx;
		},
		initPage0: function(){
			this.removeComponent("student0");
			this.removeComponent("student1");
			this.removeComponent("student2");
			this.removeComponent("student3");
			
			this.drawEduConstitute4Center("student0");
			this.drawEduBar4Center("student1");
		},
		initPage1: function(){
			this.removeComponent("student0");
			this.removeComponent("student1");
			this.removeComponent("student2");
			this.removeComponent("student3");
			
			this.drawEduBar4Center("student2");
			this.drawEduBar4Center("student3");
		},
		initMap: function(){
			var that = this;
			this.drawWeatherMap("widgetWeatherMap", {
				
			}, {
				isPad: true,
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
			}, {
				width: 1067.2,
				height: 1363
			});
		},
		initWithoutMap: function(){
			var that = this;
			switch (this.cuMenuIdx) {
			case "0":
				that.initPage0();
				break;
			case "1":
				that.initPage1();
				break;
			}
		},
		drawEduConstitute4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			this.drawEduConstitute(widgetID, {
				url: zhnx.resource.getUrl("education/students/getEduConstitute.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
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
				width : 1200,
				height : 616.3
			});
		},
		drawEduBar4Center: function(widgetID){
			var that = this, title, border, url;
			var cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			switch(widgetID){
			case "student1":
				title = "学生数据分析";
				border = "chartBorder";
				url = zhnx.resource.getUrl("education/students/getDataAnaly.do");
				break;
			case "student2":
				title = "中小学教育数据";
				border = "navBorder";
				url = zhnx.resource.getUrl("education/students/getPrimarySecondary.do");
				break;
			case "student3":
				title = "学前教育数据";
				border = "navBorder";
				url = zhnx.resource.getUrl("education/students/getPreSchool.do");
				break;
			}
			
			this.drawEduBar(widgetID, {
				url: url,
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
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
				width : 1200,
				height : 616.3
			});
		},
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});