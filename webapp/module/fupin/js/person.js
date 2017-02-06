$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "module/fupin/person",
		saveData: 1,
		init: function(){
			var that = this;
			
			this.saveData = $(".trColor").attr("value")
			this.initNav();
			this.initPage0("NX");
//			this.clearPage4Table();
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
			var str = ".main_with_table li[Idx='"+idx+"']";
			$(str).addClass("menuActive");
			that.clearPage4Table();
			this.saveData = $(".trColor").attr("value")
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
		initPage0: function(areaCode){
			var that = this;
			this.initPageWithoutMap0(areaCode);
			// 地图操作
			this.drawMap4Center("Description", "NX", "poverty/person/getpovertyinfo.do", {
				click: function(areaCode){
					zhnx.centerObj.initPageWithoutMap0(areaCode);
				},
				dbclick: function(areaCode){
					zhnx.centerObj.initPageWithoutMap0(areaCode);
				},
				legendClick: function(i){
					zhnx.centerObj.getComponent("widget2").navClick(i);
				},
				commandClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandDbclick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
		},
		initPageWithoutMap0: function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations[areaCode];
			$("#main_title").html("2016年" + cityLocation.name + "扶贫对象");
			// 图表
			this.clearPageWithoutMap();
			that.drawfuPinSatus4Center("宁夏" + cityLocation.name + "贫困状况", {areaCode: cityLocation.code});
			that.drawfptriangleColumn4Center(cityLocation.name + "贫困状况", "poverty/person/getpovertyinfobar.do", {
				areaCode: cityLocation.code
			}, {
				dataClick: function(countrycode){
					if(countrycode.startWith("6400")){
						
					}else{
						if(countrycode.endWith("00000000")){
							
						}else if(countrycode.endWith("000000")){
							
						}else{
							if(countrycode != undefined && countrycode != null){
								var cunURL = "poverty/person/getpovertyinfobar.do";
								zhnx.centerObj.changePage(countrycode, cunURL);
							}
						}
					}
				},
				commandDataClick: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
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
		},
		initPage1: function(areaCode){
			var that = this;
			this.initPageWithoutMap1(areaCode);
			// 地图操作
			this.drawMap4Center("Description", "NX", "poverty/person/getpovertyreason.do", {
				click:function(areaCode){
					zhnx.centerObj.initPageWithoutMap1(areaCode);
				},
				dbclick:function(areaCode){
					zhnx.centerObj.initPageWithoutMap1(areaCode);
				},
				legendClick:function(i){
					zhnx.centerObj.getComponent("widget2").navClick(i);
				},
				commandClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandDbclick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandLegendClick: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			});
		},
		initPageWithoutMap1: function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations[areaCode];
			$("#main_title").html("2016年" + cityLocation.name + "扶贫对象");
			// 图表
			that.clearPageWithoutMap();
			that.drawFuPinReason4Center(cityLocation.name + "主要致贫原因", {areaCode: cityLocation.code});
			that.drawfptriangleColumn4Center(cityLocation.name + "致贫原因", "poverty/person/getpovertyreasonbar.do", {
				areaCode: cityLocation.code
			}, {
				dataClick: function(countrycode){
					if(countrycode.startWith("6400")){
						
					}else{
						if(countrycode.endWith("00000000")){
							
						}else if(countrycode.endWith("000000")){
							
						}else{
							if(countrycode != undefined && countrycode != null){
								var cunURL = "poverty/person/getpovertyreasonbar.do";
								zhnx.centerObj.changePage(countrycode, cunURL);
							}
							}
						}
				},
				commandDataClick: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
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
		},
		initPage2: function(areaCode){
			var that = this;
			this.initPageWithoutMap2(areaCode);
		},
		initPageWithoutMap2: function(areaCode){
			var that = this;
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "扶贫对象");
			// 图表
			that.clearPageWithoutMap();
			that.drawFpZhenduan4Center();
			that.drawSvgTable4Center();
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
					url: "poverty/persondetail/getsituationbyid.do",
					data: {huid:value},
					success: function(data){		//获取到对应户的整体情况	
						that.drawfpHuZhuInfoImg(data);
					}
	            })
			}else{
				$.ajax({
					type: "post",
					url: "poverty/persondetail/getsituationbyid.do",
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
		drawfuPinSatus4Center: function(title, data){
			this.drawPovertySatus("widget1", {
				url:"poverty/person/getpovertyinfosum.do",
				data: data
			}, {
				totalTitle : title
			}, {
				width: 700,
				height: 625
			});
		},
		drawfptriangleColumn4Center: function(title, url, data, funcObj){
			this.drawfptriangleColumn("widget2", {
				url: url,
				data: data
			}, $.extend({
				title : title,
				
			}, funcObj), {
				width: 920,
				height: 780
			});
		},
		drawMap4Center: function(drawType, mapName, url, funcObj){
			this.drawMap("widgetMap", { }, $.extend({
				drawType: drawType,
				mapName: mapName,
				url: url
			}, funcObj), {
				
			});
		},
		drawFpZhenduan4Center: function(){
			this.drawFpZhenduan("widget3",{
				
			},{
				url: "poverty/common/Getareabyid.do",
				clickCountry: function(){
					zhnx.centerObj.getComponent("widget4").drawTableInitCountry();
				},
				clickFamily: function(){
					zhnx.centerObj.getComponent("widget4").drawTableInitFamily();
				},
				clickAreaList: function(code){
					zhnx.centerObj.getComponent("widget4").addData({key:code,data:[code, code]});
				},
				commandChange: function(commandArgs){
					var command = $.extend({
						level: 3,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				},
				commandClickAreaList: function(commandArgs){
					var command = $.extend({
						level: 4,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			},{});
		},
		drawSvgTable4Center: function(){
			this.drawSvgTable("widget4",{
				
			},{
				bgName: "pinkunzhenduantable",
				commandCloseClick: function(commandArgs){
					var command = $.extend({
						level: 5,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			},{
				
			});
		},
		drawFuPinReason4Center: function(totalTitle, data){
			this.drawPovertyReason("widget1", {
				url: "poverty/person/getpovertyreasonsum.do",
				data: data
			},{
				totalTitle: totalTitle,
		        centerText: "宁夏",
		        unit: "户",
		        pathClickCommand: function(commandArgs){
					var command = $.extend({
						level: 4,
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
			},{
				width : 800,
				height : 700
			});
		},

		drawfpHuZhuInfoImg: function(ztqkC){	//整体情况-中间表
			var series = ztqkC.series;
			this.drawfpHuZhuInfo("widgetTable_center", "", {
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
		        ],
				commandNavClick: function(commandArgs){
					var command = $.extend({
						level: 10,
						mutexSameLevel: true,
						mutexNextLevel: true,
						ignoreHistory: true
					}, commandArgs);
                	zhnx.websocket.send(command);
				}
			}, {
				width : 2400,
				height : 900
			});
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
//				that.initTablePage0(that.saveData);		//整体情况
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
		clearPage: function(){
			this.clearPageWithoutMap();
			this.removeComponent("widgetMap");
		},
		clearPageWithoutMap: function(){
			this.removeComponent("widget1");
			this.removeComponent("widget2");
			this.removeComponent("widget3");
			this.removeComponent("widget4");
		},
		clearPage4Table: function(){
			this.removeComponent("widgetTable");
			this.removeComponent("widgetTable_center");
//			this.removeComponent("widgetTable_left");
		}
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});

//this.drawMap("widgetMap", "", {
//	drawType: "Migration",
//	moveIn: "XQ",
//	moveOut: "TX",
//	mapName: "NX",
//	url: "poverty/person/getMigrationInfo.do",
//	click: function(d, i){
//		
//	},
//	dbclick: function(d, i){
//		
//	}
//}, {
//	
//});