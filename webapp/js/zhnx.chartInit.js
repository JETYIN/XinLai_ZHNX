zhnx.chartInit = {
	windows: {},
	components: [],
	componentObjs: {},
	
	
	//绘制地图部分
	drawMap: function(id, ajaxargs, chartargs, winargs){
		var that = this;
//		weatherTimeAndAddress
		var mapWin = zhnx.windows.map({
			id : id,
			pagePath : that.pagePath,
			selector : that.selector,
			title : "地图"
		});
		this.windows[id] = mapWin;
		
		var newMap = function(){ return undefined; };
		var map = newMap.prototype = new zhnx.chart.map($.extend(chartargs || {}, {
			id: id,
			selector : mapWin.find(".widget-content")
		}));
		newMap.prototype = $.extend(newMap.prototype, chartargs);
		that.components.push(map);
		that.componentObjs[id] = map;
	},
	// 执行命令函数
	evalfunc: function(execString){
		var that = this;
		eval(execString);
	},
	// 删除窗口和图表
	removeComponent: function(id){
		if(this.windows[id] != undefined){
			this.windows[id].remove();
		}
		if(this.componentObjs[id] != undefined){
			this.componentObjs[id].destroy();
		}
	},
	getWindow: function(id){
		return this.windows[id];
	},
	getComponent: function(id){
		return this.componentObjs[id];
	},
	hideComponent: function(id){
		if(id != undefined && this.windows[id] != undefined){
			this.windows[id].hide();
		} else {
			for(var winId in this.windows){
				this.windows[winId].hide();
			}
		}
	},
	hideComponentWithout: function(id){
		for(var winId in this.windows){
			if(winId == id){
				continue;
			}
			this.windows[winId].hide();
		}
	},
	showComponent: function(id){
		if(id != undefined && this.windows[id] != undefined){
			this.windows[id].show();
		} else {
			for(var winId in this.windows){
				this.windows[winId].show();
			}
		}
	},
	//ajax通用请求函数
	ajaxfunc: function(callback, ajaxargs){
		callback = callback || $.noop;
		$.ajax({
			type : "POST",
			url : ajaxargs.url,
			data: ajaxargs.data,
			dataType : "json",
			success : function(d) {
				callback(d);
			},
			complete: function (XHR, TS) { XHR = null } 
		});
	},
	// 绘制窗口
	drawWindow : function(winargs){
		var win = zhnx.windows.custom($.extend(winargs, {
			pagePath : this.pagePath,
			selector : this.selector,
		}), winargs.width, winargs.height);
		this.windows[winargs.id] = win;
		return win.find(".widget-content");
	},
	// 外框动画
	loadBgFrameAnimate: function(bgFrame){
		var v = 0;
		var bottom_svg = bgFrame.append("svg").attr({
			"class": "ruler",
			"x": 1060 + 667.5 + "px",
			"y": -65 + 1070 - 14 + "px",
			"width": 1520,
			"height": 15
		});
		zhnx.utils.loadSvg("svg/weather/common/center_main_frame_ruler_bottom.svg", function(importedNode){
			var plane = bottom_svg.node().appendChild(importedNode.cloneNode(true));
			var planeCopy = bottom_svg.node().appendChild(importedNode.cloneNode(true));
			var ruler = d3.select(plane).attr({
				"x": "0",
				"y": "0",
				"width": 1520,
				"height": 15
			});
			var rulerCopy = d3.select(planeCopy).attr({
				"x": "1510",
				"y": "0",
				"width": 1520,
				"height": 15
			});
			// 动画
			zhnx.utils.timer(function(){
				ruler.attr({
					"x": function(){
						var x = parseFloat(ruler.attr("x")) - v;
						x = x < -1510 ? 1510 : x;
						return x;
					}
				});
				rulerCopy.attr({
					"x": function(){
						var x = parseFloat(rulerCopy.attr("x")) - v;
						x = x < -1510 ? 1510 : x;
						return x;
					}
				});
				if(zhnx.chart.d3Timer){
					return true;
				}
			});
		});
		var top_center_svg = bgFrame.append("svg").attr({
			"class": "ruler",
			"x": 1060 + 1115 + "px",
			"y": -65 + 72.3 + "px",
			"width": 625,
			"height": 15
		});
		zhnx.utils.loadSvg("svg/weather/common/center_main_frame_ruler_top_center.svg", function(importedNode){
			var plane = top_center_svg.node().appendChild(importedNode.cloneNode(true));
			var planeCopy = top_center_svg.node().appendChild(importedNode.cloneNode(true));
			var ruler = d3.select(plane).attr({
				"x": "0",
				"y": "0",
				"width": 625,
				"height": 15
			});
			var rulerCopy = d3.select(planeCopy).attr({
				"x": "-625",
				"y": "0",
				"width": 625,
				"height": 15
			});
			// 动画
			zhnx.utils.timer(function(){
				ruler.attr({
					"x": function(){
						var x = parseFloat(ruler.attr("x")) + v;
						x = x > 625 ? -625 : x;
						return x;
					}
				});
				rulerCopy.attr({
					"x": function(){
						var x = parseFloat(rulerCopy.attr("x")) + v;
						x = x > 625 ? -625 : x;
						return x;
					}
				});
			});
		});
		var top_left_svg = bgFrame.append("svg").attr({
			"class": "ruler",
			"x": 1060 + 1115 - 286 + "px",
			"y": -65 + 72.3 - 14 + "px",
			"width": 265,
			"height": 8
		});
		var top_right_svg = bgFrame.append("svg").attr({
			"class": "ruler",
			"x": 1060 + 1115 + 648 + "px",
			"y": -65 + 72.3 - 14 + "px",
			"width": 265,
			"height": 8
		});
		zhnx.utils.loadSvg("svg/weather/common/center_main_frame_ruler_top_left_right.svg", function(importedNode){
			var plane = top_left_svg.node().appendChild(importedNode.cloneNode(true));
			var planeCopy = top_left_svg.node().appendChild(importedNode.cloneNode(true));
			var ruler = d3.select(plane).attr({
				"x": "0",
				"y": "0",
				"width": 265,
				"height": 8
			});
			var rulerCopy = d3.select(planeCopy).attr({
				"x": "-265",
				"y": "0",
				"width": 265,
				"height": 8
			});
			var plane_right = top_right_svg.node().appendChild(importedNode.cloneNode(true));
			var planeCopy_right = top_right_svg.node().appendChild(importedNode.cloneNode(true));
			var ruler_right = d3.select(plane_right).attr({
				"x": "0",
				"y": "0",
				"width": 265,
				"height": 8
			});
			var rulerCopy_right = d3.select(planeCopy_right).attr({
				"x": "-265",
				"y": "0",
				"width": 265,
				"height": 8
			});
			// 动画
			zhnx.utils.timer(function(){
				ruler.attr({
					"x": function(){
						var x = parseFloat(ruler.attr("x")) + v;
						x = x > 265 ? -265 : x;
						return x;
					}
				});
				rulerCopy.attr({
					"x": function(){
						var x = parseFloat(rulerCopy.attr("x")) + v;
						x = x > 265 ? -265 : x;
						return x;
					}
				});
				ruler_right.attr({
					"x": function(){
						var x = parseFloat(ruler_right.attr("x")) + v;
						x = x > 265 ? -265 : x;
						return x;
					}
				});
				rulerCopy_right.attr({
					"x": function(){
						var x = parseFloat(rulerCopy_right.attr("x")) + v;
						x = x > 265 ? -265 : x;
						return x;
					}
				});
			});
		});
	},
	//玫瑰图
	drawPetal : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 300,
			height: 325
		}, winargs);
		var petalWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : petalWin
				}, chartargs);
				var petal = new zhnx.chart.petal(d);
				that.components.push(petal);
				that.componentObjs[id] = petal;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : petalWin
			}, chartargs);
			var petal = new zhnx.chart.petal(d);
			this.components.push(petal);
			this.componentObjs[id] = petal;
		}
	},
	
	
	//箭头形阵图
	drawArrow : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 425
		}, winargs);
		var arrowWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : arrowWin
				}, chartargs);
				var arrow = new zhnx.chart.arrow(d);
				that.components.push(arrow);
				that.componentObjs[id] = arrow;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : arrowWin
			}, chartargs);
			var arrow = new zhnx.chart.arrow(d);
			this.components.push(arrow);
			this.componentObjs[id] = arrow;
		}				
	},
	
	
	//环形百分阵图
	drawPieBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 300,
			height: 300
		}, winargs);
		var pieBarWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : pieBarWin
				}, chartargs);
				var pieBar = new zhnx.chart.pieBar(d);
				that.components.push(pieBar);
				that.componentObjs[id] = pieBar;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : pieBarWin
			}, chartargs);
			var pieBar = new zhnx.chart.pieBar(d);
			this.components.push(pieBar);
			this.componentObjs[id] = pieBar;
		}				
	},
	
	
	//人口雨点图
	drawPeopleBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 300,
			height: 300
		}, winargs);
		var peopleBarWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : peopleBarWin
				}, chartargs);
				var peopleBar = new zhnx.chart.peopleBar(d);
				that.components.push(peopleBar);
				that.componentObjs[id] = peopleBar;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : peopleBarWin
			}, chartargs);
			var peopleBar = new zhnx.chart.peopleBar(d);
			this.components.push(peopleBar);
			this.componentObjs[id] = peopleBar;
		}				
	},
	
	
	//多数据三角柱状图
	drawMultiTriangleColumn : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 300
		}, winargs);
		var multiTriangleColumnWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : multiTriangleColumnWin
				}, chartargs);
				var multiTriangleColumn = new zhnx.chart.multiTriangleColumn(d);
				that.components.push(multiTriangleColumn);
				that.componentObjs[id] = multiTriangleColumn;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : multiTriangleColumnWin
			}, chartargs);
			var multiTriangleColumn = new zhnx.chart.multiTriangleColumn(d);
			this.components.push(multiTriangleColumn);
			this.componentObjs[id] = multiTriangleColumn;
		}				
	},
	
	
	//雨点图
	drawRaindropBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 400
		}, winargs);
		var raindropBarWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : raindropBarWin
				}, chartargs);
				var raindropBar = new zhnx.chart.raindropBar(d);
				that.components.push(raindropBar);
				that.componentObjs[id] = raindropBar;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : raindropBarWin
			}, chartargs);
			var raindropBar = new zhnx.chart.raindropBar(d);
			this.components.push(raindropBar);
			this.componentObjs[id] = raindropBar;
		}				
	},

	
	
	//水平柱状图
	drawLandscapeBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 630,
			height: 300
		}, winargs);
		var landscapeBarWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : landscapeBarWin
				}, chartargs);
				var landscapeBar = new zhnx.chart.landscapeBar(d);
				that.components.push(landscapeBar);
				that.componentObjs[id] = landscapeBar;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : landscapeBarWin
			}, chartargs);
			var landscapeBar = new zhnx.chart.landscapeBar(d);
			this.components.push(landscapeBar);
			this.componentObjs[id] = landscapeBar;
		}				
	},

	
	
	//水利云特殊柱图
	drawSpecialBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 550,
			height: 400
		}, winargs);
		var specialBarWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : specialBarWin
				}, chartargs);
				var specialBar = new zhnx.chart.specialBar(d);
				that.components.push(specialBar);
				that.componentObjs[id] = specialBar;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : specialBarWin
			}, chartargs);
			var specialBar = new zhnx.chart.specialBar(d);
			this.components.push(specialBar);
			this.componentObjs[id] = specialBar;
		}				
	},

	
	// 线 图
	drawLine : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 350
		}, winargs);
		var lineWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : lineWin
				}, chartargs);
				var line = new zhnx.chart.line(d);
				that.components.push(line);
				that.componentObjs[id] = line;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : lineWin
			}, chartargs);
			var line = new zhnx.chart.line(d);
			this.components.push(line);
			this.componentObjs[id] = line;
		}				
	},

	
	//  环  百分比图
	drawRingPie : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 170,
			height: 200
		}, winargs);
		var ringPieWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : ringPieWin
				}, chartargs);
				var ringPie = new zhnx.chart.ringPie(d);
				that.components.push(ringPie);
				that.componentObjs[id] = ringPie;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : ringPieWin
			}, chartargs);
			var ringPie = new zhnx.chart.ringPie(d);
			this.components.push(ringPie);
			this.componentObjs[id] = ringPie;
		}				
	},

	
	
	//多系列柱状图
	drawMultiColumn : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 300
		}, winargs);
		var multiColumnWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : multiColumnWin
				}, chartargs);
				var multiColumn = new zhnx.chart.multiColumn(d);
				that.components.push(multiColumn);
				that.componentObjs[id] = multiColumn;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : multiColumnWin
			}, chartargs);
			var multiColumn = new zhnx.chart.multiColumn(d);
			this.components.push(multiColumn);
			this.componentObjs[id] = multiColumn;
		}				
	},


	//水波图
	drawLiquidSpherical : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 160,
			height: 160
		}, winargs);
		var liquidSphericalWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : liquidSphericalWin
				}, chartargs);
				var liquidSpherical = new zhnx.chart.liquidSpherical(d);
				that.components.push(liquidSpherical);
				that.componentObjs[id] = liquidSpherical;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : liquidSphericalWin
			}, chartargs);
			var liquidSpherical = new zhnx.chart.liquidSpherical(d);
			this.components.push(liquidSpherical);
			this.componentObjs[id] = liquidSpherical;
		}				
	},

	
	//分段面图
	drawSubsectionArea : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 350,
			height: 250
		}, winargs);
		var subsectionAreaWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : subsectionAreaWin
				}, chartargs);
				var subsectionArea = new zhnx.chart.subsectionArea(d);
				that.components.push(subsectionArea);
				that.componentObjs[id] = subsectionArea;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : subsectionAreaWin
			}, chartargs);
			var subsectionArea = new zhnx.chart.subsectionArea(d);
			this.components.push(subsectionArea);
			this.componentObjs[id] = subsectionArea;
		}				
	},

	
	
	//水利云右侧标题

	drawWaterCloudRightTitle: function(windid, ajaxargs, selector, text){
		var title = new zhnx.chart.waterCloudRightTitle({
			selector: selector,
			text: text
		});
	},
	
	
	//饼图
	drawPie : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 300,
		height: 250
	}, winargs);
	var pieWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : pieWin
			}, chartargs);
			var pie = new zhnx.chart.pie(d);
			that.components.push(pie);
			that.componentObjs[id] = pie;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : pieWin
		}, chartargs);
		var pie = new zhnx.chart.pie(d);
		this.components.push(pie);
		this.componentObjs[id] = pie;
	}				
},

	
	//蛛网图
