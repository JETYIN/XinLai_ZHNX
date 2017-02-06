$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		init: function(){
			var that  = this;
			// 不可用的置灰
			$(".hashTabber-nav").find("li[url='#'] > a").css({
				"color": "#666666"
			});
			// 可用的添加点击事件
			$(".hashTabber-nav").find("li[url!='#']").on("click", function(){
				var li = $(this), liNo = li.attr("No");
				that.switchUrl(liNo);
				that.switchUrlCommand({
					type: 'click',
					context: 'centerObj',
					contextType: 'cenObj',
					execString: "that.switchUrl(" + liNo + ")",
					execMode: 'evalfunc'
				});
			});
		},
		switchUrl: function(liNo){
			var that = this, url = $(".hashTabber-nav").find("li[No='" + liNo + "']").attr("url");
			// add and remove class
			$(".hashTabber-nav").find("li").removeClass('active');
			$(".hashTabber-nav").find("li[No='" + liNo + "']").addClass('active');
			// 切换iframe
			$(that.selector).find("iframe").remove();
			$(that.selector).append($("<iframe></iframe>").attr("src", url));
		},
		switchUrlCommand: function(commandArgs){
			var command = $.extend({
				level: 2,
				mutexSameLevel: true,
				mutexNextLevel: true,
				ignoreHistory: true
			}, commandArgs);
        	zhnx.websocket.send(command);
		}
	});
	// 复制中间对象到全局变量
	zhnx.centerObj = new center();
});