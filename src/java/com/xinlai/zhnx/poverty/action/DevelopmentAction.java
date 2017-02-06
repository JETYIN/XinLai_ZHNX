package com.xinlai.zhnx.poverty.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.components.Set;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.poverty.service.DevelopmentService;



@Controller
@Namespace("/poverty/development")

public class DevelopmentAction extends BaseAction{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7093276579324152074L;

	/**
	 * 
	 */
	@Autowired
	DevelopmentService developmentService;
	
	protected String areaCode; 
	protected List<Map<String, Object>> povertyinfolist = new ArrayList<Map<String, Object>>();
	protected List<Object> testlist = new ArrayList<Object>();
	
	/**
	 * 获取五通八有汇总信息
	 * 
	 */
	@Action(value="getopeninfosum", results={@Result(name = "getopeninfosum", type = "json", params = { "root", "message" })})
	public String getopeninfosum(){
		
		message = new HashMap<String, Object>();
		String series = "{aba_data : ["+
				"{type:['未通客车','未通宽带','未通水',"+
				"'未通路','未通广播电视'],value:[520,136117,34602,4918,4063]},"+  
				"{type:['无标准卫生室','无集体经济收入','无经济合作组织','无增收支柱产业',"+
				"'无文化体育活动场所','无综合服务网点','无团结干事两委班子','无驻村工作室'],"+
				"value:[31,1019,421,369,345,308,224,182]}]}";
		message.put("series", JSON.parse(series));
		return "getopeninfosum";
		
	}
	
	/**
	 * 获取五通八有地图信息
	 * 确少此接口！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	 */
	
	
	/**
	 * 获取五通八有信息柱图
	 * 
	 */
	@Action(value="getopeninfo", results={@Result(name = "getopeninfo", type = "json", params = { "root", "message" })})
	public String getopeninfo(){
		
		message = new HashMap<String, Object>();
		Map<String,Object> series = new HashMap<String, Object>();
		
		if(areaCode == null){//"640000000000"
			series = developmentService.queryOpenInfo("640000000000");
		}else{
			series = developmentService.queryOpenInfo(areaCode);
		}
		
//		String series = "{unit : '公里',"+
//				"type : ['未通路', '未通水', '未通宽带', '未通客车', '未通广播电视'],"+
//				"country : ['西吉县', '海原县', '原州区', '同心县', '彭阳县', '红寺堡区', '盐池县', '泾源县', '隆德县', '沙坡头区',"+
//				"'中宁县', '兴庆区', '平罗县', '青铜峡市', '利通区', '农垦集团', '金凤区', '西夏区', '贺兰县', '灵武市',"+
//				"'永宁县', '惠农区', '大武口区'],"+
//				"dataset : [[1625, 1505, 1350, 1300, 1250, 510, 650, 450, 350, 250, 101, 0, 0, 50, 10, 0, 105, 15, 12, 10, 0, 0, 0],"+
//				"[625, 1505, 1350, 1300, 1250, 510, 650, 1450, 350, 250, 101, 0, 0, 50, 10, 0, 105, 15, 12, 10, 0, 0, 0],"+
//				"[1625, 505, 1350, 1300, 1250, 1510, 650, 450, 350, 250, 101, 0, 0, 50, 10, 0, 105, 15, 12, 10, 0, 0, 0],"+
//				"[1625, 1505, 350, 1300, 1250, 510, 650, 450, 350, 1250, 101, 0, 0, 50, 10, 0, 105, 15, 12, 10, 1000, 0, 0],"+
//				"[1625, 1505, 350, 1300, 1250, 510, 650, 450, 350, 1250, 101, 0, 0, 50, 10, 0, 105, 15, 1200, 10, 0, 0, 0]]}";
//		message.put("series", JSON.parse(series));
		message.put("series",series);
		return "getopeninfo";
		
	}

