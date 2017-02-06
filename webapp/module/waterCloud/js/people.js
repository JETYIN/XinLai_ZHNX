$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/waterCloud/people",
		init: function(){
			this.drawPeopleBar("widget1", {//人口雨点
				url:"waterCloud/people/widget1.do"
			}, "",{
				width:400,
				height:400
			});
			this.drawPieBar("widget2", {//饼柱状图(供水保障率)
				url:"waterCloud/people/widget2.do"
			}, "",{
				width:400,
				height:400
			});
			this.drawArrow("widget3", {//箭头图
				url:"waterCloud/people/widget3.do"
			}, "",{
				width:600,
				height:430
			});
			this.drawMultiTriangleColumn("widget4", {//三角柱图（如饮水困难师生）
				url:"waterCloud/people/widget4.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawMultiTriangleColumn("widget5", {
				url:"waterCloud/people/widget5.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawPetal("widget6", {//玫瑰图
				url:"waterCloud/people/widget6.do"
			}, "",{
				width:550,
				height:500
			});
			this.drawMultiTriangleColumn("widget7", {
				url:"waterCloud/people/widget7.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawMultiTriangleColumn("widget8", {
				url:"waterCloud/people/widget8.do"
			}, "",{
				width:500,
				height:350
			});
			this.drawChaoBiao("widget9", "", {
				totalTitle:["抄表信息"],
				textData:["户数","*10=","*10=","*10="],
				myUnit:["总用水量"],
				dataChaoBiao:[
				  {city:"银川",shuiLiang:2159,userNum:31},
				  {city:"石嘴山",shuiLiang:5196,userNum:76},
				  {city:"固原",shuiLiang:167349,userNum:2231},
				  {city:"吴忠",shuiLiang:937,userNum:67},
				  {city:"中卫",shuiLiang:1379,userNum:25}
		        ]
			},{
				width:400,
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