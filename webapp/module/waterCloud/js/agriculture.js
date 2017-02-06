$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/waterCloud/agriculture",
		init: function(){
			this.drawSpecialBar("widget1", {//防汛抗旱
				url:"waterCloud/agriculture/widget1.do"
			}, "",{
				width:800,
				height:500
			});
			this.drawLine("widget2", {//水利防灾减灾
				url:"waterCloud/agriculture/widget2.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawRingPie("widget3", {//水库水位站
				url:"waterCloud/agriculture/widget3.do"
			}, "");
			this.drawRingPie("widget4", {
				url:"waterCloud/agriculture/widget4.do"
			}, "");
			this.drawRingPie("widget5", {
				url:"waterCloud/agriculture/widget5.do"
			}, "");
			this.drawMultiColumn("widget6", {//多数据纵向柱图（如治理水土流失面积）
				url:"waterCloud/agriculture/widget6.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawMultiColumn("widget7", {
				url:"waterCloud/agriculture/widget7.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawMultiColumn("widget8", {
				url:"waterCloud/agriculture/widget8.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawMultiTriangleColumn("widget9", {//多数据三角柱图
				url:"waterCloud/agriculture/widget9.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawLiquidSpherical("widget10", {//水波图
				url:"waterCloud/agriculture/widget10.do"
			}, "",{
				width:180,
				height:180
			});
			this.drawLiquidSpherical("widget11", {
				url:"waterCloud/agriculture/widget11.do"
			}, "",{
				width:180,
				height:180
			});
			this.drawLiquidSpherical("widget12", {
				url:"waterCloud/agriculture/widget12.do"
			}, "",{
				width:180,
				height:180
			});
			this.drawLiquidSpherical("widget13", {
				url:"waterCloud/agriculture/widget13.do"
			}, "",{
				width:180,
				height:180
			});
			this.drawLiquidSpherical("widget14", {
				url:"waterCloud/agriculture/widget14.do"
			}, "",{
				width:180,
				height:180
			});
			this.drawSubsectionArea("widget15", {//分段面图（雨情统计）
				url:"waterCloud/agriculture/widget15.do"
			}, "",{
				width:500,
				height:350
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