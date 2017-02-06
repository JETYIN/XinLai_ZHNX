package com.xinlai.zhnx.poverty.action;

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
import com.xinlai.zhnx.poverty.service.ShiSanWuService;

@Controller
@Namespace("/poverty/shiSanWu")
public class ShiSanWuAction extends BaseAction{
	
	
	@Autowired
	ShiSanWuService shisanwuservice;
	// 人、户、村
	protected String pOfOc;
	protected String areaCode; 
	protected List<Map<String, Object>> povertyinfolist = new ArrayList<Map<String, Object>>();
	/**
	 * 脱贫规划
	 * @return
	 */
	@Action(value="getAntPovertyPlanSum", results={@Result(name = "getAntPovertyPlanSum", type = "json", params = { "root", "message" })})
	public String getAntPovertyPlanSum(){
		message = new HashMap<String, Object>();
		message.put("series", shisanwuservice.queryAntPovertyPlanSum());
		return "getAntPovertyPlanSum";
	}
	@Action(value="getAntPovertyPlan", results={@Result(name = "getAntPovertyPlan", type = "json", params = { "root", "povertyinfolist" })})
	public String getAntPovertyPlan(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = shisanwuservice.queryAntPovertyPlan();
		return "getAntPovertyPlan";
	}
	@Action(value="getAntPovertyPlanBar", results={@Result(name = "getAntPovertyPlanBar", type = "json", params = { "root", "message" })})
	public String getAntPovertyPlanBar(){
		message = new HashMap<String, Object>();
		message.put("series", shisanwuservice.queryAntPovertyPlanBar());
		return "getAntPovertyPlanBar";
	}
	/**
	 * 时间表路线图
	 * @return
	 */
	@Action(value="getTimePathSum", results={@Result(name = "getTimePathSum", type = "json", params = { "root", "message" })})
	public String getTimePathSum(){
		message = new HashMap<String, Object>();
		Map<String,Object> series = new HashMap<String,Object>();
		series =  shisanwuservice.queryCategoryLeavePoverty("脱贫人");
		series.put("unit", "人");
		series.put("mode", "single");
		message.put("series", series);
		
//		String series = "{" +
//		        "    unit : '人'," +
//		        "    mode : 'single'," +
//		        "    year : ['现状', '2016年', '2017年', '2018年']," +
//		        "    dataset : [581317, 300007, 194336, 1000]" +
//		        "}";
//		message.put("series", JSON.parse(series));
		return "getTimePathSum";
	}
	@Action(value="getTimePath", results={@Result(name = "getTimePath", type = "json", params = { "root", "povertyinfolist" })})
	public String getTimePath(){
		String series = "[{" +
				"	year:'2017年'," +
				"	data:[{" +
				"		areaName:'盐池'," +
				"		areaCode:'640323000000'" +
				"	},{" +
				"		areaName:'彭阳'," +
				"		areaCode:'640425000000'" +
				"	},{" +
				"		areaName:'隆德'," +
				"		areaCode:'640423000000'" +
				"	},{" +
				"		areaName:'泾源'," +
				"		areaCode:'640424000000'" +
				"	}]" +
				"},{" +
				"	year:'2018年'," +
				"	data:[{" +
				"		areaName:'红寺堡'," +
				"		areaCode:'640303000000'" +
				"	},{" +
				"		areaName:'同心'," +
				"		areaCode:'640324000000'" +
				"	},{" +
				"		areaName:'海原'," +
				"		areaCode:'640522000000'" +
				"	},{" +
				"		areaName:'原州'," +
				"		areaCode:'640402000000'" +
				"	},{" +
				"		areaName:'西吉'," +
				"		areaCode:'640422000000'" +
				"	}]" +
				"}]";
		povertyinfolist = (List<Map<String, Object>>) JSON.parse(series);
		return "getTimePath";
	}
	@Action(value="getTimePathBar1", results={@Result(name = "getTimePathBar1", type = "json", params = { "root", "message" })})
	public String getTimePathBar1(){
		message = new HashMap<String, Object>();
		Map<String,Object> series = new HashMap<String,Object>();
		series =  shisanwuservice.queryCategoryLeavePoverty("脱贫人");
		series.put("unit", "个");
		series.put("mode", "single");
		message.put("series", series);
//		String series = "{" +
//		        "    unit : '个'," +
//		        "    mode : 'single'," +
//		        "    year : ['现状', '2016年', '2017年', '2018年']," +
//		        "    dataset : [800, 651, 351, 10]" +
//		        "}";
//		message.put("series", JSON.parse(series));
		return "getTimePathBar1";
	}

	@Action(value="getTimePathBar2", results={@Result(name = "getTimePathBar2", type = "json", params = { "root", "message" })})
	public String getTimePathBar2(){
		message = new HashMap<String, Object>();
		Map<String,Object> series = new HashMap<String,Object>();
		series =  shisanwuservice.queryCategoryLeavePoverty("脱贫户");
		series.put("unit", "户");
		series.put("mode", "single");
		message.put("series", series);
		
//		String series = "{" +
//		        "    unit : '户'," +
//		        "    mode : 'single'," +
//		        "    year : ['现状', '2016年', '2017年', '2018年']," +
//		        "    dataset : [152977, 112055, 41141, 100]" +
//		        "}";
//		message.put("series", JSON.parse(series));
		return "getTimePathBar2";
	}
	/**
	 * 五个一计划
	 * @return
	 */
	@Action(value="getFiveOneSum", results={@Result(name = "getFiveOneSum", type = "json", params = { "root", "message" })})
	public String getFiveOneSum(){
		message = new HashMap<String, Object>();
		message = shisanwuservice.queryFiveOneSum();
		return "getFiveOneSum";
	}
	@Action(value="getFiveOne", results={@Result(name = "getFiveOne", type = "json", params = { "root", "povertyinfolist" })})
	public String getFiveOne(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = shisanwuservice.queryFiveOne(areaCode);
		return "getFiveOne";
	}
	@Action(value="getFiveOneBar", results={@Result(name = "getFiveOneBar", type = "json", params = { "root", "message" })})
	public String getFiveOneBar(){
		message = new HashMap<String, Object>();
		message.put("series", shisanwuservice.queryFiveOneBar(areaCode));
		return "getFiveOneBar";
	}
	public String getpOfOc() {
		return pOfOc;
	}
	public void setpOfOc(String pOfOc) {
		this.pOfOc = pOfOc;
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
	
}
