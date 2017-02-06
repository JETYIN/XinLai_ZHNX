$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/health/regionalPlatform",
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
			this.removeComponent("PopulationNum");
			this.removeComponent("regionalPlatform3");
			this.removeComponent("PopulationAndMedicalService");
			this.removeComponent("regionalPlatform4");
			
			this.drawPopulationNumInit("PopulationNum");
			this.drawPublicHealthCenter("regionalPlatform3");
		},
		initPage1: function(){
			this.removeComponent("PopulationNum");
			this.removeComponent("regionalPlatform3");
			this.removeComponent("PopulationAndMedicalService");
			this.removeComponent("regionalPlatform4");
			
			this.drawPopulationAndMedicalServiceInit("PopulationAndMedicalService");
			this.drawRegionalHealthCircleCenter("regionalPlatform4");
		},
		initMap: function(){
			this.drawWeatherMap("widgetWeatherMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'healthRegPla',
					text:"区域卫生平台"
				}],
				zhanKaiData : [
								{
								    unit: ["人","个","人"],
								    color:["white","yellow"],//文字，数字颜色
								    type:["人口总数","医疗卫生机构总数","卫生技术人员总数"],
								    svgName:["renKouShu","yiLiaoJiGou","jiShuRenYuan"],
								    value:[6620000,1835,41351]
								},
								{
									unit: ["人","个","人"],
								    color:["white","yellow"],//文字，数字颜色
								    type:["卫生医疗床位总数","电子健康档案总数","总诊疗数"],
								    svgName:["yiLiaoChuangShu","dangAn","zongZhenLiaoRenShu"],
								    value:[33804,6296179,3134000]
								}
					        ],
				mapZoomCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				describeAllClickCommand: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				describeAllClickReturnCommand: function(commandArgs){
					var command = $.extend({
						level: 6,
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
//全区人口统计
		
		drawPopulationNumInit:function(widgetID){
			this.drawPopulation(widgetID, {
				url: zhnx.resource.getUrl("health/regionalPlatform/getPopulation.do")
			}, {
				dataList:{
	                type:"pupaliation",
	        	    title:"全区人口统计",
	        	    bgSVGURL:"leftbg",
	        	    rectSVGURL:"leftrectbg",
	        	    svgList:["leftallpopulation","leftborn","leftdeath","leftincred"],
	        	    firstTitleList:["全区总人口","人口出生率","人口死亡率","自然增长率"],
	        	    unitList:["万人","‰","‰","‰"],
	        	    unit:"",
	        	    compare:"与上年相比",
	        	    compareListSVG:["centerupon","centerupon","centerupon","centerupon"]
				},
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				viewBox: "0 0 980 480"
				          
			},
			{//955 480
				width:1300,
				height:666
			});
		},
		//绘制全区人口统计-医疗服务统计公共框
		drawPopulationAndMedicalServiceInit:function(widgetID){
			this.drawPopulation(widgetID, {
				url: zhnx.resource.getUrl("health/regionalPlatform/getPopulationAndMedicalService.do")
			}, {
				dataList:{
			          type:"medical",
		        	  title:"医疗服务统计",
		        	  rectSVGURL:"centerrectbg",
		        	  bgSVGURL:"centerbg",
		        	  svgList:["centercure","centeroutpatient","centeremergency","centerhosipotal"],
		        	  unit:"(万人)",
		        	  firstTitleList:["总诊疗人数","门诊人数","急诊人数","住院人数"],
		        	  unitList:[],
		        	  compare:"与上年相比",
		        	  compareListSVG:["centerupon","centerupon","centerupon","centerupon"]
				},
				navClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
					zhnx.websocket.send(command);
				},
				viewBox: "0 0 972 950"
			},
			{
				width:1300,
				height:1270
			});
		},
		drawRegionalHealthCircleCenter: function(widgetID){//区域卫生右下角
			var that = this;
			this.drawRegionalHealthCircle(widgetID, {}, {
					circleColor: "rgb(112,114,113)",
			        iconUrl:["yiLiaoFuWuShuLiang","yiLiaoFuWuLv","yiLiaoFuWuFeiYong"],
			        fenGeUrl:["yiLiaoFuWuShuLiangFenGe","yiLiaoFuWuXiaoLvFenGe","yiLiaoFuWuFeiYongFenGe"],
			        title:["医疗服务数量","医疗服务效率","医疗服务费用"],
			        series:[
			            [
			                {
			                    circleDataColor: "rgb(25,229,68)",
			                    unit:"%",
			                    type:"医院诊疗人次占比",
			                    value:64
			                },
			                {
			                    circleDataColor: "rgb(0,160,232)",
			                    unit:"%",
			                    type:"医院入院人次占比",
			                    value:88
			                }
			            ],
			            [
			                {
			                    circleDataColor: "rgb(18,209,191)",
			                    unit:"%",
			                    type:"病床使用率",
			                    value:79.94
			                }
			            ],
			            [
			                {
			                    circleDataColor: "rgb(228,173,29)",
			                    unit:"%",
			                    type:"医院门诊药费占比",
			                    value:50.93
			                },
			                {
			                    circleDataColor: "rgb(148,204,11)",
			                    unit:"%",
			                    type:"基层医疗机构门诊药费占比",
			                    value:76.40
			                }
			            ]
			        ],
			        interSeries1:[   //第1个点击进入后数据
			            {
			                text:{
			                    //smallTitle:["",""],
			                    smallCenterText: "诊疗人次",
			                    smallText:"各类医疗机构诊疗人次及构成",
			                    smallCircleColor:["rgb(226,188,27)","rgb(71,229,20)","rgb(5,168,247)","rgb(19,206,153)","rgb(193,16,133)","rgb(153,30,225)"]
			                },
			                value:{
			                    smallType:["社区卫生服务中心","卫生院","村卫生室及其他","妇幼保健院","其他机构","医院"],
			                    smallValue:[1230,2200,990,1056,2011,2190]
			                }
			            },
			            {
			                text:{
			                    //smallTitle:["",""],
			                    smallCenterText: "入院人次",
			                    smallText:"各类医疗机构入院人次及构成",
			                    smallCircleColor:["rgb(226,188,27)","rgb(81,69,255)","rgb(5,168,247)","rgb(19,206,153)","rgb(225,122,30)","rgb(153,30,225)"]
			                },
			                value:{
			                    smallType:["社区卫生服务中心","卫生院","村卫生室及其他","妇幼保健院","其他机构","医院"],
			                    smallValue:[12030,1200,990,1056,2011,2190]
			                }
			            }
			        ],
			        interSeries2: [
			  				     {
			  						changeIcon:'tongBiXiaJiang',
			  						changePercent:"0.51",
			  						innerTopText:"医院医生人均每日承担诊疗人次",
			  						data : [
			  							    {
			  									unit : '人',
			  									name:"医院医生人均每日承担诊疗人次",
			  									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			  									data:[10, 9.77, 9.55, 8.12, 7.22,  6.89, 6.08]   	
			  							    }
			  							]
			  				   },{
			  					    changeIcon:'tongBiXiaJiang',
			  						changePercent:"0.18",
			  						innerTopText:"医院医生人均每日承担住院床日",
			  						data : [
			  							    {
			  									unit : '人',
			  									name:"医院医生人均每日承担住院床日",
			  									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			  									data:[3.56, 3.02, 2.99, 2.56, 2.22, 2.0, 1.84]   	
			  							    }
			  							]
			  				   },{
			  					    changeIcon:'tongBiXiaJiang',
			  						changePercent:"0.18",
			  						innerTopText:"医院病床使用率",
			  						data : [
			  							    {
			  									unit : '%',
			  									name:"医院病床使用率",
			  									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			  									data:[90.1, 89.22, 88, 86.3, 82.1, 80.01, 79.94]   	
			  							    }
			  							]
			  				   },{
			  					    changeIcon:'tongBiXiaJiang',
			  						changePercent:"0.23",
			  						innerTopText:"医院平均住院日",
			  						data : [
			  							    {
			  									unit : '元',
			  									name:"医院平均住院日",
			  									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			  									data:[1400, 1309.9, 1238.11, 1190.17, 990.23, 970.3, 931.18]   	
			  							    }
			  							]
			  				   }
			  				],
			        interSeries3:{  //第3个点击进入后数据
			            textTop:["医院门诊急诊病人次均医药费用","医院住院病人人均医药费用","基层医疗机构门诊病人次均医药费用","基层医疗卫生机构住院次均费用"],
			            valueTop:[241.92,8037.78,36.69,931.18],
			            unitTop:"元",
			            textCircle:["门诊药费占比(%)","住院药费占比(%)","门诊药费占比(%)","住院药费占比(%)"],
			            valueCircle:[50.93,38.23,70.40,59.48],
			            unitCircle: "%"
			        },
			        viewBox: "0 0 900 450",
			        commandDetailedClick: function(commandArgs){
						var command = $.extend({
							level: 4,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
		            	zhnx.websocket.send(command);
					},
					commandReturnClick: function(commandArgs){
						var command = $.extend({
							level: 5,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
		            	zhnx.websocket.send(command);
					},
					commandChangeClick: function(commandArgs){
						var command = $.extend({
							level: 6,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
		            	zhnx.websocket.send(command);
					},
					commandPieClick: function(commandArgs){
						var command = $.extend({
							level: 6,
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
				width : 1250,
				height : 625
			});
		},
		drawPublicHealthCenter: function(widgetID){//区域卫生左下角-公共卫生管理
			var that = this;
			this.drawPublicHealth(widgetID, {}, {
				totalTitle:"公共卫生管理",
				title:["电子健康档案管理","重点人群管理"],
				fenGeUrl:["dangAnGuanLiFenGe","zhongDianRenQunFenGe"],
				loadSmallText:["总计档案","总计人数"],
				series:{
					data:[
		        	      {
		        	    	  unit:"个",
		        	    	 data:[30000,21000],
		        	    	 name:["未完成建档","完成建档"]
		        	     },
		        	     {
		        	    	 unit:"人",
		        	     	data:[2341,1989,3012,2009,1009,1001,1800],
			        	    name:["高血压患者","糖尿病患者","老年人","0-6岁儿童","孕产妇","0-6岁儿童预防接种人数","重性精神病人"]
		        	     }
		        	  ]
		        },
				innerSeries1: [
				     {
						changeIcon:'tongBiZengZhang',
						changePercent:"6.19%",
						innerIcon:"dangAnJianDangShu",
						innerTopText:"电子健康档案建档数（个）",
						data : [
							    {
									unit : '个',
									name:"建档数",
									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
									data:[2296179, 2996179, 3596179, 4096179, 4696179,  5796179, 6296179]   	
							    }
							]
				   },{
					    changeIcon:'tongBiZengZhang',
						changePercent:"6.19%",
						innerIcon:"dangAnJianDangLv",
						innerTopText:"电子健康档案建档率（%）",
						data : [
							    {
									unit : '%',
									name:"建档数",
									label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
									data:[50, 55, 58, 65, 68, 70, 93]   	
							    }
							]
				   }
				],
		        innerSeries2:
		            [
		           {
		                unit: "人",
		                circleDataColor: ["rgb(255,170,0)","rgb(195,240,35)","rgb(58,229,1)","rgb(144,226,1)"],
		                type:["孕产妇管理人数","糖尿病患者规范管理人数","老年人管理人数","0-6岁儿童健康管理人数"],
		                textValue:[1009,1989,3012,2009],
		                value:[31,13,10,6]
		            },
		            {
		                unit: "人",
		                circleDataColor: ["rgb(0,240,153)","rgb(44,175,255)","rgb(31,229,228)"],
		                type:["高血压患者规范管理人数","0-6岁儿童预防接种人数","重性精神病规范管理人数"],
		                textValue:[2341,1001,1800],
		                value:[17,15,8]
		            }
		        ],
		        viewBox: "0 0 965 470",
		        commandDetailedClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				commandReturnClick: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				commandChangeClick: function(commandArgs){
					var command = $.extend({
						level: 6,
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
				},

				pathXchartClickCommand2: function(commandArgs){
//					console.log(commandArgs)
					var command = $.extend({
						level: 7,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				},
				pathBgXchartClickCommand2: function(commandArgs){
					var command = $.extend({
						level: 6,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
	            	zhnx.websocket.send(command);
				}
			}, {
				width : 1300,
				height : 633
			});
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});