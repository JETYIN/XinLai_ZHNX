$(function() {
	function login() {
		this.init();
	}
	login.prototype = {
		constructor : login,
		bodyMovePx: 0,
		init : function() {
			var that = this;
			zhnx.getWebLoginUser(function(d){
				console.info(d);
				if(d.bodyMovePx == null){
					that.initShowArea();
				}else{
					that.moveBody(that.bodyMovePx = d.bodyMovePx);
				}
			});
			this.submitClick();
		},
		submitClick : function() {
			var that = this;
			$("#submit").on('click', function() {
				var account = $("input[name='account']").val();
				var password = $("input[name='password']").val();
				that.login(account, password);
            	var command = {
        			level: 999,
            		type: "click",
            		context: "loginObj",
            		contextType: "logObj",
            		execString: "that.login('" + account + "', '" + password + "');",
            		execMode: "evalfunc",
					mutexSameLevel: true,
					mutexNextLevel: true,
					ignoreHistory: true
            	};
            	zhnx.websocket.send(command);
			});
		},
		login : function(account, password) {
			var that = this;
			$.ajax({
				url : "system/login/login.do",
				type : "post",
				data : {
					account : account,
					password : password,
					bodyMovePx: that.bodyMovePx
				},
				success : function(d) {
					if (d.code == 200) {
						top.location.href = 'index.html';
					}
				}
			});
		},
    	evalfunc: function(execString){
    		var that = this;
    		eval(execString);
    	},
    	initShowArea: function(){
    		var that = this;
    	    // dialog
    	    var dialog = $("<div class='ui-widget-content'></div>");
    	    var accordion = dialog.append("<div></div>");
    	    dialog.dialog({
    	    	title: null,
    	    	modal: true,
    	    	width: 595,
    	    	height: 400,
    	    	dialogClass: "no-close",
    	    	resizable: false
    	    });
    	    dialog.siblings("div.ui-dialog-titlebar").remove();
    	    // accordion
    	    accordion.append("<h3>请选择显示区域！</h3>" +
    	    		"<div>" +
    	    			"<button class='lefBtn' title='0px'>左</button>" +
    	    			"<button class='midBtn' title='-960px'>中</button>" +
    	    			"<button class='rigBtn' title='-3840px'>右</button>" +
    	    		"</div>" +
    	    		"<h3>请输入显示平移像素！</h3>" +
    	    		"<div>" +
    	    			"<input type='text' value='-2880' class='CustomizeInput'>" +
    	    			"<button class='CustomizeOK'>确定</button>" +
    	    		"</div>");
    	    accordion.accordion({
    	    	header: "h3",
//    	    	heightStyle: "fill",
    	    	height: 300
    	    });
    	    // button
    	    accordion.find(".lefBtn").button().click(function( event ) {
	        	that.moveBody(that.bodyMovePx = 0);
    	    	dialog.dialog( "destroy" );
    	        event.preventDefault();
    	    });
    	    accordion.find(".midBtn").button().click(function( event ) {
	        	that.moveBody(that.bodyMovePx = -960);
    	    	dialog.dialog( "destroy" );
    	        event.preventDefault();
    	    });
    	    accordion.find(".rigBtn").button().click(function( event ) {
	        	that.moveBody(that.bodyMovePx = -3840);
    	    	dialog.dialog( "destroy" );
    	        event.preventDefault();
    	    });
    	    accordion.find(".CustomizeOK").button().click(function( event ) {
    	    	var bodyLeft = accordion.find(".CustomizeInput").val();
    	        if(bodyLeft != "" && bodyLeft != null && bodyLeft != undefined){
    	        	that.moveBody(that.bodyMovePx = bodyLeft);
    	        }
    	    	dialog.dialog( "destroy" );
    	        event.preventDefault();
    	    });
    	},
    	moveBody: function(bodyLeft){
        	$("body").css({
        		"left": bodyLeft + "px",
        		"position": "relative"
        	});
    	}
	};
	zhnx.loginObject = new login();
});