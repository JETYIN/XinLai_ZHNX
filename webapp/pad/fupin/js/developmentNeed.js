$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/fupin/developmentNeed",
		nav : ["脱贫发展需求", "产业发展", "贫困村信息化", "能力提升", "五通八有"],
		selectedIndex : 0,		
		idCount : 0,
		init: function(){
			this.initNav();
			this.initPage0();
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
			case "0"://发展需求——脱贫发展需求
				that.selectedIndex = 0;
				that.initPage0();						
				break;
			case "1"://发展需求——产业发展
				that.selectedIndex = 1;
				that.initPage1();
				break;
			case "2"://发展需求——贫困村信息化
				that.selectedIndex = 2;
				that.initPage2();
				break;
			case "3"://发展需求——能力提升
				that.selectedIndex = 3;
				that.initPage3();
				break;
			case "4"://发展需求——五通八有
				that.selectedIndex = 4;
				that.initPage4();
				break;
			}
		},
		//初始化导航和切换控制
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
		//发展需求——脱贫发展需求
		initPage0 : function(){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					that.changePageDetail(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage0ExceptMap("NX");	
		},
		//发展需求——产业发展
		initPage1: function(){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					that.changePageDetail(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage1ExceptMap("NX");
		},
		//发展需求——贫困村信息化
		initPage2: function(){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					that.changePageDetail(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage2ExceptMap("NX");
		},
		//发展需求——能力提升
		initPage3: function(){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					that.changePageDetail(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage3ExceptMap("NX");
		},		
		//发展需求——五通八有
		initPage4: function(){
			var that = this;
			this.clearPage();
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏",
					clickable: false,
					zoomable: false
				}],
				mapClickOuter: function(areaCode){
					that.changePageDetail(zhnx.cityCodeAbbrs[areaCode]);
				},
				mapClickCommand: function(commandArgs){
					var command = $.extend({
						level: 3,
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
			this.initPage4ExceptMap("NX");
		},
		//发展需求——脱贫发展需求
		initPage0ExceptMap : function(areaCode){
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawPetalChartDetail("widget0", {
				url:zhnx.resource.getUrl("poverty/development/getpovertyneedsum.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				centerText : ['',''],
				textPosition : true
			});
			this.drawTriangleChartDetail("widget1", {
				url:zhnx.resource.getUrl("poverty/development/getpovertyneedbar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/development/getpovertyneedbar.do");
							zhnx.centerObj.loadList(countrycode, cunURL);
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
			this.idCount = 1;
		},
		//发展需求——产业发展
		initPage1ExceptMap : function(areaCode){
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawCircleChartsDetail("widget0", {
				url:zhnx.resource.getUrl("poverty/development/getindustryinfosum.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				centerText : ['',''],
				color : ["rgb(0,191,255)","rgb(250,250,250)","rgb(255,168,1)" ]
				});
			this.drawTriangleChartDetail("widget1", {
				url:zhnx.resource.getUrl("poverty/development/getindustryinfobar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/development/getindustryinfobar.do");
							zhnx.centerObj.loadList(countrycode, cunURL);
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
			this.idCount = 1;
		},
		//发展需求——贫困村信息化
		initPage2ExceptMap : function(areaCode){
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawCircleChartsDetail("widget0", {
				url:zhnx.resource.getUrl("poverty/development/getinformationinfosum.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				centerImg : true,
				centerText : ['',''],
				centerImg : true,
				color : ["rgb(0,191,255)","rgb(250,250,250)","rgb(255,168,1)" ]
			});
			this.drawTriangleChartDetail("widget1", {
				url:zhnx.resource.getUrl("poverty/development/getinformationinfobar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/development/getinformationinfobar.do");
							zhnx.centerObj.loadList(countrycode, cunURL);
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
			this.idCount = 1;
		},
		//发展需求——能力提升
		initPage3ExceptMap : function(areaCode){
			var cityLocation = zhnx.cityLocations[areaCode];
			var areaName = cityLocation.name;
			this.drawCircleChartsDetail("widget0", {
				url:zhnx.resource.getUrl("poverty/development/getabilityinfosum.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				centerText : ['计划培训','10'],
				unit : ["人","人"],
				textPosition : true,
				centerImg : false,
				color : ["rgb(0,191,255)","rgb(255,168,1)","rgb(19,127,189)","rgb(250,250,250)"],
				start_opacity:0.4,
				end_opacity:1,
				});
			this.drawTriangleChartDetail("widget1", {
				url:zhnx.resource.getUrl("poverty/development/getabilityinfobar.do"),
				data:{areaCode: cityLocation.code}
			}, areaCode, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/development/getabilityinfobar.do");
							zhnx.centerObj.loadList(countrycode, cunURL);
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
			this.idCount = 1;
		},
		//发展需求——五通八有
		initPage4ExceptMap : function(areaCode){
			var areaName = zhnx.cityLocations[areaCode].name;
			this.drawCircleChartsDetail("widget0", {
				url:zhnx.resource.getUrl("poverty/development/getopeninfosum.do"),
				data:areaCode
			}, areaCode, {
				centerText : ['"五通"','"八有"'],
			    unit : ["户","村"],
			    margin : 0,
			    innerLayer_1 : true,   
				innerLayer_2 : true, 
				outerLayer : true,
				color : ["rgb(0,191,255)"/*蓝色*/,"rgb(255,168,1)" /*黄色*/,"rgb(250,250,250)"/*白色*/],
				textPosition : false
			});
			this.drawTriangleChartDetail("widget1", {
				url:zhnx.resource.getUrl("poverty/development/getopeninfo.do"),
				data:areaCode
			}, areaCode, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/development/getopeninfo.do");
							zhnx.centerObj.loadList(countrycode, cunURL);
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
			this.idCount = 1;
		},
		loadHuList: function(callback, countrycode, cunURL){
			var that = this;
			$.ajax({
				type: "post",
				url: cunURL,
				data: {
					areaCode:countrycode
				},
				success: function(data){
					callback(countrycode, cunURL);
					var country = data.series.country, options = "";
					var areaCodeCountry = data.series.countrycode;	//请求之后得到的每个村的编码
					for(var i = 0; i < country.length; i++){
						options += '<option value=' +areaCodeCountry[i]+'>' + country[i] + '</option>';
						that.getComponent("widgetRight0").htmGroup.empty().append('<select id="selcet">'+options+'</select>');
					}
					that.flg = false;
					that.getComponent("widgetRight0").drawRightTable(areaCodeCountry[0]);
					$("#selcet").on("change",function(){
						that.flg = false;
						var areaCodeCountryNum = $("#selcet").children('option:selected').val();
						that.getComponent("widgetRight0").drawRightTable(areaCodeCountryNum);
						$(".main_with_table").find("li").removeClass("menuActive");
						var execString = "that.countryChange('"+ areaCodeCountryNum +"');$('#selcet').val('" + areaCodeCountryNum + "');";
						that.commandChange({
	            			type: 'change',
	            			context: "rightObj",
	            			contextType: 'rigObj',
	            			execString: execString,
	            			execMode: "evalfunc"
						});
					});
				}
			});
		},
		commandChange: function(commandArgs){
			var command = $.extend({
				level: 7,
				mutexSameLevel: true,
				mutexNextLevel: true,
				ignoreHistory: true
			}, commandArgs);
        	zhnx.websocket.send(command);
		},
		loadList: function(countrycode, cunURL){
			var that = this;
			this.hideComponentWithout("widgetPovertyMap");
			this.loadHuList(function(){
				that.drawSvgTable("widgetRight0",{},{
					bgName: "right_table",
					tableChangeValue: function(huId){
						if(that.flg){
							that.changePage(huId);
						}
						that.flg = true;
					},
					commandTableClick: function(commandArgs){
						var command = $.extend({
							level: 8,
							mutexSameLevel: true,
							mutexNextLevel: true,
							ignoreHistory: true
						}, commandArgs);
	                	zhnx.websocket.send(command);
					}
				},{
					width:930,
					height:910
				});
			}, countrycode, cunURL);
		},
		changePage: function(huId){
			var that = this;
			if(huId != undefined){
				that.hideComponent();
				$(that.selector).find(".main_with_map").hide();
				$(that.selector).find(".main_with_table").show();
				$(that.selector).find("#returnBtn").unbind().on("click", function(){
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
				that.initTablePage0(huId);
			}else{
				that.clearPage4Table();
				this.removeComponent("widgetRight0");
				this.showComponent();
				$(this.selector).find(".main_with_map").show();
				$(this.selector).find(".main_with_table").hide();
				var trNodeLi = ($(".main_with_table").children())[1].childNodes;	//获取中间table的li
				for(var j = 0;j<trNodeLi.length;j++){
					trNodeLi[j].className="";
				}
				trNodeLi[1].className="menuActive";
			}
		},
		//清空组件
		clearPage : function(){
			this.removeComponent("widgetPovertyMap");
			this.clearPageExceptMap();
		},
		clearPageExceptMap : function(){
			for(var i=0; i<=this.idCount; ++i){
				this.removeComponent("widget"+i);
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
		        ]
			}, {
				width : 2400,
				height : 900
			});
		},
		//五通八有地图
		drawMap4Center: function(chartargs, funcObj){
			this.drawMap("widgetMap", { }, $.extend({ }, chartargs, funcObj), {
				
			});
		},
		//添加环图类
		drawCircleCharts : function(id, urlPath, args, winSize){
			var temp = $.extend({}, {
				textColorIf : true,     
				strokeIf : true,        
				opacityIf : true,       
				opacity : 1,          
				start_opacity:0.5,
				end_opacity:1,
				circleMargin : 15,      
				lineBold : true,        
				end_start_margin : true,  
				margin : 0.03,                 
				colorIf : false,         
				color : ["rgb(0,191,255)","rgb(250,250,250)","rgb(255,168,1)" ],
				innerLayer_1 : false,   
				innerLayer_2 : false,   
				textPosition : true,    
				outerLayer : false,     
				circle_R : true,        
				textBold : true,        
				centerImg : false,       
				colorBase : "rgb(235,113,12)", 
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
			}, args);
			this.drawPovertyAba_develop(id, urlPath, temp, winSize);			
		},
		//添加玫瑰图
		drawPetalChart : function(id, urlPath, args, winSize){
			var temp = $.extend({}, args, {
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
			});
			this.drawPetal(id, urlPath, temp, winSize);
		},
		//具体实例化玫瑰图
		drawPetalChartDetail : function(id, ajaxargs, areaCode){
			var areaName = zhnx.cityLocations[areaCode].name;
			this.drawPetalChart(id, ajaxargs, {
				title : "<span style='font-size:20px;color:#D67821;font-weight:bold;font-family:微软雅黑;'>"
					+ areaName + this.nav[this.selectedIndex] + "情况</span>",
				titleAlign: "start",
				titleUseHTML: true,
				units: "户",
			}, {
				width : 800,
				height : 700
			});
		},	
		//具体实例化环图
		drawCircleChartsDetail : function(id, url, areaCode, args){
			var areaName = zhnx.cityLocations[areaCode].name;
			var temp = $.extend({}, {
				totalTitle : areaName + this.nav[this.selectedIndex] + "需求情况",
				unit : ["户","户"],
			}, args);
			this.drawCircleCharts(id, url, temp, {
				width : 800,
				height : 675
			});
		},
		//具体实例化三角柱图
		drawTriangleChartDetail : function(id, url, areaCode, funcObj){
			var areaName = zhnx.cityLocations[areaCode].name;
			this.drawfptriangleColumn(id, url, $.extend({
				title:"2016年" + areaName + this.nav[this.selectedIndex] + "需求"
			}, funcObj), {
				width: 920,
				height: 780
			});
		},
		changePageDetail : function(areaCode){
			this.clearPageExceptMap();
			var areaName = zhnx.cityLocations[areaCode].name;
			$("#main_title").html("2016年" + areaName + "发展需求");
			switch (this.selectedIndex) {
				case 0://发展需求——脱贫发展需求
					this.initPage0ExceptMap(areaCode);					
					break;
				case 1://发展需求——产业发展
					this.initPage1ExceptMap(areaCode);	
					break;
				case 2://发展需求——贫困村信息化
					this.initPage2ExceptMap(areaCode);
					break;
				case 3://发展需求——能力提升
					this.initPage3ExceptMap(areaCode);
					break;
				case 4://发展需求——五通八有
					this.initPage4ExceptMap(areaCode);
					break;
				default : break;
			}
	
		},
		
			
	});

	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});