	/**
	 * 获取能力提升状况汇总
	 * 
	 */
	@Action(value="getabilityinfosum", results={@Result(name = "getabilityinfosum", type = "json", params = { "root", "message" })})
	public String getabilityinfosum(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryabilityinfosum(areaCode));
		return "getabilityinfosum";	
	}
	
	
	/**
	 * 获取能力提升状况
	 * 
	 */
	@Action(value="getabilityinfo", results={@Result(name = "getabilityinfo", type = "json", params = { "root", "povertyinfolist" })})
	public String getabilityinfo(){
		povertyinfolist = developmentService.queryabilityinfo(areaCode);
		return "getabilityinfo";	
	}
	
	
	/**
	 * 获取能力提升状况柱图
	 * 
	 */
	@Action(value="getabilityinfobar", results={@Result(name = "getabilityinfobar", type = "json", params = { "root", "message" })})
	public String getabilityinfobar(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryabilityinfobar(areaCode));
		return "getabilityinfobar";	
	}	
	
	/**
	 * 获取信息化需求汇总情况
	 * 
	 */
	@Action(value="getinformationinfosum", results={@Result(name = "getinformationinfosum", type = "json", params = { "root", "message" })})
	public String getinformationinfosum(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryinformationinfosum(areaCode));
		return "getinformationinfosum";	
	}
	
	
	/**
	 * 获取信息化需求情况
	 * 
	 */
	@Action(value="getinformationinfo", results={@Result(name = "getinformationinfo", type = "json", params = { "root", "povertyinfolist" })})
	public String getinformationinfo(){
		povertyinfolist = developmentService.queryinformationinfo(areaCode);
		return "getinformationinfo";	
	}
	
	
	/**
	 * 获取信息化需求情况柱图
	 * 
	 */
	@Action(value="getinformationinfobar", results={@Result(name = "getinformationinfobar", type = "json", params = { "root", "message" })})
	public String getinformationinfobar(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryinformationinfobar(areaCode));
		return "getinformationinfobar";
	}
	
	/**
	 * 获取脱贫需求汇总
	 * 
	 */
	@Action(value="getpovertyneedsum", results={@Result(name = "getpovertyneedsum", type = "json", params = { "root", "message" })})
	public String getpovertyneedsum(){
		message = developmentService.querypovertyneedsum(areaCode);
		return "getpovertyneedsum";	
	}
	/**
	 * 获取脱贫需求
	 * 
	 */
	@Action(value="getpovertyneed", results={@Result(name = "getpovertyneed", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyneed(){
		povertyinfolist = developmentService.querypovertyneed(areaCode);
		return "getpovertyneed";	
	}

	/**
	 * 获取产业发展需求汇总信息
	 * 
	 */
	@Action(value="getindustryinfosum", results={@Result(name = "getindustryinfosum", type = "json", params = { "root", "message" })})
	public String getindustryinfosum(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryindustryinfosum(areaCode));
		return "getindustryinfosum";
	}

	/**
	 * 获取产业发展需求信息
	 * 
	 */
	@Action(value="getindustryinfo", results={@Result(name = "getindustryinfo", type = "json", params = { "root", "povertyinfolist" })})
	public String getindustryinfo(){
		povertyinfolist = developmentService.queryindustryinfo(areaCode);
		return "getindustryinfo";
	}
	
	/**
	 * 获取产业发展需求信息
	 * 
	 */
	@Action(value="getindustryinfobar", results={@Result(name = "getindustryinfobar", type = "json", params = { "root", "message" })})
	public String getindustryinfobar(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.queryindustryinfobar(areaCode));
		return "getindustryinfobar";
	}
	/**
	 * 获取脱贫需求柱图
	 * 
	 */
	@Action(value="getpovertyneedbar", results={@Result(name = "getpovertyneedbar", type = "json", params = { "root", "message" })})
	public String getpovertyneedbar(){
		message = new HashMap<String, Object>();
		message.put("series", developmentService.querypovertyneedbar(areaCode));
		return "getpovertyneedbar";	
	}
	
	
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public List<Map<String, Object>> getPovertyinfolist() {
		return povertyinfolist;
	}

	public void setPovertyinfolist(List<Map<String, Object>> povertyinfolist) {
		this.povertyinfolist = povertyinfolist;
	}
	
	public List<Object> getTestlist() {
		return testlist;
	}

	public void setTestlist(List<Object> testlist) {
		this.testlist = testlist;
	}
	
	
	
}
