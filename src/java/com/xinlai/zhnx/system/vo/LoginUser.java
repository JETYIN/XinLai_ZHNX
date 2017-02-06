package com.xinlai.zhnx.system.vo;

public class LoginUser {
	public static final String SESSION_LOGIN_USER = "SESSION_LOGIN_USER";

	private String account;
	private String password;
	private String bodyMovePx;

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBodyMovePx() {
		return bodyMovePx;
	}

	public void setBodyMovePx(String bodyMovePx) {
		this.bodyMovePx = bodyMovePx;
	}

}
