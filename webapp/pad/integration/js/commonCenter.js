$(function() {
	function center(){
		this.init();
	}
	center.prototype = $.extend({}, zhnx.chartInit, {
		constructor: center,
		selector: "#centerZone",
		init: function(){
			var that = this;
			$(that.selector).find(".Ul_List > li[url='#']").find("a").css({
				"color": "#AAA"
			});
			// #ffff00
			$(that.selector).find(".Ul_List > li[url!='#']").on("click", function(){
				$(that.selector).find(".Ul_List > li[url!='#']").find("a").css({
					"color": "#103994"
				});
				$(this).find("a").css({
					"color": "#ffff00"
				});
				var liNo = $(this).attr("no");
				that.switchUrlCommand({
					type: 'click',
					context: 'centerObj',
					contextType: 'cenObj',
					execString: "that.switchUrl(" + liNo + ")",
					execMode: 'evalfunc'
				});
			});
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