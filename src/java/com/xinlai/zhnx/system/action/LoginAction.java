package com.xinlai.zhnx.system.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.system.vo.LoginUser;

@Controller
@Namespace("/system/login")
public class LoginAction extends BaseAction {

	private static final long serialVersionUID = 8301539077643793987L;

	@Action(value = "login", results = { @Result(name = "login", type = "json", params = { "root", "message" }) })
	public String login() {
		message = new HashMap<String, Object>();
		// 查询账户
		HttpServletRequest request = getRequest();
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		LoginUser user = getUser(account);
		// 用户名密码不正确
		if(!password.equals(user.getPassword())){
			message.put("code", 300);
			message.put("msg", "用户名密码不正确！");
			return "login";
		}
		// body平移像素
		String bodyMovePx = request.getParameter("bodyMovePx");
		user.setBodyMovePx(bodyMovePx);
		// 放入session
		Map<String, Object> session = getSession();
		session.put(LoginUser.SESSION_LOGIN_USER, user);
		session.put("bodyMovePx", bodyMovePx);
		// 登陆成功状态
		message.put("code", 200);
		message.put("msg", "登陆成功！");
		return "login";
	}

	@Action(value = "loginOut", results = { @Result(name = "loginOut", type = "json", params = { "root", "message" }) })
	public String loginOut() {
		message = new HashMap<String, Object>();
		// 获取session
		Map<String, Object> session = getSession();
		LoginUser loginUser = (LoginUser) session.get(LoginUser.SESSION_LOGIN_USER);
		if (loginUser != null) {
			session.remove(LoginUser.SESSION_LOGIN_USER);
		}
		message.put("code", 200);
		return "loginOut";
	}
	
	@Action(value = "getWebLoginUser", results = { @Result(name = "getWebLoginUser", type = "json", params = { "root", "message" }) })
	public String getWebLoginUser() {
		message = new HashMap<String, Object>();
		// 获取session
		Map<String, Object> session = getSession();
		message.put("loginUser", session.get(LoginUser.SESSION_LOGIN_USER));
		message.put("bodyMovePx", session.get("bodyMovePx"));
		message.put("code", 200);
		return "getWebLoginUser";
	}
	private LoginUser getUser(String account) {
		LoginUser user = new LoginUser();
		user.setAccount(account);
		user.setPassword(account);
		return user;
	}
}
