
/**
 * 基础窗口 args = { parentElement : String or jQuery, width : integer, height :
 * integer }
 * 
 * @param args
 * @returns {*|jQuery|HTMLElement}
 */
zhnx.windows.base = function (args, type) {
    var selector = args.selector;
    var cfg = {
    	width: args.width,
    	height: args.height,
    	headHeight: 25,
    	toolbarWidth: 50,
    	toolbarHeight: 25,
    	collapsed: false,
    	zoomWidth: 50,
    	zoomheight: 50
    };
    cfg.contentHeight= cfg.height - cfg.headHeight;
    // 窗口
    var widget = $("<div class='widget'></div>")
    	.css({
    		"height": cfg.height+ "px",
    		"width": cfg.width + "px"
    	});
    // 窗口控制层
    var controller = $("<div/>").addClass("widget-controller")
        .css({
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: 2 * cfg.headHeight + "px",
            float: "left",
            "z-index":1
        });
    // 窗口标题栏
    var head = $("<div/>").addClass("widget-head")
	    .css({
	    	"height": cfg.headHeight
	    }).hide();
    // 标题
    var title = $("<span/>").addClass("widget-title")
    	.css({
    		"font-family": "黑体",
    		"font-size": "14px"
    	})
    	.html(args.title);
    // 收拢按钮
    var collapse = $("<span/>").addClass("widget-collapse-up");
    // 关闭按钮
    var remove = $("<span/>").addClass("widget-remove");
    controller.append(head.append(title).append(remove).append(collapse));
    // 窗口内容
    var content = $("<div/>").addClass("widget-content")
	    .css({
	        "height": cfg.contentHeight,
	        "width": "100%",
            "z-index": 0
	    });
    // 功能栏
    var toolbar = $("<div/>").addClass("widget-toolbar")
	    .css({
	    	"position": "absolute",
	    	"left": cfg.width - cfg.toolbarWidth + "px",
	    	"top": cfg.height - cfg.toolbarHeight - cfg.headHeight + "px",
	    	"width": cfg.toolbarWidth,
	    	"height": cfg.toolbarHeight
	    });
    // 缩放按钮
    var zoom = $("<span/>").addClass("widget-zoom-in")
	    .data("widgetInfo", {
			zoomIn: false
		}).hide();
    toolbar.append(zoom);
    // 组织窗口所有节点
    $(selector).append(widget.append(controller).append(content).append(toolbar));
    // 特殊窗口处理
    toolbar.remove();
    // 设置窗口id
    widget.attr("id", args.id);
    // 地图特殊处理
    if (type == "map" || type == 'weatherMap') {
    	controller.remove();
    	content.css({"height":widget.height()});
        widget.attr("id", type == 'weatherMap' ? args.id : "widgetMap");
        return widget;
    }
    // 收拢功能
    collapse.on("click", function (e) {
        if (content.is(":hidden")) {
            zhnx.windows.base.prototype.controller(controller, widget, head, content, toolbar, cfg);
            content.slideDown("normal");
            widget.animate({
            	"height": cfg.height
            });
            widget.css({
            	"border-width": 1
            });
            collapse.removeClass("widget-collapse-down").addClass("widget-collapse-up");
            cfg.collapsed = false;
        } else {
        	controller.unbind();
            content.slideUp("normal");
            widget.animate({
            	"height": cfg.headHeight
            });
            collapse.removeClass("widget-collapse-up").addClass("widget-collapse-down");
            cfg.collapsed = true;
        }
        // 保存窗口信息
        zhnx.utils.saveWidgetPosition(args.pagePath, args.id, widget.position().left, widget.position().top, cfg.collapsed);
        e.stopPropagation();
    });
    // 关闭功能
    remove.on("click", function (e) {
        widget.remove();
        e.stopPropagation();
    });
    // 窗口标题栏
    zhnx.windows.base.prototype.controller(controller, widget, head, content, toolbar, cfg);
    // 窗口放大功能
	zoom.on("click", function(e){
    	var widgetInfo = zoom.data("widgetInfo"), scale = 2;
    	if(widgetInfo.zoomIn){
    		// 缩小
	    	widget.animate({
	    		"left": widgetInfo.left + "px",
	    		"top": widgetInfo.top + "px",
	    		"width": cfg.width + "px",
	    		"height": cfg.height + "px"
        	}, 1000);
	        zhnx.windows.base.prototype.controller(controller, widget, head, content, toolbar, cfg);
	    	zhnx.windows.base.prototype.toolbar(toolbar, zoom);
    		// 修改svg大小
        	d3.select(widget.find("svg").get(0))
        	.transition().duration(1000)
        	.attr({
        		"width" : cfg.width,
        		"height" : cfg.contentHeight,
        		"viewBox": "0 0 " + cfg.width + " " + cfg.contentHeight,
	    		"preserveAspectRatio": "xMinYMin meet"
        	})
        	.each("end", function(){
        		zoom.hide();
            	$(selector).find(".widget").show();
            	$(selector).find("#nxMapImage").show();
        	});
    		zoom.removeClass("widget-zoom-out").addClass("widget-zoom-in");
    		widgetInfo.zoomIn = false;
    	}else{
    		var selectorHei = $(selector).height(), selectorWei = $(selector).width();
    		// 保存窗口位置
    		widgetInfo.left = widget.position().left;
    		widgetInfo.top = widget.position().top;
    		// 放大
	    	widget.animate({
	    		"left": (selectorWei - (scale * cfg.width)) / 2 + "px",
	    		"top": Math.max((selectorHei - (scale * cfg.height)) / 2, 0) + "px",
	    		"width": scale * cfg.width + "px",
	    		"height": scale * cfg.height + "px"
        	}, 1000);
        	controller.unbind();
        	toolbar.unbind();
    		// 修改svg大小
        	d3.select(widget.find("svg").get(0))
        	.transition().duration(1000)
        	.attr({
        		"width" : scale * cfg.width,
        		"height" : scale * cfg.contentHeight,
        		"viewBox": "0 0 " + cfg.width + " " + cfg.contentHeight,
	    		"preserveAspectRatio": "xMinYMin meet"
        	})
        	.each("end", function(){
        		zoom.show();
        	});
    		zoom.removeClass("widget-zoom-in").addClass("widget-zoom-out");
    		widgetInfo.zoomIn = true;
        	$(selector).find(".widget").hide();
        	$(selector).find("#nxMapImage").hide();
        	widget.show();
    	}
    	// 重新定位按钮位置
    	toolbar.css({
	    	"top": ((cfg.height * (widgetInfo.zoomIn ? scale : 1)) - cfg.toolbarWidth) + "px",
	    	"left": ((cfg.width * (widgetInfo.zoomIn ? scale : 1)) - cfg.toolbarHeight - cfg.headHeight) + "px"
    	});
    	// 重新绑定数据
    	zoom.data("widgetInfo", widgetInfo);
    });
	// 窗口工具栏
	zhnx.windows.base.prototype.toolbar(toolbar, zoom);
    // 窗口拖动功能
    widget.easyDrag({
        "handle": ".widget-head",
//        "container": $(selector),
        start: function () {
            $(this).css('opacity', 0.8);
        },
        stop: function () {
            $(this).css('opacity', 1);
            // 保存窗口信息
            var left = $(this).position().left, top = $(this).position().top;
            top = Math.max(-50, top);
            zhnx.utils.saveWidgetPosition(args.pagePath, args.id, left, top, cfg.collapsed);

        	var command = {
    			level: 999,
        		type: "drag",
        		target: args.id,
        		targetType: "winObj",
        		execString: "$('#" + args.id + "').css({'left':'" + left + "px',top:'" + top + "px','position':'absolute'})",
        		execMode: "direct",
        		mutexSameLevel: false,
        		mutexNextLevel: false,
        		ignoreHistory: true
        	};
        	zhnx.websocket.send(command);
        }
    });
    // 加载窗口位置
    zhnx.utils.loadWidgetPosition(args.pagePath, args.id, widget, head, collapse);
    return widget;
}
// 窗口缩放事件
zhnx.windows.base.prototype.toolbar = function(toolbar, zoom){
	toolbar.hoverDelay({
		hoverEvent: function () {
			zoom.show();
		},
        hoverDuring: 100,
        outEvent: function () {
        	zoom.hide();
        },
        outDuring: 100
	});
}
// 窗口收拢事件
zhnx.windows.base.prototype.controller = function(controller, widget, head, content, toolbar, cfg){
	// zhnx.js中配置是否可以拖动
	if(!zhnx.windowDraggable){
		return false;
	}
    controller.hoverDelay({
        hoverEvent: function () {
            if (!head.is(":animated") && !widget.is(":animated")) {
                head.slideDown("fast");
                if (!content.is(":hidden")) {
                    widget.animate({
                        	"height": cfg.height
                        }, {
                        	duration: "fast"
                        })
                        .css("border-width", 1);
                }
            }
        },
        hoverDuring: 500,
        outEvent: function () {
            if (!head.is(":animated") && !widget.is(":animated")) {
                if (!content.is(":hidden")) {
                    head.slideUp("fast");
                }
                widget.animate({
                		"height": cfg.contentHeight
                	},{
                		duration: "fast"
                	})
                	.css("border-width", 0);
            }
        },
        outDuring: 100
    });
}

zhnx.windows.major = function (args) {
    return zhnx.windows.base($.extend({width: 220, height: 280}, args), "major");
}
zhnx.windows.minor = function (args) {
    return zhnx.windows.base($.extend({width: 400, height: 400}, args), "minor");
}
zhnx.windows.map = function (args) {
    return zhnx.windows.base($.extend({width: 1200, height: 1030}, args), "map");
}
zhnx.windows.weatherMap = function (args) {
    return zhnx.windows.base($.extend({width: args.width || 736, height: args.height || 940}, args), "weatherMap");
}
zhnx.windows.custom = function (args, width, height) {
    return zhnx.windows.base($.extend({width: width, height: height}, args), "custom");
}