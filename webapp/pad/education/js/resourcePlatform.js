$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/education/resourcePlatform",
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
			this.removeComponent("widRPF1");
			this.removeComponent("widRPF2");
			this.removeComponent("widRPF3");
			this.removeComponent("widRPF4");

			this.drawEduSTLPTResource4Center("widRPF1");
			this.drawEduSTLPTManagement4Center("widRPF2");
		},
		initPage1: function(){
			this.removeComponent("widRPF1");
			this.removeComponent("widRPF2");
			this.removeComponent("widRPF3");
			this.removeComponent("widRPF4");

			this.drawEduSTLPTBBT4Center("widRPF3");
			this.drawEduSTLPTXXTRRT4Center("widRPF4");
		},
		initMap: function(){
			this.drawWeatherMap("widgetWeatherMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'ResPla',
					text:"三通两平台"
				}],
				series:[{
					label: "资源管理平台使用率",
					data: "86%"
				}],
				mapZoomCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
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
		drawEduSTLPTResource4Center: function(widgetID){
			var that = this;
			this.drawEduSTLPTResource(widgetID, {
				url: zhnx.resource.getUrl("education/resourcePlatform/getEduSTLPTResource.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
				mode : "one",
				title : "教育资源公共服务平台",
				series : {
					icons : ["svg/education/icon/teachers.svg", "svg/education/icon/students.svg", "svg/education/icon/parents.svg"]
				}
			},{
				width : 1200,
				height : 616.3
			});
		},
		drawEduSTLPTManagement4Center: function(widgetID){
			var that = this;
			this.drawEduSTLPTManagement(widgetID, {
				url: zhnx.resource.getUrl("education/resourcePlatform/getEduSTLPTManagement.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
				mode : "two",
				title : "教育管理公共服务平台",
				series : {
					icons : ["svg/education/icon/schools.svg", "svg/education/icon/online.svg", "svg/education/icon/finish.svg"]
				}				
			}, {
				width : 1200,
				height : 616.3
			});
		},
		drawEduSTLPTBBT4Center: function(widgetID){
			var that = this;
			this.drawEduSTLPTBBT(widgetID, {
				url: zhnx.resource.getUrl("education/resourcePlatform/getEduSTLPTBBT.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
				title : "优质教育资源班班通"
			}, {
				width : 1200,
				height : 616.3
			});
		},
		drawEduSTLPTXXTRRT4Center: function(widgetID){
			var that = this;
			this.drawEduSTLPTXXTRRT(widgetID, {
				url: zhnx.resource.getUrl("education/resourcePlatform/getEduSTLPTXXTRRT.do"),
				data: {
					areaCode: that.areaCode
				}
			}, {
				viewBox: "0 0 966 476",
				title : "网络宽带空间人人通",
				series : {
					data1 : {
						icons : ["svg/education/icon/teachers.svg", "svg/education/icon/students.svg", "svg/education/icon/teacherIcon.svg"]
					},
					data2 : { 
						icons : ["svg/education/icon/Internet.svg", "svg/education/icon/media.svg", "svg/education/icon/informationize.svg"]
					}
				},
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				}
			},{
				width : 1200,
				height : 616.3
			});
			
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});