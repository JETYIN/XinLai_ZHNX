package com.xinlai.zhnx.websocket;

public class CommandBean {
	/**
	 * level 命令级别
	 * type 命令类型 click、drag...
	 * context 执行上下文
	 * contextType 上下文类型 jsObj、jqObj
	 * execString 命令内容
	 * execMode 执行方式 execfunc、direct...
	 * mutexSameLevel 互斥相同级别 true、false
	 * mutexNextLevel 互斥下一级别 true、false
	 * others 其它参数
	 */
	private String type;
	private int level;
	private String execString;
	private String context;
	private String contextType;
	private String execMode;
	private boolean mutexSameLevel;
	private boolean mutexNextLevel;
	private boolean ignoreHistory;
	private String others;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getExecString() {
		return execString;
	}

	public void setExecString(String execString) {
		this.execString = execString;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public String getContextType() {
		return contextType;
	}

	public void setContextType(String contextType) {
		this.contextType = contextType;
	}

	public String getExecMode() {
		return execMode;
	}

	public void setExecMode(String execMode) {
		this.execMode = execMode;
	}

	public boolean isMutexSameLevel() {
		return mutexSameLevel;
	}

	public void setMutexSameLevel(boolean mutexSameLevel) {
		this.mutexSameLevel = mutexSameLevel;
	}

	public boolean isMutexNextLevel() {
		return mutexNextLevel;
	}

	public void setMutexNextLevel(boolean mutexNextLevel) {
		this.mutexNextLevel = mutexNextLevel;
	}

	public boolean isIgnoreHistory() {
		return ignoreHistory;
	}

	public void setIgnoreHistory(boolean ignoreHistory) {
		this.ignoreHistory = ignoreHistory;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

}
