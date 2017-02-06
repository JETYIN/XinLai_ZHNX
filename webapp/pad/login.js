$(function() {
	function login() {
		this.init();
	}
	login.prototype = {
		constructor : login,
		init : function() {
			this.submitClick();
		},
		submitClick : function() {
			var that = this;
			$("#submit").on('click', function() {
				var namePlaceholder = $("input[name='account']");//用户
				var passPlaceholder = $("input[name='password']");//密码
				
				var account = namePlaceholder.val();
				var password = passPlaceholder.val();
				
				if(account==""&&password!=""){
					namePlaceholder.attr("placeholder","用户名不能为空,请输入用户名！");
				}
				else if(account!=""&&password==""){
					passPlaceholder.attr("placeholder", "密码不能为空,请输入密码！");
				}
				else if(account==""&&password==""){
					namePlaceholder.attr("placeholder","用户名不能为空,请输入用户名！");
					passPlaceholder.attr("placeholder", "密码不能为空,请输入密码！");
				}
				else{
					that.login(account, password);
				}
				
			});
		},
		login : function(account, password) {
			var that = this;
			$.ajax({
				url : zhnx.resource.getUrl("system/login/login.do"),
				type : "post",
				data : {
					account : account,
					password : password
				},
				success : function(d) {
					// 登陆成功
					if (d.code == 200) {
						that.loginCommand(account, password, function(){
							console.info('login');
							top.location.href = 'index.html';
						});
					} else if(d.code == 300){
						alert(d.msg);
					} else {
						alter("登陆失败");
					}
				}
			});
		},
		loginCommand: function(account, password, callback){
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
        	callback();
		},
    	evalfunc: function(execString){
    		var that = this;
    		eval(execString);
    	}
	};
	zhnx.loginObject = new login();
});