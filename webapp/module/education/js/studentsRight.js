$(function() {
	function right() {
		this.init();
	}
	right.prototype = $.extend({}, zhnx.chartInit, {
		constructor : right,
		selector : "#rightZone",
		pagePath : "module/education/students",
		init : function() {
			// 全区学生情况标题
			this.drawRightTitle("studentRight1", {}, {
				title : "全区总体情况"
			}, {
				width : 320,
				height : 110
			});
			// 全区学校情况
			this.drawEduRight("school", {
				url : "education/right/getEduRight.do"
			}, {
				title : [ "全区学校情况", "全区学生情况", "全区教职工情况" ],
				svgResource : [ "svg/education/quanquyoucexuexiao.svg",
						"svg/education/quanquyoucexuesheng.svg",
						"svg/education/quanquyoucejiaozhigong.svg" ]
			}, {
				width : 890,
				height : 950
			});
		}
	});

	zhnx.rightObj = new right();
});