package com.xinlai.zhnx.websocket;

import java.io.IOException;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.alibaba.fastjson.JSON;

/**
 * 功能说明：websocket处理类, 使用J2EE7的标准 作者：tanghw(2016年8月4日)
 */
// websocket是连接的路径，可以自行定义
@ServerEndpoint(value = "/websocket",configurator=GetHttpSessionConfigurator.class)
public class WebsocketEndPoint {
	
	private static Map<String, Session> sessionMap = new ConcurrentHashMap<String, Session>();
	
	private static Queue<CommandBean> commandQueue = new ConcurrentLinkedQueue<CommandBean>();
	
	//用来存放 httpSessionId/session 的map  ,key 为httpSessionId ,value 为各个终端的session 对象
    private static ConcurrentHashMap<String,Session> httpSessionWebSocketMap = new ConcurrentHashMap<String,Session>();

	
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    
    private HttpSession httpSession;
	
	/**
	 * 打开连接时触发
	 * 
	 * @param relationId
	 * @param userCode
	 * @param session
	 */
	@OnOpen
	public void onOpen(Session session, EndpointConfig config) {
		sessionMap.put(session.getId(), session);
		this.session = session;
        this.httpSession = (HttpSession) config.getUserProperties()
                .get(HttpSession.class.getName());
        //用于共享 httpSession
        httpSessionWebSocketMap.put(this.httpSession.getId(),session);
		Iterator<CommandBean> iter = commandQueue.iterator();
		while(iter.hasNext()){
			CommandBean command = iter.next();
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			session.getAsyncRemote().sendText(JSON.toJSONString(command));
		}
		System.out.println(session.getId());
		System.out.println(httpSession.getId());
		System.out.println("onOpen:" + session.getId() + "|current session number:" + httpSessionWebSocketMap.keySet().size());
	}

	/**
	 * 收到客户端消息时触发
	 * 
	 * @param relationId
	 * @param userCode
	 * @param message
	 * @return
	 */
	@OnMessage
	public void onMessage(String message, Session session) {
		CommandBean command = JSON.parseObject(message, CommandBean.class);
		commandQueue = modifyHistCommand(command);
		for(String sessionId : sessionMap.keySet()){
			Session openSession = sessionMap.get(sessionId);
			if(!session.getId().equals(openSession.getId())){
				openSession.getAsyncRemote().sendText(message);
			}
		}
	}

	/**
	 * 异常时触发
	 * 
	 * @param relationId
	 * @param userCode
	 * @param session
	 */
	@OnError
	public void onError(Throwable throwable, Session session) {
		System.out.println("err");
		System.out.println(throwable);
	}

	/**
	 * 关闭连接时触发
	 * 
	 * @param relationId
	 * @param userCode
	 * @param session
	 */
	@OnClose
	public void onClose(Session session) {
		sessionMap.remove(session.getId());
        Set<Entry<String,Session>> WebSocketset =  httpSessionWebSocketMap.entrySet();
        Iterator<Entry<String,Session>> iterator = WebSocketset.iterator();
        while(iterator.hasNext())
        {
        	Entry<String,Session> next = iterator.next();
        	String key = next.getKey();
        	if(session.equals(next.getValue()))
        	{
                httpSessionWebSocketMap.remove(key);
        	}
        }
		if(sessionMap.isEmpty()){
			commandQueue.clear();
		}
		System.out.println("close " + session.getId());
	}

	// 修改历史命令
	private Queue<CommandBean> modifyHistCommand(CommandBean command){
		if(command.isIgnoreHistory()){
			return commandQueue;
		}
		Queue<CommandBean> copyCommandQueue = new ConcurrentLinkedQueue<CommandBean>();
		boolean isAddCurrentCommand = false;
		while(!commandQueue.isEmpty()){
			CommandBean histCommand = commandQueue.poll();
			if(histCommand.getLevel() < command.getLevel()){
				copyCommandQueue.add(histCommand);
			}else if(histCommand.getLevel() == command.getLevel()){
				if(!command.isMutexSameLevel()){
					copyCommandQueue.add(histCommand);
				}
				if(!isAddCurrentCommand){
					copyCommandQueue.add(command);
					isAddCurrentCommand = true;
				}
			}else if(histCommand.getLevel() > command.getLevel()){
				if(!command.isMutexNextLevel()){
					copyCommandQueue.add(histCommand);
				}
			}
		}
		if(!isAddCurrentCommand){
			copyCommandQueue.add(command);
			isAddCurrentCommand = true;
		}
		return copyCommandQueue;
	}
	
	
    public void sendMessage(String message) throws IOException{

    	System.out.println(message);
    	System.out.println(httpSessionWebSocketMap.size());    	
		for(String sessionId : httpSessionWebSocketMap.keySet()){
			Session openSession = httpSessionWebSocketMap.get(sessionId);
			openSession.getAsyncRemote().sendText(message);
		}
    }
}