drawPolarLine : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 350,
		height: 220
	}, winargs);
	var polarLineWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : polarLineWin
			}, chartargs);
			var polarLine = new zhnx.chart.polarLine(d);
			that.components.push(polarLine);
			that.componentObjs[id] = polarLine;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : polarLineWin
		}, chartargs);
		var polarLine = new zhnx.chart.polarLine(d);
		this.components.push(polarLine);
		this.componentObjs[id] = polarLine;
	}				
},

	
	
	//多面积图
drawMultiArea : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 350,
		height: 220
	}, winargs);
	var multiAreaWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : multiAreaWin
			}, chartargs);
			var multiArea = new zhnx.chart.multiArea(d);
			that.components.push(multiArea);
			that.componentObjs[id] = multiArea;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : multiAreaWin
		}, chartargs);
		var multiArea = new zhnx.chart.multiArea(d);
		this.components.push(multiArea);
		this.componentObjs[id] = multiArea;
	}				
},

	
	//单面积图
drawArea : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 400,
		height: 250
	}, winargs);
	var areaWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : areaWin
			}, chartargs);
			var area = new zhnx.chart.area(d);
			that.components.push(area);
			that.componentObjs[id] = area;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : areaWin
		}, chartargs);
		var area = new zhnx.chart.area(d);
		this.components.push(area);
		this.componentObjs[id] = area;
	}				
},

	
	
	//水利云右侧日常管理数据部分
drawWaterManager : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 300,
		height: 200
	}, winargs);
	var waterManagerWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : waterManagerWin
			}, chartargs);
			var waterManager = new zhnx.chart.waterManager(d);
			that.components.push(waterManager);
			that.componentObjs[id] = waterManager;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : waterManagerWin
		}, chartargs);
		var waterManager = new zhnx.chart.waterManager(d);
		this.components.push(waterManager);
		this.componentObjs[id] = waterManager;
	}				
},

	
	//水利云右侧企业人员数据部分
drawWaterEmployee : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 400,
		height: 220
	}, winargs);
	var waterEmployeeWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : waterEmployeeWin
			}, chartargs);
			var waterEmployee = new zhnx.chart.waterEmployee(d);
			that.components.push(waterEmployee);
			that.componentObjs[id] = waterEmployee;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : waterEmployeeWin
		}, chartargs);
		var waterEmployee = new zhnx.chart.waterEmployee(d);
		this.components.push(waterEmployee);
		this.componentObjs[id] = waterEmployee;
	}				
},

	
	//水利云抄表信息
