// 判断字符串字节数
zhnx.utils.countStringLen = function (str) {
    return str.replace(/[^\x00-\xFF]/g, '**').length;
}
// 转换成d3 dom节点
zhnx.utils.transformD3dom = function (dom) {
    if (dom instanceof jQuery) {
        return d3.select(dom.get(0));
    } else if(dom instanceof d3.selection){
    	return dom;
    } else {
        return d3.select(dom);
    }
}
// 获取dom节点的[width, height]
zhnx.utils.getDomWidHei = function (dom) {
    if (dom instanceof jQuery) {
        return {width:dom.width(), height:dom.height()};
    } else if(dom instanceof d3.selection){
    	return {width:dom.attr("width"), height:dom.attr("height")};
    } else {
        return {width:$(dom).width(), height:$(dom).height()};
    }
}
// 加载所有Css
zhnx.utils.loadAllCss = function () {
    window.onload = function () {
        var linkList = window.parent.document.getElementsByTagName("link");// 获取父窗口link标签对象列表
        var head = document.getElementsByTagName("head").item(0);// 外联样式
        for (var i = 0; i < linkList.length; i++) {
            var link = document.createElement("link");
            link.rel = 'stylesheet'
            link.type = 'text/css';
            link.href = linkList[i].href;
            head.appendChild(link);
        }
    }
};
// format number
zhnx.utils.formatNum = function (str, splitChar) {
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + splitChar + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; // 自动补小数点后两位
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + splitChar + newStr;
            } else {
                newStr = str.charAt(i) + newStr; // 逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return newStr;
}
// 加载窗口位置
zhnx.utils.loadWidgetPosition = function (pagePath, id, $widget, $head, $collapse) {
//    var widgetPosition = $.cookie("widgetPosition");
    var widgetPosition = zhnx.layout;
    if (widgetPosition == undefined || widgetPosition == null || widgetPosition == "") {
        return false;
    }
    widgetPosition = JSON.parse(widgetPosition);
    var widgets = widgetPosition[pagePath];
    if (widgets == undefined || widgets == null || widgets == "") {
        return false;
    }
    for (var i = 0; i < widgets.length; i++) {
        var widget = widgets[i];
        if (widget.id == id) {
        	// 位置信息
        	$widget.css({
                "left": widget.left + "px",
                "top": widget.top + "px",
                "position": "absolute"
            });
        	// 是否收起
        	if(widget.collapsed){
        		$head.show();
        		$collapse.trigger("click");
        	}
            break;
        }
    }
}
// 保存窗口位置
zhnx.utils.saveWidgetPosition = function (pagePath, id, left, top, collapsed) {
    // 大屏展示定位代码 大屏上拉伸两倍后定位高度要除2
//	top = top / 2;
    var widgetPosition = zhnx.layout, widget = {"id": id, "left": left, "top": top, "collapsed": collapsed};
    if (widgetPosition == undefined || widgetPosition == null || widgetPosition == "") {
        widgetPosition = "{}";
    }
    widgetPosition = JSON.parse(widgetPosition);
    var widgets = widgetPosition[pagePath];
    if (widgets == undefined || widgets == null || widgets == "") {
        widgets = widgetPosition[pagePath] = [];
    }

    var newWidgets = $.map(widgets, function (d) {
        return d.id == id ? null : d;
    });
    newWidgets.push(widget);
    widgetPosition[pagePath] = newWidgets;
    $.cookie('widgetPosition', JSON.stringify(widgetPosition), {expires: 365, path: "/"});
    $.ajax({
		type : "POST",
    	url:"common/layout/setLayout.do",
    	data  : {
    		"layoutInfo":JSON.stringify(widgetPosition)
    	},
		dataType : "json"
    });
    zhnx.layout = JSON.stringify(widgetPosition);
}

zhnx.utils.getDateString = function (d) {
    var dataString = "" + d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate();
    switch (parseInt(d.getDay())) {
        case 0:
            dataString += " 星期日";
            break;
        case 1:
            dataString += " 星期一";
            break;
        case 2:
            dataString += " 星期二";
            break;
        case 3:
            dataString += " 星期三";
            break;
        case 4:
            dataString += " 星期四";
            break;
        case 5:
            dataString += " 星期五";
            break;
        case 6:
            dataString += " 星期六";
            break;
    }
    return dataString;
}

