$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/education/schools",
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
			this.removeComponent("school0");
			this.removeComponent("school1");
			this.removeComponent("school2");
			this.removeComponent("school3");

			this.drawEduConstitute4Center("school0");
			this.drawEduBar4Center("school1");
		},
		initPage1: function(){
			this.removeComponent("school0");
			this.removeComponent("school1");
			this.removeComponent("school2");
			this.removeComponent("school3");

			this.drawMixtureChart4Center("school2");
			this.drawMixtureChart4Center("school3");
		},
		initMap: function(){
			var that = this;
			this.drawWeatherMap("widgetWeatherMap", { }, {
				isPad: true,
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
				url: zhnx.resource.getUrl("education/schools/getEduConstitute.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
				isNav : false,
				circleDataColor: ["rgb(11,227,216)","rgb(252,223,1)","rgb(233,115,35)"],
		        totalTitle: cuCityName + "学校构成",
		        waiCircleMultiple: 4,
		        isTableBeiShuH: 1.7,
		        isTableBeiShuW: 1.55,
		        lineHMultiple: 1.7,
		        tableUnit: "所",
		        tableName: ["学校总数量","中小学学校总数量","学前学校总数量","中职学校总数量"],
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
				width : 1200,
				height : 616.3
			});
		},
		drawEduBar4Center: function(widgetID){
			var that = this, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			this.drawEduBar(widgetID, {
				url: zhnx.resource.getUrl("education/schools/getDataAnaly.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
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
				width : 1200,
				height : 616.3
			});
		},
		drawMixtureChart4Center: function(widgetID){
			var that = this, chartType, title, url, cuCityName = zhnx.cityLocations[zhnx.cityCodeAbbrs[that.areaCode]].name;
			switch(widgetID){
			case "school2":
				title = "中小学教育数据";
				chartType = ["ring", "bar", "bar", "bar"];
				url = zhnx.resource.getUrl("education/schools/getPrimarySecondary.do");
				break;
			case "school3":
				title = "学前教育数据";
				chartType = ["bar", "bar", "bar", "bar", "ring"];
				url = zhnx.resource.getUrl("education/schools/getPreSchool.do");
				break;
			}

			this.drawMixtureChart(widgetID, {
				url: url,
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
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
				width : 1200,
				height : 616.3
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});