drawChaoBiao : function(id, ajaxargs, chartargs, winargs){
	var that = this;
	chartargs = $.extend({id: id}, chartargs);
	winargs = $.extend({
		id: id,
		width: 400,
		height: 400
	}, winargs);
	var chaoBiaoWin = this.drawWindow(winargs);
	if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
		this.ajaxfunc(function(d){
			$.extend(d, {
				selector : chaoBiaoWin
			}, chartargs);
			var chaoBiao = new zhnx.chart.chaoBiao(d);
			that.components.push(chaoBiao);
			that.componentObjs[id] = chaoBiao;
		}, ajaxargs);
	}else{
		var d = $.extend({}, {
			selector : chaoBiaoWin
		}, chartargs);
		var chaoBiao = new zhnx.chart.chaoBiao(d);
		this.components.push(chaoBiao);
		this.componentObjs[id] = chaoBiao;
	}				
},

	
	
	//三通两平台折线柱状图
	drawEduSTLPT : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 350,
			height: 350
		}, winargs);
		var eduSTLPTWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTWin
				}, chartargs);
				var eduSTLPT = new zhnx.chart.eduSTLPT(d);
				that.components.push(eduSTLPT);
				that.componentObjs[id] = eduSTLPT;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTWin
			}, chartargs);
			var eduSTLPT = new zhnx.chart.eduSTLPT(d);
			this.components.push(eduSTLPT);
			this.componentObjs[id] = eduSTLPT;
		}				
	},
	
	
	
	//网络教学活动
	drawEduWebTeaching : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 350
		}, winargs);
		var eduWebTeachingWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduWebTeachingWin
				}, chartargs);
				var eduWebTeaching = new zhnx.chart.eduWebTeaching(d);
				that.components.push(eduWebTeaching);
				that.componentObjs[id] = eduWebTeaching;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduWebTeachingWin
			}, chartargs);
			var eduWebTeaching = new zhnx.chart.eduWebTeaching(d);
			this.components.push(eduWebTeaching);
			this.componentObjs[id] = eduWebTeaching;
		}				
	},
	
	
	
	//教育资源平台
	drawEduResource : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 350
		}, winargs);
		var eduResourceWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduResourceWin
				}, chartargs);
				var eduResource = new zhnx.chart.eduResource(d);
				that.components.push(eduResource);
				that.componentObjs[id] = eduResource;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduResourceWin
			}, chartargs);
			var eduResource = new zhnx.chart.eduResource(d);
			this.components.push(eduResource);
			this.componentObjs[id] = eduResource;
		}				
	},
	
	
	//宽带网络建设
	drawEduKuanDai : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 350
		}, winargs);
		var eduKuanDaiWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduKuanDaiWin
				}, chartargs);
				var eduKuanDai = new zhnx.chart.eduKuanDai(d);
				that.components.push(eduKuanDai);
				that.componentObjs[id] = eduKuanDai;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduKuanDaiWin
			}, chartargs);
			var eduKuanDai = new zhnx.chart.eduKuanDai(d);
			this.components.push(eduKuanDai);
			this.componentObjs[id] = eduKuanDai;
		}				
	},
	
	//教育管理平台
	drawEduAdmin : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 400,
			height: 350
		}, winargs);
		var eduAdminWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduAdminWin
				}, chartargs);
				var eduAdmin = new zhnx.chart.eduAdmin(d);
				that.components.push(eduAdmin);
				that.componentObjs[id] = eduAdmin;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduAdminWin
			}, chartargs);
			var eduAdmin = new zhnx.chart.eduAdmin(d);
			this.components.push(eduAdmin);
			this.componentObjs[id] = eduAdmin;
		}				
	},
	
	
	
	//学生体育教育统计——体育成绩
	drawCompoundPieBarChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 730,
			height: 400
		}, winargs);
		var compoundPieBarChartWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : compoundPieBarChartWin
				}, chartargs);
				var compoundPieBarChart = new zhnx.chart.compoundPieBarChart(d);
				that.components.push(compoundPieBarChart);
				that.componentObjs[id] = compoundPieBarChart;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : compoundPieBarChartWin
			}, chartargs);
			var compoundPieBarChart = new zhnx.chart.compoundPieBarChart(d);
			this.components.push(compoundPieBarChart);
			this.componentObjs[id] = compoundPieBarChart;
		}				
	},
	
	
	//教育云营养早餐成本及发放率
	drawEduFoodCostAndPostRatio : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 450,
			height: 500
		}, winargs);
		var eduFoodCostAndPostRatioWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduFoodCostAndPostRatioWin
				}, chartargs);
				var eduFoodCostAndPostRatio = new zhnx.chart.eduFoodCostAndPostRatio(d);
				that.components.push(eduFoodCostAndPostRatio);
				that.componentObjs[id] = eduFoodCostAndPostRatio;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduFoodCostAndPostRatioWin
			}, chartargs);
			var eduFoodCostAndPostRatio = new zhnx.chart.eduFoodCostAndPostRatio(d);
			this.components.push(eduFoodCostAndPostRatio);
			this.componentObjs[id] = eduFoodCostAndPostRatio;
		}				
	},
	
	//学生教职工年级数量分析
	drawEduStudentAndTeacherAmount : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 580,
			height: 500
		}, winargs);
		var eduStudentAndTeacherAmountWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduStudentAndTeacherAmountWin
				}, chartargs);
				var eduStudentAndTeacherAmount = new zhnx.chart.eduStudentAndTeacherAmount(d);
				that.components.push(eduStudentAndTeacherAmount);
				that.componentObjs[id] = eduStudentAndTeacherAmount;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduStudentAndTeacherAmountWin
			}, chartargs);
			var eduStudentAndTeacherAmount = new zhnx.chart.eduStudentAndTeacherAmount(d);
			this.components.push(eduStudentAndTeacherAmount);
			this.componentObjs[id] = eduStudentAndTeacherAmount;
		}				
	},


	
	//各区县年级学生数量
	drawEduStudentAmount : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 580,
			height: 500
		}, winargs);
		var eduStudentAmountWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){	
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduStudentAmountWin
				}, chartargs);
				var eduStudentAmount = new zhnx.chart.eduStudentAmount(d);
				that.components.push(eduStudentAmount);
				that.componentObjs[id] = eduStudentAmount;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduStudentAmountWin
			}, chartargs);
			var eduStudentAmount = new zhnx.chart.eduStudentAmount(d);
			this.components.push(eduStudentAmount);
			this.componentObjs[id] = eduStudentAmount;
		}				
	},


	
	
	//入学/毕业人数对比分析
	drawCompoundAreaLineChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 580,
			height: 360
		}, winargs);
		var compoundAreaLineChartWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){			
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : compoundAreaLineChartWin
				}, chartargs);
				var compoundAreaLineChart = new zhnx.chart.compoundAreaLineChart(d);
				that.components.push(compoundAreaLineChart);
				that.componentObjs[winid] = compoundAreaLineChart;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : compoundAreaLineChartWin
			}, chartargs);
			var compoundAreaLineChart = new zhnx.chart.compoundAreaLineChart(d);
			this.components.push(compoundAreaLineChart);
			this.componentObjs[id] = compoundAreaLineChart;
		}				
	},
	
	
	//残疾学生地区对比分析
	drawEduCanJi : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 500,
			height: 400
		}, winargs);
		var eduCanJiWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){			
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduCanJiWin
				}, chartargs);
				var eduCanJi = new zhnx.chart.eduCanJi(d);
				that.components.push(eduCanJi);
				that.componentObjs[winid] = eduCanJi;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduCanJiWin
			}, chartargs);
			var eduCanJi = new zhnx.chart.eduCanJi(d);
			this.components.push(eduCanJi);
			this.componentObjs[id] = eduCanJi;
		}				
	},

	
	//教育云单个三角柱状图
	drawEduSingleTriangle : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 500,
			height: 450
		}, winargs);
		var eduSingleTriangleWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){			
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSingleTriangleWin
				}, chartargs);
				var eduSingleTriangle = new zhnx.chart.eduSingleTriangle(d);
				that.components.push(eduSingleTriangle);
				that.componentObjs[winid] = eduSingleTriangle;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : eduSingleTriangleWin
			}, chartargs);
			var eduSingleTriangle = new zhnx.chart.eduSingleTriangle(d);
			this.components.push(eduSingleTriangle);
			this.componentObjs[id] = eduSingleTriangle;
		}				
	},
	
	
	//扶贫云面积图
	drawfpAreaChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 750,
			height: 550
		}, winargs);
		var fpAreaChartWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(true, d, {
					selector : fpAreaChartWin
				}, chartargs);
				var newFpAreaChart = function(){ return undefined; };
				var fpAreaChart = newFpAreaChart.prototype = new zhnx.chart.fpAreaChart(d);
