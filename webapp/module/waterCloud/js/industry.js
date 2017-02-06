$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/waterCloud/industry",
		init: function(){
			this.drawMultiTriangleColumn("widget1", {//多数据三角柱图（如引黄水量）
				url:"waterCloud/industry/widget1.do"
			}, "",{
				width:800,
				height:350
			});
			this.drawMultiTriangleColumn("widget2", {
				url:"waterCloud/industry/widget2.do"
			}, "",{
				width:800,
				height:350
			});
			this.drawMultiTriangleColumn("widget3", {
				url:"waterCloud/industry/widget3.do"
			}, "",{
				width:800,
				height:350
			});
			this.drawRaindropBar("widget4", {//雨点图
				url:"waterCloud/industry/widget4.do"
			}, "",{
				width:800,
				height:450
			});
			this.drawLandscapeBar("widget5", {//水平柱图
				url:"waterCloud/industry/widget5.do"
			}, {
				padding : {left: 80, right: 290, top: 70, bottom: 30}
			},{
				width:800,
				height:450
			});		
			this.initMap();
		},
		initMap: function(){
			var that = this;
			this.drawMap("widgetMap", { }, {
				drawType: "Description",
				mapName: "NX",
				url: "poverty/measure/getpovertyteam.do",
				operable: false,
//				click: function(areaCode){
////					zhnx.centerObj.initPageWithoutMap3(areaCode);
//				},
//				dbclick:function(areaCode){
////					zhnx.centerObj.initPageWithoutMap3(areaCode);
//				},
//				legendClick: function(i){
//					//zhnx.centerObj.getComponent("widget1").navClick(i);
//				},
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {});
		}
	});
	zhnx.centerObj = new center();
});
