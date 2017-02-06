package com.xinlai.zhnx.common.action;

import java.io.IOException;
import java.util.HashMap;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.websocket.WebsocketEndPoint;


/**
 *  通讯连接命令接收
 */

@Controller
@Namespace("/common/websocketorder")
public class WebsocketOrderAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7875666282992570710L;
	
	protected String order; 
	
	
	/**
	 * 命令接收并调用WEBSOCKET处理类
	 */
	
	@Action(value="websocketorder", results={@Result(name = "websocketorder", type = "json", params = { "root", "message" })})
	public String websocketorder() throws IOException{
		
		message = new HashMap<String, Object>();
		if(order == null || order.isEmpty())
		{
			message.put("return", "error");
			return "websocketorder";
		}else
		{
			message.put("return", "success");
		}
		WebsocketEndPoint websocketEndPoint = new WebsocketEndPoint();
		websocketEndPoint.sendMessage(order);
		return "websocketorder";
		
	}
	

	public String getOrder() {
		return order;
	}


	public void setOrder(String order) {
		this.order = order;
	}

}
