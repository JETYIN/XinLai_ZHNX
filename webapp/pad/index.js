$(function () {
    function index_pad() {
    	var that = this;
    	this.initNavData(function(){
    		that.init();
    	});
    };
    index_pad.prototype = {
    	constructor: index_pad,
        navData: undefined,
        navMenuData: undefined,
        pop_btn: undefined,
        push_btn: undefined,
        cloud_nav_bg: undefined,
        cloud_nav_gp: undefined,
        menu_nav_gp: undefined,
    	initNavData: function(callback){
    		var that = this;
    		d3.json("../data/navData.json", function (error, root) {
            	that.navData = root;
            	that.navMenuData = that.navData[0];
            	callback();
            });
    	},
    	init: function(){
    		this.initLogo();
    		this.initContainer();
    		this.initBg();
    		this.initNav();
    		this.initMenu();
    		this.initPopBtn();
    	},
    	initLogo: function(){
    		zhnx.utils.loadSvg("svg/pad/pad_logo.svg", function(importedNode){
        		d3.select("#left .logo").node().appendChild(importedNode.cloneNode(true));
        	});
    	},
    	initContainer: function(){
    		this.menu_nav_gp = d3.select("#left").append("svg").attr({
    			"width": 350,
    			"height": 1304,
    			"viewBox": "0 0 350 1304"
    		}).style({
    			"padding-top": "430px"
    		}).append("svg").attr({
    			"width": 350,
    			"height": 1304
    		}).append("g").attr({
    			"transform": "translate(0, 0)"
    		});
    	},
    	initPopBtn: function(){
    		var that = this;
    		zhnx.utils.loadSvg("svg/pad/pad_nav_btn_pop.svg", function(importedNode){
    			var plane = d3.select("#left").node().appendChild(importedNode.cloneNode(true));
    			that.pop_btn = d3.select(plane).attr({
    				"width": 39,
    				"height": 296
    			}).style({
    				"position": "absolute",
    				"left": "-39px",
    				"top": "764px",
    				"cursor": "pointer"
    			}).on("click", function(){
    				that.popAnimation();
    			});
    			that.pop_btn.transition().duration(100).style({
    				"left": "0px"
    			});
    		});
    	},
    	popAnimation: function(){
    		var that = this;
    		that.pop_btn.transition().duration(100).style({
				"left": "-39px"
			});
			that.push_btn.transition().duration(100).delay(100).style({
				"left": "0px"
			});
			that.cloud_nav_bg.transition().duration(100).delay(100).style({
				"left": "0px"
			});
    	},
    	initPushBtn: function(){
    		var that = this;
    		zhnx.utils.loadSvg("svg/pad/pad_nav_btn_push.svg", function(importedNode){
    			var plane = d3.select("#left").node().appendChild(importedNode.cloneNode(true));
    			that.push_btn = d3.select(plane).attr({
    				"width": 39,
    				"height": 296
    			}).style({
    				"position": "absolute",
    				"left": "-39px",
    				"top": "764px",
    				"cursor": "pointer"
    			}).on("click", function(){
    				that.pushAnimation();
    			});
    		});
    	},
    	pushAnimation: function(){
    		var that = this;
    		that.push_btn.transition().duration(100).style({
				"left": "-39px"
			});
			that.pop_btn.transition().duration(100).delay(100).style({
				"left": "0px"
			});
			that.cloud_nav_bg.transition().duration(100).delay(100).style({
				"left": "-300px"
			});
		},
    	initLoginOutBtn: function(){
    		var that = this;
    		that.cloud_nav_gp.append("g").attr({
				"transform": function(d, i){
					return "translate(0, " + (1824 - 200) + ")";
				}
    		}).each(function(d, i){
    			d3.select(this).append("text").attr({
					"x": 150,
					"y": 100,
					"fill": "#FFF",
	        		"font-size": 36,
					"text-anchor": "middle",
					"dominant-baseline": "middle",
		            "font-family": "Microsoft Yahei"
				}).text("退出");
				d3.select(this).append("rect").attr({
					"x": 0,
					"y": 0,
					"width": 300,
					"height": 200,
					"fill": "rgba(0,0,0,0)"
				}).style({
					"cursor": "pointer"
				});
				d3.select(this).append("line").attr({
					"x1": 0,
					"y1": 0,
					"x2": 300,
					"y2": 0,
					"stroke": "#FFF",
					"stroke-width": 0.2
				});
    		}).on("click", function(){
    			var r = confirm("确认退出本系统！");
    			if(r == true){
    				that.loginOut();
                	var command = {
            			level: 0,
                		type: "click",
                		context: "indexObj",
                		contextType: "indObj",
                		execString: "that.loginOut()",
                		execMode: "evalfunc"
                	};
                	zhnx.websocket.send(command);
    			}
    		});
    	},
    	initNav: function(){
    		var that = this;
    		that.cloud_nav_bg = d3.select("#left").append("svg").attr({
    			"width": 300,
				"height": 1824
    		}).style({
				"position": "absolute",
				"left": "-300px",
				"top": "0px"
			});
    		// 背景rect填充
    		that.cloud_nav_bg.append("rect").attr({
    			"x": 0,
    			"y": 0,
    			"width": 300,
    			"height": 1824,
    			"fill": "rgb(17,26,42)",
    			"fill-opacity": 1
    		});
    		// 云菜单group
			that.cloud_nav_gp = that.cloud_nav_bg.append("g").attr({
				"width": 300,
				"height": 1442
			});
			that.cloud_nav_gp.selectAll(".cloud_nav").data(that.navData)
			.enter().append("g").attr({
				"transform": function(d, i){
					return "translate(0, " + ((1442 - that.navData.length * 110) / 2 + (i * 110)) + ")";
				}
			}).each(function(d, i){
				d3.select(this).append("text").attr({
					"class": "navText",
					"x": 150,
					"y": 50,
					"fill": function(){
						return i == 0 ? "#F0A000" : d.available ? "#FFF" : "#AAA"
					},
	        		"font-size": 36,
					"text-anchor": "middle",
					"dominant-baseline": "middle",
		            "font-family": "Microsoft Yahei"
				}).text(d.name);
				d3.select(this).append("rect").attr({
					"class": "navRect",
					"x": 0,
					"y": 0,
					"width": 300,
					"height": 110,
					"stroke": "#FEA600",
					"stroke-width": function(){
						return i == 0 ? 14 : 0;
					},
					"fill": "rgba(0,0,0,0)",
					"stroke-dasharray": "0 710 110"
				}).style({
					"cursor": function(){
						return d.available ? "pointer" : "auto";
					}
				});
				d3.select(this).append("line").attr({
					"class": "navLine",
					"x1": 0,
					"y1": 110,
					"x2": 300,
					"y2": 110,
					"stroke": "#FFF",
					"stroke-width": function(){
						return i == that.navData.length - 1 ? 0 : 0.2;
					}
				});
			}).on("click", function(d, i){
				if(d.available){
					that.cloud_nav_gp.selectAll(".navText").attr({
						"fill": function(t, n){
							return t.available ? "#FFF" : "#AAA"
						}
					});
					d3.select(this).select("text").attr({
						"fill": "#F0A000"
					});

					that.cloud_nav_gp.selectAll(".navRect").attr({
						"stroke-width": 0
					});
					d3.select(this).select("rect").attr({
						"stroke-width": 14
					});
					
					that.navMenuData = d;
					that.initMenu();
					that.initBg();
					// 同步命令
                	var command = {
            			level: 0,
                		type: "click",
                		context: "indexObj",
                		contextType: "indObj",
                		execString: "that.cloudNavClick(" + i + ")",
                		execMode: "evalfunc"
                	};
                	zhnx.websocket.send(command);
				}
			});
			that.initLoginOutBtn();
			// 初始化收回按钮
    		that.initPushBtn();
    	},
    	initMenu: function(){
    		var that = this;
			zhnx.utils.loadSvg("svg/pad/pad_nav_focus.svg", function(importedNode_menu_focus){
				that.menu_nav_gp.attr({
					"transform": "translate(0, 0)"
				}).selectAll("*").remove();
				var plane_menu_focus = that.menu_nav_gp.node().appendChild(importedNode_menu_focus.cloneNode(true));
				var nav_menu_focus = d3.select(plane_menu_focus).attr({
					"x": 40,
					"y": 2,
					"width": 241,
					"height": 94
				});
				zhnx.utils.loadSvg("svg/pad/pad_nav.svg", function(importedNode_menu){
					// 拖动层
					var dragRect = that.menu_nav_gp.append("rect").attr({
						"x": 0,
						"y": 0,
						"width": 0,
						"height": 0,
						"fill": "rgba(0,0,0,0)"
					});
					// 菜单
					that.menu_nav_gp.selectAll(".menu_nav").data(that.navMenuData.children).enter()
					.append("g").attr({
						"transform": function(d, i){
							return "translate(30, " + (i * 120) + ")";
						}
					}).each(function(d, i){
						d3.select(this).append("text").attr({
							"x": 120.5 + 10,
							"y": 50,
							"fill": function(){
								return i == 0 ? "#FFF" : d.available ? "#F0A000" : "#AAA"
							},
			        		"font-size": 28,
							"text-anchor": "middle",
							"dominant-baseline": "middle",
				            "font-family": "Microsoft Yahei"
						}).text(d.name);
						var plane_menu = this.appendChild(importedNode_menu.cloneNode(true));
						d3.select(plane_menu).attr({
							"x": "8px",
		    				"width": 241,
		    				"height": 94
						}).style({
							"cursor": d.available ? "pointer" : "auto"
						});
					}).on("click", function(d, i){
						if(d.available){
							that.menu_nav_gp.selectAll("text").attr({
    							"fill": function(t, n){
    								return t.available ? "#F0A000" : "rgb(128,128,128)"
    							}
    						});
    						d3.select(this).select("text").attr({
    							"fill": "#FFF"
    						});
    						nav_menu_focus.transition().duration(100).attr({
    							"y": i * 120 + 2
    						});
    						that.loadPage(d.url);
    						// 同步命令
                        	var command = {
                    			level: 1,
                        		type: "click",
                        		context: "indexObj",
                        		contextType: "indObj",
                        		execString: "that.menuNavClick(" + i +");",
                        		execMode: "evalfunc"
                        	};
                        	zhnx.websocket.send(command);
						}
					});
					// 拖动层
					dragRect.attr({
						"width": that.menu_nav_gp.node().getBBox().width,
						"height": that.menu_nav_gp.node().getBBox().height
					});
					// 拖动事件
					var isInitPosition = true, initY = 0, drag = d3.behavior.drag()
		    		.origin(function(){
		    			return {x:0, y:0};
		    		}).on("dragstart", function(){
		    			initY = d3.select(this).attr("transform").replace("translate(0, ", "");
		    			initY = initY.replace(")", "");
		    			initY = parseFloat(initY);
		    			if(initY != 0){
		    				isInitPosition = false;
		    			}else{
		    				isInitPosition = true;
		    			}
		    		}).on("drag", function(){
		    			that.menu_nav_gp.attr({
		    				"transform": function(){
		    					var y = d3.event.y;
		    					var gp_y = d3.select(this).attr("transform").replace("translate(0, ", "");
		    					gp_y = gp_y.replace(")", "");
		    					y = isInitPosition ? y : y + initY;
		    					y = y > 0 ? 0 : y < -(that.menu_nav_gp.node().getBBox().height - 1035) ? -(that.menu_nav_gp.node().getBBox().height - 1035) : y;
				            	var command = {
			            			level: 999,
			                		type: "click",
			                		context: "indexObj",
			                		contextType: "indObj",
			                		execString: "that.menuScrollInner(" + (that.menu_nav_gp.node().getBBox().height - 1035) + "," + -y +");",
			                		execMode: "evalfunc",
			    					mutexSameLevel: true,
			    					mutexNextLevel: true,
			    					ignoreHistory: true
			                	};
			                	zhnx.websocket.send(command);
		    					return "translate(0, " + y + ")";
		    				}
		    			});
		    		});
					// 如果内容超出则加上拖拽行为
					if(that.menu_nav_gp.node().getBBox().height > 1035){
						drag.call(that.menu_nav_gp);
					}
					// 加载页面
					that.loadPage(that.navMenuData.children[0].url);
				});
			});
    	},
    	loadPage: function(url){
    		var that = this;
    		// 替换成pad的url
    		zhnx.getLayout(function(){
    			url = url.replace("module", "pad");
    			$("#center").empty().load(zhnx.resource.getUrl(url));
    		});
    		that.pushAnimation();
    	},
    	initBg: function(){
    		var that = this;
    		zhnx.utils.loadSvg("svg/pad/pad_title.svg", function(importedNode){
    			d3.select("#top").selectAll("*").remove();
    			var plane = d3.select("#top").node().appendChild(importedNode.cloneNode(true));
    			d3.select(plane).attr({
    				"width": 1970,
    				"height": 81.7
    			}).style({
    				"padding-left": "33px",
    				"padding-top": "55.15px"
    			});
    			var box = d3.select(plane).select("#XMLID_73_").node().getBBox();
    			d3.select(plane).append("text").attr({
					"x": box.x + box.width / 2,
					"y": box.y + box.height / 1.8,
					"fill": "#F0A000",
	        		"font-size": 45,
					"text-anchor": "middle",
					"dominant-baseline": "middle",
		            "font-family": "Microsoft Yahei"
    			}).text(function(){
    				return "智慧宁夏-" + that.navMenuData.name;
    			})
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
    zhnx.indexPadObject = new index_pad();
});