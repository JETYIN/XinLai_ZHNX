$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/fupin/fpEffect",
		nav : ["十二五脱贫成效", "十二五移民搬迁", "西海固地区经济统计", "西海固地区人口统计", "务工人员收入统计", "其他帮扶脱贫成效", "精准扶持脱贫成效", "到户措施脱贫成效"],
		selectedIndex : 0,	
		idCount : 0,
		init: function(){
			this.initNav();
			this.initPage0();
		},
		navigationClick : function(idx){
			var that = this;
			var idx = idx.toString();
			$(that.selector).find(".main_with_map li").removeClass("active");
			var str = ".main_with_map li[Idx='"+idx+"']";
			$(str).addClass("active");
			that.clearPage();
			switch (idx) {
			case "0"://脱贫成效——十二五脱贫成效
				that.selectedIndex = 0;
				that.initPage0("NX");						
				break;
			case "1"://脱贫成效——十二五移民搬迁
				that.selectedIndex = 1;
				that.initPage1("NX");
				break;
			case "2"://脱贫成效——西海固地区经济统计
				that.selectedIndex = 2;
				that.initPage2("NX");
				break;
			case "3"://脱贫成效——西海固地区人口统计
				that.selectedIndex = 3;
				that.initPage3("XHG");
				break;
			case "4"://脱贫成效——务工人员收入统计
				that.selectedIndex = 4;
				that.initPage4("NX");
				break;
			case "5"://脱贫成效——其他帮扶脱贫成效
				that.selectedIndex = 5;
				that.initPage5("NX");
				break;
			case "6"://脱贫成效——精准扶持脱贫成效
				that.selectedIndex = 6;
				that.initPage6("NX");
				break;
			case "7"://脱贫成效——到户措施脱贫成效
				that.selectedIndex = 7;
				that.initPage7("NX");
				break;
			default : break;
			}
		},
		//初始化导航和切换控制
		initNav: function(){
			var that = this;
			d3.select(".main_with_map").selectAll("li").on("click", function(d, i){
				that.navigationClick(i);
				var command = {
					level: 2,
					type: 'click',
					context: 'centerObj',
					contextType: 'cenObj',
					execString: "that.navigationClick(" + i + ")",
					execMode: 'evalfunc',
					mutexSameLevel: true,
					mutexNextLevel: true,
					ignoreHistory: true
				};
            	zhnx.websocket.send(command);
			});
		},
		changePageDetail : function(areaCode){
			this.clearPageExceptMap();
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "扶贫对象");
			switch (this.selectedIndex) {
			case 4://脱贫成效——务工人员收入统计
				this.initPage4ExceptMap(areaCode);					
				break;
			case 5://脱贫成效——其他帮扶脱贫成效
				this.initPage5ExceptMap(areaCode);	
				break;
			case 6://脱贫成效——精准扶持脱贫成效
				this.initPage6ExceptMap(areaCode);
				break;
			case 7://脱贫成效——到户措施脱贫成效
				this.initPage7ExceptMap(areaCode);
				break;
			default : break;
			}
		},
		//脱贫成效——十二五脱贫成效
		initPage0 : function(areaCode){
			var that = this;
			// 地图操作
			this.initPage0ExceptMap("NX");
			this.idCount = 3;
		},
		initPage0ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			this.drawLineChart("widget0_0", {
				url: zhnx.resource.getUrl("poverty/effect/getShiErWuAntPovertyBar0.do")
			}, {
				title : "宁夏全区贫困人口",
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.drawLineChart("widget0_1", {
				url: zhnx.resource.getUrl("poverty/effect/getShiErWuAntPovertyBar1.do")
			}, {
				title : "宁夏全区贫困村",
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.drawLineChart("widget0_2", {
				url: zhnx.resource.getUrl("poverty/effect/getShiErWuAntPovertyBar2.do")
			}, {
				title : "宁夏全区贫困户",
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.drawLineChart("widget0_3", {
				url: zhnx.resource.getUrl("poverty/effect/getShiErWuAntPovertyBar3.do")
			}, {
				title : "宁夏全区人均可支配收入",
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.idCount = 3;
		},
		//脱贫成效——十二五移民搬迁
		initPage1 : function(areaCode){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏",
					clickable: false,
					zoomable: false
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
			this.initPage1ExceptMap("NX");
			this.idCount = 1;
		},
		initPage1ExceptMap : function(areaCode){
			var that = this;
			this.clearPageExceptMap();
			this.drawQianchuInfo("widget1_0", {
				url: zhnx.resource.getUrl("poverty/effect/getMigrationBar0.do")
			}, {
				title : "迁出",
				mode : "left",
				navOuterClick: function(i, areaCode){
					// that.getComponent("widgetMap").reDrawMigrationData("NX", null, areaCode);
				},
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.drawQianRuInfo("widget1_1", {
				url: zhnx.resource.getUrl("poverty/effect/getMigrationBar1.do")
			}, {
				title : "迁入",
				mode : "right",
				navOuterClick: function(i, areaCode){
					// that.getComponent("widgetMap").reDrawMigrationData("NX", areaCode, null);
				},
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
			this.idCount = 1;
		},
		//脱贫成效——西海固地区经济统计
		initPage2 : function(areaCode){
			var that = this;
			this.clearPage();
			// 地图操作
			this.initPage2ExceptMap("NX");
			this.idCount = 2;
		},
		initPage2ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			this.drawfpAreaChart("widget2_0", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGEconomicBar0.do")
			}, {
				title : "西海固地区生产总值",
				series : {
					mode : "sm"
				},
				commandNavClick: function(commandArgs){
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
				height : 850
			});
			this.drawAreaChart("widget2_1", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGEconomicBar1.do")
			}, {
				title : "西海固地方财政收入和支出",
				series : {
					mode : "mm"
				},		        
		        type : ["收入", "支出"],
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width : 1000,
				height : 600
			});
			this.drawAreaChart("widget2_2", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGEconomicBar2.do")
			}, {
				title : "西海固地区农民人均纯收入和支出",
				unit : "万人",
				series : {
					mode : "mm"
				},
		        type : ["收入", "支出"],
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			},{
				width : 1000,
				height : 600
			});
			this.idCount = 2;
		},
		//脱贫成效——西海固地区人口统计
		initPage3 : function(areaCode){
			var that = this;
			this.clearPage();
			// 地图操作
			this.initPage3ExceptMap("XHG");
			this.idCount = 2;
		},
		initPage3ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			this.drawAreaChart("widget3_0", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGPopulationBar0.do")
			}, {
				title : "西海固地区绝对贫困人口",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width : 1000,
				height : 600
			});
			this.drawAreaChart("widget3_1", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGPopulationBar1.do")
			}, {
				title : "西海固地区绝对贫困人口发生率",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width : 1000,
				height : 600
			});
			this.drawAreaChart("widget3_2", {
				url: zhnx.resource.getUrl("poverty/effect/getXHGPopulationBar2.do")
			}, {
				title : "西海固地区绝对贫困人口人均纯收入",
				commandNavClick: function(commandArgs){
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
				height : 800
			});
			this.idCount = 2;
		},
		//脱贫成效——务工人员收入统计
		initPage4 : function(areaCode){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					zhnx.centerObj.initPage4ExceptMap(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage4ExceptMap("NX");
			this.idCount = 2;
		},
		//务工人员收入统计
		initPage4ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawAreaChart("widget4_0", {
				url: zhnx.resource.getUrl("poverty/effect/getMigrantWorkersLine.do"),
				data: {areaCode: cityLocation.code}
			}, {
				title : areaName + "务工人员数量及人均可支配收入",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width : 800,
				height : 680
			});
			this.drawTriangleChartDetail("widget4_1", {
				url:zhnx.resource.getUrl("poverty/effect/getMigrantWorkersBar0.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				title : areaName + "务工人员数",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width: 920,
				height: 760
			});
			this.idCount = 1;
		},
		//脱贫成效——其他帮扶脱贫成效
		initPage5 : function(areaCode){
			var cityLocation = zhnx.cityLocations["NX"];
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏",
					clickable: false,
					zoomable: false
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
			this.initPage5ExceptMap("NX");
			this.idCount = 1;
		},
		//其他帮扶脱贫成效
		initPage5ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawPetalChart("widget5_0", {
				url:zhnx.resource.getUrl("poverty/effect/getOtherHelpSum.do"),
				data:{areaCode: cityLocation.code}
			}, {
				title : "<span style='font-size:20px;color:#D67821;font-weight:bold;font-family:微软雅黑;'>" + areaName + "十二五其他帮扶脱贫成效</span>",
				titleAlign: "start",
				titleUseHTML: true,
				units: "万元",
			}, {
				width : 800,
				height : 680
			});
			this.drawTriangleChartDetail("widget5_1", {
				url:zhnx.resource.getUrl("poverty/effect/getOtherHelpBar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				title : areaName + "十二五其他帮扶脱贫成效",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width: 920,
				height: 760
			});
			this.idCount = 1;
		},
		//脱贫成效——精准扶持脱贫成效
		initPage6 : function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations["NX"];
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
			this.initPage6ExceptMap("NX");
			this.idCount = 1;
		},
		//精准扶持脱贫成效
		initPage6ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawPetalChart("widget6_0", {
				url:zhnx.resource.getUrl("poverty/effect/getPreciseSum.do"),
				data:{areaCode: cityLocation.code}
			},{
				title : "<span style='font-size:20px;color:#D67821;font-weight:bold;font-family:微软雅黑;'>" + areaName + "十二五精准扶持脱贫成效</span>",
				titleAlign: "start",
				titleUseHTML: true,
				units: "万元",
			},{
				width : 800,
				height : 700
			});
			this.drawTriangleChartDetail("widget6_1", {
				url:zhnx.resource.getUrl("poverty/effect/getPreciseBar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width: 920,
				height: 780
			});
			this.idCount = 1;
		},
		//脱贫成效——到户措施脱贫成效
		initPage7 : function(areaCode){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}]
			}, {
				width: 1067.2,
				height: 1363
			});
			this.initPage7ExceptMap("NX");
			this.idCount = 1;
		},
		//到户措施脱贫成效
		initPage7ExceptMap : function(areaCode){
			this.clearPageExceptMap();
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawfphorizonColumn("widget7_0", {
				url:zhnx.resource.getUrl("poverty/effect/getToFamilyBar0.do"),
				data:{areaCode: cityLocation.code}
			}, {
				title : areaName + "十二五到户措施脱贫成效",
				mode : "bottom",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			},{
				width : 800,
				height : 700
			});
			this.drawTriangleChartDetail("widget7_1", {
				url:zhnx.resource.getUrl("poverty/effect/getToFamilyBar1.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width: 920,
				height: 780
			});
			this.idCount = 1;
		},
		//具体实例化三角柱图
		drawTriangleChartDetail : function(id, url, areaCode, funcObj, winargs){
			var areaName = zhnx.cityLocations[areaCode].name;
			this.drawfptriangleColumn(id, url, $.extend({
				title:areaName + this.nav[this.selectedIndex] + "脱贫成效"
			}, funcObj), winargs);
		},
		drawLineChart : function(winId, ajaxArgs, chartArgs){
			this.drawfpLineChart(winId, ajaxArgs, chartArgs, {
				width : 1000,
				height : 600
			});
		},
		drawQianchuInfo : function(winId, ajaxArgs, chartArgs){
			this.drawfphorizonColumn(winId, ajaxArgs, chartArgs, {
				width : 750,
				height : 700
			});
		},
		drawQianRuInfo : function(winId, ajaxArgs, chartArgs){
			this.drawfphorizonColumn(winId, ajaxArgs, chartArgs, {
				width : 750,
				height : 700
			});
		},
		drawAreaChart : function(winId, ajaxArgs, chartArgs, winargs){
			this.drawfpAreaChart(winId, ajaxArgs, chartArgs, winargs);
		},
		//添加玫瑰图
		drawPetalChart : function(id, ajaxArgs, chartArgs, winargs){
			var temp = $.extend({}, chartArgs, {
				splitLineEnable: false,
				splitPadding: 0.05,
				dataHaloEnable: true,
				textLineEnable: false,
				textLineMaxTimes: 1.4,
				textLineMinTimes: 1,
				centerCircleEnable: true,
				centerCircleColor: "#01FFFF",
				centerCircleStrokeWidth: 8,
				centerCircleStroke: "#03D4FB",
				centerTooltipEnable: true,
				centerTooltipColor: "#0F224A",
				color: ["#05A8F7"],
				minPointRadius: 100,
				radiusReverse: true,
			});
			this.drawPetal(id, ajaxArgs, temp, winargs);
		},
		clearPageExceptMap : function(){
			for(var i=0; i<=this.idCount; ++i){
				this.removeComponent("widget0_"+i);
				this.removeComponent("widget1_"+i);
				this.removeComponent("widget2_"+i);
				this.removeComponent("widget3_"+i);
				this.removeComponent("widget4_"+i);
				this.removeComponent("widget5_"+i);
				this.removeComponent("widget6_"+i);
				this.removeComponent("widget7_"+i);
			}
		},
		//清空组件
		clearPage : function(){
			this.clearPageExceptMap();
			this.removeComponent("widgetPovertyMap");
		}
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});