//				var fpAreaChart = new zhnx.chart.fpAreaChart(d);
				newFpAreaChart.prototype = $.extend(newFpAreaChart.prototype, chartargs);
				that.components.push(fpAreaChart);
				that.componentObjs[id] = fpAreaChart;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpAreaChartWin
			}, chartargs);
			var newFpAreaChart = function(){ return undefined; };
			var fpAreaChart = newFpAreaChart.prototype = new zhnx.chart.fpAreaChart(d);
			newFpAreaChart.prototype = $.extend(newFpAreaChart.prototype, chartargs);
			this.components.push(fpAreaChart);
			this.componentObjs[id] = fpAreaChart;
		}
	},
	
	//扶贫云水平百分比图
	drawfphorizonColumn : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 700,
			height: 700
		}, winargs);
		var fphorizonColumnWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fphorizonColumnWin
				}, chartargs);
				var newFphorizonColumn = function(){ return undefined; };
				var fphorizonColumn = newFphorizonColumn.prototype = new zhnx.chart.fphorizonColumn(d);
				newFphorizonColumn.prototype = $.extend(newFphorizonColumn.prototype, chartargs);
				that.components.push(fphorizonColumn);
				that.componentObjs[id] = fphorizonColumn;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fphorizonColumnWin
			}, chartargs);
			var newFphorizonColumn = function(){ return undefined; };
			var fphorizonColumn = newFphorizonColumn.prototype = new zhnx.chart.fphorizonColumn(d);
			newFphorizonColumn.prototype = $.extend(newFphorizonColumn.prototype, chartargs);
			this.components.push(fphorizonColumn);
			this.componentObjs[id] = fphorizonColumn;
		}
	},
	
	//扶贫云折线图
	drawfpLineChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 500,
			height: 400
		}, winargs);
		var fpLineChartWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpLineChartWin
				}, chartargs);
				var newfpLineChart = function(){ return undefined; };
				var fpLineChart = newfpLineChart.prototype = new zhnx.chart.fpLineChart(d);
				newfpLineChart.prototype = $.extend(newfpLineChart.prototype, chartargs);
				that.components.push(fpLineChart);
				that.componentObjs[id] = fpLineChart;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpLineChartWin
			}, chartargs);
			var newfpLineChart = function(){ return undefined; };
			var fpLineChart = newfpLineChart.prototype = new zhnx.chart.fpLineChart(d);
			newfpLineChart.prototype = $.extend(newfpLineChart.prototype, chartargs);
			this.components.push(fpLineChart);
			this.componentObjs[id] = fpLineChart;
		}
	},

	//扶贫云多维三角柱图
	drawfpmultiTriangleColumn : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 600,
			height: 500
		}, winargs);
		var fpmultiTriangleColumnWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpmultiTriangleColumnWin
				}, chartargs);
				var newFpmultiTriangleColumn = function(){ return undefined; };
				var fpmultiTriangleColumn = newFpmultiTriangleColumn.prototype = new zhnx.chart.fpmultiTriangleColumn(d);
				newFpmultiTriangleColumn.prototype = $.extend(newFpmultiTriangleColumn.prototype, chartargs);
				that.components.push(fpmultiTriangleColumn);
				that.componentObjs[id] = fpmultiTriangleColumn;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpmultiTriangleColumnWin
			}, chartargs);
			var newFpmultiTriangleColumn = function(){ return undefined; };
			var fpmultiTriangleColumn = newFpmultiTriangleColumn.prototype = new zhnx.chart.fpmultiTriangleColumn(d);
			newFpmultiTriangleColumn.prototype = $.extend(newFpmultiTriangleColumn.prototype, chartargs);
			that.components.push(fpmultiTriangleColumn);
			that.componentObjs[id] = fpmultiTriangleColumn;
		}
	}, 
	
	
	//扶贫云三角柱图
	drawfptriangleColumn : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 500,
			height: 400
		}, winargs);
		var fptriangleColumnWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					id: id,
					selector : fptriangleColumnWin
				}, chartargs);
				var newChart = function(){ return undefined; };
				var fptriangleColumn = newChart.prototype = new zhnx.chart.fptriangleColumn(d);
				newChart.prototype = $.extend(newChart.prototype, chartargs);
				that.components.push(fptriangleColumn);
				that.componentObjs[id] = fptriangleColumn;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				id: id,
				selector : fptriangleColumnWin
			}, chartargs);
			var newChart = function(){ return undefined; };
			var fptriangleColumn = newChart.prototype = new zhnx.chart.fptriangleColumn(d);
			newChart.prototype = $.extend(newChart.prototype, chartargs);
			that.components.push(fptriangleColumn);
			that.componentObjs[id] = fptriangleColumn;
		}
	}, 
	//扶贫云 文字图片
	drawPovertySatus : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 530,
			height: 450
		}, winargs);
		var povertySatusWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : povertySatusWin
				}, chartargs);
				var povertySatus = new zhnx.chart.povertySatus(d);
				that.components.push(povertySatus);
				that.componentObjs[id] = povertySatus;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : povertySatusWin
			}, chartargs);
			var povertySatus = new zhnx.chart.povertySatus(d);
			this.components.push(povertySatus);
			this.componentObjs[id] = povertySatus;
		}
	},
	//扶贫云 半圆环+横柱图
	drawPovertyTeam : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 600,
			height: 600
		}, winargs);
		var povertyTeamWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : povertyTeamWin
				}, chartargs);
				var povertyTeam = new zhnx.chart.povertyTeam(d);
				that.components.push(povertyTeam);
				that.componentObjs[id] = povertyTeam;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : povertyTeamWin
			}, chartargs);
			var povertyTeam = new zhnx.chart.povertyTeam(d);
			this.components.push(povertyTeam);
			this.componentObjs[id] = povertyTeam;
		}
	},
	//扶贫云 致贫原因
	drawPovertyReason : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 964.3,
			height: 474.3
		}, winargs);
		var povertyReasonWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : povertyReasonWin
				}, chartargs);
				var newpovertyReason = function(){ return undefined; };
				var povertyReason = newpovertyReason.prototype = new zhnx.chart.povertyReason(d);
				newpovertyReason.prototype = $.extend(newpovertyReason.prototype, chartargs);
				that.components.push(povertyReason);
				that.componentObjs[id] = povertyReason;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : povertyReasonWin
			}, chartargs);
			var newpovertyReason = function(){ return undefined; };
			var povertyReason = newpovertyReason.prototype = new zhnx.chart.povertyReason(d);
			newpovertyReason.prototype = $.extend(newpovertyReason.prototype, chartargs);
			this.components.push(povertyReason);
			this.componentObjs[id] = povertyReason;
		}
