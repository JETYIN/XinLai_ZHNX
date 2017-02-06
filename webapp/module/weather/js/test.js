$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/weather/test",
		
		init: function(){
			var option = {
				padding : {
					top : 50,
					right : 30,
					bottom : 40,
					left : 40
				},
				background : {
					show : true,
					url : "svg/weather/chartBorder.svg",
					width : 905,
					height : 215
				},
				title : {
					text : "银川市未来24小时天气预报",
					textAlign : 'left',
					left : 50,
					textStyle : {
						fontSize : 18
					}
				},
				xAxis : {
					unit : 'h',
					gap : false,
					axisPathStyle : {
						stroke: "#05a8f7",
					},
					axisLineStyle : {
						stroke: "#05a8f7",
					}
				},
				yAxis : {
					unit : 'mm',
					axisPathStyle : {
						stroke: "#05a8f7",
					},
					axisLineStyle : {
						stroke: "#05a8f7",
					}
				},
				grid : {
					borderColor : "#05a8f7",
				},
				area : {
					showCircle: false,
					showText: false,
				}	
			};
			
			this.drawweatherTrendForecast("winId7", "", {
				site : "银川市",
				week : ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
				Date : ["9月9日","9月10日","9月11日","9月12日","9月13日","9月14日","9月15日"],
				weather : ["BigSnowfall","CentreSnow", "clear", "cloudy", "dust", "fall", "fog"],
				Temp : [[20, 11], [22, 12], [24, 14], [18, 11], [17, 9], [15, 8], [14, 6]],
				wind : [["东北风", "3级"], ["西北风", "2级"], ["东北风", "3级"], ["东南风", "4级"], ["东北风", "3级"], ["西南风", "1级"], ["东北风", "2级"]],
				PM25 : [250, 150, 50, 70, 90, 110, 350],
				AQI : [250, 150, 50, 70, 90, 110, 350]
			}, {
				width : 960,
				height : 480
			});
			this.drawWeatherAQI("winId6", "", {
				site : "银川市",
				Date : "9月12日",
				AQIValue : 25,
				PMValue : 128
			}, {
				width : 440,
				height : 240
			});
			this.drawWeatherThermometer("winId3", "",{
				title : "当前最高气温",
				value : 27,
				borderUrl : "svg/weather/high_low_media_Border.svg",
				imgUrl : "svg/weather/thermometer.svg",
			},{
				width : 285,
				height : 200
			});
			this.drawWeatherThermometer("winId4", "",{
				title : "当前最低气温",
				value : 14,
				borderUrl : "svg/weather/high_low_media_Border.svg",
				imgUrl : "svg/weather/thermometer.svg",
			},{
				width : 285,
				height : 200
			});
			this.drawWeatherThermometer("winId5", "",{
				title : "当前平均气温",
				value : 20,
				borderUrl : "svg/weather/high_low_media_Border.svg",
				imgUrl : "svg/weather/thermometer.svg",
			},{
				width : 285,
				height : 200
			});
			
			this.drawWeatherAreaXChart("winId1", "", {
				group:'1',
				data : [
				        {
				        	name : '天气',
							unit : '℃',
							label:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
							data:[14, 15, 16, 16, 17, 17, 19, 19, 20, 21, 24, 24, 25, 26, 27, 28, 30, 28, 28, 26, 24, 22, 20, 19]   	
				    }
				]
			},{
				width : 905,
				height : 250
			}, option);
			
			this.drawWeatherLineXChart("winId2", "", {
				group:'1',
				data : [
				        {
				        	name : '天气',
							unit : '℃',
							label:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
							data:[14, 15, 16, 16, 17, 17, 19, 19, 20, 21, 24, 24, 25, 26, 27, 28, 30, 28, 28, 26, 24, 22, 20, 19]   	
				    }
				]
			},{
				width : 905,
				height : 250
			}, option);
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