zhnx.utils.getTimeString = function (d) {
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var dn = "AM";
    if (hours > 12) {
        dn = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes + " " + dn;
}
zhnx.utils.loadSvgByArea = function(url, callback){
	callback = callback || $.noop;
	d3.xml(zhnx.resource.getUrlByArea(url), function(error, xmlDocument){
		var importedNode = document.importNode(xmlDocument.documentElement, true);
		callback(importedNode);
	});
}
zhnx.utils.loadSvg = function(url, callback){
	callback = callback || $.noop;
	d3.xml(zhnx.resource.getUrl(url), function(error, xmlDocument){
		var importedNode = document.importNode(xmlDocument.documentElement, true);
		callback(importedNode);
	});
}
zhnx.utils.isPointInEllipse = function(x, y, cx, cy, a, b, θ){
	var fnx = ((((x - cx) * Math.cos(θ) + (y - cy) * Math.sin(θ))) * ((x - cx) * Math.cos(θ) + (y - cy) * Math.sin(θ))) / (a * a);
	var fny = ((((y - cy) * Math.cos(θ) + (x - cx) * Math.sin(θ))) * ((y - cy) * Math.cos(θ) + (x - cx) * Math.sin(θ))) / (b * b);
	return fnx + fny - 1;
}
zhnx.utils.loadWeatherIconSvg = function(iconName, iconWid, iconHei, parent, callback){
	callback = callback || $.noop;
	d3.xml(zhnx.resource.getUrl("svg/weather/icons/" + iconName + ".svg"), function(error, xmlDocument){
		var plane = document.importNode(xmlDocument.documentElement, true).cloneNode(true);
		d3.select(plane).attr({
			"width":iconWid,
			"height":iconHei
		});
		parent.appendChild(plane);
		// 不同的动画效果
		switch (iconName) {
		case "BigSnowfall":	//大暴雪
			var path = d3.select(plane).select("#XMLID_14_");
			path.attr({
				"fill-opacity": 1
			});
			var isAdd = true;
		    zhnx.utils.timer(function(){
		    	var opacity = parseFloat(path.attr("fill-opacity")) + (isAdd ? -0.1 : 0.1);
		    	isAdd = opacity < 0 || opacity > 1 ? !isAdd : isAdd;
		    	path.attr({
		    		"fill-opacity": opacity
				});
		    });
			break;
			
		case "CentreSnow":	//中雪
			var p1 = d3.select(plane).select("#XMLID_14_");
			var p2 = d3.select(plane).select("#XMLID_15_");
			p1.attr({
				"fill-opacity": 1
			});
			p2.attr({
				"fill-opacity": 1
			});
			var isAdd_1 = true,isAdd_2 = true;
		    zhnx.utils.timer(function(){
		    	var opacity_1 = parseFloat(p1.attr("fill-opacity")) + (isAdd_1 ? -0.06 : 0.06);
		    	var opacity_2 = parseFloat(p2.attr("fill-opacity")) + (isAdd_2 ? -0.04 : 0.04);
		    	isAdd_1 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_1 : isAdd_1;
		    	isAdd_2 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_2 : isAdd_2;
		    	p1.attr({
		    		"fill-opacity": opacity_1
				});
		    	p2.attr({
		    		"fill-opacity": opacity_2
				});
		    });
			break;
		
		case "clear":	//晴
			var g = d3.select(plane).select("#XMLID_13_"), rotate = 0, gBox = g.node().getBBox();
			var x = gBox.width / 2 + gBox.x, y = gBox.height / 2 + gBox.y;
			zhnx.utils.timer(function(){
				rotate++;
				g.attr({
					"transform": "rotate(" + rotate + ", " + x + ", " + y + ")"
				});
			});
			break;
			
		case "cloudy":	//多云
			var g1 = d3.select(plane).select("#XMLID_15_"), g2 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox(), g2Box = g2.node().getBBox();
			var maxG2X = g2Box.x - g1Box.width + g2Box.width + g1Box.x, minG2X = g1Box.x, curG2X = -maxG2X;
			zhnx.utils.timer(function(){
				curG2X = curG2X + 0.2;
				curG2X = curG2X > minG2X ? -maxG2X : curG2X;
				g2.attr({
					"transform": "translate(" + curG2X + ", 0)"
				});
			});
			break;
			
		case "Downpour":	//特大暴雨
			var g1 = d3.select(plane).select("#XMLID_60_"), g2 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox();
			var maxG2Y = g2Box.y - g1Box.height + g2Box.height + g1Box.y, minG2Y = g1Box.y, curG2Y = maxG2Y;
			zhnx.utils.timer(function(){
				curG2Y = curG2Y+2
				curG2Y= curG2Y > minG2Y ? -maxG2Y/3 : curG2Y;
				g2.attr({
					"transform": "translate(" + 0 + ", " + curG2Y + ")"
				});
			});
			break;
			
		case "dust": //浮尘
			var g1 = d3.select(plane).select("#XMLID_36_"),g2 = d3.select(plane).select("#XMLID_23_"),
				g3 = d3.select(plane).select("#XMLID_35_"),g4 = d3.select(plane).select("#XMLID_34_"),
				g5 = d3.select(plane).select("#XMLID_30_"),g6 = d3.select(plane).select("#XMLID_31_"),
				g7 = d3.select(plane).select("#XMLID_32_"),g8 = d3.select(plane).select("#XMLID_28_"),
				g9 = d3.select(plane).select("#XMLID_27_"),g10 = d3.select(plane).select("#XMLID_26_");
			
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox(),
			 	g3Box = g3.node().getBBox(),g4Box = g4.node().getBBox(),
			 	g5Box = g5.node().getBBox(),g6Box = g6.node().getBBox(),
			 	g7Box = g7.node().getBBox(),g8Box = g8.node().getBBox(),
			 	g9Box = g9.node().getBBox(),g10Box = g10.node().getBBox();
			
			var g1Y = g1Box.y,minY1 = g1Box.y,g3Y = g3Box.y,minY3 = g3Box.y,
				g4Y = g4Box.y,minY4 = g4Box.y,g5Y = g5Box.y,minY5 = g5Box.y,
				g6Y = g6Box.y,minY6 = g6Box.y,g7Y = g7Box.y,minY7 = g7Box.y,
				g8Y = g8Box.y,minY8 = g8Box.y,g9Y = g9Box.y,minY9 = g9Box.y,
				g10Y = g10Box.y,minY10 = g10Box.y;
			zhnx.utils.timer(function(){
				if(g1Y <= -g2Box.height){ g1Y = minY1/2}else{ g1Y = g1Y-2};	
				if(g3Y <= -g2Box.height){ g3Y = minY1/2}else{ g3Y = g3Y-2};
				if(g4Y <= -g2Box.height){ g4Y = minY1/2}else{ g4Y = g4Y-2};
				
				if(g5Y <= -g2Box.height){ g5Y = minY7/2}else{ g5Y = g5Y-2};	
				if(g6Y <= -g2Box.height){ g6Y = minY7/2}else{ g6Y = g6Y-2};
				if(g7Y <= -g2Box.height){ g7Y = minY7/2}else{ g7Y = g7Y-2};
				
				if(g8Y <= -g2Box.height){ g8Y = minY8/2}else{ g8Y = g8Y-2};	
				if(g9Y <= -g2Box.height){ g9Y = minY8/2}else{ g9Y = g9Y-2};
				if(g10Y <= -g2Box.height){ g10Y = minY8/2}else{ g10Y = g10Y-2};
				
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
				g3.attr({"transform": "translate(" + 0 + ", " + g3Y + ")"});
				g4.attr({"transform": "translate(" + 0 + ", " + g4Y + ")"});
				
				g5.attr({"transform": "translate(" + 0 + ", " + g5Y + ")"});
				g6.attr({"transform": "translate(" + 0 + ", " + g6Y + ")"});
				g7.attr({"transform": "translate(" + 0 + ", " + g7Y + ")"});
				
				g8.attr({"transform": "translate(" + 0 + ", " + g8Y + ")"});
				g9.attr({"transform": "translate(" + 0 + ", " + g9Y + ")"});
				g10.attr({"transform": "translate(" + 0 + ", " + g10Y + ")"});
			})
			break;
			
		case "fall":	//暴雨
			var g1 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1){ g1Y = -minY1/5}else{ g1Y = g1Y+2.5};	
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
			})
			break;
			
		case "fog":	//大雾
			var g1 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox();
			var g1MaxX = g1Box.x+g1Box.width,g1X = g1Box.x;
			zhnx.utils.timer(function(){	
				if(g1X >= g1MaxX){g1X = g1Box.x}else{g1X = g1X+2}
				g1.attr({"transform": "translate(" + g1X + ", " + 0 + ")"})
			})
			break;
			
		case "hail": 	//冰雹
			var g1 = d3.select(plane).select("#XMLID_27_"),g2 = d3.select(plane).select("#XMLID_25_");
			var g3 = d3.select(plane).select("#XMLID_22_"),g4 = d3.select(plane).select("#XMLID_24_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox(),g3Box = g3.node().getBBox(),g4Box = g4.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y,g2Y = g2Box.y,minY2 = g2Box.y,g3Y = g3Box.y,minY3 = g3Box.y,g4Y = g4Box.y,minY4 = g4Box.y;
			
			zhnx.utils.timer(function(){
				if(g1Y >= minY1){ g1Y = -minY1/5}else{ g1Y = g1Y+2}	//左侧雨点
				if(g2Y >= minY2){ g2Y = -minY2/5}else{ g2Y = g2Y+3}	//右侧雨点
				if(g3Y >= minY3){ g3Y = -minY3/5}else{ g3Y = g1Y+2}	//中间
				if(g4Y >= minY4){ g4Y = -minY4/5}else{ g4Y = g2Y+2}	//中间
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
				g2.attr({"transform": "translate(" + 0 + ", " + g2Y + ")"});
				g3.attr({"transform": "translate(" + 0 + ", " + g3Y + ")"});
				g4.attr({"transform": "translate(" + 0 + ", " + g4Y + ")"});
			})
			break;
			
		case "Lightrain":		//小雨
			var g1 = d3.select(plane).select("#XMLID_14_"),g1Box = g1.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= (minY1/2)){ g1Y = -minY1/5}else{ g1Y = g1Y+2}	
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
			})
			break;
			
		case "night":		//夜间
			var g1 = d3.select(plane).select("#XMLID_39_"),g2 = d3.select(plane).select("#XMLID_43_");
			var g3 = d3.select(plane).select("#XMLID_33_"),g4 = d3.select(plane).select("#XMLID_32_");
			var opacityNum1 = 0,opacityNum2 = 0,opacityNum3 = 0,opacityNum4 = 0;
			g1.attr("opacity",0);
			zhnx.utils.timer(function(){
				if(opacityNum1 >= 1){ opacityNum1 = 0}else{ opacityNum1 = opacityNum1+0.05}	
				if(opacityNum2 >= 1){ opacityNum2 = 0}else{ opacityNum2 = opacityNum2+0.07}	
				if(opacityNum3 >= 1){ opacityNum3 = 0}else{ opacityNum3 = opacityNum3+0.09}	
				if(opacityNum4 >= 1){ opacityNum4 = 0}else{ opacityNum4 = opacityNum4+0.11}	
				g1.attr({"opacity": opacityNum1});
				g2.attr({"opacity": opacityNum2});
				g3.attr({"opacity": opacityNum3});
				g4.attr({"opacity": opacityNum4});
			})
			break;
			
		
		case "NightCloudy":		//夜间多云(位置调整)
			//获取两片云id
			var g1=d3.select(plane).select("#XMLID_16_"),g2 = d3.select(plane).select("#XMLID_17_");
			//getBbox返回元素的边界框描述：对象
			var g1Box = g1.node().getBBox(), g2Box = g2.node().getBBox();
			var maxG2X = g2Box.x - g1Box.width + g2Box.width + g1Box.x, minG2X = g1Box.x, curG2X = -maxG2X;
			//开始一个定制的动画计时
			zhnx.utils.timer(function(){
				curG2X = curG2X + 0.2;
				curG2X = curG2X > minG2X ? -maxG2X : curG2X;
				g2.attr({
					"transform": "translate(" + curG2X + ", 0)"
				});
			});
			break;
			
		case "NightFoggy":		//夜间有雾
			var g1 = d3.select(plane).select("#XMLID_41_"),g2 = d3.select(plane).select("#XMLID_40_");
			var g3 = d3.select(plane).select("#XMLID_39_"),g4 = d3.select(plane).select("#XMLID_33_");
			var g5 = d3.select(plane).select("#XMLID_32_"),g6 = d3.select(plane).select("#XMLID_45_");
			var opacityNum1 = 0,opacityNum2 = 0,opacityNum3 = 0,opacityNum4 = 0;
			var g5Box = g5.node().getBBox(),g6Box = g6.node().getBBox()
			var g5MaxX = g5Box.x+g5Box.width,g5X = g5Box.x,g6MaxX = g6Box.x+g6Box.width,g6X = g6Box.x;
			g1.attr("opacity",0);
			zhnx.utils.timer(function(){
				if(opacityNum1 >= 1){ opacityNum1 = 0}else{ opacityNum1 = opacityNum1+0.05}	
				if(opacityNum2 >= 1){ opacityNum2 = 0}else{ opacityNum2 = opacityNum2+0.07}	
				if(opacityNum3 >= 1){ opacityNum3 = 0}else{ opacityNum3 = opacityNum3+0.09}	
				if(opacityNum4 >= 1){ opacityNum4 = 0}else{ opacityNum4 = opacityNum4+0.11}	
				if(g5X >= g5MaxX){g5X = g5Box.x}else{g5X = g5X+2}
				if(g6X >= g6MaxX){g6X = g6Box.x}else{g6X = g6X+2}
				g1.attr({"opacity": opacityNum1});
				g2.attr({"opacity": opacityNum2});
				g3.attr({"opacity": opacityNum3});
				g4.attr({"opacity": opacityNum4});
				g5.attr({"transform": "translate(" + g5X + ", " + 0 + ")"})
				g6.attr({"transform": "translate(" + g6X + ", " + 0 + ")"})
			})
			break;
			
		case "NightLightrain":		//夜间小雨
			var g1 = d3.select(plane).select("#XMLID_13_"),g2 = d3.select(plane).select("#XMLID_17_");
			var g1Box = g1.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/5}else{ g1Y = g1Y+2}	
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
			})
			break;
			
		case "NightSleet":		//夜间雨夹雪
			var g1 = d3.select(plane).select("#XMLID_23_"),g2 = d3.select(plane).select("#XMLID_22_"),g3 = d3.select(plane).select("#XMLID_12_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox(),g3Box = g3.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y,g2Y = g2Box.y,minY2 = g2Box.y
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/6}else{ g1Y = g1Y+2}	
				if(g2Y >= minY2/2){ g2Y = -minY2/6}else{ g2Y = g2Y+2}
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
				g2.attr({"transform": "translate(" + 0 + ", " + g2Y + ")"});
			})
			g3.attr({"fill-opacity": 1});
			var isAdd = true;
		    zhnx.utils.timer(function(){
		    	var opacity = parseFloat(g3.attr("fill-opacity")) + (isAdd ? -0.1 : 0.1);
		    	isAdd = opacity < 0 || opacity > 1 ? !isAdd : isAdd;
		    	g3.attr({"fill-opacity": opacity});
		    });
			break;
			
		case "overcast":		//晴转多云
			var g = d3.select(plane).select("#XMLID_14_"), gBox = g.node().getBBox();
			var gX = gBox.x,maxX = 0,minX = -gBox.x;
			zhnx.utils.timer(function(){
				if(gX>=maxX){
					g.attr({"opacity":0});
					gX = minX/6
				}else{gX = gX+0.01}
				g.attr({
					"opacity": 1,
					"transform": "translate(" + gX + ", "+ 0 +")"
				});
			});
			break;
			
		case "rain":		//中雨
			var g1 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/5}else{ g1Y = g1Y+2}	
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
			})
			break;
			
		case "sand":		//扬沙
			var g1 = d3.select(plane).select("#XMLID_24_"),g2 = d3.select(plane).select("#XMLID_25_"),
				g3 = d3.select(plane).select("#XMLID_26_"),g4 = d3.select(plane).select("#XMLID_27_"),
				g5 = d3.select(plane).select("#XMLID_28_"),g6 = d3.select(plane).select("#XMLID_29_"),
				g7 = d3.select(plane).select("#XMLID_30_"),g8 = d3.select(plane).select("#XMLID_31_"),
				g9 = d3.select(plane).select("#XMLID_32_");
			var opacityNum1 = 0,opacityNum2 = 0,opacityNum3 = 0,opacityNum4 = 0,opacityNum5 = 0,
				opacityNum6 = 0,opacityNum7 = 0,opacityNum8 = 0,opacityNum9 = 0;
			g1.attr("opacity",0);
			zhnx.utils.timer(function(){
				if(opacityNum1 >= 1){ opacityNum1 = 0}else{ opacityNum1 = opacityNum1+0.05}	
				if(opacityNum2 >= 1){ opacityNum2 = 0}else{ opacityNum2 = opacityNum2+0.07}	
				if(opacityNum3 >= 1){ opacityNum3 = 0}else{ opacityNum3 = opacityNum3+0.09}	
				if(opacityNum4 >= 1){ opacityNum4 = 0}else{ opacityNum4 = opacityNum4+0.11}	
				if(opacityNum5 >= 1){ opacityNum5 = 0}else{ opacityNum5 = opacityNum5+0.12}
				if(opacityNum6 >= 1){ opacityNum6 = 0}else{ opacityNum6 = opacityNum6+0.13}
				if(opacityNum7 >= 1){ opacityNum7 = 0}else{ opacityNum7 = opacityNum7+0.15}
				if(opacityNum8 >= 1){ opacityNum8 = 0}else{ opacityNum8 = opacityNum8+0.16}
				if(opacityNum9 >= 1){ opacityNum9 = 0}else{ opacityNum9 = opacityNum9+0.18}
				g1.attr({"opacity": opacityNum1});
				g2.attr({"opacity": opacityNum2});
				g3.attr({"opacity": opacityNum3});
				g4.attr({"opacity": opacityNum4});
				g5.attr({"opacity": opacityNum5});
				g6.attr({"opacity": opacityNum6});
				g7.attr({"opacity": opacityNum7});
				g8.attr({"opacity": opacityNum8});
				g9.attr({"opacity": opacityNum9});
			})
			break;
			
		case "scouther":		//小雪
			var g = d3.select(plane).select("#XMLID_13_"), rotate = 0, gBox = g.node().getBBox();
			var x = gBox.width / 2 + gBox.x, y = gBox.height / 2 + gBox.y;
			zhnx.utils.timer(function(){
				rotate++;
				g.attr({
					"transform": "rotate(" + rotate + ", " + x + ", " + y + ")"
				});
			});
			break;
			
		case "shower":		//阵雨
			var g1 = d3.select(plane).select("#XMLID_67_");
			var g1Box = g1.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/6}else{ g1Y = g1Y+2}	
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
			})
			break;
			
		case "sleet":		//雨夹雪
			var g1 = d3.select(plane).select("#XMLID_23_"),g2 = d3.select(plane).select("#XMLID_24_");
			var g3 = d3.select(plane).select("#XMLID_27_"),g4 = d3.select(plane).select("#XMLID_26_"),g5 = d3.select(plane).select("#XMLID_25_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox(),g3Box = g3.node().getBBox();
			var g4Box = g4.node().getBBox(),g5Box = g5.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y,g2Y = g2Box.y,minY2 = g2Box.y;
			var g3Y = g3Box.y,minY3 = g3Box.y,g4Y = g4Box.y,minY4 = g4Box.y,g5Y = g5Box.y,minY5 = g5Box.y;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/6}else{ g1Y = g1Y+2}	
				if(g2Y >= minY2/2){ g2Y = -minY2/6}else{ g2Y = g2Y+2}
				if(g3Y >= minY3/2){ g3Y = -minY3/6}else{ g3Y = g3Y+1.5}
				if(g4Y >= minY4/2){ g4Y = -minY4/6}else{ g4Y = g4Y+1.6}
				if(g5Y >= minY5/2){ g5Y = -minY5/6}else{ g5Y = g5Y+1.7}
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
				g2.attr({"transform": "translate(" + 0 + ", " + g2Y + ")"});
				g3.attr({"transform": "translate(" + 0 + ", " + g3Y + ")"});
				g4.attr({"transform": "translate(" + 0 + ", " + g4Y + ")"});
				g5.attr({"transform": "translate(" + 0 + ", " + g5Y + ")"});
			})
			break;
			
		case "snow":		//大雪
			var p1 = d3.select(plane).select("#XMLID_14_");
			var p2 = d3.select(plane).select("#XMLID_15_");
			var p3 = d3.select(plane).select("#XMLID_16_");
			p1.attr({ "fill-opacity": 1});
			p2.attr({ "fill-opacity": 1});
			p3.attr({ "fill-opacity": 1});
			var isAdd_1 = true,isAdd_2 = true,isAdd_3 = true;
		    zhnx.utils.timer(function(){
		    	var opacity_1 = parseFloat(p1.attr("fill-opacity")) + (isAdd_1 ? -0.06 : 0.06);
		    	var opacity_2 = parseFloat(p2.attr("fill-opacity")) + (isAdd_2 ? -0.07 : 0.07);
		    	var opacity_3 = parseFloat(p3.attr("fill-opacity")) + (isAdd_3 ? -0.05 : 0.05);
		    	isAdd_1 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_1 : isAdd_1;
		    	isAdd_2 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_2 : isAdd_2;
		    	isAdd_3 = opacity_3 < 0 || opacity_3 > 1 ? !isAdd_3 : isAdd_3;
		    	p1.attr({ "fill-opacity": opacity_1});
		    	p2.attr({ "fill-opacity": opacity_2});
		    	p3.attr({ "fill-opacity": opacity_3});
		    });
			break;
			
		case "snowfall":		//暴雪
			var p1 = d3.select(plane).select("#XMLID_14_");
			var p2 = d3.select(plane).select("#XMLID_15_");
			var p3 = d3.select(plane).select("#XMLID_16_");
			var p4 = d3.select(plane).select("#XMLID_17_");
			p1.attr({ "fill-opacity": 1});
			p2.attr({ "fill-opacity": 1});
			p3.attr({ "fill-opacity": 1});
			p4.attr({ "fill-opacity": 1});
			var isAdd_1 = true,isAdd_2 = true,isAdd_3 = true,isAdd_4 = true;
		    zhnx.utils.timer(function(){
		    	var opacity_1 = parseFloat(p1.attr("fill-opacity")) + (isAdd_1 ? -0.06 : 0.06);
		    	var opacity_2 = parseFloat(p2.attr("fill-opacity")) + (isAdd_2 ? -0.07 : 0.07);
		    	var opacity_3 = parseFloat(p3.attr("fill-opacity")) + (isAdd_3 ? -0.08 : 0.08);
		    	var opacity_4 = parseFloat(p4.attr("fill-opacity")) + (isAdd_4 ? -0.09 : 0.09);
		    	isAdd_1 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_1 : isAdd_1;
		    	isAdd_2 = opacity_2 < 0 || opacity_2 > 1 ? !isAdd_2 : isAdd_2;
		    	isAdd_3 = opacity_3 < 0 || opacity_3 > 1 ? !isAdd_3 : isAdd_3;
		    	isAdd_4 = opacity_4 < 0 || opacity_4 > 1 ? !isAdd_4 : isAdd_4;
		    	p1.attr({ "fill-opacity": opacity_1});
		    	p2.attr({ "fill-opacity": opacity_2});
		    	p3.attr({ "fill-opacity": opacity_3});
		    	p4.attr({ "fill-opacity": opacity_4});
		    });
			break;
			
		case "SnowWiththewind":		//大雪伴风
			var g1 = d3.select(plane).select("#XMLID_32_"),g2 = d3.select(plane).select("#XMLID_23_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox();
			var g1X = g1Box.x,minX1 = 0,maxX1 = g1Box.width;
			g2.attr({ "fill-opacity": 1});
			var isAdd = true;
			zhnx.utils.timer(function(){
				if(g1X <= minX1){ g1X = maxX1}else{ g1X = g1X-0.5};	
				var opacity = parseFloat(g2.attr("fill-opacity")) + (isAdd ? -0.07 : 0.07);
				isAdd = opacity < 0 || opacity > 1 ? !isAdd : isAdd;
				g1.attr({"transform": "translate(" + g1X + ", " + 0 + ")"});
				g2.attr({ "fill-opacity": opacity});
			})
			break;
			
			
			//
		case "CentreSnow":	//中雪
			var p1 = d3.select(plane).select("#XMLID_14_");
			var p2 = d3.select(plane).select("#XMLID_15_");
			p1.attr({
				"fill-opacity": 1
			});
			p2.attr({
				"fill-opacity": 1
			});
			var isAdd_1 = true,isAdd_2 = true;
		    zhnx.utils.timer(function(){
		    	var opacity_1 = parseFloat(p1.attr("fill-opacity")) + (isAdd_1 ? -0.06 : 0.06);
		    	var opacity_2 = parseFloat(p2.attr("fill-opacity")) + (isAdd_2 ? -0.04 : 0.04);
		    	isAdd_1 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_1 : isAdd_1;
		    	isAdd_2 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_2 : isAdd_2;
		    	p1.attr({
		    		"fill-opacity": opacity_1
				});
		    	p2.attr({
		    		"fill-opacity": opacity_2
				});
		    });
			break;
		//
			
			//
	case "storm":		//沙尘暴
		var g0=d3.select(plane).select("#XMLID_31_");
		var rotate=-20;
		var gBox=g0.node().getBBox();
		var x = gBox.width / 2 + gBox.x, y = gBox.height / 2 + gBox.y;
		//left
		var g1=d3.select(plane).select("#XMLID_30_");
		var g2=d3.select(plane).select("#XMLID_29_");
		var g3=d3.select(plane).select("#XMLID_28_");
		var g4=d3.select(plane).select("#XMLID_27_");
		//right
		var g5=d3.select(plane).select("#XMLID_26_");
		var g6=d3.select(plane).select("#XMLID_25_");
		var g7=d3.select(plane).select("#XMLID_24_");
		var g8=d3.select(plane).select("#XMLID_23_");
		g1.attr({
			"fill-opacity": 1
		});
		g2.attr({
			"fill-opacity": 1
		});
		
		g3.attr({
			"fill-opacity": 1
		});
		
		g4.attr({
			"fill-opacity": 1
		});
		
		g5.attr({
			"fill-opacity": 1
		});
		
		g6.attr({
			"fill-opacity": 1
		});
		
		g7.attr({
			"fill-opacity": 1
		});
		
		g8.attr({
			"fill-opacity": 1
		});
		var isAdd_1 = true,isAdd_2 = true;
		  zhnx.utils.timer(function(){
		    	var opacity_1 = parseFloat(g1.attr("fill-opacity")) + (isAdd_1 ? -0.06 : 0.06);
		    	var opacity_2 = parseFloat(g2.attr("fill-opacity")) + (isAdd_2 ? -0.04 : 0.04);
		    	isAdd_1 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_1 : isAdd_1;
		    	isAdd_2 = opacity_1 < 0 || opacity_1 > 1 ? !isAdd_2 : isAdd_2;
		    	g1.attr({
		    		"fill-opacity": opacity_1
				});
		    	g2.attr({
		    		"fill-opacity": opacity_2
				});
		    	g3.attr({
		    		"fill-opacity": opacity_1
				});
		    	g4.attr({
		    		"fill-opacity": opacity_2
				});
		    	g5.attr({
		    		"fill-opacity": opacity_1
				});
		    	g6.attr({
		    		"fill-opacity": opacity_2
				});
		    	g7.attr({
		    		"fill-opacity": opacity_1
				});
		    	g8.attr({
		    		"fill-opacity": opacity_2
				});
		    	if(rotate<20){
					rotate++;
				}else{
					rotate=-20;
				}
				g0.attr({
					"transform": "rotate("+rotate+","+x+","+y+")"
				});
		    });
		
			break;
			
		case "thundershower":		//雷阵雨
			var g1 = d3.select(plane).select("#XMLID_15_"),g2 = d3.select(plane).select("#XMLID_14_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox();
			var g1Y = g1Box.y,minY1 = g1Box.y;
			g2.attr({ "fill-opacity": 1});
			var isAdd = true;
			zhnx.utils.timer(function(){
				if(g1Y >= minY1/2){ g1Y = -minY1/6}else{ g1Y = g1Y+2.5}
				var opacity = parseFloat(g2.attr("fill-opacity")) + (isAdd ? -0.1 : 0.1);
				isAdd = opacity < 0 || opacity > 1 ? !isAdd : isAdd;
				g1.attr({"transform": "translate(" + 0 + ", " + g1Y + ")"});
				g2.attr({ "fill-opacity": opacity});
			})
			break;
			
		case "ThundershowerWiththewind":		//雷阵雨伴风
			var g1 = d3.select(plane).select("#XMLID_27_"),g2 = d3.select(plane).select("#XMLID_26_");
			var g3 = d3.select(plane).select("#XMLID_25_"),g4 = d3.select(plane).select("#XMLID_24_");
			var g1Box = g1.node().getBBox(),g2Box = g2.node().getBBox();
			var g3Box = g3.node().getBBox(),g4Box = g4.node().getBBox();
			var g2Y = g2Box.y,minY2 = g2Box.y,g3Y = g3Box.y,minY3 = g3Box.y,g4Y = g4Box.y,minY4 = g4Box.y;
			g1.attr({ "fill-opacity": 1});
			var isAdd = true;
			zhnx.utils.timer(function(){
				if(g2Y >= minY2/2){ g2Y = -minY2/6}else{ g2Y = g2Y+2.5}
				if(g3Y >= minY3/2){ g3Y = -minY3/6}else{ g3Y = g3Y+2.5}
				if(g4Y >= minY4/2){ g4Y = -minY4/6}else{ g4Y = g4Y+2.5}
				var opacity = parseFloat(g1.attr("fill-opacity")) + (isAdd ? -0.1 : 0.1);
				isAdd = opacity < 0 || opacity > 1 ? !isAdd : isAdd;
				g2.attr({"transform": "translate(" + 0 + ", " + g2Y + ")"});
				g3.attr({"transform": "translate(" + 0 + ", " + g3Y + ")"});
				g4.attr({"transform": "translate(" + 0 + ", " + g4Y + ")"});
				g1.attr({ "fill-opacity": opacity});
			})
			break;
			
			
			
		case "tornado":		//龙卷风
			var g=d3.select(plane).select("#XMLID_22_");
			//定义旋转
			var rotate=-20;
			var gBox=g.node().getBBox();
			var x = gBox.width / 2 + gBox.x, y = gBox.height / 2 + gBox.y;
			zhnx.utils.timer(function(){
				if(rotate<20){
					rotate++;
				}else{
					rotate=-20;
				}
				g.attr({
					"transform": "rotate("+rotate+","+x+","+y+")"
				});
			});
			
			break;
			
		case "windiness":		//有风-左右平移
			var g1 = d3.select(plane).select("#XMLID_24_");
			var g1Box = g1.node().getBBox();
			var g1MaxX = g1Box.x+g1Box.width,g1X = g1Box.x;
			zhnx.utils.timer(function(){	
				if(g1X >= g1MaxX){g1X = g1Box.x}else{g1X = g1X+2}
				g1.attr({"transform": "translate(" + g1X + ", " + 0 + ")","fill-opacity":0.8});
			
			})
			break;
		}
		// 回调函数
		callback(plane);
	});
}

// 封装d3.timer
zhnx.utils.timer = function(callback){
	callback = callback || $.noop;
	var timer = new Date().Format("yyyy_MM_dd_hh_mm_ss_S");
	zhnx.timer[timer] = false;
	d3.timer(function(){
		var isoff = callback();
		if(isoff){
			return true;
		}
		if(zhnx.timer[timer] == undefined || zhnx.timer[timer] == null){
			return true;
		}
	});
}
// 新增date.format
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 鼠标hover事件及延时
$.fn.hoverDelay = function (options) {
    var defaults = {
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function () {
            $.noop();
        },
        outEvent: function () {
            $.noop();
        }
    };
    var sets = $.extend(defaults, options || {});
    var hoverTimer, outTimer;
    return $(this).each(function () {
        $(this).hover(function () {
            clearTimeout(outTimer);
            hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
        }, function () {
            clearTimeout(hoverTimer);
            outTimer = setTimeout(sets.outEvent, sets.outDuring);
        });
    });
};
String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}

String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}