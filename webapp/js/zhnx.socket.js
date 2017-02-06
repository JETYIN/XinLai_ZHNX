$(function() {
	connectWebsocket();
	function connectWebsocket(){
		zhnx.websocket.ws = new WebSocket("ws://" + window.location.host + "/zhnx/websocket"); // 创建WebSocket对象
		zhnx.websocket.ws.onopen = function() {
			zhnx.websocket.reconnectTime = 0;
			console.log("已连接上服务器...");
		}
		zhnx.websocket.ws.onclose = function() {
			console.log("已从服务器断开连接...");
			if(zhnx.websocket.maxReconnectTime > zhnx.websocket.reconnectTime ++){
				connectWebsocket();
			}
		}
		zhnx.websocket.ws.onerror = function(e) {
			console.log("发生错误：", e);
			if(zhnx.websocket.maxReconnectTime > zhnx.websocket.reconnectTime ++){
				connectWebsocket();
			}
		}
	}
	
	
	/**
	 * level           命令级别 0、1、2、3
	 * type            命令类型 click、drag...
	 * context         命令执行上下文 indexObj、centerObj、rightObj、chartID
	 * contextType     上下文类型 indObj、cenObj、rigObj、winObj、chaObj
	 * execString      命令内容
	 * execMode        执行方式 evalfunc、direct...
	 * mutexSameLevel  互斥相同级别 true、false
	 * mutexNextLevel  互斥下一级别 true、false
	 * others          其它参数
	 */
	zhnx.websocket.send = function(command){
		var level = command.level,
			type = command.type || 'click',
			context = command.context,
			contextType = command.contextType,
			execString = command.execString,
			execMode = command.execMode || 'evalfunc',
			mutexSameLevel = command.mutexSameLevel || false,
			mutexNextLevel = command.mutexNextLevel || false,
			ignoreHistory = command.mutexNextLevel || false,
			others = command.others || {};
			
		if(level == 0 || level == 1){
			mutexSameLevel = true;
			mutexNextLevel = true;
		}
		
		var command = {
			level: level,
			type: type,
			context: context,
			contextType: contextType,
			execString: execString,
			execMode: execMode,
			mutexSameLevel: mutexSameLevel,
			mutexNextLevel: mutexNextLevel,
			ignoreHistory: ignoreHistory,
			others: others
		};
		zhnx.websocket.ws.send(JSON.stringify(command));
	}
	// 获取消息
	zhnx.websocket.ws.onmessage = function(evt) {
		console.info(evt.data);
		var command = JSON.parse(evt.data);
		// 获取执行上下文
		var context = null;
		if(command.context == "loginObj"){
			context = zhnx.loginObject;
		} else if(command.context == "indexObj"){
			context = zhnx.indexObject;
		} else if(command.context == "centerObj"){
			context = zhnx.centerObj;
		} else if(command.context == "rightObj"){
			context = zhnx.rightObj;
		} else if(command.context != ""){
			context = zhnx.centerObj.componentObjs[command.context];
			if(context == null || context == undefined){
				context = zhnx.rightObj.componentObjs[command.context];
			}
		}
		if(command.type == "click"){
			if(command.execMode == "evalfunc" && context != null){
				context.evalfunc(command.execString);
			}
			if(command.execMode == "direct"){
				eval(command.execString);
			}
		}else if(command.type == "change"){
			if(command.execMode == "evalfunc" && context != null){
				context.evalfunc(command.execString);
			}
			if(command.execMode == "direct"){
				eval(command.execString);
			}
		}else if(command.type == "drag"){
			if(command.execMode == "evalfunc" && context != null){
				context.evalfunc(command.execString);
			}
			if(command.context == "winObj"){
				
			}
			if(command.execMode == "direct"){
				eval(command.execString);
			}
		}else if(command.type == "zoom"){
			if(command.execMode == "evalfunc" && context != null){
				context.evalfunc(command.execString);
			}
			if(command.execMode == "direct"){
				eval(command.execString);
			}
		}
	};
});