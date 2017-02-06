package com.xinlai.zhnx.system.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.xinlai.zhnx.system.vo.LoginUser;

public class LoginFilter implements Filter {
	private String loginPath;
	private String loginPadPath;
	private String loginOutPath;
	private Pattern[] ignorePath;
	private int ignorePathLen;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// 忽略不验证页面
		String temp = filterConfig.getInitParameter("login.ignore");
		String[] ts = temp == null || temp == "" ? new String[0] : temp.split(";");
		this.ignorePath = new Pattern[this.ignorePathLen = ts.length];
		for (int i = 0; i < this.ignorePathLen; i++) {
			this.ignorePath[i] = Pattern.compile(ts[i]);
		}
		// 登陆页面
		temp = filterConfig.getInitParameter("login.path");
		this.loginPath = (temp == null ? "/login.html" : temp);
		// pad登陆页面
		temp = filterConfig.getInitParameter("login.pad.path");
		this.loginPadPath = (temp == null ? "/pad/login.html" : temp);
		// 登出请求路径
		temp = filterConfig.getInitParameter("loginOut.path");
		this.loginOutPath = (temp == null ? "/system/login/loginOut.do" : temp);
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hreq = (HttpServletRequest) req;
		HttpSession session = hreq.getSession();
		String session_id = session.getId();
		HttpSession sessionForId = SessionContext.getSession(session_id);
		LoginUser loginUser = (LoginUser)session.getAttribute(LoginUser.SESSION_LOGIN_USER);
		LoginUser sessionIdLoginUser = sessionForId == null ? null : (LoginUser)sessionForId.getAttribute(LoginUser.SESSION_LOGIN_USER);
		
		if ((loginUser == null) && (sessionIdLoginUser == null)) {
			String uri = hreq.getServletPath();
			if (isIgnorePath(uri)) {
		        chain.doFilter(req, res);
		        return;
			}
			HttpServletResponse hres = (HttpServletResponse)res;
			PrintWriter writer = hres.getWriter();
			if(isPadPath(uri)){
				writer.print("<script>top.location.href='" + hreq.getContextPath() + this.loginPadPath + "'</script>");
			}else{
				writer.print("<script>top.location.href='" + hreq.getContextPath() + this.loginPath + "'</script>");
			}
			writer.close();
			return;
		}
		chain.doFilter(req, res);
	}

	@Override
	public void destroy() {
		
	}
	
	private boolean isIgnorePath(String uri) {
		for (int i = 0; i < this.ignorePathLen; i++) {
			if (this.ignorePath[i].matcher(uri).find())
				return true;
		}
		return false;
	}
	
	private boolean isPadPath(String uri){
		return uri.contains("pad/");
	}
}
