$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#rightZone",
		pagePath: "module/waterCloud/agriculture",
		init: function(){
			this.drawWaterCloudRightTitle({
				id: "widgetRightTitleUp",
				title: "电子政务"
			}, "", "#rightUp", "电子政务");
			this.drawWaterCloudRightTitle("widgetRightTitleDown", "", "#rightDown", "建设管理");
			this.drawPie("widgetRight1", {
				url:"waterCloud/agriculture/widgetRight1.do"
			}, "");
			this.drawPie("widgetRight2", {
				url:"waterCloud/agriculture/widgetRight2.do"
			}, "");
			this.drawPie("widgetRight3", {
				url:"waterCloud/agriculture/widgetRight3.do"
			}, "");
			this.drawPolarLine("widgetRight4", {
				url:"waterCloud/agriculture/widgetRight4.do"
			}, "");
			this.drawMultiArea("widgetRight5", {
				url:"waterCloud/agriculture/widgetRight5.do"
			}, "");
			this.drawArea("widgetRight6", {
				url:"waterCloud/agriculture/widgetRight6.do"
			}, "");
			this.drawWaterManager("widgetRight7", "", {
//				width : 300,
//				height : 200,
				title : "日程管理",
				type:["日程总数：", "当月日程数：", "当月短信提醒数："],
				value:["1826（个）", "9（个）", "1（个）"]
			});
			
			this.drawWaterEmployee("widgetRight8", "", {
//				width : 400,
//				height : 220,
				title : "企业人员",
				subTitle : "从业人员情况",
				type:["注册类型", "资格类", "在建数", "闲置数"],
				value:["1616", "2593", "21", "9767"]
			});
		}
	});
	zhnx.rightObj = new right();
});