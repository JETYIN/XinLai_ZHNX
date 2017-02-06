(function(window, undefined) {
	var xCharts = (function() {
		var xCharts = function(container, option) {
			return new xCharts.prototype.init(container, option);
		};
		xCharts.prototype = {
			Container : undefined,
			$Container : undefined,
			d3Container : undefined,
			delayTime: 3 * 1000,
			interval:undefined,
			series: undefined,
			width : 400,
			height : 400,
			idx: {
				g : 0,
				l : 0
			},
			ChartConfig : {
				
			},
			InnerEvent: {
				
			},
			OuterEvent: {
				
			},
			commonfunc: {
				repaint: function(){
					
				},
				intervalfunc: function(){
					this.repaint();
				}
			},
			init : function(container, option) {
				this.initContainerOpt(container, option);
				this.setOption(option);
				return this;
			},
			initContainerOpt : function(container, option) {
				// div 容器
				this.Container = container;
				// 图表高度和宽度
				this.width = $(container).width();
				this.height = $(container).height();
				if(this.width == 0){
					this.width = $(container).attr("width");
					this.height = $(container).attr("height");
				}
				// 图表svg节点
				this.d3Container = d3.select(container).append("svg").attr({
					"width" : this.width,
					"height" : this.height
				});
				// viewBox
				if(option != undefined && option.viewBox != undefined){
					var viewBoxArray = option.viewBox.split(" ");
					this.width = parseFloat(viewBoxArray[2]) - parseFloat(viewBoxArray[0]);
					this.height = parseFloat(viewBoxArray[3]) - parseFloat(viewBoxArray[1]);
					this.d3Container.attr({
						"viewBox": option.viewBox
					});
				}
				// 图表html节点
				this.$Container = $(container).append("<div/>").css({
					"left" : 0,
					"top" : 0,
					"position" : "absolute",
					"width" : this.width,
					"height" : this.height
				});
				// 各组件节点
				this.rectG = this.d3Container.append("g");//背景点击
				this.d3Background = this.d3Container.append("g");
				this.d3Title = this.d3Container.append("g");
				this.d3XAxis = this.d3Container.append("g");
				this.d3YAxis = this.d3Container.append("g");
				this.d3Grid = this.d3Container.append("g");
				this.d3Legend = this.d3Container.append("g");
				this.d3Group = this.d3Container.append("g");
				this.d3DrawImg = this.d3Container.append("g");//绘制图形
				this.d3ChartBg = this.d3Container.append("g");//绘制图形
				
			},
			setOption : function(option){
				this.ChartConfig = $.extend(true, {}, this.ChartConfig, option);
//				console.log(this.ChartConfig)
			},
			setInnerEvent: function(eventFunc){
				this.InnerEvent = $.extend(true, {}, this.InnerEvent, eventFunc);
			},
			setOuterEvent: function(eventFunc){
				this.OuterEvent = $.extend(true, {}, this.OuterEvent, eventFunc);
			},
			destroy: function(){
				if(this.interval){
					clearInterval(this.interval);
				}
				
				if(this.d3Container != undefined){
					this.d3Container.selectAll("*").remove();
					this.d3Container.remove();
				}
				this.d3Container = null;
			},
			evalfunc: function(execString){
				var that = this;
				eval(execString);
			},
			taketurns: function(){
				var that = this;
				if(this.interval){
					clearInterval(this.interval);
				}
				this.interval = setInterval(function(){
					that.commonfunc.intervalfunc();
				}, this.delayTime);
			},
			//获取坐标轴的最小比例值, dat是要在坐标轴上显示的数据数组
			getMinAxisValue : function(dat){
				console.log(dat.length)
				
			},
			getMinAxisValue : function(ticks,dat){
				var gap;
				if(Object.prototype.toString.call(dat[0]) === '[object Array]'){
					var m = [];
					for(var i=0; i<dat.length; ++i){
						m.push(d3.min(dat[i]));
					}
					gap = Math.abs(Math.floor(d3.min(m)/ticks));
				}else{
					gap = Math.abs(Math.floor(d3.min(dat)/ticks));
				}
		        var v = [];		
		        var gapStr = gap.toString();
		        for(var i=0; i<gapStr.length; ++i){
		            v.push(Number(gapStr.charAt(i)));
		        }
		        if(gapStr.length>=2){
		            if(v[1]>=5){
		                v[0] += 1;
		                for(var i=1; i<gapStr.length; ++i){
		                    v[i] = 0;
		                }
		            }else{
		                v[1] = 5;
		                for(var i=2; i<gapStr.length; ++i){
		                    v[i] = 0;
		                }
		            }
		        }else{
		            v[0] += 1;
		        }
		        var temp = "";
		        for(var i=0; i<gapStr.length; ++i){
		            temp += v[i].toString();
		        }
		        
	            if(m<0){
	            	temp=-temp;
	            	if(temp.length>1){
		            	temp=-temp
		            }
	            	//if(Number(temp)=="-0"){temp=0;}
	            }
	            
		        return ticks*Number(temp);
			},
			//获取坐标轴的最大比例值，ticks是将坐标轴分为几段, dat是要在坐标轴上显示的数据数组
			getMaxAxisValue : function(ticks, dat){
				var gap;
				if(Object.prototype.toString.call(dat[0]) === '[object Array]'){
					var m = [];
					for(var i=0; i<dat.length; ++i){
						m.push(d3.max(dat[i]));
						if(dat[i]>0){
							this.tickLength.push(dat[i])
						}
					}
					gap = Math.abs(Math.floor(d3.max(m)/ticks));
				}else{
					gap = Math.abs(Math.floor(d3.max(dat)/ticks));
				}
		        var v = [];		
		        var gapStr = gap.toString();
		        for(var i=0; i<gapStr.length; ++i){
		            v.push(Number(gapStr.charAt(i)));
		        }
		        if(gapStr.length>=2){
		            if(v[1]>=5){
		                v[0] += 1;
		                for(var i=1; i<gapStr.length; ++i){
		                    v[i] = 0;
		                }
		            }else{
		                v[1] = 5;
		                for(var i=2; i<gapStr.length; ++i){
		                    v[i] = 0;
		                }
		            }
		        }else{
		            v[0] += 1;
		        }
		        var temp = "";
		        for(var i=0; i<gapStr.length; ++i){
		            temp += v[i].toString();
		            if(m<0){
		            	temp=-temp;
		            	//if(temp=="-0"){temp=0;}
		            }
		        }
		        	return ticks*Number(temp)
			}
		};
		// 图表配置
		var ChartConfig = {
			viewbox : {
				x : 0,
				y : 0,
				width : 0,
				height : 0
			},
			padding : {
				top : 40,
				right : 90,
				bottom : 40,
				left : 30
			},
			color : [ '#00beff', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
					'#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
					'#c4ccd3' ],
			backgroundColor : 'transparent',
			animation : true,
			background : {//主要是svg背景,边框之类
				show : true,
				url : '',
				width : 500,
				height : 500,
			},
			title : {
				show : true,
				text : '',
				left : 0,
				right : 10,
				top : 24,
				bottom : 0,
				textStyle : {
					color : 'rgb(244, 163, 24)',
					fontStyle : 'normal',
					fontWeight : 'bold',
					fontFamily : 'Microsoft Yahei',
					fontSize : 24
				},
				textAlign : 'center',
				textBaseline : 'middle',
				subtext: '',
				subtextStyle: {
					color: 'rgb(244, 163, 24)',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: 'Microsoft Yahei',
					fontSize: 12,
				}
			},
			group: {
				show : true,
				left : 0,
				right : 0,
				top : 0,
				bottom : 0,
				itemGap: 10,
				itemWidth: 80,
				itemHeight: 25,
				orient: 'vertical',
				position : 'right',					/* 'left' */
				selectedMode: false,
				textStyle : {
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 16
				},
				backgroundColorselectedcolor: "rgba(5, 188, 254, 0.3)",
				backgroundColor: 'transparent',
				borderColor: '#01BEFE',
				borderWidth: 1.5,
				borderDashStyle: 'dashdot'
			},
			legend : {	//图例
				show : true,
				left : 0,
				right : 0,
				top : 14,
				bottom : 0,
				itemGap: 10,
				itemWidth: 80,
				itemHeight: 14,
				orient: 'vertical',		//horizontal(横向)
				position : 'right',					/* 'left' */
				selectedMode: false,
				selectedColor: '#aaa',
				textStyle : {
					orient: 'horizontal',//vertical文字在图例下方
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
				icon:{
					shape: 'rect', // 'circle', emptyCircle,circleArc(圆弧)
					startAngle: Math.PI*9/5,	//为圆弧时开始角度
					endAngle: Math.PI*0.5/2+2*Math.PI,	//为圆弧时结束角度
					inner: 15,	//为圆弧时内半径
					outer: 30,	//为圆弧时外半径
				}
			},
			grid : {	//网格
				show : true,
				horizon : true,
				vertical : true,
				opacity : 0.3,
				backgroundColor : 'transparent',
				borderColor : '#fff',
				borderWidth : 1.2,
			},
			xAxis : {
				show : true,
				gap : true,   						//x轴左右两边是否留空隙
				gapWidth : 30,
				type : 'ordinal',					/* 'linear' */				
				position : 'bottom',					/* 'top' */
				unit : 'h',							// x轴单位
				unitLocation : 'start',
				unitTextStyle : {
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
				offset : 0,						// 横向偏移量
				min : 0,
				max : 0,
				tickSize : 7,						// 轴刻度长度
				tickFormat : "1000",				// 格式化
				tickPadding : 3,        			//文字和坐标轴间隔
				axisTextStyle : {
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 14
				},
				axisPathStyle : {
					color : 'none',
					fill: "none",
		            stroke: "#fff",
		            strokeWidth: "1px",
		            shapeRendering: "crispEdges"
				},
				axisLineStyle : {
					fill: "none",
		            stroke: "#fff",
		            strokeWidth: "1px",
				}
			},
			yAxis : {
				show : true,
				type : 'linear',					/* 'ordinal' */				
				position : 'left',					/* 'right' */
				unit : '',							// y轴单位
				unitLocation : 'middle',
				unitHeight : 15,
				unitTextStyle : {
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
				offset : 0,						// 横向偏移量
				min : 0,
				max : 0, 
				splitNumber : 5,					// 坐标轴分割数
				tickSize : 7,						// 轴刻度长度
				tickFormat : "1000",				// 格式化
				axisTextStyle : {
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
				axisPathStyle : {
					fill: "none",
		            stroke: "#fff",
		            strokeWidth: "1px",
		            shapeRendering: "crispEdges"
				},
				axisLineStyle : {
					fill: "none",
		            stroke: "#fff",
		            strokeWidth: "1px",
				}
			},
			tooltip : {

			},
			line: {
				isCircle: true,	//绘制圆点
				isText: true,	//绘制文字
				animateTime: 1000,	//绘制时间
				lineAnimate: "right",	//运动方向，目前为left\right,left从左往右
				lineStyle: {
					strokeWidth:"1px",
					strokeColor:"#00beff",
//                    "stroke":ChartConfig.color[i],
                    opacity: 0.8,
                    fill: "none",
                    strokeDasharray: "none",	//虚线的定义,加动画没用？
                    interpolate: ""		//定义线绘制形状,step\basis等，默认为linear
				},
				lineTextStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: 'Microsoft Yahei',
					fontSize: 12,
					opacity: 1,
				},
				lineCircleStyle: {
//					 fill: "white",
//					 stroke: "none",
//		             strokeWidth: 2,
//		             opacity: 1,
//		             r: "5px",
				},
				lineRectStyle: {
					width: 10,
					height: 10
				},
				symbolStyle: {
					 fill: "white",
					 stroke: "none",
		             strokeWidth: 2,
		             opacity: 1,
				},
				symbol: 'circle',	//定义标记的图形（circle,rect）,如果绘制空心图形则将lineCircleStyle的fill改为none,stroke添加颜色
				symbolSize: 3,	
				symbolRotate: 0,
				symbolOffset: [0, 0],
				label:{
					show: false,
					position: 'top',
					formatter: '{c}',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'Microsoft Yahei',
						fontSize: 12
					}
				}
			},
			area:{
				showArea : true,
				type: 'cardinal',//'step''cardinal''basic'
				opacity: 0.9,
				linearGradient : true,
				showCircle: true,
				showText: true,
				showLastText : false,
				lastTextSvg:"svg/weather/common/DataShowBubblingFrame.svg",
				lastTextRectWidth : 40,
				lastTextFontSize : 14,
				lastTextRectOpacity : 1,
				animation: true,
				areaDuration: 700,
				textDuration: 300,
				ease: 'circle-out',
				//dot type('circle', 'rect', 'ring')
				//'circle': R, opacity 必须选项
				//'rect': width, height , opacity 必须选项
				//'ring':R,borderWidth, opacity 必须选项
				dotStyle:{
					type : 'circle',
					R : 3,
					fill : "#00beff", 
					borderWidth: 1,
					opacity: 1
				},
				textStyle:{
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
				fillStyle:{
					id : 'areaFill',
					x1 : '0%',
					y1 : '0%',
					x2 : '0%',
					y2 : '100%',
					startOffset : '0%',
					startColor : '#00beff',
					endOffset : '100%',
					endColor : '#153067'
				}
			},
			bar:{
				type : 'column',  //'column''triangle'
				barWidth : 13,
				gapWidth : 10,
				animation: true,
				areaDuration: 1000,
				ease: 'circle-out',
				opacity : 0.8,
				textShow : true,
				textStyle:{
					color : '#FFF',
					fontStyle : 'normal',
					fontWeight : 'normal',
					fontFamily : 'Microsoft Yahei',
					fontSize : 12
				},
			},
			pie:{
//				isDrawDouble: true,
//				doubleOpacity:0.5,//和数据相同的环和第一组数据的透明度，其余参数和第一组数据相同
				isBgClick: true,
				selectedMode: false,
				selectedOffset: 10,
				clockwise: true,
				startAngle: 90,
				minAngle: 0,
				roseType: false,
				roseRadiusReverse: false,
				radiusPadding : 10,
				minRadius: 0,
				label: {
					normal: {
						show: false,
						position: 'outside',
						formatter: '{c}',
						textNumBot: 8,	//定义换行文字个数，8个文字就换行
						doubleLable:{
							show:true,	//出现文字和数据
							isPercent:true,	//数据显示为百分比
							textColor:'#fff',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: 'Microsoft Yahei',
							fontSize: 12
						},
						textStyle: {
							color: '#fff',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: 'Microsoft Yahei',
							fontSize: 12
						}
					},
					emphasis: {
						show: false,
						formatter: '{c}',
						textStyle: {
							color: '#fff',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: 'Microsoft Yahei',
							fontSize: 12
						}
					}
				},
				labelLine: {
					normal: {
						show: true,
						length: 20,
						length2: 10,
						smooth: false,
						lineStyle: {
							color: '#FFF',
							width: 1,
							type: 'solid',
							opacity: 1
						}
					},
					emphasis: {
						show: false,
						lineStyle: {
							color: '#FFF',
							width: 1,
							type: 'solid',
							opacity: 1
						}
					}
				},
				itemStyle: {
					normal: {
						borderColor: '#000',
						borderWidth: 1,
						borderType: 'solid',
						opacity: 1
					},
					emphasis: {
						borderColor: '#000',
						borderWidth: 0,
						borderType: 'solid',
						opacity: 1
					}
				},
				center:{
					show: false,
					color: "#01FFFF",
					borderWidth: 8,
					borderColor: "#03D4FB",
					borderOpacity: 0.4,
					width:8,
					height:8
				},
				
				smallPie:{	//不需数据的环
					show: false,		//显示不需数据的环
					inner: 20,		//相比外半径倍数
					outer: 30,		//相比外半径倍数
					color: "blue",
					dataNum: 20,	//圆环里面有多少段
					intervalNum: 0,	//每段环之间间隔大小，0为没有间隔
					animateTime: 1000
				},
				pieCircle:{	//不需数据的圆1
					show: false,		//显示圆
					r: 60,		//相比外半径倍数,成正比
					cx: 0,
					cy: 0,
					color: "none",
					borderWidth: 1,
					border: "blue"
				},
				pieCircle2:{	//不需数据的圆2
					show: false,		//显示圆
					r: 0.2,		//相比外半径倍数
					cx: 0,
					cy: 0,
					color: "none",
					borderWidth: 1,
					border: "rgb(254,169,0)"
				},
				animation: true,
				animationDuration:1000,
				animationEasing: 'circle-out',
				animationMode: "EachSection",	//绘制圆的动画方式，EachSection每段，all从0开始
				animationDelay: 0,
				radius: [0, 0.75]
			},
			radar:{
				shape: "circle",		//蛛网底部形状,polygon\circle
				splitNumber: 5,			//圈的层数
				r: 40,					//圆半径
				animateTime: 1500,		
				radarBottomLineStyle: {	//底层线样式
					isShow: true,
					strokeDasharray: "none",	//虚线的定义,strokeDasharray: "15,10"
					stroke: "#fff",
					strokeWidth: 1,
					lineOpacity: 1,
					fill: "none"
				},
//				radarBottomBgStyle: {	//底层图形样式
//					isShow: true,		
//					backgroundFill: "none",	
//					backgroundOpacity: 0,
//				},	
				radarTopImgStyle: {		//上层图形样式
					lineFill: "none",
					backgroundFill: "blue",
					stroke: "blue",
					strokeWidth: 1,
					lineOpacity: 1,
					backgroundOpacity: 0.8,
					strokeDasharray: "none",	
				},
				radarTextStyle: {		//文字样式
					labelFactor: 1.3,	
					nei: {				//内文字样式
						isShow: true,
						color: '#fff',	
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'Microsoft Yahei',
						fontSize: 12,
						x: "0.35em",
						dy: 12,
						textAnchor: "middle"
					},
					wai: {
						isShow: true,
						color: '#fff',	
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'Microsoft Yahei',
						fontSize: 12,
						dy: "0.35em",
						textAnchor: "middle"
					}
				},
				radarCircleStyle:{		//交点样式
//					isShow: true,
					symbol: 'circle',
					symbolStyle: {
						fill: "blue",
						stroke: "none",
						strokeWidth: 2,
						opacity: 1,
						hoverFill: "none",	//移入颜色是否含有？
					},
					symbolCircleStyle: {
						r: 5
					},
				},
				radarAxisLineStyle: {		//放射线样式
					isShow: true,
					strokeDasharray: "none",	//虚线的定义,strokeDasharray: "15,10"
					fill: "none",
					stroke: "#fff",
					strokeWidth: 1,
					opacity: 1,
					maxValue: 1			//线长度倍数，1为长度不超出
				}
			},
			map: {
				map: '640000000000',
				roam: true,
				center: [105.9961, 37.3096],
				scale : 8455,
				zoom: 1,
				scaleLimit:{
					min: 1,
					max: 5
				},
				selectedMode: false
			}
		};
		$.extend(xCharts.prototype.ChartConfig, ChartConfig);
		// 数据处理
		var ChartDataFormate = {
			FormateData: function(series){
				if(Object.prototype.toString.call(series) === '[object Array]'){
					this.FormateGroupData(series);
				}else{
					this.FormateNOGroupData(series);
				}
			},
			FormateNOGroupData : function(series) {
				var legends = [], labels = [], datas = [], unit = undefined;
				for(var i = 0; i < series.data.length; i++){
					legends.push(series.data[i].name);
					datas.push(series.data[i].data);
					if(i ==0){
						unit = series.data[i].unit;
						labels.push(series.data[i].label);
					}
				}
				this.series = {group:[''], legend: [legends], label: labels, data: [datas], unit: [unit]};
			},
			FormateGroupData : function(series) {
				var groups = [], legends = [], labels = [], datas = [], unit = [];
				for(var i = 0; i < series.length; i++){
					var group = series[i].group;
					if(("|" + groups.join("|") + "|").indexOf("|" + group + "|") < 0){
						groups.push(group);
					}
					var legend = [], data = [];
					for(var j = 0; j < series[i].data.length; j++){
						legend.push(series[i].data[j].name);
						data.push(series[i].data[j].data);
						if(j ==0){
							unit.push(series[i].data[j].unit == undefined ? '' : series[i].data[j].unit);
							labels.push(series[i].data[j].label);
						}
					}
					datas.push(data);
					legends.push(legend);
				}
				this.series = {group: groups, legend: legends, label: labels, data: datas, unit: unit};
			}
		};
		$.extend(xCharts.prototype, ChartDataFormate);
		// 点击事件
		var Event = {
			legendselected: function(idx){
				var that = this, show = true, legConfig = that.ChartConfig.legend;
				this.d3Legend.selectAll(".iconRect").attr({
					"fill": function(d, i){
						switch (legConfig.selectedMode) {
						case 'multiple':
						{
							if(idx == i){
								if(idx == d){
									show = false;
									d3.select(this).datum(-1);
									return legConfig.selectedColor;
								}else{
									d3.select(this).datum(i);
									return that.ChartConfig.color[i];
								}
							}
							return d3.select(this).attr('fill');							
							break;
						}
						case 'single': // 单选支持空心圆
						{
							if(idx == i && idx == d){
								show = false;
								d3.select(this).datum(-1);
								return legConfig.icon.shape == 'emptyCircle' ? that.ChartConfig.color[i] : legConfig.selectedColor;
							}
							d3.select(this).datum(i);
							return legConfig.icon.shape == 'emptyCircle' ? 'none' : that.ChartConfig.color[i];
							break;
						}
						default:
							return that.ChartConfig.color[i];
							break;
						}
					}
				});
				// 调用内外部事件
				this.InnerEvent.legendselected(idx, show);
				this.OuterEvent.legendselected(idx, show);
			},
			groupselected: function(idx){
				var that = this;
				this.d3Group.selectAll(".rectBg").attr({
					"fill": function(d,i){
						return i == idx ? that.ChartConfig.group.backgroundColorselectedcolor : that.ChartConfig.group.backgroundColor;
					}
				});
				// 清空绘制节点
				this.d3XAxis.selectAll("*").remove();
				this.d3YAxis.selectAll("*").remove();
				this.d3Grid.selectAll("*").remove();
				this.d3Legend.selectAll("*").remove();
				this.d3DrawImg.selectAll("*").remove();
				// 调用内外部接口
				this.InnerEvent.groupselected(idx);
				this.OuterEvent.groupselected(idx);
			},
			dataselected: function(obj){ // {name:xx, value:xx, type:'pie'}
				this.InnerEvent.dataselected(obj);
				this.OuterEvent.dataselected(obj);
			},
			pieClick: function(dStart,dEnd,i){
				var that = this;
				
				this.arc = this.pieParentGroup.selectAll("path")[0][i];
				
				var allLabels = this.pieParentGroup.selectAll(".label");
				var allNumLabels = this.pieParentGroup.selectAll(".numLabel");
				this.label = allLabels.filter(function(t, n){
					return i == n ? true : false;
				});
				this.numLabel = allNumLabels.filter(function(t, n){
					return i == n ? true : false;
				});
				var angle = (dEnd - dStart) / 2 + dStart;
				if(this.pieCfg.selectedMode != 'multiple'){
					that.arcGroup.filter(function(t, n){
						return i == n ? false : true;
					}).attr({
						"transform" : "translate(0,0)"
					});
					allLabels.filter(function(t, n){
						return i == n ? false : true;
					}).attr({
						"transform" : "translate(0,0)"
					});
					allNumLabels.filter(function(t, n){
						return i == n ? false : true;
					}).attr({
						"transform" : "translate(0,0)"
					});
				}
				if(this.pieCfg.selectedMode == 'single' || this.pieCfg.selectedMode == 'multiple'){
					var x = Math.sin(angle) * this.pieCfg.selectedOffset;
					var y = Math.cos(angle) * - this.pieCfg.selectedOffset;
					var translate = "translate(" + x + "," + y + ")", oldTranslate = d3.select(this.arc).attr("transform");
					translate = oldTranslate == null ? translate : oldTranslate == "translate(0,0)" ? translate : "translate(0,0)";
					
					var fontSize=16,oldFontSize=this.label.attr("font-size");
					fontSize = oldFontSize == null ? fontSize : oldFontSize == 12 ? fontSize : 12;
					
					//暂时注销
					d3.select(this.arc).transition().duration(100).ease('elastic')
					.attr({
						"transform": translate
					});
					this.label.transition().duration(100).ease('elastic')
					.attr({
						"transform": translate,
						"font-size": fontSize
					});
					this.numLabel.transition().duration(100).ease('elastic')
					.attr({
						"transform": translate,
						"font-size": fontSize
					});
				}
			},
			pieBgClick: function(){
				var that = this;
				this.pieParentGroup.selectAll("path").attr({ "transform": "translate("+0+","+0+")"})
					//this.arcGroup.transition().duration(100).ease('elastic').attr({"transform": "translate("+0+","+0+")"});
				this.pieParentGroup.selectAll(".label").transition().duration(100).ease('elastic').attr({"transform": "translate("+0+","+0+")","font-size": 12});
					this.pieParentGroup.selectAll(".numLabel").transition().duration(100).ease('elastic').attr({"transform": "translate("+0+","+0+")","font-size": 12});
			}
		};
		$.extend(xCharts.prototype, Event);
		// 对内事件
		var InnerEvent = {
			legendselected: function(idx, show){
				//console.info('inner:' + idx + show);
			},
			groupselected: function(idx){
				//console.info(this);
			},
			dataselected: function(obj){ // {name:xx, value:xx}
				
			},
			pathClick: function(dStart,dEnd,i){
				//console.log("inner"+i)
			},
			svgRectClick: function(){
				console.log("inner背景被点击")
			}
		};
		$.extend(xCharts.prototype.InnerEvent, InnerEvent);
		// 对外事件
		var OuterEvent = {
			legendselected: function(idx, show){
				//console.info('outer:' + idx);
			},
			groupselected: function(idx){
				
			},
			dataselected: function(obj){ // {name:xx, value:xx}
				
			},
			pathClick: function(dStart,dEnd,i){
				//console.log("outer"+i)
			},
			svgRectClick: function(){
				console.log("outer背景被点击")
			}
		};
		$.extend(xCharts.prototype.OuterEvent, OuterEvent);
		// 图表公共组件
		var ChartComponents = {
			changeViewbox : function(){
				var vbConfig = this.ChartConfig.viewbox;
				var str = vbConfig.x + " " + vbConfig.y + " " + vbConfig.width + " " +vbConfig.height;
				this.d3Container.attr({
					"viewbox" : str
				})
			},
			drawBackground : function(){
				var that = this, bgConfig = this.ChartConfig.background;
				if(bgConfig.show){
					zhnx.utils.loadSvg(bgConfig.url, function(importedNode){
						var plane = that.d3Background.node().appendChild(importedNode.cloneNode(true));
						d3.select(plane).attr({
				            "width": bgConfig.width,
				            "height": bgConfig.height
						});
					});
				}
			},
			drawTitle : function() {
				var that = this, titleConfig = this.ChartConfig.title;
				// 是否显示标题
				if (!titleConfig.show) {
					return false;
				}
				// 主标题
				this.d3Title.append("text").datum(
						titleConfig.text).attr({
					"x" : function() {
						return titleConfig.textAlign == 'left' 
							? (titleConfig.left) : titleConfig.textAlign == 'center'
							? that.width / 2 : (that.width - titleConfig.right);
					},
					"y" : function() {
						return titleConfig.top;
					},
					"text-anchor": function(){
						return titleConfig.textAlign == 'left'
							? "start" : titleConfig.textAlign == 'center'
							? "middle" : "end";
					},
					"dominant-baseline": titleConfig.textBaseline,
					"font-size" : titleConfig.textStyle.fontSize,
					"font-family" : titleConfig.textStyle.fontFamily,
					"font-weight" : titleConfig.textStyle.fontWeight,
					"font-style" : titleConfig.textStyle.fontStyle,
					"fill" : titleConfig.textStyle.color
				}).text(function(d) {
					return d;
				});
				// 副标题
				if(titleConfig.subtext != ''){
					this.d3Title.append("text").datum(
							titleConfig.subtext).attr({
						"x" : function() {
							return titleConfig.textAlign == 'left' 
								? (titleConfig.left) : titleConfig.textAlign == 'center'
								? that.width / 2 : (that.width - titleConfig.right);
						},
						"y" : function() {
							return titleConfig.top + titleConfig.textStyle.fontSize;
						},
						"text-anchor": function(){
							return titleConfig.textAlign == 'left'
								? "start" : titleConfig.textAlign == 'center'
								? "middle" : "end";
						},
						"dominant-baseline": titleConfig.textBaseline,
						"font-size" : titleConfig.subtextStyle.fontSize,
						"font-family" : titleConfig.subtextStyle.fontFamily,
						"font-weight" : titleConfig.subtextStyle.fontWeight,
						"font-style" : titleConfig.subtextStyle.fontStyle,
						"fill" : titleConfig.subtextStyle.color
					}).text(function(d) {
						return d;
					});
				}
			},
			drawGroup : function() {
				var data = this.series.group;
				var that = this, groupConfig = this.ChartConfig.group;
				// 是否显示
				if(!groupConfig.show){
					return false;
				}
				this.d3Group.selectAll("*").remove();
				this.d3Group.attr({
					"transform": function(){
						var x = groupConfig.left, y = groupConfig.top + that.ChartConfig.padding.top;
						if(groupConfig.position == 'right'){
							x = that.width - that.ChartConfig.padding.right + groupConfig.right;
						}
						return "translate(" + x + "," + y + ")";
					}
				});
				var groupGroup = this.d3Group.selectAll("g").data(data).enter()
					.append("g").attr({
						"transform": function(d, i){
							var x = 0, y = 0;
							if(groupConfig.orient == 'horizontal'){
								x = i * (groupConfig.itemWidth + groupConfig.itemGap);
								y = 0;
							}else{
								x = 0;
								y = i * (groupConfig.itemHeight + groupConfig.itemGap);
							}
							return "translate(" + x + "," + y + ")";
						}
					});
				// 背景框
				var dashLen = groupConfig.itemHeight / 3;
				groupGroup.append("rect").attr({
					"class": "rectBg",
					"x": 0,
					"y": 0,
					"width": groupConfig.itemWidth,
					"height": groupConfig.itemHeight,
					"stroke": groupConfig.borderColor,
					"stroke-width": groupConfig.borderWidth,
					"fill": function(d,i){
						return i == 0 ? groupConfig.backgroundColorselectedcolor : groupConfig.backgroundColor;
					},
					"stroke-dasharray": function(){
						if(groupConfig.borderDashStyle == 'solid'){
							return "0";
						} else {
							return dashLen + " " + (groupConfig.itemWidth - 2 * dashLen) + " " + dashLen
							+ " 0 " + " " + dashLen + " " + (groupConfig.itemHeight - 2 * dashLen) + " " + dashLen
							+ " 0 " + " " + dashLen + " " + (groupConfig.itemWidth - 2 * dashLen) + " " + dashLen
							+ " 0 " + " " + dashLen + " " + (groupConfig.itemHeight - 2 * dashLen) + " " + dashLen; 
						}
					}
				});
				// 文本信息
				groupGroup.append("text").attr({
						"x" : function(){
							return groupConfig.itemWidth / 2;
						},
						"y" : function(){
							return groupConfig.itemHeight / 2;
						},
						"text-anchor" : "middle",
						"dominant-baseline": "middle",
						"font-size" : groupConfig.textStyle.fontSize,
						"font-family" : groupConfig.textStyle.fontFamily,
						"font-weight" : groupConfig.textStyle.fontWeight,
						"font-style" : groupConfig.textStyle.fontStyle,
						"fill" : groupConfig.textStyle.color
					}).text(function(d){
						return d;
					});
				// 点击层
				groupGroup.append("rect").attr({
					"x": 0,
					"y": 0,
					"width": groupConfig.itemWidth,
					"height": groupConfig.itemHeight,
					"fill": "rgba(0, 0, 0, 0)"
				}).style({
					"cursor": "pointer"
				}).on('click', function(d, i){
					that.groupselected(i);
				});
			},
			drawLegend : function(data) {
				var that = this, legendConfig = this.ChartConfig.legend;
				// 是否显示
				if(!legendConfig.show){
					return false;
				}
				var legendParentGroup = this.d3Legend.append("g");
				legendParentGroup.attr({
					"transform": function(){
						var x = legendConfig.left, y = legendConfig.top + that.ChartConfig.padding.top;
						if(legendConfig.position == 'right'){
							x = that.width - that.ChartConfig.padding.right + legendConfig.right;
						}
						return "translate(" + x + "," + y + ")";
					}
				});
				var legendGroup = legendParentGroup.selectAll("g").data(data).enter()
					.append("g").attr({
						"transform": function(d, i){
							var x = 0, y = 0;
							if(legendConfig.orient == 'horizontal'){
								x = i * (legendConfig.itemWidth + legendConfig.itemGap);
								y = 0;
							}else{
								x = 0;
								y = i * (legendConfig.itemHeight + legendConfig.itemGap);
							}
							return "translate(" + x + "," + y + ")";
						}
					});
				// 
				// 图例标志
				var iconObj;
				switch (legendConfig.icon.shape) {
				case 'circle':
					iconObj = legendGroup.append('circle').attr({
						"cx" : function(){
							return legendConfig.itemHeight / 2;
						},
						"cy" : function(){
							return legendConfig.itemHeight / 2;
						},
						"r" : function(){
							return legendConfig.itemHeight / 2;
						}
					});
					break;
				case 'rect':
					iconObj = legendGroup.append('rect').attr({
						"x": 0,
						"y": 0,
						"width": legendConfig.itemHeight,
						"height": legendConfig.itemHeight
					});
					break;
					
				case 'circleArc':	
					var arcSmall = d3.svg.arc()  //弧生成器
				    .innerRadius(legendConfig.icon.inner)   //设置内半径
				    .outerRadius(legendConfig.icon.outer)  //设置外半径
				    .endAngle(legendConfig.icon.endAngle)
				    .startAngle(legendConfig.icon.startAngle)
				    
					iconObj = legendGroup.append('path').attr({
						"d": function(){return arcSmall()},
						"transform": "translate("+0+","+(legendConfig.icon.inner+legendConfig.itemHeight)+")"
					});
					break;
					
				case 'emptyCircle':
					// 默认为单选模式
					legendConfig.selectedMode = 'single';
					iconObj = legendGroup.append('circle').attr({
						"cx" : function(){
							return legendConfig.itemHeight / 2;
						},
						"cy" : function(){
							return legendConfig.itemHeight / 2;
						},
						"r" : function(){
							return legendConfig.itemHeight / 2;
						},
						"stroke-width": 1,
						"stroke": function(d, i){
							return that.ChartConfig.color[i];
						}
					});
					break;
				}
				// 绑定状态数据
				iconObj.data(d3.range(data.length)).attr({
					"class": 'iconRect',
					"fill" : function(d, i){
						if(legendConfig.icon.shape == 'emptyCircle' && i != 0){
							return 'none';
						}
						return that.ChartConfig.color[i];
					}
				});
				// 文本信息
				legendGroup.append("text").attr({
						"x" : function(){
							if(legendConfig.textStyle.orient=="vertical"){//图例文字在图例下方
								return -legendConfig.itemHeight;
							}else{
								return legendConfig.itemHeight + legendConfig.textStyle.fontSize;
							}
						},
						"y" : function(){
							if(legendConfig.textStyle.orient=="vertical"){
								return legendConfig.itemHeight*2.5;
							}else{
								return legendConfig.itemHeight / 2;
							}
						},
						"text-anchor" : "start",
						"dominant-baseline": "middle",
						"font-size" : legendConfig.textStyle.fontSize,
						"font-family" : legendConfig.textStyle.fontFamily,
						"font-weight" : legendConfig.textStyle.fontWeight,
						"font-style" : legendConfig.textStyle.fontStyle,
						"fill" : legendConfig.textStyle.color
					}).text(function(d){
						return d;
					});
				// 点击层
				legendGroup.append("rect").attr({
					"x": 0,
					"y": 0,
					"width": legendConfig.itemWidth,
					"height": legendConfig.itemHeight,
					"fill": "rgba(0, 0, 0, 0)"
				}).style({
					"cursor": "pointer"
				}).on('click', function(d, i){
					that.legendselected(i);
				});
			},
			drawGrid : function(xInfo, yInfo) {
				var that = this, gridConfig = this.ChartConfig.grid;
				var hLen = yInfo.tickValue.length, vLen = xInfo.tickValue.length;
				var yData = yInfo.tickValue, xData = xInfo.tickValue;
				// 是否显示
				if(!gridConfig.show){
					return false;
				}
				this.d3Grid.attr("class", "g_grid");
				//添加横向网格
				if(gridConfig.horizon){
					this.d3Grid.append("g").selectAll("line").data(yData).enter().append("line").attr({
						"x1" : that.ChartConfig.padding.left,
						"y1" : function(d){ return yInfo.yScale(d); },
						"x2" : that.width-that.ChartConfig.padding.right,
						"y2" : function(d){ return yInfo.yScale(d); },
						"stroke" : gridConfig.borderColor,
						"stroke-width" : gridConfig.borderWidth,
						"opacity" : gridConfig.opacity
					});
				}
				//添加纵向网格
				if(gridConfig.vertical){
					var start = 1;
					if(xInfo.gap){
						start = 0;
					}					
					for(var j = start; j < vLen; ++j){
						this.d3Grid.append("line").attr({
							"x1" : xInfo.xScale(xInfo.tickValue[j]),
							"y1" : that.ChartConfig.padding.top+yInfo.unitHeight,
							"x2" : xInfo.xScale(xInfo.tickValue[j]),
							"y2" : that.height-that.ChartConfig.padding.bottom,
							"stroke" : gridConfig.borderColor,
							"stroke-width" : gridConfig.borderWidth,
							"opacity" : gridConfig.opacity
						});
					}
				}
			},
			drawXAxis : function(data) {
				var that = this, xAxisConfig = this.ChartConfig.xAxis;
				var xScale, axis, ringeLeft, ringeRight;
				this.d3XAxis.attr("class", "g_xAxis").attr("transform", "translate(0,"+(that.height-that.ChartConfig.padding.bottom+xAxisConfig.offset)+")");
				
				ringeLeft = that.ChartConfig.padding.left;
				ringeRight = that.width-that.ChartConfig.padding.right;	
				
				//如果x轴左右两边需要空白
				if(xAxisConfig.gap){	
					ringeLeft = that.ChartConfig.padding.left + xAxisConfig.gapWidth;
					ringeRight = that.width-that.ChartConfig.padding.right - xAxisConfig.gapWidth;	
				}
				switch(xAxisConfig.type){
				case 'linear':
					{
						
					}
					break;
				case 'ordinal':
					{
						xScale = d3.scale.ordinal().domain(data).rangePoints([ringeLeft, ringeRight]);
						axis = d3.svg.axis().scale(xScale).orient(xAxisConfig.position)
									.ticks(data.length).tickSize(xAxisConfig.tickSize).tickPadding(xAxisConfig.tickPadding);
					}
					break;
					default :break;
				}
				this.d3XAxis.call(axis);
				this.d3XAxis.selectAll("text").attr({
					"font-size": xAxisConfig.axisTextStyle.fontSize, 
					"fill": xAxisConfig.axisTextStyle.color,
					"font-style" : xAxisConfig.axisTextStyle.fontStyle,
					"font-weight" : xAxisConfig.axisTextStyle.fontWeight,
					"font-family" : xAxisConfig.axisTextStyle.fontFamily
				});
				this.d3XAxis.selectAll("path").attr({
		            "fill": xAxisConfig.axisPathStyle.color,
		            "stroke": xAxisConfig.axisPathStyle.stroke,
		            "stroke-width": xAxisConfig.axisPathStyle.strokeWidth,
		            "shape-rendering": xAxisConfig.axisPathStyle.shapeRendering
		        });
				//如果两端有间隙，补充线
				if(xAxisConfig.gap){
					this.d3XAxis.append("line").attr({
						"x1" : that.ChartConfig.padding.left,
						"y1" : 0,
						"x2" : that.width-that.ChartConfig.padding.right,
						"y2" : 0,
						"stroke" : xAxisConfig.axisLineStyle.stroke,
						"stroke-width" : xAxisConfig.axisLineStyle.strokeWidth
					});
				}	
				this.d3XAxis.selectAll("line").attr({
					"fill": xAxisConfig.axisLineStyle.fill, 
					"stroke": xAxisConfig.axisLineStyle.stroke, 
					"stroke-width": xAxisConfig.axisLineStyle.strokeWidth
				});	
				//添加单位
				this.d3XAxis.append("text").attr({
					"fill" : xAxisConfig.unitTextStyle.color,
					"font-style" : xAxisConfig.unitTextStyle.fontStyle,
					"font-weight" : xAxisConfig.unitTextStyle.fontWeight,
					"font-family" : xAxisConfig.unitTextStyle.fontFamily,
					"font-size" : xAxisConfig.unitTextStyle.fontSize,
					"text-anchor" : xAxisConfig.unitLocation,
					"x" : that.width-that.ChartConfig.padding.right+5,
					"y" : 5
				}).text(xAxisConfig.unit);
				return {xScale:xScale, tickValue:data, gap:xAxisConfig.gap};
			},
			drawYAxis : function(data) {
				var that = this, yAxisConfig = this.ChartConfig.yAxis;
				var yScale, axis, tickValues;
				this.d3YAxis.attr("class", "g_axis").attr("transform", "translate("+(that.ChartConfig.padding.left+yAxisConfig.offset)+",0)");
				switch(yAxisConfig.type){
				case 'linear':
					{
						tickValues = [];
						var max = this.getMaxAxisValue(yAxisConfig.splitNumber, data);
						var min =this.getMinAxisValue(yAxisConfig.splitNumber,data);
				        for(var i=0; i<=yAxisConfig.splitNumber; ++i){
				        	if(min<0&&max>0){
				        		tickValues.push(i*max/yAxisConfig.splitNumber)
				        		tickValues.push(-i*max/yAxisConfig.splitNumber)
				        		var startVal = that.height-that.ChartConfig.padding.bottom
				        		var middleVal = that.height-that.ChartConfig.padding.bottom-(that.height-that.ChartConfig.padding.bottom-(that.ChartConfig.padding.top+yAxisConfig.unitHeight))/2
				        		var endVal = that.ChartConfig.padding.top+yAxisConfig.unitHeight
				        		yScale = d3.scale.linear()
								.domain([-max,0, max])
								.range([startVal,middleVal,endVal]);
				        	}
				        	else if(min>=0&&max>0){//均大于0
				        		tickValues.push(i*max/yAxisConfig.splitNumber)
				        		yScale = d3.scale.linear()
								.domain([0, max])
								.range([that.height-that.ChartConfig.padding.bottom, that.ChartConfig.padding.top+yAxisConfig.unitHeight]);
				        	}
				        	else if(min<0&&max<=0){//均小于0
				        		var num0=i*min/yAxisConfig.splitNumber;
				        		if(num0=="-0"){num0=0}
				        		tickValues.push(num0)
				        		yScale = d3.scale.linear()
								.domain([min, 0])
								.range([that.height-that.ChartConfig.padding.bottom, that.ChartConfig.padding.top+yAxisConfig.unitHeight]);
				        	}
				        }
						axis = d3.svg.axis().scale(yScale).orient(yAxisConfig.position)
									.tickValues(tickValues).tickSize(yAxisConfig.tickSize).tickFormat(d3.format(yAxisConfig.tickFormat));
						
					}
					break;
				case 'ordinal':
					{
						yScale = d3.scale.ordinal().domain(data)
									.rangePoints([that.height-that.ChartConfig.padding.bottom, that.ChartConfig.padding.top+yAxisConfig.unitHeight]);
						axis = d3.svg.axis().scale(yScale).orient(yAxisConfig.position)
									.ticks(data.length).tickSize(yAxisConfig.tickSize);
					}
					break;
					default :break;
				}
				this.d3YAxis.call(axis);
				this.d3YAxis.selectAll("text").attr({
					"font-size": yAxisConfig.axisTextStyle.fontSize, 
					"fill": yAxisConfig.axisTextStyle.color,
					"font-style" : yAxisConfig.axisTextStyle.fontStyle,
					"font-weight" : yAxisConfig.axisTextStyle.fontWeight,
					"font-family" : yAxisConfig.axisTextStyle.fontFamily
				});
				this.d3YAxis.selectAll("path").attr({
		            "fill": yAxisConfig.axisPathStyle.fill,
		            "stroke": yAxisConfig.axisPathStyle.stroke,
		            "stroke-width": yAxisConfig.axisPathStyle.strokeWidth
		        });
				this.d3YAxis.selectAll("line").attr({
					"fill": yAxisConfig.axisLineStyle.fill, 
					"stroke": yAxisConfig.axisLineStyle.stroke, 
					"stroke-width": yAxisConfig.axisLineStyle.strokeWidth
				});
				//添加单位
				this.d3YAxis.append("text").attr({
					"fill" : yAxisConfig.unitTextStyle.color,
					"font-style" : yAxisConfig.unitTextStyle.fontStyle,
					"font-weight" : yAxisConfig.unitTextStyle.fontWeight,
					"font-family" : yAxisConfig.unitTextStyle.fontFamily,
					"font-size" : yAxisConfig.unitTextStyle.fontSize,
					"text-anchor" : yAxisConfig.unitLocation,
					"x" : 0,
					"y" : that.ChartConfig.padding.top
				}).text(that.series.unit[that.idx.g]);
				return {yScale:yScale, tickValue:tickValues, unitHeight:yAxisConfig.unitHeight};
			},
			drawTooltip : function() {
				
			},
			drawLine : function(data,xInfoScale,yInfoScale) {	//折线图
				var that = this;
				var lineConfig = $.extend(true, this.ChartConfig.line, data)
				var gLineGroup = this.d3DrawImg.append("g").attr("class","gLineGroup");
				var g_lines = gLineGroup.append("g").attr("class", "g_lines");//线的组
				var g_circles = gLineGroup.append("g").attr("class", "g_circles");//圆点的组
				var g_text = gLineGroup.append("g").attr("class", "g_text");//文字的组
				var line_Text = that.series.label;//获取文字
				var interpolate = "";
				if(lineConfig.lineStyle.interpolate==""||lineConfig.lineStyle.interpolate==undefined){
					interpolate = "linear";
				}else{
					interpolate = lineConfig.lineStyle.interpolate;
				}
				var line = d3.svg.line()
					.x(function(d, i){
						return xInfoScale.xScale(line_Text[0][i]);
					})
					.y(function(d,i){
						return yInfoScale.yScale(d);
					})
					.interpolate(interpolate);

				//绘制折线
				g_lines.selectAll("g").data(data).enter().append("g").each(function(d,i){
					var path = d3.select(this).append("path").attr({
						"d": line(d),
						"stroke-width": lineConfig.lineStyle.strokeWidth,
						"stroke": lineConfig.lineStyle.strokeColor,//ChartConfig.color[i]
						"stroke-dasharray": lineConfig.lineStyle.strokeDasharray,
						"fill": function(){
							if(lineConfig.lineStyle.fill=="none"){
								return "none";
							}else{
								lineConfig.lineStyle.fill;
							}
						}
					});
					var totalLength = path.node().getTotalLength();
					switch (lineConfig.lineAnimate) {
					 //左往右运动
					case 'left':{
						path.attr({
						"stroke-dashoffset": totalLength,
						"stroke-dasharray": totalLength
						})
						.transition().duration(lineConfig.animateTime)
						.attr({
							"stroke-dashoffset": 0
						});
					}
					break;
					//从右往左运动
					case 'right':{
						path.attr({
							"stroke-dashoffset": totalLength,
							"stroke-dasharray":totalLength,
						})
						.transition().duration(lineConfig.animateTime)
						.attr({
							"stroke-dashoffset": totalLength*2
						});
					}
					break;
					}
				});
		
	            //绘制圆点
				g_circles.append("g").attr("class", "circle").selectAll("g").data(data).enter().append("g").attr({
					"fill":function(d,i){
	                	if(lineConfig.symbolStyle.fill!="none"){
	                		return ChartConfig.color[i];
	                	}else{
	                		return lineConfig.symbolStyle.fill;
	                	}
					},
	                "stroke":function(d,i){
	                	if(lineConfig.symbolStyle.stroke=="none"){
	                		return lineConfig.symbolStyle.stroke;
	                	}else{
	                		return ChartConfig.color[i];
	                	}
	                },
	                "stroke-width": function(d,i){
	                	if(lineConfig.symbolStyle.strokeWidth>0){
	                		return lineConfig.symbolStyle.strokeWidth;
	                	}else{
	                		return 0;
	                	}
	                },
	                "opacity":lineConfig.symbolStyle.opacity
				}).each(function(d){
					switch (lineConfig.symbol) {
					 //绘制圆
					case 'circle':
					{
					var circle = d3.select(this).selectAll("circle")
					.data(d)
					.enter()
					.append("circle")
					.attr({
			            	"cx": function(d,i){
			            		return xInfoScale.xScale(line_Text[0][i]);
			            	},
			                "cy": function(d){
			                	return yInfoScale.yScale(d);
			                },
			                "r": 0,
			            })
			            .transition()
				        .delay(lineConfig.animateTime/2)
				        .duration(lineConfig.animateTime)
				        .attr("r", function(){
		                	if(lineConfig.isCircle==false){ return 0; }else{ return lineConfig.symbolSize; }
		                });
					}
					break;							
					//绘制矩形
					case 'rect':
						{var rect = d3.select(this).selectAll("rect")
						.data(d)
						.enter()
						.append("rect")
						.attr({
								"x": function(d,i){
				            		return xInfoScale.xScale(line_Text[0][i])-lineConfig.lineRectStyle.width/2;
				            	},
				                "y": function(d){
				                	return yInfoScale.yScale(d)-lineConfig.lineRectStyle.height/2;
				                },
				                "width": 0,
								"height": 0,
				            })
				            .transition()
					        .delay(lineConfig.animateTime/2)
					        .duration(lineConfig.animateTime)
					        .attr({
					        	"width": lineConfig.lineRectStyle.width,
					        	"height": lineConfig.lineRectStyle.height,
					        	});
						}
						break;
					}
				});

				//绘制文字
				g_text.append("g").attr("class", "circle").selectAll("g").data(data).enter().append("g").each(function(d,i){
		            var text = d3.select(this).selectAll("text").data(d).enter().append("text").text(function(d){
							if(lineConfig.isText!=false){
								return d;
							}
				    }).attr({
						"x": function(d,i){
		            		return xInfoScale.xScale(line_Text[0][i]);
		            	},
		                "y": function(d){
		                	return yInfoScale.yScale(d);
		                },
			        	"dy": "-1em",
			        	"opacity": 0,
			        	"fill": function(){ return lineConfig.lineTextStyle.color },
						"font-style": lineConfig.lineTextStyle.fontStyle,
						"font-weight": lineConfig.lineTextStyle.fontWeight,
						"font-family": lineConfig.lineTextStyle.fontFamily,
						"font-size": lineConfig.lineTextStyle.fontSize
			        })
			        .transition()
			        .delay(lineConfig.animateTime+600)
			        .duration(lineConfig.animateTime)
			        .attr("opacity",lineConfig.lineTextStyle.opacity)
				});
			},
			
			drawArea : function(xInfo, yInfo, data) {
				var that = this, areaOption = this.ChartConfig.area, fillString;
				var chartArea = this.d3DrawImg.append("g").attr("class", "g_area");	
				//画图
				if(Object.prototype.toString.call(data[0]) === '[object Array]'){
					for(var i=0; i<data.length; ++i){
						if(areaOption.linearGradient)
							addDefs(i);
						drawAreaPath(data[i], i);
						if(areaOption.showCircle)
							drawAreaDot(data[i], i);
						if(areaOption.showText)
							drawAreaText(data[i]);
						if(areaOption.showLastText){
							drawLastText(data[i]);
						}	
					}
				}else{
					if(areaOption.linearGradient)
						addDefs(0);
					drawAreaPath(data, 0);
					if(areaOption.showCircle)
						drawAreaDot(data, 0);
					if(areaOption.showText)
						drawAreaText(data);											
				}
				function addDefs(index){
					var defs = chartArea.append("defs").append("linearGradient").attr({
			              "id" : areaOption.fillStyle.id+index,
			              "x1" : areaOption.fillStyle.x1,
			              "y1" : areaOption.fillStyle.y1,
			              "x2" : areaOption.fillStyle.x2,
			              "y2" : areaOption.fillStyle.y2
			          });
//					console.log(that.ChartConfig.color[index])
//					console.log(areaOption.fillStyle.endColor)
			        defs.append("stop").attr({
			            "offset" : areaOption.fillStyle.startOffset,
			            "stop-color" : areaOption.fillStyle.startColor
			        });
			        defs.append("stop").attr({
			            "offset" : areaOption.fillStyle.endOffset,
			            "stop-color" : areaOption.fillStyle.endColor
			        });
				}
				function drawAreaPath(dat, index){
					if(!areaOption.showArea){
						return;
					}
					var areaPath1 = d3.svg.area()
		                .x(function(d, i){return xInfo.xScale(xInfo.tickValue[i]);})
		                .y0(that.height-that.ChartConfig.padding.bottom)
		                .y1(that.height-that.ChartConfig.padding.bottom)
		                .interpolate(areaOption.type);
					var areaPath2 = d3.svg.area()
		                .x(function(d, i){return xInfo.xScale(xInfo.tickValue[i]);})
		                .y0(that.height-that.ChartConfig.padding.bottom)
		                .y1(function(d, i){return yInfo.yScale(dat[i]);})
		                .interpolate(areaOption.type);
					chartArea.append("g").append("path").attr({
		                "d" : areaPath1(dat),
		                "fill" : "url(#"+(areaOption.fillStyle.id+index.toString())+")",
		                "opacity" : areaOption.opacity
		            }).transition().duration(700).attr("d", areaPath2(dat));
				}
				function drawAreaDot(dat, index){
					switch(areaOption.dotStyle.type){
					case 'circle':
						{
							chartArea.append("g").selectAll("circle").data(dat).enter().append("circle").attr({
								"cx" : function(d, i){return xInfo.xScale(xInfo.tickValue[i]);},
								"cy" : function(d, i){return yInfo.yScale(d);},
								"r" : areaOption.dotStyle.R,
								"fill" : areaOption.dotStyle.fill,
								"opacity" : 0
							}).transition().delay(700).duration(300).attr("opacity", areaOption.dotStyle.opacity);
						}
						break;
					case 'rect':
						{
							chartArea.append("g").selectAll("rect").data(dat).enter().append("rect").attr({
								"x" : function(d, i){return xInfo.xScale(xInfo.tickValue[i])-0.5*areaOption.dotStyle.width;},
								"y" : function(d, i){return yInfo.yScale(d)-0.5*areaOption.dotStyle.height;},
								"width" : areaOption.dotStyle.width,
								"height" : areaOption.dotStyle.height,
								"fill" : that.ChartConfig.color[index],
								"opacity" : 0
							}).transition().delay(700).duration(300).attr("opacity", areaOption.dotStyle.opacity);
						}
						break;
					case 'ring'://空心圆
						{
							chartArea.append("g").selectAll("circle").data(dat).enter().append("circle").attr({
								"cx" : function(d, i){return xInfo.xScale(xInfo.tickValue[i]);},
								"cy" : function(d, i){return yInfo.yScale(d);},
								"r" : areaOption.dotStyle.R,
								"fill" : 'none',
								"stroke" : that.ChartConfig.color[index],
								"stroke-width" : areaOption.dotStyle.borderWidth,
								"opacity" : 0
							}).transition().delay(700).duration(300).attr("opacity", areaOption.dotStyle.opacity);
						}
						break;
						default:
							break;
					}
				}
				function drawAreaText(dat){
					chartArea.append("g").selectAll("text").data(dat).enter().append("text").attr({
						"x" : function(d, i){return xInfo.xScale(xInfo.tickValue[i]);},
						"y" : function(d, i){return yInfo.yScale(d)-10;},
						"fill" : areaOption.textStyle.color,
						"font-size" : areaOption.textStyle.fontSize,
						"font-family" : areaOption.textStyle.fontFamily,
						"font-style" : areaOption.textStyle.fontStyle,
						"font-weight" : areaOption.textStyle.fontWeight,
						"text-anchor" : 'middle',
						"dy" : '.35em',
						"opacity" : 0
					})
					.text(function(d){return d;})
					.transition().delay(700).duration(300).attr("opacity", areaOption.dotStyle.opacity);
				}
				function drawLastText(dat){
					var lastText = chartArea.append("g").attr("class", "lastText");
					var index = dat.length-1;
					zhnx.utils.loadSvg(areaOption.lastTextSvg, function(importedNode){
						var plane = lastText.node().appendChild(importedNode.cloneNode(true));
						d3.select(plane).attr({
							"x" : xInfo.xScale(xInfo.tickValue[dat.length-1])-0.5*areaOption.lastTextRectWidth,
							"y" : yInfo.yScale(dat[index])-areaOption.lastTextRectWidth-5,
							"width": areaOption.lastTextRectWidth,
							"height": areaOption.lastTextRectWidth,
							"opacity" : 0
						}).transition().delay(700).duration(300).attr("opacity", areaOption.lastTextRectOpacity);
					});
					lastText.append("text").attr({
						"x" : xInfo.xScale(xInfo.tickValue[dat.length-1]),
						"y" : yInfo.yScale(dat[index])-0.5*areaOption.lastTextRectWidth-3,
						"font-size" : areaOption.lastTextFontSize,
						"text-anchor" : "middle",
						"fill" : "#fff",
						"opacity" : 0
					})
					.text(dat[index])
					.transition().delay(700).duration(300).attr("opacity", areaOption.dotStyle.opacity);
				}
			},
			drawBar : function(xInfo, yInfo, data) {
				var that = this, barOption = this.ChartConfig.bar;
				var barSvg = this.d3DrawImg.append("g").attr("class", "barSvg");
				var barCount=1 , xOffset=-0.5*barOption.barWidth;
				if(Object.prototype.toString.call(data[0]) === '[object Array]'){
					barCount = data.length;
					xOffset = -0.5*barCount*barOption.barWidth-Math.floor(barCount/2)*barOption.gapWidth;
					for(var i=0; i<data.length; ++i){						
						drawBarPath(data[i], xOffset, i);
						if(barOption.textShow){
							drawBarText(data[i], xOffset, i);
						}
						xOffset += barOption.barWidth+barOption.gapWidth;
					}
					
				}else{
					drawBarPath(data, xOffset, 0);
					if(barOption.textShow){
						drawBarText(data, xOffset, 0);
					}
				}
				function drawBarText(dat, xOffset, index){
					barSvg.append("g").selectAll("text").data(dat).enter().append("text").attr({
						"class" : function(d, i){return "textContent"+i;},
						"x" : function(d, i){return xInfo.xScale(xInfo.tickValue[i])+xOffset+0.5*barOption.barWidth;},
						"y" : function(d, i){return yInfo.yScale(0)-10;},
						"fill" : barOption.textStyle.color,
						"font-size" : barOption.textStyle.fontSize,
						"font-family" : barOption.textStyle.fontFamily,
						"font-style" : barOption.textStyle.fontStyle,
						"font-weight" : barOption.textStyle.fontWeight,
						"text-anchor" : 'middle',
						"dy" : '.35em',
						//"opacity" : 0
					})
					.each(function(d, i){
        				d3.select(this).append("tspan").attr({
        					"font-size" : barOption.textStyle.fontSize,
        					"fill" : barOption.textStyle.color,
        				}).text(d)
                        .transition().duration(barOption.areaDuration)
                        .tween("text", function(){
                    		var inter = d3.interpolate(0, d);
                    		return function(t) {
                                this.textContent = d3.round(inter(t), 0);
                            };
                        });
        			})
					.transition().delay(0).duration(barOption.areaDuration).ease(barOption.ease)
					.attr("y", function(d, i){return yInfo.yScale(d)-10;});
				}
				function drawBarPath(dat, xOffset, index){
					switch(barOption.type){
					case 'column':drawRectPath();
						break;
					case 'triangle':drawPathPath();
						break;
						default:
							break;
					}	
					function drawRectPath(){
						barSvg.append("g").selectAll("rect").data(dat).enter().append("rect").attr({
							"x" : function(d, i){return xInfo.xScale(xInfo.tickValue[i])+xOffset;},
							"y" : yInfo.yScale(0),
							"width" : barOption.barWidth,
							"height" : 0,
							"fill" : that.ChartConfig.color[index],
							"opacity" : barOption.opacity
						}).transition().duration(barOption.areaDuration).ease(barOption.ease).attr({
							"height" : function(d){return yInfo.yScale(0)-yInfo.yScale(d);},
							"y" : function(d){return yInfo.yScale(d);}
						});
					}
					function drawPathPath(){
						var x1, x2, x3, y1, y2, y3;
						barSvg.append("g").selectAll("path").data(dat).enter().append("path").attr({
							"d" : function(d, i){
								x1 = xInfo.xScale(xInfo.tickValue[i])+xOffset;
								y1 = yInfo.yScale(0);
								x2 = x1+0.5*barOption.barWidth;
								y2 = y1;
								x3 = x1+barOption.barWidth;
								y3 = y1;
								var startPath = "M"+x1+" "+y1+"L"+x2+" "+y2+"L"+x3+" "+y3+"L"+x1+" "+y1;
								return startPath;
							},
							"fill" : that.ChartConfig.color[index],
							"opacity" : barOption.opacity
						}).transition().duration(barOption.areaDuration).ease(barOption.ease).attr("d", function(d, i){
							x1 = xInfo.xScale(xInfo.tickValue[i])+xOffset;
							y1 = yInfo.yScale(0);
							x2 = x1+0.5*barOption.barWidth;
							y2 = yInfo.yScale(d);
							x3 = x1+barOption.barWidth;
							y3 = y1;
							var endPath = "M"+x1+" "+y1+"L"+x2+" "+y2+"L"+x3+" "+y3+"L"+x1+" "+y1;
							return endPath;
						});
					}
				}
			},
			drawPie : function(data, label) {
				
				var series = [];
				for(var i = 0; i < data.length; i++){
					series.push({
						y: data[i],
						name: label[i]
					});
				}
				var that = this;
				this.pieCfg = this.ChartConfig.pie;
				var pieContentWidth = this.width - this.ChartConfig.padding.left - this.ChartConfig.padding.right;
				var pieContendHeight = this.height - this.ChartConfig.padding.top - this.ChartConfig.padding.bottom;
		        var pieCenterX = pieContentWidth / 2 + this.ChartConfig.padding.left;
		        var pieCenterY = pieContendHeight / 2 + this.ChartConfig.padding.top;
		        if(this.pieCfg.isBgClick){
		        	this.rectG.append("rect").attr({
						"width":this.width,
						"height":this.height,
						"class":"rect",
						"fill":"rgba(255,255,255,0)"
			        }).on("click",function(){
			        	that.pieBgClick();
			        	that.InnerEvent.svgRectClick();
			        	that.OuterEvent.svgRectClick();
			        	//return false;
			        });
		        }
		        
		        this.pieParentGroup = this.d3DrawImg.append("g").attr({
					"transform": function(){
						return "translate(" + pieCenterX + "," + pieCenterY + ")";
					}
				});
				// 内外半径
				var innerRadius = Math.min(pieContentWidth, pieContendHeight) / 2 * this.pieCfg.radius[0];
				var outerRadius = Math.min(pieContentWidth, pieContendHeight) / 2 * this.pieCfg.radius[1];
				
				var dataCopy = data;
				var outerRadiusScale = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([outerRadius, outerRadius]);
				if(this.pieCfg.roseType == 'radius'){
					if(this.pieCfg.roseRadiusReverse){
						outerRadiusScale.range([outerRadius, Math.max(innerRadius, this.pieCfg.minRadius)]);
					}else{
						outerRadiusScale.range([Math.max(innerRadius, this.pieCfg.minRadius), outerRadius]);
					}
                }
				
				var pieLayout = d3.layout.pie()
					.startAngle(Math.PI * 2 / 360 * this.pieCfg.startAngle).endAngle(Math.PI * 2 + (Math.PI * 2 / 360 * this.pieCfg.startAngle))
					.value(function(d, i){
						return that.pieCfg.roseType == 'area' ? 1 : d;
					});
				var pieData = pieLayout.value(function(d){
					return d.y;
				})(series);
				// 暂时注销，不删除
//				pieData = pieData.map(function(d){
//			    	d.endAngle = Math.max(0, d.endAngle - pieCfg.radiusPadding);
//			    	return d;
//			    });
				// 反时钟旋转
				if(!this.pieCfg.clockwise){
					pieData.map(function(d, i){
						d.startAngle = -d.startAngle;
						d.endAngle = -d.endAngle;
						return d;
					});
				}
				// 绘制图形
				this.arcGroup = this.pieParentGroup.selectAll("path").data(pieData).enter().append("path")
				.attr({
					"class":"path",
					"fill": function (d, i) {
	        			return that.ChartConfig.color[i];
	        		},
	        		"fill-opacity": this.pieCfg.itemStyle.normal.opacity,
	        		"stroke": function(d,i){
	        			if(that.pieCfg.itemStyle.normal.borderColor instanceof Array){
	        				return that.pieCfg.itemStyle.normal.borderColor[i]
	        			}else{
	        				return that.pieCfg.itemStyle.normal.borderColor
	        			}
//	        			console.log(pieCfg.itemStyle.normal.borderColor instanceof Array)
	        			},
	        		"stroke-width": this.pieCfg.itemStyle.normal.borderWidth,
	        		"stroke-dasharray": function(d, i){
	        			return  that.pieCfg.itemStyle.normal.borderType != 'solid' ? "15,10" : "0";
	        		}
				});
				// 图形动画
				this.arcGroup.transition().duration(this.pieCfg.animation ? this.pieCfg.animationDuration : 0)
					.delay(this.pieCfg.animationDelay).ease(this.pieCfg.animationEasing)
					.attrTween('d', function (d, i) {
						var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value));
						if(that.pieCfg.roseType == 'circleArea'){	//中空扇形，和数据比例无关
							arc = d3.svg.arc().innerRadius(outerRadius/4).outerRadius(outerRadius/1.3+(i+1)*8);
						}
						
						if(that.pieCfg.animationMode=="EachSection"){
							
							var start = {
				                    startAngle:pieData[i].startAngle,
				                    endAngle: pieData[i].startAngle
				                };
				                var finish = {
				                    startAngle:pieData[i].startAngle,
				                    endAngle: pieData[i].endAngle
				                };
				                var i = d3.interpolate(start, finish);
				                return function (d) {
			                        return arc(i(d));
			                    }
						} else if(that.pieCfg.animationMode=="all"){
							var start = {
			                        startAngle: 0,
			                        endAngle: 0
			                    };
			                    var i = d3.interpolate(start, d);
			        			var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value));
			                    return function (d) {
			                        return arc(i(d));
			                    }
						}
					});
				// 中心点
				if(this.pieCfg.center.show){
					this.pieParentGroup.append("circle")
					.attr({
						"cx": 0,
						"cy": 0,
						"fill": this.pieCfg.center.color,
						"r": this.pieCfg.center.width,
						"stroke-width": this.pieCfg.center.borderWidth,
						"stroke": this.pieCfg.center.borderColor,
						"stroke-opacity": this.pieCfg.center.borderOpacity
					});
				}
				// 绘制label-----------------
				if(this.pieCfg.label.normal.show){
					var allcentroid = [], newPieData = pieData, labelTexts = [];
					// 绘制label
					var allLabel = this.pieParentGroup.selectAll("text").data(newPieData).enter().append("text").attr({
						"class": "label",
						"x": function(d, i){
							var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
							var x = 0, y = 0;
							if(that.pieCfg.label.normal.position == 'inside'){
								x = centroid[0];
								y = centroid[1];
							}else if(that.pieCfg.label.normal.position == 'outside'){
								var lineLen = that.pieCfg.labelLine.normal.length + that.pieCfg.labelLine.normal.length2;
								x = centroid[0] * 2 + (centroid[0] > 0 ? lineLen : - lineLen);
								y = centroid[1] * 2.2;
							}
							centroid[0] = x;
							centroid[1] = y;
							allcentroid.push(centroid);
							return x;
						},
						"fill": function(d,i){
							if(that.pieCfg.label.normal.textStyle.color instanceof Array){
								return that.pieCfg.label.normal.textStyle.color[i]
							}else{
								return that.pieCfg.label.normal.textStyle.color
							}
						},
						"font-style": this.pieCfg.label.normal.textStyle.fontStyle,
						"font-weight": this.pieCfg.label.normal.textStyle.fontWeight,
						"font-family": this.pieCfg.label.normal.textStyle.fontFamily,
						"font-size": this.pieCfg.label.normal.textStyle.fontSize,
						"text-anchor": function(d, i){
							var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
							return centroid[0] > 0 ? "start" : "end";
						},
						"dominant-baseline": "middle",
						"fill-opacity": 0
					}).each(function(d,i){
						var formatter = that.pieCfg.label.normal.formatter;
						var newType;
						if(d.data.name!=undefined||d.data.name!=null){
							newType = d.data.name;
						}else{
							newType = formatter;
						}
						var newTextArrayBot = "";
				        var textNumBot = that.pieCfg.label.normal.textNumBot;
				        if(newType.length>textNumBot){
				            var testBot = newType.substring(0,textNumBot)//截取个数
				            var testBot2 = newType.substring(textNumBot,newType.length)
				            newTextArrayBot=testBot+","+testBot2;//使用符号将前后连接起来
				        }else{
				        	newTextArrayBot = newType
				        }
				        var strsBot = newTextArrayBot.split(",") ;
				        var textAllBot = d3.select(this)
						textAllBot.selectAll("tspan")
			            .data(strsBot)
			            .enter()
			            .append("tspan")
			            .attr("x",textAllBot.attr("x"))
			            .attr("dy",function(d,i){
			            	if(that.pieCfg.label.normal.doubleLable.show){ return (1+0.2*i)+"em" }else{ return (1.2*i)+"em" }
			            })
			            .text(function(d,i){ return formatter = d;});
					})
					.each(function(){
						labelTexts.push(d3.select(this).text().length);
					});
					
					//添加数据的label
					if(this.pieCfg.label.normal.doubleLable.show){
						var dataSum = d3.sum(data);
						this.pieParentGroup.append("g").selectAll("text").data(newPieData).enter().append("text").text(function(d,i){
							if(that.pieCfg.label.normal.doubleLable.isPercent){
								var newPercentNum = (d.data.y/dataSum).toFixed(4)
								var percentNumSlice = newPercentNum.slice(2,newPercentNum.length);
								var num1 = percentNumSlice.slice(0,(percentNumSlice.length/2-1));
							    var num2 = percentNumSlice.slice((percentNumSlice.length/2-1),percentNumSlice.length/2);
							    var num3 = percentNumSlice.slice((percentNumSlice.length/2),percentNumSlice.length);
							    if(num1==0){ num1=""}
								return (num1+num2+"."+num3) +"%"
							}else{
								return d.data.y
							}
						})
						.attr({
							"class": "numLabel",
							"position":"relative",
							"x": function(d, i){
								var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
								var x = 0, y = 0;
								if(that.pieCfg.label.normal.position == 'inside'){
									x = centroid[0];
									y = centroid[1];
								}else if(that.pieCfg.label.normal.position == 'outside'){
									var lineLen = that.pieCfg.labelLine.normal.length + that.pieCfg.labelLine.normal.length2;
									x = centroid[0] * 2 + (centroid[0] > 0 ? lineLen : - lineLen);
									y = centroid[1] * 2.2;
								}
								centroid[0] = x;
								centroid[1] = y;
								allcentroid.push(centroid);
								return x;
							},
							"y": function(d,i){
								var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
								var x = 0, y = 0;
								if(that.pieCfg.label.normal.position == 'inside'){
									x = centroid[0];
									y = centroid[1];
								}else if(that.pieCfg.label.normal.position == 'outside'){
									var lineLen = that.pieCfg.labelLine.normal.length + that.pieCfg.labelLine.normal.length2;
									x = centroid[0] * 2 + (centroid[0] > 0 ? lineLen : - lineLen);
									y = centroid[1] * 2.2;
								}
								centroid[0] = x;
								centroid[1] = y;
								allcentroid.push(centroid);
								return y;
							},
							"fill": function(d,i){
								if(that.pieCfg.label.normal.doubleLable.textColor instanceof Array){
									return that.pieCfg.label.normal.doubleLable.textColor[i]
								}else{
									return that.pieCfg.label.normal.doubleLable.textColor
								}
							},
							"font-style": this.pieCfg.label.normal.doubleLable.fontStyle,
							"font-weight": this.pieCfg.label.normal.doubleLable.fontWeight,
							"font-family": this.pieCfg.label.normal.doubleLable.fontFamily,
							"font-size": this.pieCfg.label.normal.doubleLable.fontSize,
							"text-anchor": function(d, i){
								var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
								return centroid[0] > 0 ? "start" : "end";
							},
							"dominant-baseline": "middle",
							"fill-opacity": 0
						})
						.transition().duration(0).delay((this.pieCfg.animation ? this.pieCfg.animationDuration : 0) + this.pieCfg.animationDelay)
			        	.attr({
			        		"fill-opacity": 1
			        	});
					}
					
					
					//暂不删除
//					.text(function(d, i){
//						var formatter = that.pieCfg.label.normal.formatter;
//						console.log(d.data.name)
//						
//						
//						formatter = formatter.replace("{c}", d.data.name);
//						return formatter;
//					}).each(function(){
//						labelTexts.push(d3.select(this).text().length);
//					});
					//绘制不需数据的圆1
					if(this.pieCfg.pieCircle.show){
						var drawCircle = this.pieParentGroup.append("circle").attr({
							"class": "drawCircle",
							"cx": this.pieCfg.pieCircle.cx,
							"cy": this.pieCfg.pieCircle.cy,
							"fill": this.pieCfg.pieCircle.color,
							"r": this.pieCfg.pieCircle.r*outerRadius,
							"stroke": this.pieCfg.pieCircle.border,
							"stroke-width":this.pieCfg.pieCircle.borderWidth
						})
					}
					//绘制不需数据的圆2
					if(this.pieCfg.pieCircle2.show){
						var drawCircle2 = this.pieParentGroup.append("circle").attr({
							"class": "drawCircle2",
							"cx": this.pieCfg.pieCircle2.cx,
							"cy": this.pieCfg.pieCircle2.cy,
							"fill": this.pieCfg.pieCircle2.color,
							"r": this.pieCfg.pieCircle2.r*outerRadius,
							"stroke": this.pieCfg.pieCircle2.border,
							"stroke-width":this.pieCfg.pieCircle2.borderWidth
						})
					}
					//绘制不需数据的环
					if(this.pieCfg.smallPie.show){
						var smallPieCircle = this.pieParentGroup.append("g").attr("class","smallPieCircle");
						 var innerData = [];
					        for(var j = 0;j<this.pieCfg.smallPie.dataNum;j++){
					            innerData.push(1)
					        }
					        var inner_pie=d3.layout.pie()       //定义饼状布局
					            .value(function(d){  return d; });       //值访问器
	
					        var inner_pieData=inner_pie(innerData);
	
					        smallPieCircle.selectAll("g").remove();
	
					        var inner_arcs = smallPieCircle.selectAll("g")
				            .data(inner_pieData)
				            .enter()
				            .append("g")
				            .each(function(d){
				                var margin = that.pieCfg.smallPie.intervalNum;
				                d.startAngle += margin;
				                d.endAngle -= margin;
				            });
	
					        var inner_arc = d3.svg.arc()
				            .innerRadius(this.pieCfg.smallPie.inner*outerRadius)
				            .outerRadius(this.pieCfg.smallPie.outer*outerRadius);
	
					        inner_arcs.append("path") 
				            .attr("fill",this.pieCfg.smallPie.color)
				            .transition()
				            .duration(this.pieCfg.smallPie.animateTime)
				            .attrTween("d",function(d,i){
				                var start = {
				                    startAngle:inner_pieData[i].startAngle,
				                    endAngle: inner_pieData[i].startAngle
				                };
				                var finish = {
				                    startAngle:inner_pieData[i].startAngle,
				                    endAngle: inner_pieData[i].endAngle
				                };
				                var i = d3.interpolate(start, finish);
				                return function (d) {
				                    return inner_arc(i(d));
				                }
				            });
					}
					
					// y轴定位
					for(var i = 0; i < allcentroid.length; i++){
						for(var j = i + 1; j < allcentroid.length; j++){
							if((allcentroid[i][0] < 0 && allcentroid[j][0] < 0)){
								if(Math.abs(allcentroid[i][1] - allcentroid[j][1]) < this.pieCfg.label.normal.textStyle.fontSize
										&& Math.abs(allcentroid[i][0] - (labelTexts[i] * this.pieCfg.label.normal.textStyle.fontSize) - allcentroid[j][0]) < this.pieCfg.label.normal.textStyle.fontSize){
									allcentroid[j][1] = allcentroid[i][1] - this.pieCfg.label.normal.textStyle.fontSize * 1.5;
									allcentroid[j][0] += this.pieCfg.label.normal.textStyle.fontSize;
								}
								break;
							}else if((allcentroid[i][0] > 0 && allcentroid[j][0] > 0)){
								if(Math.abs(allcentroid[i][1] - allcentroid[j][1]) < this.pieCfg.label.normal.textStyle.fontSize
										&& Math.abs(allcentroid[i][0] + (labelTexts[i] * this.pieCfg.label.normal.textStyle.fontSize) - allcentroid[j][0]) < this.pieCfg.label.normal.textStyle.fontSize){
									allcentroid[j][1] = allcentroid[i][1] + this.pieCfg.label.normal.textStyle.fontSize * 1.5;
								}
								break;
							}
						}
					}	
					// 重定位y轴
					allLabel.attr({
						"y": function(d, i){
							var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
							var y = 0;
							if(that.pieCfg.label.normal.position == 'inside'){
								y = centroid[1];
							}else if(that.pieCfg.label.normal.position == 'outside'){
								y = allcentroid[i][1];
							}
							allcentroid[i][1] = y;
							return y;
						}
					})
					.transition().duration(0).delay((this.pieCfg.animation ? this.pieCfg.animationDuration : 0) + this.pieCfg.animationDelay)
		        	.attr({
		        		"fill-opacity": 1
		        	});
						// 画线
					if(this.pieCfg.labelLine.normal.show){
						var allLabelLine = this.pieParentGroup.selectAll(".labelLine").data(newPieData).enter().append("path").attr({
							"d": function(d, i){
								var centroid = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadiusScale(d.value)).centroid(d);
								var M = "M" + centroid.join(" ") + " ";
								var L = "L" + (allcentroid[i][0] + ((allcentroid[i][0] > 0) ? -that.pieCfg.labelLine.normal.length2 : that.pieCfg.labelLine.normal.length2))
									+ " " + allcentroid[i][1] + " ";
								var L2 = allcentroid[i].join(" ");
								return M + L + L2;
							},
			        		"fill": "none",
							"stroke": function(d,i){
								if(that.pieCfg.labelLine.normal.lineStyle.color instanceof Array){
									return that.pieCfg.labelLine.normal.lineStyle.color[i]
								}else{
									return that.pieCfg.labelLine.normal.lineStyle.color
								}
							},
							"stroke-width": this.pieCfg.labelLine.normal.lineStyle.width,
							"stroke-opacity": 0,
			        		"stroke-dasharray": function(d, i){
			        			return  that.pieCfg.labelLine.normal.lineStyle.type != 'solid' ? "15,10" : "0";
			        		}
						})
						.transition().duration(0).delay((this.pieCfg.animation ? this.pieCfg.animationDuration : 0) + this.pieCfg.animationDelay)
			        	.attr({
			        		"stroke-opacity": this.pieCfg.labelLine.normal.lineStyle.opacity
			        	});
					}
				}

				// 点击可选中
				this.arcGroup.attr({
					 "cursor": this.pieCfg.selectedMode ? "pointer" : "auto"
				}).on('click', function(d, i){
					var arc = that.pieParentGroup.selectAll("path")[0][i];
					var dStart = d.startAngle;
					var dEnd = d.endAngle;
					that.pieClick(dStart,dEnd,i);
					that.InnerEvent.pathClick(dStart,dEnd,i);
					that.OuterEvent.pathClick(dStart,dEnd,i);
					//return false;
				});
			},
			drawRadar : function(data) {	//雷达图
				var that = this;
				var RadarConfig = $.extend(true, this.ChartConfig.radar, data)	
				var gRadarGroup = this.d3DrawImg.append("g").attr("class","gRadarGroup").attr("transform","translate("+this.width/2+","+this.height/2+")");
				
				var blobWrapper = gRadarGroup.append("g").attr("class","blobWrapper");
				var axisLine = gRadarGroup.append("g").attr("class","axisLine");
				var axisCircle = gRadarGroup.append("g").attr("class","axisCircle");
				var axisText = gRadarGroup.append("g").attr("class","axisText");
				
			    var total = data.length;
				var angleSlice = Math.PI * 2 / total;
				var axis = axisLine.selectAll(".axis").data(data).enter().append("g").attr("class", "axis");
				var maxNum = d3.max(data);
				var rScale = d3.scale.linear().range([0, (RadarConfig.r)*(1+(RadarConfig.splitNumber)*0.4)]).domain([0, maxNum]);
				var filter = gRadarGroup.append('defs').append('filter').attr('id','glow');
	            var feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur');
	            var feMerge = filter.append('feMerge'),
	            feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
	            feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	           
				
				/*-------绘制底部图形------*/
				if(RadarConfig.radarBottomLineStyle.isShow==true||RadarConfig.radarBottomLineStyle.isShow==undefined||RadarConfig.radarBottomLineStyle.isShow==""){
					switch (RadarConfig.shape) {
					case 'circle':
					{
						for(var i = 0;i<RadarConfig.splitNumber;i++){	
							var bottomImg = gRadarGroup.append("g").attr("class","bottomImg")
							.append("circle")
					        .attr({
					        	"r": function(){return RadarConfig.r*(1+(i+1)*0.4)},
					        	"stroke": RadarConfig.radarBottomLineStyle.stroke,
					        	"stroke-width": RadarConfig.radarBottomLineStyle.strokeWidth,
					        	"fill": RadarConfig.radarBottomLineStyle.fill,
					        	"stroke-dasharray": RadarConfig.radarBottomLineStyle.strokeDasharray,
					        	"opacity": RadarConfig.radarBottomLineStyle.lineOpacity
					        });
						}						
						break;
					}
					case 'polygon':
					{
						var bottomImg;
						for(var j = 0;j<RadarConfig.splitNumber;j++){	
							bottomImg = gRadarGroup.append("g").attr("class","bottomImg")
							.selectAll("line")
				            .data(d3.range(1,(data.length+1)).reverse())
				            .enter()
				            .append("line")
				            .attr("transform",'scale('+0+','+0+')')
				            .transition()
				            .duration(RadarConfig.animateTime)
				            .attr({
				                "transform": 'scale('+1+','+1+')',
				                "x1": function(d,i){ return RadarConfig.r*(1+(j+1)*0.4)*Math.cos(angleSlice*i - Math.PI/2); },
				                "y1": function(d,i){ return RadarConfig.r*(1+(j+1)*0.4)*Math.sin(angleSlice*i - Math.PI/2); },
				                "x2": function(d,i){ return RadarConfig.r*(1+(j+1)*0.4)*Math.cos(angleSlice*(i+1) - Math.PI/2); },
				                "y2": function(d,i){ return RadarConfig.r*(1+(j+1)*0.4)*Math.sin(angleSlice*(i+1) - Math.PI/2); },
				                "stroke": RadarConfig.radarBottomLineStyle.stroke,
				                "stroke-width": RadarConfig.radarBottomLineStyle.strokeWidth,
//				                "fill-opacity": RadarConfig.radarBottomLineStyle.lineOpacity
				            });
						}						
						break;
					}
				}
					
			  //绘制上部图形(图形边框和背景)
		        var radarLine = d3.svg.line.radial()
		            .interpolate("linear")
		            .radius(function(d) { return rScale(d); })
		            .angle(function(d,i) { return i*angleSlice; });

//		        //区域边框
		        blobWrapper.selectAll("g").data(data).enter().append("g").append("path")
		            .attr("transform",'scale('+0+','+0+')')
		            .transition()
		            .duration(RadarConfig.animateTime)
		            .delay(RadarConfig.animateTime)
		            .attr("d", function() { return radarLine(data); })
		            .attr({
		                "transform": 'scale('+1+','+1+')',
//		                "class": "radarStroke",
		                "stroke-width":RadarConfig.radarTopImgStyle.strokeWidth,
		                "stroke": RadarConfig.radarTopImgStyle.stroke,
		                "stroke-dasharray": RadarConfig.radarTopImgStyle.strokeDasharray,
		                "fill": RadarConfig.radarTopImgStyle.lineFill,
		                "opacity": RadarConfig.radarTopImgStyle.lineOpacity,
		                "filter" : "url(#glow)"	//添加类似阴影部分
		            });

		        //背景（整个颜色块，设置透明度）
		        blobWrapper
		            .append("path")
		            .attr({
		            	 "class": "radarArea",
		            	 "fill": RadarConfig.radarTopImgStyle.backgroundFill,
		                 "fill-opacity": RadarConfig.radarTopImgStyle.backgroundOpacity
		            })
		            .attr("d", function() {return radarLine(data);})
		            .on('mouseover', function (d,i){
		                d3.selectAll(".radarArea").transition().duration(200).attr("fill-opacity", 0.2);
		               
		                d3.select(this).transition().duration(200).attr("fill-opacity", 0.7);
		            })
		            .on('mouseout', function(){
		                d3.selectAll(".radarArea").transition().duration(200).style("fill-opacity", RadarConfig.radarTopImgStyle.backgroundOpacity);
		            })
		            .attr("transform",'scale('+0+','+0+')')
		            .transition()
		            .duration(RadarConfig.animateTime)
		            .delay(RadarConfig.animateTime)
		            .attr("transform",'scale('+1+','+1+')')
			  //绘制放射线
				if(RadarConfig.radarAxisLineStyle.isShow==true||RadarConfig.radarAxisLineStyle.isShow==undefined||RadarConfig.radarAxisLineStyle.isShow==""){
					axis.append("line")
		            .attr("transform",'scale('+0+','+0+')')
		            .transition()
		            .duration(RadarConfig.animateTime)
		            .delay(RadarConfig.animateTime*2/3)
		            .attr({
		                "transform": 'scale('+1+','+1+')',
		                "x1": 0,
		                "y1": 0,
		                "x2": function(d, i){
			                	if(RadarConfig.shape=="polygon"){
			                		return RadarConfig.r*(1+(RadarConfig.splitNumber)*0.4)*RadarConfig.radarAxisLineStyle.maxValue* Math.cos(angleSlice*i - Math.PI/2);
			                	}else if(RadarConfig.shape=="circle"){
			                		return RadarConfig.r*(1+(RadarConfig.splitNumber)*0.4)*RadarConfig.radarAxisLineStyle.maxValue* Math.cos(angleSlice*i - Math.PI/2);
			                	}
		                	},
		                "y2": function(d, i){
			                	if(RadarConfig.shape=="polygon"){
			                		return RadarConfig.r*(1+(RadarConfig.splitNumber)*0.4)*RadarConfig.radarAxisLineStyle.maxValue* Math.sin(angleSlice*i - Math.PI/2);
			                	}else if(RadarConfig.shape=="circle"){
			                		return RadarConfig.r*(1+(RadarConfig.splitNumber)*0.4)*RadarConfig.radarAxisLineStyle.maxValue* Math.sin(angleSlice*i - Math.PI/2);
			                	}
		                	 },
		                "stroke-dasharray": RadarConfig.radarAxisLineStyle.strokeDasharray,
		                "stroke": RadarConfig.radarAxisLineStyle.stroke,
		                "stroke-width": RadarConfig.radarAxisLineStyle.strokeWidth,
		                "fill-opacity": RadarConfig.radarAxisLineStyle.lineOpacity
		            });
				}
				
			//绘制交点
				if(RadarConfig.radarCircleStyle.isShow==true||RadarConfig.radarCircleStyle.isShow==undefined||RadarConfig.radarCircleStyle.isShow==""){
//					switch (RadarConfig.shape) {
//					case 'circle':
//					  {
						blobWrapper.selectAll(".radarCircle")
			            .data(data).enter().append("circle")
			            .attr("transform",'scale('+0+','+0+')')
			            .transition()
			            .duration(RadarConfig.animateTime)
			            .delay(RadarConfig.animateTime*2/3)
			            .attr({
			                "class": "radarCircle",
			                "transform": 'scale('+1+','+1+')',
			                "r": RadarConfig.radarCircleStyle.symbolCircleStyle.r,
			                "cx": function(d,i){ return rScale(d) * Math.cos(angleSlice*i - Math.PI/2); },
			                "cy": function(d,i){ return rScale(d)* Math.sin(angleSlice*i - Math.PI/2); },
			                "fill": "white",
			                "stroke": RadarConfig.radarCircleStyle.symbolStyle.stroke,
			                "stroke-width": RadarConfig.radarCircleStyle.symbolStyle.strokeWidth,
			                "fill-opacity": RadarConfig.radarCircleStyle.symbolStyle.opacity
			            });
						
						//绘制文字
						//每层圆圈的数值（百分比）
						var radar_Text = that.series.label[0];//获取文字
						var format = d3.format('%');
						axisText.selectAll(".axisLabel")
				            .data(d3.range(1,(RadarConfig.splitNumber+1)).reverse())
				            .enter().append("text")
				            .attr("transform",'scale('+1.2+','+1.2+')')
				            .transition()
				            .duration(RadarConfig.animateTime)
				            .delay(RadarConfig.animateTime*2/3)
				            .ease("bounce")
				            .text(function(d,i) {
				            	if(RadarConfig.radarTextStyle.nei.isShow==undefined||RadarConfig.radarTextStyle.nei.isShow==""||RadarConfig.radarTextStyle.nei.isShow==true){
				            		return format(maxNum * d/(RadarConfig.splitNumber*100)) }
				            	})
				            .attr({
				                "transform": 'scale('+1+','+1+')',
				                "class": "axisLabel",
				                "x": RadarConfig.radarTextStyle.nei.x,
				                "y": function(d){return -d*RadarConfig.r*(1+(RadarConfig.splitNumber)*0.4)*RadarConfig.radarAxisLineStyle.maxValue/RadarConfig.splitNumber;},
				                "dy": RadarConfig.radarTextStyle.nei.dy,
				                "font-size": RadarConfig.radarTextStyle.nei.fontSize,
				                "fill": RadarConfig.radarTextStyle.nei.color,
				                "text-anchor": RadarConfig.radarTextStyle.wai.textAnchor,
				                "font-family": RadarConfig.radarTextStyle.nei.fontFamily
				            });
						//放射线对应的名称
				        var axisGrid = axisText.selectAll(".axisGrid")
				            .data(radar_Text)
				            .enter()
				            .append("g")
				            .attr("class", "axisGrid");
				        var text_line= axisGrid.append("text")
				            .attr("transform",'scale('+0+','+0+')')
				            .transition()
				            .duration(RadarConfig.animateTime)
				            .attr({
				                "transform": 'scale('+1+','+1+')',
				                "class": "legend",
				                "font-size": RadarConfig.radarTextStyle.nei.fontSize,
				                "font-family": RadarConfig.radarTextStyle.nei.fontFamily,
				                "text-anchor": RadarConfig.radarTextStyle.nei.textAnchor,
				                "fill": RadarConfig.radarTextStyle.nei.color,
				                "dy": RadarConfig.radarTextStyle.nei.dy,
				                "x": function(d, i){return rScale(maxNum * RadarConfig.radarTextStyle.labelFactor) * Math.cos(angleSlice*i - Math.PI/2);},
				                "y": function(d, i){ return rScale(maxNum * RadarConfig.radarTextStyle.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); }
				            })
				            .text(function(d){
				            	if(RadarConfig.radarTextStyle.wai.isShow==undefined||RadarConfig.radarTextStyle.wai.isShow==""||RadarConfig.radarTextStyle.wai.isShow==true){
				            		return d;}
				            	});
//						break;
					  }
					}
				
				
//				}		
//			}	
			},
			drawMap : function(series){
				var that = this;
				var transX = (this.width - this.ChartConfig.padding.left - this.ChartConfig.padding.right) / 2 + this.ChartConfig.padding.left;
				var transY = (this.height - this.ChartConfig.padding.top - this.ChartConfig.padding.bottom) / 2 + this.ChartConfig.padding.top;
				var projection = d3.geo.mercator().translate([transX, transY]).center(this.ChartConfig.map.center).scale(this.ChartConfig.map.scale);
		        var geoPath = d3.geo.path().projection(projection);
		        
		        
				d3.json("data/" + this.ChartConfig.map.map + ".json", function (errot, root) {
					var cities = that.d3DrawImg.append("g").selectAll("path").data(root.features).enter()
		                .append("path").attr({
		                    "stroke": d3.rgb(106, 186, 252).toString(),
		                    "stroke-width": 2,
		                    "fill": "rgba(0, 0, 0, 0)",
		                    "d": geoPath
		                });
					// 数据绘制
					var dataPoints = that.d3DrawImg.append("g").selectAll("circle").data(series).enter()
						.append("circle").attr({
							"cx": function(d, i){
								return projection([d.lng, d.lat])[0];
							},
							"cy": function(d, i){
								return projection([d.lng, d.lat])[1];
							},
							"fill": "blue",
							"r": 4
						});
					var dataPointTexts = that.d3DrawImg.append("g").selectAll("text").data(series).enter()
						.append("text").attr({
							"x": function(d, i){
								return projection([d.lng, d.lat])[0] + 10;
							},
							"y": function(d, i){
								return projection([d.lng, d.lat])[1];
							},
							"fill": "#FFF",
							"fill-opacity": 0,
				            "text-anchor": "start",
				            "dominant-baseline": "middle",
				            "font-family": "Microsoft Yahei"
						}).text(function(d){
							return d.stationname;
						});
					
					
					var initTran = projection.translate();
					var initScal = projection.scale();
					var zoom = d3.behavior.zoom().scaleExtent([that.ChartConfig.map.scaleLimit.min, that.ChartConfig.map.scaleLimit.max])
						.center([transX, transY])
						.on('zoom', function(d){
							if(d3.event.scale == 1){
								projection.translate(initTran);
							}else{
								projection.translate([initTran[0] + d3.event.translate[0], initTran[1] + d3.event.translate[1]]);
							}
							projection.scale(initScal * d3.event.scale);
							cities.attr("d", geoPath);
							dataPoints.attr({
								"cx": function(d, i){
									return projection([d.lng, d.lat])[0];
								},
								"cy": function(d, i){
									return projection([d.lng, d.lat])[1];
								}
							});
							dataPointTexts.attr({
								"x": function(d, i){
									return projection([d.lng, d.lat])[0] + 10;
								},
								"y": function(d, i){
									return projection([d.lng, d.lat])[1];
								},
								"fill-opacity" : function(d, i){
									return d3.event.scale > 2.5 ? 1 : 0;
								}
							})
						});
					
					that.d3Container.call(zoom);
				});
			}
		};
		$.extend(xCharts.prototype, ChartComponents);

		// 图表
		var Charts = {
			drawLineChart: function(series){
				var that = this;
				this.FormateData(series);
				this.drawTitle();
				this.drawGroup();
				this.drawLegend(this.series.legend[0]);
				var yInfo = this.drawYAxis(this.series.data[this.idx.g]);
				var xInfo = this.drawXAxis(this.series.label[this.idx.g]);
				this.drawGrid(xInfo, yInfo);
				this.drawLine(this.series.data[0], xInfo, yInfo);
				this.setInnerEvent({
					groupselected: function(idx){
						that.drawLegend(that.series.legend[idx]);
						var yInfo = that.drawYAxis(that.series.data[idx]);
						var xInfo = that.drawXAxis(that.series.label[idx]);
						that.drawGrid(xInfo, yInfo);
						that.drawLine(that.series.data[idx],xInfo,yInfo);
					}
				});
			},
			
			drawAreaChart : function(series){
				var that = this;
				this.FormateData(series);
				this.drawTitle();
				this.drawGroup();
				this.drawLegend(this.series.legend[0]);
				var yInfo = this.drawYAxis(this.series.data[this.idx.g]);
				var xInfo = this.drawXAxis(this.series.label[this.idx.g]);
				this.drawGrid(xInfo, yInfo);
				this.drawArea(xInfo, yInfo, this.series.data[0]);
				this.setInnerEvent({
					groupselected: function(idx){
						that.drawLegend(that.series.legend[idx]);
						var yInfo = that.drawYAxis(that.series.data[idx]);
						var xInfo = that.drawXAxis(that.series.label[idx]);
						that.drawGrid(xInfo, yInfo);
						that.drawArea(xInfo, yInfo, that.series.data[idx]);
					}
				});
			},
			
			drawBarChart : function(series){
				var that = this;
				this.FormateData(series);
				this.drawTitle();
				this.drawGroup();
				this.drawLegend(this.series.legend[0]);
				var yInfo = this.drawYAxis(this.series.data[this.idx.g]);
				var xInfo = this.drawXAxis(this.series.label[this.idx.g]);
				this.drawGrid(xInfo, yInfo);
				this.drawBar(xInfo, yInfo, this.series.data[0]);
				this.setInnerEvent({
					groupselected: function(idx){
						that.drawLegend(that.series.legend[idx]);
						var yInfo = that.drawYAxis(that.series.data[idx]);
						var xInfo = that.drawXAxis(that.series.label[idx]);
						that.drawGrid(xInfo, yInfo);
						that.drawBar(xInfo, yInfo, that.series.data[idx]);
					}
				});
			},

			drawRadarChart: function(series){
				var that = this;
				this.drawTitle();
				this.FormateData(series);
				this.drawRadar(this.series.data[0][0]);
			},
			drawPieChart: function(series){
				var that = this;
				this.drawTitle();
				this.FormateData(series);
				this.drawPie(this.series.data[0][0], this.series.label[0]);
			},
			drawMapChart: function(series){
				var that = this;
				$.ajax({
					type: 'post',
					url: 'weather/station/Stationinfo.do',
					success: function(d){
						that.drawMap(d.series);
					}
				});
			},
			drawWeatherArea : function(series){
				this.FormateData(series);
				this.drawBackground();
				this.drawTitle();
				var xInfo = this.drawXAxis(this.series.label[0]);
				var yInfo = this.drawYAxis(this.series.data[0]);
				this.drawGrid(xInfo, yInfo);
				this.drawLine(this.series.data[0], xInfo, yInfo);
				this.drawArea(xInfo, yInfo, this.series.data[0]);
			},
			drawWeatherLine : function(series){
				this.FormateData(series);
				this.drawBackground();
				this.drawTitle();
				var xInfo = this.drawXAxis(this.series.label[0]);
				var yInfo = this.drawYAxis(this.series.data[0]);
				this.drawGrid(xInfo, yInfo);
				this.drawLine(this.series.data[0], xInfo, yInfo);
			}
		};
		$.extend(xCharts.prototype, Charts);

		// end
		xCharts.prototype.init.prototype = xCharts.prototype;
		return xCharts;
	})();

	// end
	window.xCharts = xCharts;
})(window);