//		var that = this;
//		chartargs = $.extend({id: id}, chartargs);
//		winargs = $.extend({
//			id: id,
//			width: 560,
//			height: 480
//		}, winargs);
//		var povertyReasonWin = this.drawWindow(winargs);
//		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
//			this.ajaxfunc(function(d){
//				$.extend(d, {
//					selector : povertyReasonWin
//				}, chartargs);
//				var povertyReason = new zhnx.chart.povertyReason(d);
//				that.components.push(povertyReason);
//				that.componentObjs[id] = povertyReason;
//			}, ajaxargs)
//		}else{
//			var d = $.extend({}, {
//				selector : povertyReasonWin
//			}, chartargs);
//			var povertyReason = new zhnx.chart.povertyReason(d);
//			this.components.push(povertyReason);
//			this.componentObjs[id] = povertyReason;
//		}
	},
	//扶贫云 环形图
	drawPovertyAba_develop : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 964.3,
			height: 474.3
		}, winargs);
		var povertyAba_developWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : povertyAba_developWin
				}, chartargs);
				var newpovertyAba_develop = function(){ return undefined; };
				var povertyAba_develop = newpovertyAba_develop.prototype = new zhnx.chart.povertyAba_develop(d);
				newpovertyAba_develop.prototype = $.extend(newpovertyAba_develop.prototype, chartargs);
				that.components.push(povertyAba_develop);
				that.componentObjs[id] = povertyAba_develop;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : povertyAba_developWin
			}, chartargs);
			var newpovertyAba_develop = function(){ return undefined; };
			var povertyAba_develop = newpovertyAba_develop.prototype = new zhnx.chart.povertyAba_develop(d);
			newpovertyAba_develop.prototype = $.extend(newpovertyAba_develop.prototype, chartargs);
			this.components.push(povertyAba_develop);
			this.componentObjs[id] = povertyAba_develop;
		}
	},
	drawFpZhenduan : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 537,
			height: 790
		}, winargs);
		var fpZhenduanWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpZhenduanWin
				}, chartargs);
				var newChart = function(){ return undefined; };
				var fpZhenduan = newChart.prototype = new zhnx.chart.fpZhenduan(d);
				newChart.prototype = $.extend(newChart.prototype, chartargs);
				that.components.push(fpZhenduan);
				that.componentObjs[id] = fpZhenduan;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpZhenduanWin
			}, chartargs);
			var newChart = function(){ return undefined; };
			var fpZhenduan = newChart.prototype = new zhnx.chart.fpZhenduan(d);
			newChart.prototype = $.extend(newChart.prototype, chartargs);
			this.components.push(fpZhenduan);
			this.componentObjs[id] = fpZhenduan;
		}
	},
	drawSvgTable : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 1601,
			height: 914
		}, winargs);
		var fpZhenduanTableWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpZhenduanTableWin
				}, chartargs);
				var newSvgTable = function(){ return undefined; };
				var fpZhenduanTable = newSvgTable.prototype = new zhnx.chart.svgTable(d);
				newSvgTable.prototype = $.extend(newSvgTable.prototype, chartargs);
				that.components.push(fpZhenduanTable);
				that.componentObjs[id] = fpZhenduanTable;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpZhenduanTableWin
			}, chartargs);
			var newSvgTable = function(){ return undefined; };
			var fpZhenduanTable = newSvgTable.prototype = new zhnx.chart.svgTable(d);
			newSvgTable.prototype = $.extend(newSvgTable.prototype, chartargs);
			that.components.push(fpZhenduanTable);
			that.componentObjs[id] = fpZhenduanTable;
		}
	},
	//十三五脱贫-脱贫目标
	drawfpTargetTableL1 : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 838.5,
			height: 372
		}, winargs);
		var fpTargetTableL1Win = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpTargetTableL1Win
				}, chartargs);
				var fpTargetTableL1 = new zhnx.chart.fpTargetTableL1(d);
				that.components.push(fpTargetTableL1);
				that.componentObjs[id] = fpTargetTableL1;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpTargetTableL1Win
			}, chartargs);
			var fpTargetTableL1 = new zhnx.chart.fpTargetTableL1(d);
			this.components.push(fpTargetTableL1);
			this.componentObjs[id] = fpTargetTableL1;
		}
	},
	
	drawfpTargetTableL2 : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 838.5,
			height: 372
		}, winargs);
		var fpTargetTableL2Win = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpTargetTableL2Win
				}, chartargs);
				var fpTargetTableL2 = new zhnx.chart.fpTargetTableL2(d);
				that.components.push(fpTargetTableL2);
				that.componentObjs[id] = fpTargetTableL2;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpTargetTableL2Win
			}, chartargs);
			var fpTargetTableL2 = new zhnx.chart.fpTargetTableL2(d);
			this.components.push(fpTargetTableL2);
			this.componentObjs[id] = fpTargetTableL2;
		}
	},
	drawfpTargetTableR1 : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 838.5,
			height: 372
		}, winargs);
		var fpTargetTableR1Win = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpTargetTableR1Win
				}, chartargs);
				var fpTargetTableR1 = new zhnx.chart.fpTargetTableR1(d);
				that.components.push(fpTargetTableR1);
				that.componentObjs[id] = fpTargetTableR1;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpTargetTableR1Win
			}, chartargs);
			var fpTargetTableR1 = new zhnx.chart.fpTargetTableR1(d);
			this.components.push(fpTargetTableR1);
			this.componentObjs[id] = fpTargetTableR1;
		}
	},
	drawfpTargetTableR2 : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 838.5,
			height: 372
		}, winargs);
		var fpTargetTableR2Win = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpTargetTableR2Win
				}, chartargs);
				var fpTargetTableR2 = new zhnx.chart.fpTargetTableR2(d);
				that.components.push(fpTargetTableR2);
				that.componentObjs[id] = fpTargetTableR2;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpTargetTableR2Win
			}, chartargs);
			var fpTargetTableR2 = new zhnx.chart.fpTargetTableR2(d);
			this.components.push(fpTargetTableR2);
			this.componentObjs[id] = fpTargetTableR2;
		}
	},
	//扶贫 十三五脱贫-十三项行动计划
	drawfpActionPlane : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 2724,
			height: 900
		}, winargs);
		var fpActionPlaneWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpActionPlaneWin
				}, chartargs);
				var fpActionPlane = new zhnx.chart.fpActionPlane(d);
				that.components.push(fpActionPlane);
				that.componentObjs[id] = fpActionPlane;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpActionPlaneWin
			}, chartargs);
			var fpActionPlane = new zhnx.chart.fpActionPlane(d);
			this.components.push(fpActionPlane);
			this.componentObjs[id] = fpActionPlane;
		}
	},
	//扶贫 十三五脱贫-十三项行动计划Pad
	drawfpActionPlane_pad : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 1100,
			height: 1496
		}, winargs);
		var fpActionPlaneWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpActionPlaneWin
				}, chartargs);
				var fpActionPlane_pad = new zhnx.chart.fpActionPlane_pad(d);
				that.components.push(fpActionPlane_pad);
				that.componentObjs[id] = fpActionPlane_pad;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpActionPlaneWin
			}, chartargs);
			var fpActionPlane_pad = new zhnx.chart.fpActionPlane_pad(d);
			this.components.push(fpActionPlane_pad);
			this.componentObjs[id] = fpActionPlane_pad;
		}
	},
	
	//扶贫 全区务工人员数量和人均可支配收入（混合面积图，两个Y坐标轴）
	drawfpMixtureArea : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 800,
			height: 700
		}, winargs);
		var fpMixtureAreaWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpMixtureAreaWin
				}, chartargs);
				var fpMixtureArea = new zhnx.chart.fpMixtureArea(d);
				that.components.push(fpMixtureArea);
				that.componentObjs[id] = fpMixtureArea;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpMixtureAreaWin
			}, chartargs);
			var fpMixtureArea = new zhnx.chart.fpMixtureArea(d);
			this.components.push(fpMixtureArea);
			this.componentObjs[id] = fpMixtureArea;
		}
	},
	
	//扶贫 扶贫对象 户主信息
	drawfpHuZhuInfo : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 2474,
			height: 875
		}, winargs);
		var fpHuZhuInfoWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : fpHuZhuInfoWin
				}, chartargs);
				var newFpHuZhuInfo = function(){ return undefined; };
				var fpHuZhuInfo = newFpHuZhuInfo.prototype = new zhnx.chart.fpHuZhuInfo(d);
				newFpHuZhuInfo.prototype = $.extend(newFpHuZhuInfo.prototype, chartargs);
				that.components.push(fpHuZhuInfo);
				that.componentObjs[id] = fpHuZhuInfo;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpHuZhuInfoWin
			}, chartargs);
			var newFpHuZhuInfo = function(){ return undefined; };
			var fpHuZhuInfo = newFpHuZhuInfo.prototype = new zhnx.chart.fpHuZhuInfo(d);
			newFpHuZhuInfo.prototype = $.extend(newFpHuZhuInfo.prototype, chartargs);
			this.components.push(fpHuZhuInfo);
			this.componentObjs[id] = fpHuZhuInfo;
		}
	},
	
	
	drawPieChartXChart: function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 2474,
			height: 875
		}, winargs);
		var fpHuZhuInfoWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				var pieChartXChart = xCharts(fpHuZhuInfoWin.get(0), chartargs);
				pieChartXChart.drawPieChart(d);
				that.components.push(pieChartXChart);
				that.componentObjs[id] = pieChartXChart;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : fpHuZhuInfoWin
			}, chartargs);
			var pieChartXChart = xCharts(fpHuZhuInfoWin.get(0), chartargs);
			pieChartXChart.drawPieChart(d);
			that.components.push(pieChartXChart);
			that.componentObjs[id] = pieChartXChart;
		}
	},
	
	//气象面积图
	drawWeatherAreaXChart: function(id, ajaxargs, chartargs, winargs, option){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 905,
			height: 215
		}, winargs);
		var weatherAreaWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				var weatherArea = xCharts(weatherAreaWin.get(0), chartargs);
				weatherArea.setOption(option);
				weatherArea.drawWeatherArea(d);
				that.components.push(weatherArea);
				that.componentObjs[id] = weatherArea;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherAreaWin
			}, chartargs);
			var weatherArea = xCharts(weatherAreaWin.get(0), chartargs);
			weatherArea.setOption(option);
			weatherArea.drawWeatherArea(d);
			that.components.push(weatherArea);
			that.componentObjs[id] = weatherArea;
		}
	},
	
	//气象线图
	drawWeatherLineXChart: function(id, ajaxargs, chartargs, winargs, option){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 905,
			height: 215
		}, winargs);
		var weatherLineWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				var weatherLine = xCharts(weatherLineWin.get(0), chartargs);
				weatherLine.setOption(option);
				weatherLine.drawWeatherLine(d);
				that.components.push(weatherLine);
				that.componentObjs[id] = weatherLine;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherLineWin
			}, chartargs);
			var weatherLine = xCharts(weatherLineWin.get(0), chartargs);
			weatherLine.setOption(option);
			weatherLine.drawWeatherLine(d);
			that.components.push(weatherLine);
			that.componentObjs[id] = weatherLine;
		}
	},
	
	//气象温度计
	drawWeatherThermometer : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherThermometerWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherThermometerWin
				}, chartargs);
				var weatherThermometer = new zhnx.chart.weatherThermometer(d);
				that.components.push(weatherThermometer);
				that.componentObjs[id] = weatherThermometer;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherThermometerWin
			}, chartargs);
			var weatherThermometer = new zhnx.chart.weatherThermometer(d);
			this.components.push(weatherThermometer);
			this.componentObjs[id] = weatherThermometer;
		}
	},
	
	//气象空气质量指数
	drawWeatherAQI : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherAQIWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherAQIWin
				}, chartargs);
				var weatherAQI = new zhnx.chart.weatherAQI(d);
				that.components.push(weatherAQI);
				that.componentObjs[id] = weatherAQI;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherAQIWin
			}, chartargs);
			var weatherAQI = new zhnx.chart.weatherAQI(d);
			this.components.push(weatherAQI);
			this.componentObjs[id] = weatherAQI;
		}
	},
	
	//气象云折线面积图
	drawWeatherAreaLine : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 910,
			height: 270
		}, winargs);
		var weatherAreaLineWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherAreaLineWin
				}, chartargs);
				var weatherAreaLine = new zhnx.chart.weatherAreaLine(d);
				that.components.push(weatherAreaLine);
				that.componentObjs[id] = weatherAreaLine;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherAreaLineWin
			}, chartargs);
			var weatherAreaLine = new zhnx.chart.weatherAreaLine(d);
			this.components.push(weatherAreaLine);
			this.componentObjs[id] = weatherAreaLine;
		}
	},
	
	//气象云全年降水量图
	drawWeatherRainOfYear : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherRainOfYearWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherRainOfYearWin
				}, chartargs);
				var weatherRainOfYear = new zhnx.chart.weatherRainOfYear(d);
				that.components.push(weatherRainOfYear);
				that.componentObjs[id] = weatherRainOfYear;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherRainOfYearWin
			}, chartargs);
			var weatherRainOfYear = new zhnx.chart.weatherRainOfYear(d);
			this.components.push(weatherRainOfYear);
			this.componentObjs[id] = weatherRainOfYear;
		}
	},
	
	
	//天气趋势预报
	drawweatherTrendForecast : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherTrendForecastWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherTrendForecastWin
				}, chartargs);
				var newWeatherTrendForecast = function(){ return undefined; };
				var weatherTrendForecast = newWeatherTrendForecast.prototype = new zhnx.chart.weatherTrendForecast(d);
				newWeatherTrendForecast.prototype = $.extend(newWeatherTrendForecast.prototype, chartargs);
				that.components.push(weatherTrendForecast);
				that.componentObjs[id] = weatherTrendForecast;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherTrendForecastWin
			}, chartargs);
			var newWeatherTrendForecast = function(){ return undefined; };
			var weatherTrendForecast = newWeatherTrendForecast.prototype = new zhnx.chart.weatherTrendForecast(d);
			newWeatherTrendForecast.prototype = $.extend(newWeatherTrendForecast.prototype, chartargs);
			this.components.push(weatherTrendForecast);
			this.componentObjs[id] = weatherTrendForecast;
		}
	},
	
	//气象云综合天气指标和气象灾害
	drawweatherSynthesisKPI : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherSynthesisKPIWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherSynthesisKPIWin
				}, chartargs);
				var weatherSynthesisKPI = new zhnx.chart.weatherSynthesisKPI(d);
				that.components.push(weatherSynthesisKPI);
				that.componentObjs[id] = weatherSynthesisKPI;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherSynthesisKPIWin
			}, chartargs);
			var weatherSynthesisKPI = new zhnx.chart.weatherSynthesisKPI(d);
			this.components.push(weatherSynthesisKPI);
			this.componentObjs[id] = weatherSynthesisKPI;
		}
	},
	
	
	//气象云天气实况——实时天气情况
	drawweatherActual : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherActualWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherActualWin
				}, chartargs);
				var weatherActual = new zhnx.chart.weatherActual(d);
				that.components.push(weatherActual);
				that.componentObjs[id] = weatherActual;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherActualWin
			}, chartargs);
			var weatherActual = new zhnx.chart.weatherActual(d);
			this.components.push(weatherActual);
			this.componentObjs[id] = weatherActual;
		}
	},
	
	//气象云天气实况——实时生活指数
	drawweatherIndexOfLiving : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 965,
			height: 250
		}, winargs);
		var weatherIndexOfLivingWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherIndexOfLivingWin
				}, chartargs);
				var weatherIndexOfLiving = new zhnx.chart.weatherIndexOfLiving(d);
				that.components.push(weatherIndexOfLiving);
				that.componentObjs[id] = weatherIndexOfLiving;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherIndexOfLivingWin
			}, chartargs);
			var weatherIndexOfLiving = new zhnx.chart.weatherIndexOfLiving(d);
			this.components.push(weatherIndexOfLiving);
			this.componentObjs[id] = weatherIndexOfLiving;
		}
	},
	
	//气象云天气预报——生活指数
	drawWeatherForecastIndex : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherForecastIndexWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherForecastIndexWin
				}, chartargs);
				var weatherForecastIndex = new zhnx.chart.weatherForecastIndex(d);
				that.components.push(weatherForecastIndex);
				that.componentObjs[id] = weatherForecastIndex;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherForecastIndexWin
			}, chartargs);
			var weatherForecastIndex = new zhnx.chart.weatherForecastIndex(d);
			this.components.push(weatherForecastIndex);
			this.componentObjs[id] = weatherForecastIndex;
		}
	},
	
	////气象云交通气象站
	drawWeatherTrifficStation : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var weatherTrifficStationWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : weatherTrifficStationWin
				}, chartargs);
				var newWeatherTrifficStation = function(){ return undefined; };
				var weatherTrifficStation = newWeatherTrifficStation.prototype = new zhnx.chart.weatherTrifficStation(d);
				newWeatherTrifficStation.prototype = $.extend(newWeatherTrifficStation.prototype, d);
				that.components.push(weatherTrifficStation);
				that.componentObjs[id] = weatherTrifficStation;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherTrifficStationWin
			}, chartargs);
			var newWeatherTrifficStation = function(){ return undefined; };
			var weatherTrifficStation = newWeatherTrifficStation.prototype = new zhnx.chart.weatherTrifficStation(d);
			newWeatherTrifficStation.prototype = $.extend(newWeatherTrifficStation.prototype, chartargs);
			this.components.push(weatherTrifficStation);
			this.componentObjs[id] = weatherTrifficStation;
		}
	},
	
	//气象云农业气象——高速路段天气
	drawWeatherHighwayForecast : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 965,
			height: 250
		}, winargs);
		var weatherHighwayForecastWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : weatherHighwayForecastWin
				}, chartargs);
				var newWeatherHighwayForecast = function(){ return undefined; };
				var weatherHighwayForecast = newWeatherHighwayForecast.prototype = new zhnx.chart.weatherHighwayForecast(d);
				newWeatherHighwayForecast.prototype = $.extend(newWeatherHighwayForecast.prototype, d);
				that.components.push(weatherHighwayForecast);
				that.componentObjs[id] = weatherHighwayForecast;
				// 开始执行
				weatherHighwayForecast.bgRectClick(0);
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : weatherHighwayForecastWin
			}, chartargs);
			var newWeatherHighwayForecast = function(){ return undefined; };
			var weatherHighwayForecast = newWeatherHighwayForecast.prototype = new zhnx.chart.weatherHighwayForecast(d);
			newWeatherHighwayForecast.prototype = $.extend(newWeatherHighwayForecast.prototype, chartargs);
			this.components.push(weatherHighwayForecast);
			this.componentObjs[id] = weatherHighwayForecast;
		}
	},
	
	//气象云路段天气预报组合图
	drawWeatherRoadForecast : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 965,
			height: 850
		}, winargs);
		var weatherRoadForecastWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherRoadForecastWin
				}, chartargs);
				var newWeatherRoadForecast = function(){ return undefined; };
				var weatherRoadForecast = newWeatherRoadForecast.prototype = new zhnx.chart.weatherRoadForecast(d);
				newWeatherRoadForecast.prototype = $.extend(newWeatherRoadForecast.prototype, chartargs);
				that.components.push(weatherRoadForecast);
				that.componentObjs[id] = weatherRoadForecast;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherRoadForecastWin
			}, chartargs);
			var newWeatherRoadForecast = function(){ return undefined; };
			var weatherRoadForecast = newWeatherRoadForecast.prototype = new zhnx.chart.weatherRoadForecast(d);
			newWeatherRoadForecast.prototype = $.extend(newWeatherRoadForecast.prototype, chartargs);
			that.components.push(weatherRoadForecast);
			that.componentObjs[id] = weatherRoadForecast;
		}
	},
	
	// 气象地图
	drawWeatherMap : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		var mapWin = zhnx.windows.weatherMap($.extend({
			id : id,
			pagePath : that.pagePath,
			selector : that.selector,
			title : "地图"
		}, winargs));
		this.windows[id] = mapWin;
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				var newMap = function(){ return undefined; };
				var map = newMap.prototype = new zhnx.chart.weatherMap($.extend({}, d, chartargs || {}, {
					id: id,
					selector : mapWin.find(".widget-content")
				}));
				newMap.prototype = $.extend(newMap.prototype, chartargs);
				that.components.push(map);
				that.componentObjs[id] = map;
			}, ajaxargs);
		}else{
			var newMap = function(){ return undefined; };
			var map = newMap.prototype = new zhnx.chart.weatherMap($.extend({}, chartargs || {}, {
				id: id,
				selector : mapWin.find(".widget-content")
			}));
			newMap.prototype = $.extend(newMap.prototype, chartargs);
			that.components.push(map);
			that.componentObjs[id] = map;
		}
	},
	drawWeatherAlert: function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 953.3,
			height: 711.7
		}, winargs);
		var weatherAlertWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherAlertWin
				}, chartargs);
				var newWeatherAlert = function(){ return undefined; };
				var weatherAlert = newWeatherAlert.prototype = new zhnx.chart.weatherAlert(d);
				newWeatherAlert.prototype = $.extend(newWeatherAlert.prototype, chartargs);
				that.components.push(weatherAlert);
				that.componentObjs[id] = weatherAlert;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherAlertWin
			}, chartargs);
			var newWeatherAlert = function(){ return undefined; };
			var weatherAlert = newWeatherAlert.prototype = new zhnx.chart.weatherAlert(d);
			newWeatherAlert.prototype = $.extend(newWeatherAlert.prototype, chartargs);
			that.components.push(weatherAlert);
			that.componentObjs[id] = weatherAlert;
		}
	},
	drawWeatherWarMsgRoll: function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 953.3,
			height: 711.7
		}, winargs);
		var weatherWarMsgRollWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherWarMsgRollWin
				}, chartargs);
				var newWeatherWarMsgRoll = function(){ return undefined; };
				var weatherWarMsgRoll = newWeatherWarMsgRoll.prototype = new zhnx.chart.weatherWarMsgRoll(d);
				newWeatherWarMsgRoll.prototype = $.extend(newWeatherWarMsgRoll.prototype, chartargs);
				that.components.push(weatherWarMsgRoll);
				that.componentObjs[id] = weatherWarMsgRoll;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherWarMsgRollWin
			}, chartargs);
			var newWeatherWarMsgRoll = function(){ return undefined; };
			var weatherWarMsgRoll = newWeatherWarMsgRoll.prototype = new zhnx.chart.weatherWarMsgRoll(d);
			newWeatherWarMsgRoll.prototype = $.extend(newWeatherWarMsgRoll.prototype, chartargs);
			this.components.push(weatherWarMsgRoll);
			this.componentObjs[id] = weatherWarMsgRoll;
		}
	},
	//天气顶部城市，时间
	drawCityAndTimeInit:function(id,ajaxargs,chartargs,winargs){
		var that=this;
		chartargs=$.extend({id:id},chartargs);
		
		winargs=$.extend({
			id:id,
			width:300,
			height:90,
		},winargs);
		
		var weatherTimeAndAddressWin=this.drawWindow(winargs);
		
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherTimeAndAddressWin
				}, chartargs);
				var weatherTimeAndAddress = new zhnx.chart.weatherTimeAndAddress(d);
				that.components.push(weatherTimeAndAddress);
				that.componentObjs[id] = weatherTimeAndAddress;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherTimeAndAddressWin
			}, chartargs);
			var weatherTimeAndAddress = new zhnx.chart.weatherTimeAndAddress(d);
			this.components.push(weatherTimeAndAddress);
			this.componentObjs[id] = weatherTimeAndAddress;
		}
		
	},
	//气象云-天气预报-天气临近预报
	drawWeatherTimePrediction: function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 970,
			height: 650
		}, winargs);
		var weatherTimePredictionWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : weatherTimePredictionWin
				}, chartargs);
				var weatherTimePrediction = new zhnx.chart.weatherTimePrediction(d);
				that.components.push(weatherTimePrediction);
				that.componentObjs[id] = weatherTimePrediction;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : weatherTimePredictionWin
			}, chartargs);
			var weatherTimePrediction = new zhnx.chart.weatherTimePrediction(d);
			this.components.push(weatherTimePrediction);
			this.componentObjs[id] = weatherTimePrediction;
		}
	},
	
	//教育云右边固定组件
	drawEduRight:function(id,ajaxargs,chartargs,winargs){
		var that=this;
		chartargs=$.extend({id:id},chartargs);
		winargs=$.extend({
			id:id,
			width:875,
			height:1000
		},winargs);
		
		//绘制小组件的大背景布局大小
		var eduSchoolWin=this.drawWindow(winargs);
		
		if(ajaxargs !=""&&ajaxargs.url!=""&&ajaxargs.url!=undefined){
			this.ajaxfunc(function(d){
				$.extend(d,{selector:eduSchoolWin},chartargs);
				var eduRightResource = new zhnx.chart.eduRightResource(d);
				that.components.push(eduRightResource);
				that.componentObjs[id] = eduRightResource;
			},ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSchoolWin
			}, chartargs);
			var eduRightResource = new zhnx.chart.eduRightResource(d);
			this.components.push(eduRightResource);
			this.componentObjs[id] = eduRightResource;
		}
		
	},
	//教育云右边固定组件-标题
	drawRightTitle : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduRightTitleWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduRightTitleWin
				}, chartargs);
				var eduRightTitle = new zhnx.chart.eduRightTitle(d);
				that.components.push(eduRightTitle);
				that.componentObjs[id] = eduRightTitle;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduRightTitleWin
			}, chartargs);
			var eduRightTitle = new zhnx.chart.eduRightTitle(d);
			this.components.push(eduRightTitle);
			this.componentObjs[id] = eduRightTitle;
		}
	},
	//教育云三通两平台
	drawEduSTLPTTitle : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTTitleWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTTitleWin
				}, chartargs);
				var eduSTLPTTitle = new zhnx.chart.eduSTLPTTitle(d);
				that.components.push(eduSTLPTTitle);
				that.componentObjs[id] = eduSTLPTTitle;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTTitleWin
			}, chartargs);
			var eduSTLPTTitle = new zhnx.chart.eduSTLPTTitle(d);
			this.components.push(eduSTLPTTitle);
			this.componentObjs[id] = eduSTLPTTitle;
		}
	},
	drawEduSTLPTVisitors : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTVisitorsWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTVisitorsWin
				}, chartargs);
				var eduSTLPTVisitors = new zhnx.chart.eduSTLPTVisitors(d);
				that.components.push(eduSTLPTVisitors);
				that.componentObjs[id] = eduSTLPTVisitors;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTVisitorsWin
			}, chartargs);
			var eduSTLPTVisitors = new zhnx.chart.eduSTLPTVisitors(d);
			this.components.push(eduSTLPTVisitors);
			this.componentObjs[id] = eduSTLPTVisitors;
		}
	},
	drawEduSTLPTResource : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTResourceWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : eduSTLPTResourceWin
				}, chartargs);
				var eduSTLPTResource = new zhnx.chart.eduSTLPTResource(d);
				that.components.push(eduSTLPTResource);
				that.componentObjs[id] = eduSTLPTResource;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTResourceWin
			}, chartargs);
			var eduSTLPTResource = new zhnx.chart.eduSTLPTResource(d);
			this.components.push(eduSTLPTResource);
			this.componentObjs[id] = eduSTLPTResource;
		}
	},
	drawEduSTLPTManagement : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTManagementWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : eduSTLPTManagementWin
				}, chartargs);
				var eduSTLPTManagement = new zhnx.chart.eduSTLPTManagement(d);
				that.components.push(eduSTLPTManagement);
				that.componentObjs[id] = eduSTLPTManagement;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTManagementWin
			}, chartargs);
			var eduSTLPTManagement = new zhnx.chart.eduSTLPTManagement(d);
			this.components.push(eduSTLPTManagement);
			this.componentObjs[id] = eduSTLPTManagement;
		}
	},
	drawEduSTLPTRRT : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTRRTWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTRRTWin
				}, chartargs);
				var eduSTLPTRRT = new zhnx.chart.eduSTLPTRRT(d);
				that.components.push(eduSTLPTRRT);
				that.componentObjs[id] = eduSTLPTRRT;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTRRTWin
			}, chartargs);
			var eduSTLPTRRT = new zhnx.chart.eduSTLPTRRT(d);
			this.components.push(eduSTLPTRRT);
			this.componentObjs[id] = eduSTLPTRRT;
		}
	},
	drawEduSTLPTXXTRRT : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTXXTRRTWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : eduSTLPTXXTRRTWin
				}, chartargs);
				var neweduSTLPTXXTRRT = function(){ return undefined; };
				var eduSTLPTXXTRRT = neweduSTLPTXXTRRT.prototype = new zhnx.chart.eduSTLPTXXTRRT(d);
				neweduSTLPTXXTRRT.prototype = $.extend(true, neweduSTLPTXXTRRT.prototype, chartargs);
