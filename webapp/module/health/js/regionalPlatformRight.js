$(function() {
	function right(){
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor: right,
		selector: "#rightZone",
		pagePath: "module/education/resourcePlatform",
		init: function(){
			this.drawHealthRightTop("resourcePlatformRight1",{},{
				series: [
				                 {
				                     title: "卫生机构资源",
				                     unit: "家",
				                     leftTopName:"医疗卫生机构总数",
				                     leftNumL: 1835,
				                     leftBottomName:"与上年相比",
				                     leftIcon: "tongbizengzhang",
				                     leftBottomNum: "2%",
				                     iconSvg:["yiyuan","jicengyiliaoweishengjigou","zhuanyegonggongweishengjigou","qitajigou"],
				                     type:["医院","基层卫生医疗机构","专业公共卫生机构","其他机构"],
				                     value:[168,1528,82,57]
				                 },{
				                	 title: "卫生人力资源",
				                     unit: "人",
				                     leftTopName:"卫生技术人员总数",
				                     leftNumL: 41351,
				                     leftBottomName:"与上年相比",
				                     leftIcon: "tongbizengzhang",
				                     leftBottomNum: "4%",
				                     iconSvg:["zhiyeyishi","zhiyehushi","gongqinrenyuan","guanlirenyuan"],
				                     type:["执业（助理）医师","执业（助理）护士","工勤人员","管理人员"],
				                     value:[1403,16150,3230,1513]
				                 }
				             ]
			},{
				width : 930,
				height : 580
			});
			
			this.drawHealthRightMiddle("resourcePlatformRight2",{},{
				title:"卫生财政资源",
				unit:["（万元）","（万元）"],
				series: {
					iconUrl:["zongshouru","zongzhichu"],
					type:["总收入","总支出"],
					value:[1495,1447]
				}
			},{
				width : 930,
				height : 260
			});
			
			//右边-卫生床位资源
			this.drawHealthRightBottom("resourcePlatformRight3",{},{
				title:"卫生床位资源",
				dataList:{
					type:["实有床位数(张)","医生床位比","护士床位比"],
					num:["33 804","1:2.34","1:2.10"]
				},
			},{
				width:930 ,
				height:260
			});
			
			
		}
	});
	
	zhnx.rightObj = new right();
});