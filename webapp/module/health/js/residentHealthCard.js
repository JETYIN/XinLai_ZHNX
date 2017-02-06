$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/health/residentHealthCard",
		areaCode: "640000000000",
		init: function(){
			this.loadBgFrame();
			this.initMap();
			this.initWithoutMap();
		},
		initMap: function(){
			this.drawWeatherMap("widgetWeatherMap", { }, {
				mapTypes:[{
					type:'ResPla',
					text:"三通两平台"
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
			}, {});
		},
		initWithoutMap: function(){
//			this.drawEduSTLPTXXTRRT4Center("widRPF4");
		},
//		
//		drawEduSTLPTBBT4Center: function(widgetID){
//			var that = this;
//			this.drawEduSTLPTBBT(widgetID, {
//				url: "education/resourcePlatform/getEduSTLPTBBT.do",
//				data: {
//					areaCode: that.areaCode
//				}
//			}, {
//				title : "优质教育资源班班通"
//			}, {
//				width : 950,
//				height : 460
//			});
//		},
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
					}).text("宁夏全区-区域卫生平台")
				});
				that.loadBgFrameAnimate(bgFrame);
			});
		}
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});