//				console.info(neweduSTLPTXXTRRT.prototype);
				that.components.push(eduSTLPTXXTRRT);
				that.componentObjs[id] = eduSTLPTXXTRRT;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTXXTRRTWin
			}, chartargs);
			var neweduSTLPTXXTRRT = function(){ return undefined; };
			var eduSTLPTXXTRRT = neweduSTLPTXXTRRT.prototype = new zhnx.chart.eduSTLPTXXTRRT(d);
			neweduSTLPTXXTRRT.prototype = $.extend(true, neweduSTLPTXXTRRT.prototype, chartargs);
			this.components.push(eduSTLPTXXTRRT);
			this.componentObjs[id] = eduSTLPTXXTRRT;
		}
	},
	drawEduSTLPTBBT : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTBBTWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTBBTWin
				}, chartargs);
				var eduSTLPTBBT = new zhnx.chart.eduSTLPTBBT(d);
				that.components.push(eduSTLPTBBT);
				that.componentObjs[id] = eduSTLPTBBT;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTBBTWin
			}, chartargs);
			var eduSTLPTBBT = new zhnx.chart.eduSTLPTBBT(d);
			this.components.push(eduSTLPTBBT);
			this.componentObjs[id] = eduSTLPTBBT;
		}
	},
	drawEduSTLPTXXT : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 875,
			height: 1000
		}, winargs);
		var eduSTLPTXXTWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduSTLPTXXTWin
				}, chartargs);
				var eduSTLPTXXT = new zhnx.chart.eduSTLPTXXT(d);
				that.components.push(eduSTLPTXXT);
				that.componentObjs[id] = eduSTLPTXXT;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduSTLPTXXTWin
			}, chartargs);
			var eduSTLPTXXT = new zhnx.chart.eduSTLPTXXT(d);
			this.components.push(eduSTLPTXXT);
			this.componentObjs[id] = eduSTLPTXXT;
		}
	},
	drawEduConstitute : function(id, ajaxargs, chartargs, winargs){	//教育环形
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 964.3,
			height: 474.3
		}, winargs);
		var eduConstituteWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduConstituteWin
				}, chartargs);
				var neweduConstitute = function(){ return undefined; };
				var eduConstitute = neweduConstitute.prototype = new zhnx.chart.eduConstitute(d);
				neweduConstitute.prototype = $.extend(neweduConstitute.prototype, chartargs);
				that.components.push(eduConstitute);
				that.componentObjs[id] = eduConstitute;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduConstituteWin
			}, chartargs);
			var neweduConstitute = function(){ return undefined; };
			var eduConstitute = neweduConstitute.prototype = new zhnx.chart.eduConstitute(d);
			neweduConstitute.prototype = $.extend(neweduConstitute.prototype, chartargs);
			this.components.push(eduConstitute);
			this.componentObjs[id] = eduConstitute;
		}
	},
