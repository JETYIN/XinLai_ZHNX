$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/test/test",
		
		init: function(){
			
			this.drawWeatherAreaLine("widTest1", {
				
			}, {
				option:{
					title:{
						text : "银川市逐时气温"
					}
				},
				series:{
					data : [
					    {
							unit : '℃',
							label:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
							data:[14, 25, 36, 26, 17, 17, 19, 19, 44, 22, 15]   	
					    }
					]
				}
			}, {
				width : 910,
				height : 270
			});
			
			
//			this.drawfptriangleColumn("winId1", "", {
//				title : "全区各县未来脱贫计划",
//				mode : "mm",
//				series : {
//					type : ["贫困人口", "贫困户", "贫困村"],
//					unit : ["万人", "户", "个"],
//					country : ["西吉县", "海原县", "原州区", "同心县", "红寺堡区", "彭阳县", "隆德县", "盐池县", "泾源县", "沙坡头区", "兴庆区", "平罗县", "中宁县", 
//					           "青铜峡市", "利通区", "农垦集团", "金凤区", "永宁县", "灵武市", "西夏区", "贺兰县", "大武口区", "惠农区"],
//					dataset : [
//				    {
//						year : "2016",
//						data : [
//						    [5, 4.9, 4.7, 4.7, 4.3, 3.2, 3.8, 4.1, 3.5, 4.1, 2.8, 2.9, 2.5, 1.9, 1.7, 1.6, 1.3, 1.2, 1.1, 1.2, 0.8, 0.9, 1.4],
//						    [2215, 1678, 1589, 1689, 1458, 1235, 1456, 1582, 785, 874, 891, 678, 586, 435, 258, 168, 1645, 1214, 485, 786, 369, 354, 125],
//						    [25, 23, 24, 22, 19, 17, 16, 18, 19, 12, 15, 8, 6, 3, 2, 5, 15, 14, 9, 6, 8, 7, 15]
//						    ]
//					},
//					{
//						year : "2017",
//						data : [
//						    [5.2, 4.9, 4.7, 4.7, 4.3, 3.2, 3.8, 4.1, 3.5, 4.1, 2.8, 2.9, 2.5, 1.9, 1.7, 1.6, 1.3, 1.2, 1.1, 1.2, 0.8, 0.9, 1.4],
//						    [2215, 1678, 1589, 1689, 1458, 1235, 1456, 1582, 785, 874, 891, 678, 586, 435, 258, 168, 1645, 1214, 485, 786, 369, 354, 125],
//						    [25, 23, 24, 22, 19, 17, 16, 18, 19, 12, 15, 8, 6, 3, 2, 5, 15, 14, 9, 6, 8, 7, 15]
//						    ]
//					},
//					{
//						year : "2018",
//						data : [
//						    [5.2, 4.9, 4.7, 4.7, 4.3, 3.2, 3.8, 4.1, 3.5, 4.1, 2.8, 2.9, 2.5, 1.9, 1.7, 1.6, 1.3, 1.2, 1.1, 1.2, 0.8, 0.9, 1.4],
//						    [2215, 1678, 1589, 1689, 1458, 1235, 1456, 1582, 785, 874, 891, 678, 586, 435, 258, 168, 1645, 1214, 485, 786, 369, 354, 125],
//						    [25, 23, 24, 22, 19, 17, 16, 18, 19, 12, 15, 8, 6, 3, 2, 5, 15, 14, 9, 6, 8, 7, 15]
//						    ]
//					},
//					]
//				}				
//			}, {
//				width : 920,
//				height : 750
//			});
			
		}
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});


//	var dat = [
//		{
//			group:'1',
//			data : [
//			        {
//			        	name : '天气',
//						unit : '℃',
//						label:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
//						data:[14, 15, 16, 16, 17, 17, 19, 19, 20, 21, 24, 24, 25, 26, 27, 28, 30, 28, 28, 26, 24, 22, 20, 19]   	
//			    }
//			]			
//		}
//	];
//	var dat1 = [
//	   		{
//	   			group:'1',
//	   			data : [
//	   			        {
//	   			        	name : '天气',
//	   						unit : '℃',
//	   						label:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
//	   						data:[14, 15, 16, 16, 17, 17, 19, 19, 20, 21, 24, 24, 25, 26, 27, 28, 30, 28, 28, 26, 24, 22, 20, 19]   	
//	   			    }
//	   			]			
//	   		}
//	   	];
//	var series = [{
//		group: 'group1',
//		data : [
//			{
//				name:'legend1',
//				unit: 'xx',
//				label:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//				data:[1,2,3,4,8,6,6]
//			}
//		]
//	},{
//		group: 'group2',
//		data : [
//			{
//				name:'legend2',
//				unit: 'xx',
//				label:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//				data:[1,8,1,12,1,11,8]
//			},{
//				name:'legend3',
//				unit: 'yy',
//				label:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//				data:[1,1,1,1,3,1,1]
//			}
//		]
//	}];
//	
//	
//	var chart = xCharts(document.getElementById("container"), {
//		padding : {
//			top : 50,
//			right : 30,
//			bottom : 40,
//			left : 40
//		},
//		background : {
//			show : true,
//			url : "svg/qixiang/chartBorder.svg",
//			width : 905,
//			height : 215
//		},
//		title : {
//			text : "银川市未来24小时天气预报",
//			textAlign : 'left',
//			left : 50,
//			textStyle : {
//				fontSize : 18
//			}
//		},
//		xAxis : {
//			unit : 'h',
//			gap : false,
//			axisPathStyle : {
//				stroke: "#05a8f7",
//			},
//			axisLineStyle : {
//				stroke: "#05a8f7",
//			}
//		},
//		yAxis : {
//			unit : 'mm',
//			axisPathStyle : {
//				stroke: "#05a8f7",
//			},
//			axisLineStyle : {
//				stroke: "#05a8f7",
//			}
//		},
//		grid : {
//			borderColor : "#05a8f7",
//		},
//		area : {
//			showCircle: false,
//			showText: false,
//		}
//	});
//	chart.FormateData(dat);
//	chart.drawBackground();
//	chart.drawTitle();
//	chart.setOuterEvent({
//		legendselected: function(idx){
//			console.info('person outer:' + idx);
//		}
//	});
//	
//	var xInfo = chart.drawXAxis(chart.series.label[0]);
//	var yInfo = chart.drawYAxis(chart.series.data[0]);
//	chart.drawGrid(xInfo, yInfo);
//	chart.drawLine(chart.series.data[0], xInfo, yInfo);
//	chart.drawArea(xInfo, yInfo, chart.series.data[0]);
//	