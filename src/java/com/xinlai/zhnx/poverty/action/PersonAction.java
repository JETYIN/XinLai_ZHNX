package com.xinlai.zhnx.poverty.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.poverty.service.PersonService;



/**
 * 扶贫对象
 * 
 */
@Controller
@Namespace("/poverty/person")
public class PersonAction extends BaseAction{

	/**
	 * 
	 */
	@Autowired
	PersonService personService;
	
	private static final long serialVersionUID = 9141116647500593450L;
	protected String areaCode;  
	protected String moveInareaCode;  
	protected String moveOutareaCode;  
	protected List<Map<String, Object>> povertyinfolist = new ArrayList<Map<String, Object>>();

	
	/**
	 * 获取贫困信息
	 * 
	 */
	@Action(value="getpovertyinfo", results={@Result(name = "getpovertyinfo", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyinfo(){
		
		povertyinfolist = personService.querypovertyinfo(areaCode);
		return "getpovertyinfo";	
		
	}

	/**
	 * 获取转移信息
	 * 
	 */
	@Action(value="getMigrationInfo", results={@Result(name = "getMigrationInfo", type = "json", params = { "root", "message" })})
	public String getMigrationInfo(){
		
		String results = "{" +
			"'moveIn':[{" +
			"	'areaCode':'PY'," +
			"	'y':13859" +
			"}]," +
			"'moveOut':[{" +
			"	'areaCode':'QTX'," +
			"	'y':13895" +
			"},{" +
			"	'areaCode':'HSB'," +
			"	'y':24687" +
			"},{" +
			"	'areaCode':'LT'," +
			"	'y':8048" +
			"}]" +
		"}";
		message = (Map<String, Object>) JSON.parse(results);
		return "getMigrationInfo";
	}
	
	/**
	 * 获取贫困信息汇总
	 * 
	 */
	
	@Action(value="getpovertyinfosum", results={@Result(name = "getpovertyinfosum", type = "json", params = { "root", "message" })})
	public String getpovertyinfosum(){
		message = new HashMap<String, Object>();
		message.put("series", personService.querypovertyinfosum(areaCode));
		return "getpovertyinfosum";
	}
	
	
	/**
	 * 获取贫困信息柱图
	 * 
	 */
	
	@Action(value="getpovertyinfobar", results={@Result(name = "getpovertyinfobar", type = "json", params = { "root", "message" })})
	public String getpovertyinfobar(){
		message = new HashMap<String, Object>();
		message.put("series", personService.querypovertybar(areaCode));
		return "getpovertyinfobar";
	}
	
	
	/**
	 * 获取致贫原因汇总
	 * 
	 */
	
	@Action(value="getpovertyreasonsum", results={@Result(name = "getpovertyreasonsum", type = "json", params = { "root", "message" })})
	public String getpovertyreasonsum(){
		message = new HashMap<String, Object>();
		Map<String, Object> a = new HashMap<String, Object>();
		a.put("povertyReason_data", personService.querypovertyreasonsum(areaCode));
		message.put("series", a);
		return "getpovertyreasonsum";
	}
	
	
	/**
	 * 获取致贫原因
	 * 
	 */
	
	@Action(value="getpovertyreason", results={@Result(name = "getpovertyreason", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyreason(){
		povertyinfolist = personService.querypovertyreason(areaCode);
		return "getpovertyreason";
		
		
	}
	
	
	/**
	 * 获取致贫原因柱图
	 * 
	 */
	
	@Action(value="getpovertyreasonbar", results={@Result(name = "getpovertyreasonbar", type = "json", params = { "root", "message" })})
	public String getpovertyreasonbar(){
		message = new HashMap<String, Object>();
		message.put("series", personService.querypovertyreasonbar(areaCode));
		return "getpovertyreasonbar";
	}
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getMoveInareaCode() {
		return moveInareaCode;
	}

	public void setMoveInareaCode(String moveInareaCode) {
		this.moveInareaCode = moveInareaCode;
	}

	public String getMoveOutareaCode() {
		return moveOutareaCode;
	}

	public void setMoveOutareaCode(String moveOutareaCode) {
		this.moveOutareaCode = moveOutareaCode;
	}

	public List<Map<String, Object>> getPovertyinfolist() {
		return povertyinfolist;
	}

	public void setPovertyinfolist(List<Map<String, Object>> povertyinfolist) {
		this.povertyinfolist = povertyinfolist;
	}
	
}
