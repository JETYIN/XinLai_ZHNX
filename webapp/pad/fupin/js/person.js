$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		pagePath: "pad/fupin/person",
		flg: false,
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
		initPage0: function(areaCode){
			var that = this;
			this.initPageWithoutMap0(areaCode);
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					zhnx.centerObj.initPageWithoutMap0(zhnx.cityCodeAbbrs[areaCode]);
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
		},
		initPageWithoutMap0: function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations[areaCode];
			$("#main_title").html("2016年" + cityLocation.name + "扶贫对象");
			// 图表
			this.clearPageWithoutMap();
			that.drawfuPinSatus4Center(cityLocation.name + "贫困状况", {areaCode: cityLocation.code});
			that.drawfptriangleColumn4Center(cityLocation.name + "贫困状况", zhnx.resource.getUrl("poverty/person/getpovertyinfobar.do"), {
				areaCode: cityLocation.code
			}, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/person/getpovertyinfobar.do");
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
		},
		initPage1: function(areaCode){
			var that = this;
			this.initPageWithoutMap1(areaCode);
			// 地图操作
			this.drawWeatherMap("widgetPovertyMap", { }, {
				isPad: true,
				mapTypes:[{
					type:'Poverty',
					text:"宁夏"
				}],
				mapClickOuter: function(areaCode){
					zhnx.centerObj.initPageWithoutMap1(zhnx.cityCodeAbbrs[areaCode]);
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
		},
		initPageWithoutMap1: function(areaCode){
			var that = this;
			var cityLocation = zhnx.cityLocations[areaCode];
			$("#main_title").html("2016年" + cityLocation.name + "扶贫对象");
			// 图表
			that.clearPageWithoutMap();
			that.drawFuPinReason4Center(cityLocation.name + "主要致贫原因", {areaCode: cityLocation.code});
			that.drawfptriangleColumn4Center(cityLocation.name + "致贫原因", zhnx.resource.getUrl("poverty/person/getpovertyreasonbar.do"), {
				areaCode: cityLocation.code
			}, {
				dataClick: function(countrycode){
					if(countrycode.endWith("000000")){
						
					}else{
						if(countrycode != undefined && countrycode != null){
							var cunURL = zhnx.resource.getUrl("poverty/person/getpovertyreasonbar.do");
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
			if(value != undefined || value != null){
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
		drawfuPinSatus4Center: function(title, data){
			this.drawPovertySatus("widget1", {
				url:zhnx.resource.getUrl("poverty/person/getpovertyinfosum.do"),
				data: data
			}, {
				viewBox: "0 0 700 484",
				totalTitle : title
			}, {
				width: 1000,
				height: 716.4
			});
		},
		drawfptriangleColumn4Center: function(title, url, data, funcObj){
			this.drawfptriangleColumn("widget2", {
				url: url,
				data: data
			}, $.extend({
				viewBox: "0 0 700 533",
				title : title
			}, funcObj), {
				width: 1000,
				height: 786
			});
		},
		drawFpZhenduan4Center: function(){
			this.drawFpZhenduan("widget3",{
				
			},{
				url: zhnx.resource.getUrl("poverty/common/Getareabyid.do"),
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
				url: zhnx.resource.getUrl("poverty/person/getpovertyreasonsum.do"),
				data: data
			},{
				viewBox: "0 0 600 506",
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
				width : 857,
				height : 748
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
		clearPage: function(){
			this.clearPageWithoutMap();
			this.removeComponent("widgetPovertyMap");
		},
		clearPageWithoutMap: function(){
			this.removeComponent("widget1");
			this.removeComponent("widget2");
			this.removeComponent("widget3");
			this.removeComponent("widget4");
			this.removeComponent("widgetRight0");
		},
		clearPage4Table: function(){
			this.removeComponent("widgetTable");
			this.removeComponent("widgetTable_center");
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});