//	drawEduPie : function(id, ajaxargs, chartargs, winargs){
//		var that = this;
//		chartargs = $.extend({id: id}, chartargs);
//		winargs = $.extend({
//			id: id,
//			width: 285,
//			height: 160
//		}, winargs);
//		var eduPieWin = this.drawWindow(winargs);
//		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
//			this.ajaxfunc(function(d){
//				$.extend(d, {
//					selector : eduPieWin
//				}, chartargs);
//				var neweduPie = function(){ return undefined; };
//				var eduPie = neweduPie.prototype = new zhnx.chart.eduBar(d);
//				neweduPie.prototype = $.extend(neweduPie.prototype, chartargs);
//				that.components.push(eduPie);
//				that.componentObjs[id] = eduPie;
//			}, ajaxargs)
//		}else{
//			var d = $.extend({}, {
//				selector : eduPieWin
//			}, chartargs);
//			var neweduPie = function(){ return undefined; };
//			var eduPie = neweduPie.prototype = new zhnx.chart.eduPie(d);
//			neweduPie.prototype = $.extend(neweduPie.prototype, chartargs);
//			this.components.push(eduPie);
//			this.componentObjs[id] = eduPie;
//		}
//	},
	////教育云柱状图
	drawEduBar : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var eduBarWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : eduBarWin
				}, chartargs);
				var neweduBar = function(){ return undefined; };
				var eduBar = neweduBar.prototype = new zhnx.chart.eduBar(d);
				neweduBar.prototype = $.extend(neweduBar.prototype, chartargs);
				that.components.push(eduBar);
				that.componentObjs[id] = eduBar;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : eduBarWin
			}, chartargs);
			var neweduBar = function(){ return undefined; };
			var eduBar = neweduBar.prototype = new zhnx.chart.eduBar(d);
			neweduBar.prototype = $.extend(neweduBar.prototype, chartargs);
			this.components.push(eduBar);
			this.componentObjs[id] = eduBar;
		}
	},
	
////带导航的混合图（xchart）
	drawMixtureChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var mixtureChartWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : mixtureChartWin
				}, chartargs);
				var newmixtureChart = function(){ return undefined; };
				var mixtureChart = newmixtureChart.prototype = new zhnx.chart.mixtureChart(d);
				newmixtureChart.prototype = $.extend(newmixtureChart.prototype, chartargs);
				that.components.push(mixtureChart);
				that.componentObjs[id] = mixtureChart;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : mixtureChartWin
			}, chartargs);
			var newmixtureChart = function(){ return undefined; };
			var mixtureChart = newmixtureChart.prototype = new zhnx.chart.mixtureChart(d);
			newmixtureChart.prototype = $.extend(newmixtureChart.prototype, chartargs);
			this.components.push(mixtureChart);
			this.componentObjs[id] = mixtureChart;
		}
	},
	
