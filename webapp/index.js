$(function () {
    function index() {
    	this.init();
    };
    index.prototype = {
        constructor: index,
        navData: undefined,
        navMenuData: undefined,
        cloudSvg: undefined,
        cloudGroup: undefined,
        cloud_focus: undefined,
        cloudScrollBar: undefined,
        cloudEventY: 0,
        cloud_path: undefined,
        cloudImportedNode: undefined,
        cloudImportedNodeFocus: undefined,
        menuSvg: undefined,
        menuGroup: undefined,
        menu_focus: undefined,
        menuImportedNode: undefined,
        menuImportedNodeFocus: undefined,
        cloud_nav_top: 40,
    	cloud_nav_width: 153,
    	cloud_nav_height: 31,
    	cloud_nav_padding: 15,
    	cloud_nav_focus_left: 6,
    	cloud_nav_focus_top: 5,
    	menu_nav_top: 60,
        menu_nav_width: 130,
        menu_nav_height: 31,
        menu_nav_padding: 15,
        menu_nav_focus_left: 6.5,
        menu_nav_focus_top: 5,
        commonContainer1: undefined,
        commonContainer2: undefined,
        cloudContainer1: undefined,
        cloudContainer2: undefined,
        init: function(){
        	var that = this;
        	// 先获取用户平移信息
        	zhnx.getWebLoginUser(function(d){
        		// 获取成功
				if(d.code == 200){
					that.moveBody(d.loginUser.bodyMovePx);
				}
				// 加载页面头图标
        		that.initHead();
        		// 获取菜单信息
        		that.initNavData(function(){
    				that.initGlobalMetric([ {
    					'key' : '全区总面积',
    					'value' : '6.64',
    					'unit' : '万平方千米'
    				}, {
    					'key' : '全区人口总数',
    					'value' : '662.00',
    					'unit' : '万人'
    				} ]);
    				that.initTime();
            		that.initBg();
            	});
        	});
        },
        initNavData: function(callback){
        	var that = this;
            d3.json("data/navData.json", function (error, root) {
            	that.navData = root;
            	callback();
            });
        },
        initHead: function(){
        	// logo
        	zhnx.utils.loadSvgByArea("svg/logo.svg", function(importedNode){
        		d3.select("#leftHead .logo").node().appendChild(importedNode.cloneNode(true));
        	});
        	// version
        	zhnx.utils.loadSvgByArea("svg/version.svg", function(importedNode){
        		d3.select("#leftHead .version").node().appendChild(importedNode.cloneNode(true));
        	});
        	// chinaMap
        	zhnx.utils.loadSvgByArea("svg/chinaMap.svg", function(importedNode){
        		d3.select("#leftHead .chinaMap").node().appendChild(importedNode.cloneNode(true));
        	});
        },
        initGlobalMetric: function(metrics){
        	var that = this;
        	// 综合指标
        	zhnx.utils.loadSvg("svg/index/generalMetric.svg", function(importedNode){
        		var width = 402, height = 75.5;
        		that.commonContainer1 = d3.select("#leftBodyGeneralMetric").append("svg").attr({
					"width": width,
					"height": height
				});
        		that.commonContainer1.node().appendChild(importedNode.cloneNode(true));
        		that.commonContainer1 = that.commonContainer1.append("g");
				that.commonContainer2 = d3.select("#leftBodyThisYearAdd").append("svg").attr({
					"width": width,
					"height": height
				});
				that.commonContainer2.node().appendChild(importedNode.cloneNode(true));
        		that.commonContainer2 = that.commonContainer2.append("g");
				that.drawCommonMetric(metrics);
        	});
        },
        initTime: function(){
        	var that = this;
        	// 时间
        	zhnx.utils.loadSvg("svg/index/navTime.svg", function(importedNode){
        		var width = 414, height = 75.5;
				var d3Container = d3.select("#leftBodyNavTime").append("svg").attr({
					"width": width,
					"height": height
				});
				d3Container.node().appendChild(importedNode.cloneNode(true));
				that.drawTime(d3Container, width, height);
        	});
        },
        initBg: function(){
        	var that = this;
        	// 云公共指标
        	zhnx.utils.loadSvg("svg/index/multiMetric.svg", function(importedNode){
        		var width = 414, height = 277;
        		that.cloudContainer1 = d3.select("#leftBodyMultiMetric1").append("svg").attr({
					"width": width,
					"height": height
				});
        		that.cloudContainer1.node().appendChild(importedNode.cloneNode(true));
        		that.cloudContainer1 = that.cloudContainer1.append("g");
				that.cloudContainer2 = d3.select("#leftBodyMultiMetric2").append("svg").attr({
					"width": width,
					"height": height
				});
				that.cloudContainer2.node().appendChild(importedNode.cloneNode(true));
        		that.cloudContainer2 = that.cloudContainer2.append("g");
				that.drawCloudMetric(0);
        	});
        	// 菜单
        	zhnx.utils.loadSvg("svg/index/navCont.svg", function(importedNode){
        		var width = 414, height = 652;
        		var d3Container = d3.select("#leftBodyNavCont").append("svg").attr({
					"width": width,
					"height": height
				});
        		d3Container.node().appendChild(importedNode.cloneNode(true));
        		that.drawNav(d3Container, width, height);
        	});
        },
        drawCommonMetric: function(metrics){
        	var that = this;
        	that.commonContainer1.selectAll("*").remove();
        	that.commonContainer2.selectAll("*").remove();
        	// 总面积
        	that.commonContainer1.append("text").attr({
        		"x": 95,
        		"y": 48,
        		"fill": "#F0A000",
        		"font-size": 26,
        		"font-weight": "bold",
                "text-anchor": "middle",
                "dominant-baseline": "end",
                "font-family": "Microsoft Yahei"
        	}).text(metrics[0].key);
        	that.commonContainer1.append("text").attr({
        		"x": 215,
        		"y": 48,
        		"fill": "#FFF",
        		"font-size": 26,
                "font-family": "KARNIVOL",
                "text-anchor": "start",
                "dominant-baseline": "end"
        	}).each(function(){
        		d3.select(this).append("tspan").attr({
        			"font-size": 26,
                    "font-family": "KARNIVOL",
        		}).text(metrics[0].value);
        		d3.select(this).append("tspan").attr({
        			"dx": 10,
        			"font-size": 14
        		}).text(metrics[0].unit);
        	});
        	// 总人口
        	that.commonContainer2.append("text").attr({
        		"x": 97,
        		"y": 42,
        		"fill": "#F0A000",
        		"font-size": 26,
        		"font-weight": "bold",
                "text-anchor": "middle",
                "dominant-baseline": "middle",
                "font-family": "Microsoft Yahei"
        	}).text(metrics[1].key);
        	that.commonContainer2.append("text").attr({
        		"x": 215,
        		"y": 48,
        		"fill": "#FFF",
                "text-anchor": "start",
                "dominant-baseline": "end"
        	}).each(function(){
        		d3.select(this).append("tspan").attr({
        			"font-size": 26,
                    "font-family": "KARNIVOL",
        		}).text(metrics[1].value);
        		d3.select(this).append("tspan").attr({
        			"dx": 10,
        			"font-size": 14
        		}).text(metrics[1].unit);
        	});
        },
        drawCloudMetric: function(cloudIdx){
        	var that = this, d = that.navData[cloudIdx];
        	that.cloudContainer1.selectAll("*").remove();
        	that.cloudContainer2.selectAll("*").remove();
        	
        	switch (d.name) {
			case "气象云":
				that.drawMetric([[{
					"key": "气象监测点总数",
					"value": 186
				},{
					"key": "交通气象站总数",
					"value": 7
				},{
					"key": "监测公路总长度",
					"value": 342165
				}],[{
					"key": "今年沙尘暴预警总数",
					"value": 1
				},{
					"key": "气象灾害警报与预警信号总数",
					"value": 500
				},{
					"key": "突发事件预警信号",
					"value": 5
				}]]);
				break;
			case "扶贫云":
				that.drawMetric([[{
					"key": "人口总数",
					"value": 6220000
				},{
					"key": "贫困人口总数",
					"value": 581227
				},{
					"key": "回族人口数量",
					"value": 342165
				}],[{
					"key": "贫困户数量",
					"value": 148784
				},{
					"key": "贫困人口村数",
					"value": 1360
				},{
					"key": "贫困人口县数",
					"value": 20
				}]]);
				break;
			case "水利云":
				that.drawMetric([[{
					"key": "人口总数",
					"value": 6220000
				},{
					"key": "监测点总数",
					"value": 3435
				},{
					"key": "饮用水总量",
					"value": 6500000000
				}],[{
					"key": "水库总数",
					"value": 318
				},{
					"key": "居民户总数",
					"value": 0
				},{
					"key": "工业单位总数",
					"value": 0
				}]]);
				break;
			case "教育云":
				that.drawMetric([[{
					"key": "全区学校总数",
					"value": 12098
				},{
					"key": "全区教职工总数",
					"value": 9467
				},{
					"key": "全区学生总数",
					"value": 383210
				}],[{
					"key": "职业中学学生总数",
					"value": 30247
				},{
					"key": "特殊教育学生总数",
					"value": 160174
				},{
					"key": "留守儿童总数",
					"value": 636528
				}]]);
				break;
			case "卫生云":
				that.drawMetric([[{
					"key": "医疗卫生机构总数",
					"value": 1835
				},{
					"key": "医疗卫生人数总数",
					"value": 342165
				},{
					"key": "医疗卫生机构床位数",
					"value": 33804
				}],[{
					"key": "年总疗人数",
					"value": 30864976
				},{
					"key": "医生人均诊疗人次",
					"value": 6.08
				},{
					"key": "医患关系发生次数",
					"value": 8889
				}]]);
				break;
			case "综合集成系统":
				that.drawMetric([[{
					"key": "接入厅局单位总数",
					"value": 31
				},{
					"key": "互联网系统总数",
					"value": 176
				},{
					"key": "专网系统总数",
					"value": 7
				}],[{
					"key": "接入门户网站数",
					"value": 56
				},{
					"key": "新建系统数",
					"value": 57
				},{
					"key": "上线系统数",
					"value": 113
				}]]);
				break;
			}
        },
        drawMetric: function(metrics){
        	var that = this;
        	for(var i = 0; i < metrics.length; i++){
        		var metric = metrics[i], container = [that.cloudContainer1, that.cloudContainer2][i];
        		container.selectAll(".text_group").data(metric).enter()
        			.append("g").attr({
        				"transform": function(d, i){
        					return "translate(0, " + (48 + i * 80) + ")"
        				}
        			}).each(function(d, i){
            			d3.select(this).append("text").attr({
            				"x": 207,
            				"y": 0,
                    		"font-size": 26,
            				"fill": "#00BEFF",
                            "text-anchor": "middle",
                            "dominant-baseline": "middle",
                            "font-family": "Microsoft Yahei"
            			}).text(d.key);
            			d3.select(this).append("text").attr({
            				"x": 195,
            				"y": 35.4,
                            "font-family": "KARNIVOL",
                            "text-anchor": "middle",
                            "dominant-baseline": "middle"
            			}).each(function(){
            				d3.select(this).append("tspan").attr({
                        		"font-size": 20,
                				"fill": "#F0A000"
            				}).text(d.value)
                            .transition().duration(1000)
                            .tween("text", function(d, i){
                        		var inter = d3.interpolate(0, d.value);
                        		return function(t) {
                                    this.textContent = d3.round(inter(t), 0);
                                };
                            });
            			});
        			});
        	}
        },
        drawTime: function(d3Container, width, height){
            // 时间
            var dateText = d3Container.append("text")
                .attr({
                    "x": 25,
                    "y": height - 25,
                    "fill": d3.rgb(255, 255, 255).toString(),
                    "font-size": "16px",
                    "font-family": "KARNIVOL",
                    "font-weight": "bold"
                })
                .text(function () {
                    return zhnx.utils.getDateString(new Date()).split(" ")[0];
                });
            // 星期
            var dayText = d3Container.append("text")
            .attr({
                "x": 120,
                "y": height - 25,
                "fill": d3.rgb(255, 255, 255).toString(),
                "font-size": "16px",
                "font-family": "KARNIVOL",
                "font-weight": "bold"
            })
            .text(function () {
                return zhnx.utils.getDateString(new Date()).split(" ")[1];
            });
            var timeText = d3Container.append("text")
                .attr({
                    "x": 210,
                    "y": height - 22,
                    "fill": d3.rgb(255, 255, 255).toString(),
                    "font-size": "36px",
                    "font-family": "KARNIVOL"
                })
                .text(function () {
                    return zhnx.utils.getTimeString(new Date());
                });
            setInterval(function () {
                var d = new Date();
                dateText.text(function () {
                    return zhnx.utils.getDateString(d).split(" ")[0];
                });
                dayText.text(function () {
                    return zhnx.utils.getDateString(d).split(" ")[1];
                });
                timeText.text(function () {
                    return zhnx.utils.getTimeString(d);
                });
            }, 1000);
        },
        drawNav: function(d3Container, width, height){
        	var that = this;
        	this.cloudSvg = d3Container.append("svg").attr({
        		"x": "40px",
        		"y": "140px",
        		"width": 205,
        		"height": 445
        	});
        	this.cloudGroup = this.cloudSvg.append("g").attr({
        		"transform": "translate(0, 0)"
        	});
        	// 加载菜单
        	zhnx.utils.loadSvg("svg/index/cloud_nav.svg", function(importedNode){
            	zhnx.utils.loadSvg("svg/index/cloud_nav_focus.svg", function(importedNodeFocus){
            		that.cloudImportedNode = importedNode;
            		that.cloudImportedNodeFocus = importedNodeFocus;
            		that.drawCloudNav(that.navData);
            	});
        	});
        	
        	// 子菜单
        	this.menuSvg = d3Container.append("svg").attr({
        		"x": "238px",
        		"y": "95px",
        		"width": 192,
        		"height": 540
        	});
        	this.menuGroup = this.menuSvg.append("g").attr({
        		"transform": "translate(0, 0)"
        	});
        	// 加载子菜单
        	zhnx.utils.loadSvg("svg/index/menu_nav.svg", function(importedNode){
            	zhnx.utils.loadSvg("svg/index/menu_nav_focus.svg", function(importedNodeFocus){
            		that.navMenuData = that.navData[0].children;
            		that.menuImportedNode = importedNode;
            		that.menuImportedNodeFocus = importedNodeFocus;
            		that.drawMenuNav(that.navMenuData);
            	});
        	});
        },
        drawCloudNav: function(root){
        	var that = this;
        	// 菜单选中框
        	this.cloud_focus = this.cloudGroup.append("g").attr({
        		"transform": "translate(" + that.cloud_nav_focus_left + ", " + that.cloud_nav_focus_top + ")"
        	});
        	d3.select(that.cloud_focus.node().appendChild(that.cloudImportedNodeFocus.cloneNode(true))).attr({
        		"width": 144,
        		"height": 23
        	});
        	// 菜单
        	this.cloudGroup.selectAll(".cloud").data(root).enter().append("g")
        	.attr({
        		"transform": function(d, i){
        			return "translate(0, " + ((i * 31) + (i * that.cloud_nav_padding)) + ")";
        		}
        	}).each(function(d, i){
    			var navText = d3.select(this).append("text").attr({
    				"x": that.cloud_nav_width / 2,
    				"y": that.cloud_nav_height / 1.6,
    				"fill": "#AAA",
    				"font-size": 18,
                    "font-family": "黑体",
                    "text-anchor": "middle",
                    "dominant-baseline": "middle"
    			}).text(d.name);
    			var nav = d3.select(this.appendChild(that.cloudImportedNode.cloneNode(true))).attr({
    				"width": that.cloud_nav_width,
    				"height": that.cloud_nav_height
    			});
    			// 添加点击事件
    			if(d.available){
    				navText.attr({
    					"fill": "#F0A000"
    				});
    				nav.style({
        				"cursor": "pointer"
        			}).on('click', function(){
        				that.cloudNavClick(i);
                    	var command = {
                			level: 0,
                    		type: "click",
                    		context: "indexObj",
                    		contextType: "indObj",
                    		execString: "that.cloudNavClick(" + i + ")",
                    		execMode: "evalfunc"
                    	};
                    	zhnx.websocket.send(command);
        			});
    			}
        	});
        	// 连接线
        	this.cloudPaths();
        	// 滚动条
        	this.cloudScroll();
        },
        cloudPaths: function(){
        	var that = this;
        	this.cloud_path = this.cloudGroup.append("path").attr({
        		"d": function(){
        			var M = "M " +[that.cloud_nav_width, that.cloud_nav_height / 2].join(",");
        			var L = "L " +[that.cloud_nav_width + 45.5, that.cloud_nav_height / 2].join(",");
        			return M + L;
        		},
            	"stroke-width": 0.5,
            	"stroke": "#44B0E4",
            	"fill": "none"
        	});
        },
        cloudScroll: function(){
        	var that = this;
        	var drag = d3.behavior.drag()
    		.origin(function(){
    			var xPos = d3.select(this).attr("x"), yPos = d3.select(this).attr("y");
    			return {x:xPos, y:yPos};
    		}).on("drag", function(){
				var eventY = d3.event.y;
				that.cloudScrollInner(395, eventY);
            	var command = {
        			level: 999,
            		type: "click",
            		context: "indexObj",
            		contextType: "indObj",
            		execString: "that.cloudScrollInner(395," + eventY +");",
            		execMode: "evalfunc",
					mutexSameLevel: true,
					mutexNextLevel: true,
					ignoreHistory: true
            	};
            	zhnx.websocket.send(command);
    		});
        	this.cloudScrollBar = this.cloudSvg.append("rect").attr({
        		"x": 170,
        		"y": 0,
        		"rx": 4,
        		"ry": 4,
        		"width": 6,
        		"height": 50,
        		"fill": "#2994FF"
        	}).style({
        		"cursor":"pointer"
        	}).call(drag);
        },
        cloudScrollInner: function(scrollHei, eventY){
        	var that = this;
        	this.cloudScrollBarScale = d3.scale.linear().domain([0, scrollHei]).range([0, this.cloudGroup.node().getBBox().height - 435]);
			eventY = eventY < 0 ? 0 : eventY > scrollHei ? scrollHei : eventY;
			var offsetY = that.cloudScrollBarScale(eventY);
			offsetY = offsetY < 0 ? 0 : offsetY;
			that.cloudGroup.attr({
				"transform": "translate(0, -" + offsetY + ")"
			});
			// 滚动条
			var scrollScale = d3.scale.linear().domain([0, this.cloudGroup.node().getBBox().height - 435]).range([0, 395]);
			that.cloudScrollBar.attr({
				"y": scrollScale(offsetY)
			});
        },
        cloudNavClick: function(i){
        	var that = this, d = that.navData[i];
			// 选中块动画
			that.cloud_focus.transition().duration(300).ease("circle-out")
			.attr({
				"transform": function(){
					var y = that.cloud_nav_focus_top + i * (that.cloud_nav_height + that.cloud_nav_padding);
					return "translate(" + that.cloud_nav_focus_left +", " + y + ")";
				}
			});
			this.cloud_path.transition().duration(300).ease("circle-out")
			.attr({
				"d": function(){
        			var M = "M " +[that.cloud_nav_width, that.cloud_nav_height / 2 + (i * (that.cloud_nav_height + that.cloud_nav_padding))].join(",");
        			var L = "L " +[that.cloud_nav_width + 45.5, that.cloud_nav_height / 2 + (i * (that.cloud_nav_height + that.cloud_nav_padding))].join(",");
        			return M + L;
        		}
			});
			// 云指标数据
			that.drawCloudMetric(i);
			// 绘制子菜单
			that.navMenuData = d.children;
			that.drawMenuNav(that.navMenuData);
        },
        drawMenuNav: function(root){
        	var that = this;
        	// 清空节点
        	this.menuGroup.attr({
        		"transform": "translate(0,0)"
        	}).selectAll("*").remove();
        	if(this.menuScrollBar != undefined){
        		this.menuScrollBar.remove();
        	}
        	// 菜单选中框
        	that.menu_focus = this.menuGroup.append("g").attr({
        		"transform": "translate(" + (that.menu_nav_focus_left + 24) + ", " + that.menu_nav_focus_top + ")"
        	});
        	d3.select(that.menu_focus.node().appendChild(that.menuImportedNodeFocus.cloneNode(true))).attr({
        		"width": 120,
        		"height": 23
        	});
        	// 菜单
        	this.menuGroup.selectAll(".cloud").data(root).enter().append("g")
        	.attr({
        		"transform": function(d, i){
        			return "translate(24, " + ((i * that.menu_nav_height) + (i * that.menu_nav_padding)) + ")";
        		}
        	}).each(function(d, i){
    			// 菜单文字
    			var navText = d3.select(this).append("text").attr({
    				"x": that.menu_nav_width / 2,
    				"y": that.menu_nav_height / 1.6,
    				"fill": "#F0A000",
    				"font-size": 14,
                    "font-family": "黑体",
                    "text-anchor": "middle",
                    "dominant-baseline": "middle"
    			}).text(d.name);
    			var nav = d3.select(this.appendChild(that.menuImportedNode.cloneNode(true))).attr({
    				"width": that.menu_nav_width,
    				"height": that.menu_nav_height
    			});
    			if(d.available){
    				nav.style({
    					"cursor": "pointer"
    				}).on("click", function(){
    					that.menuNavClick(i);
                    	var command = {
                			level: 1,
                    		type: "click",
                    		context: "indexObj",
                    		contextType: "indObj",
                    		execString: "that.menuNavClick(" + i +");",
                    		execMode: "evalfunc"
                    	};
                    	zhnx.websocket.send(command);
    				});
    			}else{
    				navText.attr({
    					"fill": "#CCC"
    				});
    			}
        	});
        	// 连接线条
        	this.menuPaths(root);
        	// 滚动条
        	this.menuScroll();
        	// 加载页面
        	that.loadCenterRightPage(root[0].url, root[0].urlRight);
        },
        menuPaths: function(root){
        	var that = this;
        	this.menuGroup.selectAll(".cloudPath").data(root).enter().append("path")
        	.attr({
        		"d": function(d, i){
        			var M = "M 0," + (i * (that.menu_nav_height + that.menu_nav_padding) + that.menu_nav_height / 2);
        			var L = "L 24," + (i * (that.menu_nav_height + that.menu_nav_padding) + that.menu_nav_height / 2);
        			return M + L;
        		},
            	"stroke-width": 0.5,
            	"stroke": "#44B0E4",
            	"fill": "none"
        	});
        	var path = this.menuGroup.append("path")
        	.attr({
        		"d": function(d, i){
        			var M = "M 0.5," + (that.menu_nav_height / 2);
        			var L = "L 0.5," + ((root.length - 1) * (that.menu_nav_height + that.menu_nav_padding) + that.menu_nav_height / 2);
        			return M + L;
        		},
            	"stroke-width": 0.5,
            	"stroke": "#44B0E4",
            	"fill": "none"
        	});
			var totalLength = path.node().getTotalLength();
			if(totalLength < 535){
				path.attr({
	        		"d": function(d, i){
	        			var M = "M 0.5," + (that.menu_nav_height / 2);
	        			var L = "L 0.5," + (535 + that.menu_nav_height / 2);
	        			return M + L;
	        		}
				});
			}
        },
        menuScroll: function(){
        	var that = this;
        	var drag = d3.behavior.drag()
    		.origin(function(){
    			var xPos = d3.select(this).attr("x"), yPos = d3.select(this).attr("y");
    			return {x:xPos, y:yPos};
    		}).on("drag", function(){
    			var eventY = d3.event.y;
    			that.menuScrollInner(479, eventY);
            	var command = {
        			level: 999,
            		type: "click",
            		context: "indexObj",
            		contextType: "indObj",
            		execString: "that.menuScrollInner(479," + eventY +");",
            		execMode: "evalfunc",
					mutexSameLevel: true,
					mutexNextLevel: true,
					ignoreHistory: true
            	};
            	zhnx.websocket.send(command);
    		});
        	this.menuScrollBar = this.menuSvg.append("rect").attr({
        		"x": 160,
        		"y": 0,
        		"rx": 4,
        		"ry": 4,
        		"width": 6,
        		"height": 50,
        		"fill": "#2994FF"
        	}).style({
        		"cursor":"pointer"
        	}).call(drag);
        },
        menuScrollInner: function(scrollHei, eventY){
        	var that = this;
        	this.menuScrollBarScale = d3.scale.linear().domain([0, scrollHei]).range([0, this.menuGroup.node().getBBox().height - 535]);
			eventY = eventY < 0 ? 0 : eventY > scrollHei ? scrollHei : eventY;
			var offsetY = that.menuScrollBarScale(eventY);
			offsetY = offsetY < 0 ? 0 : offsetY;
			that.menuGroup.attr({
				"transform": "translate(0, -" + offsetY + ")"
			});
			// 滚动条
			var scrollScale = d3.scale.linear().domain([0, this.menuGroup.node().getBBox().height - 535]).range([0, 479]);
			this.menuScrollBar.attr({
				"y": scrollScale(offsetY)
			});
        },
        menuNavClick: function(i){
        	var that = this, d = that.navMenuData[i];
			// 选中块动画
			that.menu_focus.transition().duration(200).ease("circle-out")
			.attr({
				"transform": function(){
					var y = that.menu_nav_focus_top + i * (that.menu_nav_height + that.menu_nav_padding);
					return "translate(" + (that.menu_nav_focus_left + 24) +", " + y + ")";
				}
			});
			that.loadCenterRightPage(d.url, d.urlRight);
        },
        loadCenterRightPage: function(url, urlRight){
        	// 回收资源
        	zhnx.gc(function(){
        		// 加载布局
        		zhnx.getLayout(function(){
        			$("#center").empty().load(zhnx.resource.getUrl(url));
        			$("#right").empty().load(zhnx.resource.getUrl(urlRight));            	
        		});
        	});
        },
    	evalfunc: function(execString){
    		var that = this;
    		eval(execString);
    	},
    	moveBody: function(bodyLeft){
        	$("body").css({
        		"left": bodyLeft + "px",
        		"position": "relative"
        	});
    	},
    	loginOut: function(){
    		$.ajax({
    			url: zhnx.resource.getUrl("system/login/loginOut.do"),
    			type: "post",
    			success: function(d){
    				top.location.href = 'login.html';
    			}
    		});
    	}
    }
    zhnx.indexObject = new index();
});