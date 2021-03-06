$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/fupin/fpShiSanWu",
		init: function(){
			var that = this;
			this.initNav();
			this.initPage0("NX");
			this.initTableNav();
		},
		navigationClick : function(idx){
			var that = this;
			var idx = idx.toString();
			$(that.selector).find(".main_with_map li").removeClass("active");
			var str = ".main_with_map li[Idx='"+idx+"']";
			$(str).addClass("active");
			that.clearPage();
			switch (idx) {
			case "0":
				that.initPage0("NX");
				break;
			case "1":
				that.initPage1("NX");
				break;
			case "2":
				that.initPage2("NX");
				break;
			case "3":
				that.initPage3("NX");
				break;
			case "4":
				that.initPage4("NX");
				break;
			}
		},
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
		menuClick : function(i){
			var that = this;
			var idx = i.toString();
			$(that.selector).find(".main_with_table li").removeClass("menuActive");
			var str = "li[Idx='"+idx+"']";
			$(str).addClass("menuActive");
			that.clearPage4Table();
			this.saveData = $(".trColor").attr("value");
			// 初始化页面
			switch (idx) {
			case "0":
				that.initTablePage0(this.saveData);		//整体情况
				break;
			case "1":
				that.initTablePage1();		//基本情况
				break;
			case "2":
				that.initTablePage2();		//家庭照片
				break;
			case "3":
				that.initTablePage3();		//到户措施
				break;
			case "4":
				that.initTablePage4();		//基础设施
				break;
			case "5":
				that.initTablePage5();		//生产经营状况
				break;
			case "6":
				that.initTablePage6();		//收支情况
				break;
			case "7":
				that.initTablePage7();		//产业发展与精准扶贫
				break;
			case "8":
				that.initTablePage8();		//金扶工程
				break;
			case "9":
				that.initTablePage9();		//能力提升
				break;
			case "10":
				that.initTablePage10();		//社会帮扶
				break;
			case "11":
				that.initTablePage11();		//易地搬迁
				break;
			case "12":
				that.initTablePage12();		//脱贫成效
				break;
			case "13":
				that.initTablePage13();		//帮扶责任人
				break;
			case "14":
				that.initTablePage14();		//操作人员
				break;
			}			
		},
		initTableNav: function(){
			var that = this;
			d3.select(".main_with_table").selectAll("li").on("click", function(d, i){
				that.menuClick(i);
				var command = {
					level: 9,
					type: 'click',
					context: 'centerObj',
					contextType: 'cenObj',
					execString: "that.menuClick(" + i + ")",
					execMode: 'evalfunc',
					mutexSameLevel: true,
					mutexNextLevel: true,
					ignoreHistory: true
				};
            	zhnx.websocket.send(command);
			});
		},
		initPage0: function(areaCode){	//脱贫目标-地图无操作
			var that = this;
			this.initPageWithoutMap0(areaCode);
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
			
		},
		initPageWithoutMap0: function(areaCode){
			var that = this;
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "十三五脱贫");
			// 图表
			that.clearPageWithoutMap();		
			that.drawfpTargetTable_left0_1();
			that.drawfpTargetTable_left0_2();
			that.drawfpTargetTable_right0_1();
			that.drawfpTargetTable_right0_2();
		},
		initPage1: function(areaCode){	//脱贫规划
			var that = this;
			this.initPageWithoutMap1(areaCode);
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
			
		},
		initPageWithoutMap1: function(areaCode){	//脱贫规划
			var that = this;
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "十三五脱贫");
			// 图表
			that.clearPageWithoutMap();
			that.drawfpmultiTriangleColumn_left1({
				navOuterClick: function(i){
					zhnx.centerObj.removeComponent("widget4");
					zhnx.centerObj.drawfptriangleColumn_right1(areaName + "未来三年脱贫计划", i);
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
			});
			that.drawfptriangleColumn_right1(areaName + "未来三年脱贫计划", 0);
		},
		initPage2: function(areaCode){	//时间表路线图-地图无操作
			var that = this;
			
			this.initPageWithoutMap2(areaCode);
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

		},
		initPageWithoutMap2: function(areaCode){
			var that = this;
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "十三五脱贫");
			
			// 图表
			that.clearPageWithoutMap();
			that.drawfpLineChart_left2();
			that.drawfpLineChart_right2_1();
			that.drawfpLineChart_right2_2();
		},
		initPage3: function(areaCode){	//五个一批-不能双击
			var that = this;
			this.initPageWithoutMap3(areaCode);
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

		},
		initPageWithoutMap3: function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			$("#main_title").html("2016年" + areaName + "十三五脱贫");
			// 图表
			that.clearPageWithoutMap();
			that.drawPetal_left3(areaName, {areaCode: cityLocation.code});
			that.drawfptriangleColumn_right3(areaName + '"五个一批" 脱贫',{
				url:zhnx.resource.getUrl("poverty/shiSanWu/getFiveOneBar.do"),
				data:{areaCode: cityLocation.code}
			}, {
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
		},
		initPage4: function(areaCode){	//十三项行动计划-无地图
			var that = this;
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
			
			this.initPageWithoutMap4(areaCode);
		},
		initPageWithoutMap4: function(areaCode){
			var that = this;
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "十三五脱贫");
			
			that.drawfpActionPlane_center();
		},
		changePage: function(countrycode, cunURL){
			var that = this;
			if(countrycode != undefined){
				this.hideComponent();
				$(this.selector).find("#returnBtn").unbind().on("click", function(){
					that.changePage();
                	var command = {
            			level: 6,
                		type: "click",
                		context: "centerObj",
                		contextType: "cenObj",
                		execString: "that.changePage();",
                		execMode: "evalfunc"
                	};
                	zhnx.websocket.send(command);
				});
				$(this.selector).find(".main_with_map").hide();
				$(this.selector).find(".main_with_table").show();
				zhnx.rightObj.loadList(countrycode, cunURL);
				$("#center").addClass("centerNoMap").removeClass("centerHasMap");
			} else {
				that.clearPage4Table();
				this.showComponent();
				$(this.selector).find(".main_with_map").show();
				$(this.selector).find(".main_with_table").hide();
				var trNodeLi = ($(".main_with_table").children())[1].childNodes;	//获取中间table的li
				for(var j = 0;j<trNodeLi.length;j++){
					trNodeLi[j].className="";
				}
				 trNodeLi[1].className="menuActive";
				zhnx.rightObj.loadRight();
				$("#center").addClass("centerHasMap").removeClass("centerNoMap");
			}
		},
		clearPage4Table: function(){
			this.removeComponent("widgetTable");
			this.removeComponent("widgetTable_center");
		},
		drawCenterTable: function(){				//中间表格
			this.drawSvgTable("widgetTable",{},{
				bgName: "medium_table",
				commandImgClick: function(commandArgs){
					var command = $.extend({
						level: 10,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandImgLfetClick: function(commandArgs){
					var command = $.extend({
						level: 11,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandImgRightClick: function(commandArgs){
					var command = $.extend({
						level: 11,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandImgCloseClick: function(commandArgs){
					var command = $.extend({
						level: 11,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
					},{
				width:2330,
				height:960
				});
		},
		initTablePage0: function(value){		//整体情况
			var that = this;
			var valueData = this.saveData;
			if(value!=undefined||value!=null){
				$.ajax({
					type: "post",
					url: zhnx.resource.getUrl("poverty/persondetail/getsituationbyid.do"),
					data: {huid:value},
					success: function(data){		//获取到对应户的整体情况	
						that.drawfpHuZhuInfoImg(data);
					}
	            })
			}else{
				$.ajax({
					type: "post",
					url: zhnx.resource.getUrl("poverty/persondetail/getsituationbyid.do"),
					data: {huid:valueData},
					success: function(data){		//获取到对应户的整体情况
						that.drawfpHuZhuInfoImg(data);
					}
	            })
			}		
		},
		initTablePage1: function(){		//基本情况
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectBasicSituation();
		},
		initTablePage2: function(){		//家庭照片
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectFamilyPhoto();
		},
		initTablePage3: function(){		//到户措施
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectHouseholdMeasure();
		},
		initTablePage4: function(){		//基础设施
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectInfrastructure();
		},
		initTablePage5: function(){		//生产经营状况
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectProductionOpera();
		},
		initTablePage6: function(){		//收支情况
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectRevenue();
		},
		initTablePage7: function(){		//产业发展与精准扶持
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectfp();
		},
		initTablePage8: function(){		//金扶工程
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectFinance();
		},
		initTablePage9: function(){		//能力提升
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectAbilityPromotion();
		},
		initTablePage10: function(){		//社会帮扶
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectSocialAssistance();
		},
		initTablePage11: function(){		//易地搬迁
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectMove();
		},
		initTablePage12: function(){		//脱贫成效
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectPoverty();
		},
		initTablePage13: function(){		//帮扶责任人
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffectHelper();
		},
		initTablePage14: function(){		//操作人员
			var that = this;
			this.drawCenterTable();
			zhnx.centerObj.getComponent("widgetTable").drawEffecOperator();
		},
		drawfpHuZhuInfoImg: function(ztqkC){	//整体情况-中间表
			var series = ztqkC.series;
			this.drawfpHuZhuInfo("widgetTable_center", {
				
			}, {
				huzhu : series.hzm,
		        series : [
		            {
		                nav : "贫困现状",
		                type : ["健康状况", "务工人数", "农机具数量", "帮扶责任人", "帮扶单位", "脱贫需求", "养殖情况", "种植情况", "致贫原因", "贫困户属性"],
		                dataset : [series.jkzk, series.wgrs, series.njjsl, series.bfzrr, series.bfdw, series.tpxq, series.yzqk, series.zzqk, series.zpyy, series.pkhsx]
		            },
		            {
		                nav : "帮扶措施",
		                type : ["年人均可支配收入(元)", "工资性收入(元)", "生产经营性收入(元)", "领取养老保险金(元)", "生态补偿金(元)", "各类补贴(元)", "领取低保金(元)", "生产补贴(元)", "住房补贴(元)"],
		                dataset : [series.rjsr, series.gzsr , series.scsr, series.ylbx, "", series.glbt, "", series.scbt, ""]
		            }
		        ]
			}, {
				width : 2400,
				height : 900
			});
		},
		drawfpTargetTable_left0_1:function(){	//脱贫目标
			this.drawfpTargetTableL1("widget1_1",{},{},{});
		},
		drawfpTargetTable_left0_2:function(){	//脱贫目标
			this.drawfpTargetTableL2("widget1_2",{},{},{});
		},
		drawfpTargetTable_right0_1:function(){	//脱贫目标
			this.drawfpTargetTableR1("widget2_1",{},{},{});
		},
		drawfpTargetTable_right0_2:function(){	//脱贫目标
			this.drawfpTargetTableR2("widget2_2",{},{},{});
		},
		drawfpmultiTriangleColumn_left1: function(funcObj){	//脱贫规划
			this.drawfpmultiTriangleColumn("widget3", {
				url: zhnx.resource.getUrl("poverty/shiSanWu/getAntPovertyPlanSum.do")
			}, $.extend({},{
				title : "全区未来3年脱贫计划复合柱状图"
			}, funcObj), {
				width: 800,
				height: 700
			});
		},
		drawfptriangleColumn_right1:function(title, pOfOc){	//脱贫规划-全区
			var url = zhnx.resource.getUrl("poverty/shiSanWu/getAntPovertyPlanBar.do");
			this.drawfptriangleColumn("widget4", {
				url: url,
				data:{pOfOc: pOfOc}
			}, {
				title : "全区各县未来脱贫计划",
				mode : "mm",
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandMMNavClick: function(commandArgs){
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
		},
		drawfpLineChart_left2: function(){	//时间表路线图
			this.drawfpLineChart("widget5", {
				url: zhnx.resource.getUrl("poverty/shiSanWu/getTimePathSum.do")
			}, {
				title : "全区未来3年脱贫人口时间表路线图"
			}, {
				width: 920,
				height: 700
			});
		},
		drawfpLineChart_right2_1: function(){	//时间表路线图
			this.drawfpLineChart("widget6", {
				url: zhnx.resource.getUrl("poverty/shiSanWu/getTimePathBar1.do")
			}, {
				title : "全区未来3年销号村时间表格路线图"
			}, {
				width: 920,
				height: 400
			});
		},
		drawfpLineChart_right2_2: function(){	//时间表路线图
			this.drawfpLineChart("widget7", {
				url: zhnx.resource.getUrl("poverty/shiSanWu/getTimePathBar2.do")
			}, {
				title : "全区未来3年脱贫户时间表格路线图"
			}, {
				width: 920,
				height: 400
			});
		},
		drawPetal_left3:function(title, data){		//五个一批
			this.drawPetal("widget8", {
				url:zhnx.resource.getUrl("poverty/shiSanWu/getFiveOneSum.do"),
				data: data
			}, {
				title : '<span style="font-size:20px;color:#D67821;font-weight:bold;font-family:微软雅黑;">"十三五"' + title + '扶贫攻坚方向</span>',
				titleAlign: "start",
				titleUseHTML: true,
				units: "人",
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
				padding:{left: 0, right: 0, top: 80, bottom: 20},
				valueEnable: false,
				valuePercent: false,
				centerText : ['',''],
				textPosition : true
			}, {
				width : 800,
				height : 700
			});
		},
		drawfptriangleColumn_right3: function(title, url, funcObj){		//五个一批
			this.drawfptriangleColumn("widget9", url, $.extend({
				title : title
			}, funcObj), {
				width: 920,
				height: 780
			});
		},
		drawfpActionPlane_center: function(){		//十三项行动计划
			this.drawfpActionPlane_pad("widget10", {}, {}, {});
		},
		clearPage: function(){
			this.clearPageWithoutMap();
			this.removeComponent("widgetPovertyMap");
		},
		clearPageWithoutMap: function(){
			this.removeComponent("widget1_1");
			this.removeComponent("widget1_2");
			this.removeComponent("widget2_1");
			this.removeComponent("widget2_2");
			this.removeComponent("widget3");
			this.removeComponent("widget4");
			this.removeComponent("widget4_next");
			this.removeComponent("widget5");
			this.removeComponent("widget6");
			this.removeComponent("widget7");
			this.removeComponent("widget8");
			this.removeComponent("widget9");
			this.removeComponent("widget10");
		}
		
		
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});