//	//环图调用xChart
	drawPieTestChart : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var pieChartTestWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : pieChartTestWin
				}, chartargs);
				var newpieChartTest = function(){ return undefined; };
				var pieChartTest = newpieChartTest.prototype = new zhnx.chart.pieChartTest(d);
				newpieChartTest.prototype = $.extend(newpieChartTest.prototype, chartargs);
				that.components.push(pieChartTest);
				that.componentObjs[id] = pieChartTest;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : pieChartTestWin
			}, chartargs);
			var newpieChartTest = function(){ return undefined; };
			var pieChartTest = newpieChartTest.prototype = new zhnx.chart.pieChartTest(d);
			newpieChartTest.prototype = $.extend(newpieChartTest.prototype, chartargs);
			this.components.push(pieChartTest);
			this.componentObjs[id] = pieChartTest;
		}
//		var that = this;
//		chartargs = $.extend({id: id}, chartargs);
//		winargs = $.extend({
//			id: id,
//			width: 910,
//			height: 270
//		}, winargs);
//		var pieChartTestWin = this.drawWindow(winargs);
//		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
//			this.ajaxfunc(function(d){
//				$.extend(d, {
//					selector : pieChartTestWin
//				}, chartargs);
//				var pieChartTest = new zhnx.chart.pieChartTest(d);
//				that.components.push(pieChartTest);
//				that.componentObjs[id] = pieChartTest;
//			}, ajaxargs)
//		}else{
//			var d = $.extend({}, {
//				selector : pieChartTestWin
//			}, chartargs);
//			var pieChartTest = new zhnx.chart.pieChartTest(d);
//			this.components.push(pieChartTest);
//			this.componentObjs[id] = pieChartTest;
//		}
	},
	//卫生云右侧上部
	drawHealthRightTop : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 910,
			height: 270
		}, winargs);
		var healthRightTopWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : healthRightTopWin
				}, chartargs);
				var healthRightTop = new zhnx.chart.healthRightTop(d);
				that.components.push(healthRightTop);
				that.componentObjs[id] = healthRightTop;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : healthRightTopWin
			}, chartargs);
			var healthRightTop = new zhnx.chart.healthRightTop(d);
			this.components.push(healthRightTop);
			this.componentObjs[id] = healthRightTop;
		}
	},
	//卫生云右侧中部
	drawHealthRightMiddle : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 910,
			height: 270
		}, winargs);
		var healthRightMiddleWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : healthRightMiddleWin
				}, chartargs);
				var healthRightMiddle = new zhnx.chart.healthRightMiddle(d);
				that.components.push(healthRightMiddle);
				that.componentObjs[id] = healthRightMiddle;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : healthRightMiddleWin
			}, chartargs);
			var healthRightMiddle = new zhnx.chart.healthRightMiddle(d);
			this.components.push(healthRightMiddle);
			this.componentObjs[id] = healthRightMiddle;
		}
	},
	//卫生云-区域卫生平台-右边最下
	drawHealthRightBottom:function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 910,
			height: 270
		}, winargs);
		var healthRightBottomWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : healthRightBottomWin
				}, chartargs);
				var healthRightBottom = new zhnx.chart.healthRightBottom(d);
				that.components.push(healthRightBottom);
				that.componentObjs[id] = healthRightBottom;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : healthRightBottomWin
			}, chartargs);
			var healthRightBottom = new zhnx.chart.healthRightBottom(d);
			this.components.push(healthRightBottom);
			this.componentObjs[id] = healthRightBottom;
		}
		
	},
	//全区人口统计
	drawPopulation:function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var populationAndMedicalServiceWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				d = $.extend(true, {}, d, {
					selector : populationAndMedicalServiceWin
				}, chartargs);
//				console.info(d);
				var newpopulationAndMedicalService = function(){ return undefined; };
				var populationAndMedicalService = newpopulationAndMedicalService.prototype = new zhnx.chart.populationAndMedicalService(d);
				newpopulationAndMedicalService.prototype = $.extend(newpopulationAndMedicalService.prototype, d);
				that.components.push(populationAndMedicalService);
				that.componentObjs[id] = populationAndMedicalService;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : populationAndMedicalServiceWin
			}, chartargs);
			var newpopulationAndMedicalService = function(){ return undefined; };
			var populationAndMedicalService = newpopulationAndMedicalService.prototype = new zhnx.chart.populationAndMedicalService(d);
			newpopulationAndMedicalService.prototype = $.extend(newpopulationAndMedicalService.prototype, chartargs);
			this.components.push(populationAndMedicalService);
			this.componentObjs[id] = populationAndMedicalService;
		}
	},
//	//全区人口统计-医疗服务统计
//	drawPopulationAndMedicalService:function(id, ajaxargs, chartargs, winargs){
//		var that = this;
//		chartargs = $.extend({id: id}, chartargs);
//		winargs = $.extend({
//			id: id,
//			width: 952,
//			height: 930
//		}, winargs);
//		var populationAndMedicalServiceWin = this.drawWindow(winargs);
//		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
//			this.ajaxfunc(function(d){
//				$.extend(d, {
//					selector : populationAndMedicalServiceWin
//				}, chartargs);
//				var populationAndMedicalService = new zhnx.chart.populationAndMedicalService(d);
//				that.components.push(populationAndMedicalService);
//				that.componentObjs[id] = populationAndMedicalService;
//			}, ajaxargs)
//		}else{
//			var d = $.extend({}, {
//				selector : populationAndMedicalServiceWin
//			}, chartargs);
//			var populationAndMedicalService = new zhnx.chart.populationAndMedicalService(d);
//			this.components.push(populationAndMedicalService);
//			this.componentObjs[id] = populationAndMedicalService;
//		}
//		
//	},
	//卫生云-区域卫生平台-右下角医疗服务费用
	drawRegionalHealthCircle:function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 964.3,
			height: 474.3
		}, winargs);
		var regionalHealthCircleWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : regionalHealthCircleWin
				}, chartargs);
				var newregionalHealthCircle = function(){ return undefined; };
				var regionalHealthCircle = newregionalHealthCircle.prototype = new zhnx.chart.regionalHealthCircle(d);
				newregionalHealthCircle.prototype = $.extend(newregionalHealthCircle.prototype, chartargs);
				that.components.push(regionalHealthCircle);
				that.componentObjs[id] = regionalHealthCircle;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : regionalHealthCircleWin
			}, chartargs);
			var newregionalHealthCircle = function(){ return undefined; };
			var regionalHealthCircle = newregionalHealthCircle.prototype = new zhnx.chart.regionalHealthCircle(d);
			newregionalHealthCircle.prototype = $.extend(newregionalHealthCircle.prototype, chartargs);
			this.components.push(regionalHealthCircle);
			this.componentObjs[id] = regionalHealthCircle;
		}
	},
	//卫生云-区域卫生平台-左下角公共卫生管理
	drawPublicHealth:function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 285,
			height: 160
		}, winargs);
		var publicHealthWin = this.drawWindow(winargs);
		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : publicHealthWin
				}, chartargs);
				var newpublicHealth = function(){ return undefined; };
				var publicHealth = newpublicHealth.prototype = new zhnx.chart.publicHealth(d);
				newpublicHealth.prototype = $.extend(newpublicHealth.prototype, chartargs);
				that.components.push(publicHealth);
				that.componentObjs[id] = publicHealth;
			}, ajaxargs)
		}else{
			var d = $.extend({}, {
				selector : publicHealthWin
			}, chartargs);
			var newpublicHealth = function(){ return undefined; };
			var publicHealth = newpublicHealth.prototype = new zhnx.chart.publicHealth(d);
			newpublicHealth.prototype = $.extend(newpublicHealth.prototype, chartargs);
			this.components.push(publicHealth);
			this.componentObjs[id] = publicHealth;
		}
//		var that = this;
//		chartargs = $.extend({id: id}, chartargs);
//		winargs = $.extend({
//			id: id,
//			width: 910,
//			height: 270
//		}, winargs);
//		var publicHealthWin = this.drawWindow(winargs);
//		if(ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
//			this.ajaxfunc(function(d){
//				$.extend(d, {
//					selector : publicHealthWin
//				}, chartargs);
//				var publicHealth = new zhnx.chart.publicHealth(d);
//				that.components.push(publicHealth);
//				that.componentObjs[id] = publicHealth;
//			}, ajaxargs)
//		}else{
//			var d = $.extend({}, {
//				selector : publicHealthWin
//			}, chartargs);
//			var publicHealth = new zhnx.chart.publicHealth(d);
//			this.components.push(publicHealth);
//			this.componentObjs[id] = publicHealth;
//		}
	},
	
	//集成系统右边部分
	drawIntegrationRight : function(id, ajaxargs, chartargs, winargs){
		var that = this;
		chartargs = $.extend({id: id}, chartargs);
		winargs = $.extend({
			id: id,
			width: 630,
			height: 300
		}, winargs);
		var integrationRightWin = this.drawWindow(winargs);
		if (ajaxargs != "" && ajaxargs.url != "" && ajaxargs.url != undefined){
			this.ajaxfunc(function(d){
				$.extend(d, {
					selector : integrationRightWin
				}, chartargs);
				var integrationRight = new zhnx.chart.integrationRight(d);
				that.components.push(integrationRight);
				that.componentObjs[id] = integrationRight;
			}, ajaxargs);
		}else{
			var d = $.extend({}, {
				selector : integrationRightWin
			}, chartargs);
			var integrationRight = new zhnx.chart.integrationRight(d);
			this.components.push(integrationRight);
			this.componentObjs[id] = integrationRight;
		}				
	},
}