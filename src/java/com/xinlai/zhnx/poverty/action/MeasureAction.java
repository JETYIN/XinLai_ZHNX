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
import com.xinlai.zhnx.poverty.service.MeasureService;



/**
 * 扶贫措施
 * 
 */

@Controller
@Namespace("/poverty/measure")
public class MeasureAction extends BaseAction{
	/**
	 * 
	 */
	@Autowired
	MeasureService measureService;
	
	private static final long serialVersionUID = 1028465843389161032L;

	protected String areaCode;
	protected List<Map<String, Object>> povertyinfolist = new ArrayList<Map<String, Object>>();
	
	/**
	 * 专项扶贫
	 * @return
	 */
	@Action(value="getpovertyspecialsum", results={@Result(name = "getpovertyspecialsum", type = "json", params = { "root", "message" })})
	public String getpovertyspecialsum(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertyspecialsum(areaCode));
		return "getpovertyspecialsum";
	}
	
	@Action(value="getpovertyspecial", results={@Result(name = "getpovertyspecial", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyspecial(){
		povertyinfolist = new ArrayList<Map<String, Object>>();
		povertyinfolist = measureService.querypovertyspecial(areaCode);
		return "getpovertyspecial";
	}
	
	@Action(value="getpovertyspecialbar", results={@Result(name = "getpovertyspecialbar", type = "json", params = { "root", "message" })})
	public String getpovertyspecialbar(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertyspecialbar(areaCode));
		return "getpovertyspecialbar";
	}
	
	/**
	 * 行业扶贫
	 * @return
	 */
	@Action(value="getpovertyindustrysum", results={@Result(name = "getpovertyindustrysum", type = "json", params = { "root", "message" })})
	public String getpovertyindustrysum(){
		message = new HashMap<String, Object>();
		message.put("series",measureService.querypovertyindustrysum(areaCode));
		return "getpovertyindustrysum";
	}

	@Action(value="getpovertyindustry", results={@Result(name = "getpovertyindustry", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyindustry(){
		povertyinfolist = new ArrayList<Map<String, Object>>();
		povertyinfolist = measureService.querypovertyindustry(areaCode);
		return "getpovertyindustry";
	}
	
	@Action(value="getpovertyindustrybar", results={@Result(name = "getpovertyindustrybar", type = "json", params = { "root", "message" })})
	public String getpovertyindustrybar(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertyindustrybar(areaCode));
		return "getpovertyindustrybar";
	}
	
	/**
	 * 社会扶贫
	 * @return
	 */
	@Action(value="getpovertysocietysum", results={@Result(name = "getpovertysocietysum", type = "json", params = { "root", "message" })})
	public String getpovertysocietysum(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertysocietysum(areaCode));
		return "getpovertysocietysum";
	}

	@Action(value="getpovertysociety", results={@Result(name = "getpovertysociety", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertysociety(){
		povertyinfolist = new ArrayList<Map<String, Object>>();
		povertyinfolist = measureService.querypovertysociety(areaCode);
		return "getpovertysociety";
	}
	
	@Action(value="getpovertysocietybar", results={@Result(name = "getpovertysocietybar", type = "json", params = { "root", "message" })})
	public String getpovertysocietybar(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertysocietybar(areaCode));
		return "getpovertysocietybar";
	}
	
	/**
	 * 获取驻村工作队汇总
	 * 
	 */
	@Action(value="getpovertyteamsum", results={@Result(name = "getpovertyteamsum", type = "json", params = { "root", "message" })})
	public String getpovertyteamsum(){
		message = new HashMap<String, Object>();
		String series = "{povertyTeam_data : [ "+
				"{'name':'其他','value':490},"+
				"{'name':'驻村工作队乡级','value':104},"+
				"{'name':'驻村工作队县级','value':491},"+
				"{'name':'驻村工作队市级','value':198},"+
				"{'name':'驻村工作队区级','value':130}]}";
		message.put("series", JSON.parse(series));
		return "getpovertyteamsum";	
	}

	@Action(value="getpovertyteam", results={@Result(name = "getpovertyteam", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyteam(){

		return "getpovertyteam";
	}
	
	@Action(value="getpovertyteambar", results={@Result(name = "getpovertyteambar", type = "json", params = { "root", "message" })})
	public String getpovertyteambar(){
		message = new HashMap<String, Object>();
		String series = "{" +
		        "    unit : '人'," +
		        "    type : ['驻村工作队总数', '驻村工作队区级', '驻村工作队市级', '驻村工作队县级','驻村工作队乡级']," +
		        "    country : ['泾源县', '红寺堡区', '西吉县', '金凤区', '隆德县', '彭阳县', '原州区', '盐池县', '同心县', '海原县','沙坡头区','利通区','灵武市','平罗县','青铜峡市','中宁县','农垦集团','兴庆区','西夏区','永宁县','贺兰县','大武口区','惠农区']," +
		        "    dataset : [" +
				"			[1625, 1505, 1350, 1300, 1250, 510, 650, 450, 350, 250,625, 1505, 1350, 1300, 1250, 510, 650, 1450, 350, 250,100,90,200]," +
				"			[625, 1505, 1350, 1250, 1250, 510, 650, 1450, 350, 250,1625, 505, 1350, 1300, 1250, 1510, 650, 450, 350, 250,210,190,280]," +
				"			[1625, 505, 1350, 1330, 1250, 1510, 650, 450, 350, 250,625, 1505, 1350, 1300, 1250, 510, 650, 1450, 350, 250,100,150,220]," +
				"			[1625, 1505, 350, 1320, 1350, 510, 650, 450, 350, 1250,1350, 1300, 1250, 510, 650, 1450, 350, 250,1625, 505, 1350, 1300, 1250]," +
				"			[625, 1505, 1350, 1300, 1240, 510, 650, 1450, 350, 250,1625, 505, 1350, 1300, 1250, 1510, 1650, 450, 550, 250,270,490,280]" +
		        "    ]" +
		        "}";
		message.put("series", JSON.parse(series));
		return "getpovertyteambar";	
	}
	
	
	/**
	 * 帮扶责任人
	 * @return
	 */
	@Action(value="getpovertyhelpsum", results={@Result(name = "getpovertyhelpsum", type = "json", params = { "root", "message" })})
	public String getpovertyhelpsum(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertyhelpsum(areaCode));
		return "getpovertyhelpsum";
	}

	@Action(value="getpovertyhelp", results={@Result(name = "getpovertyhelp", type = "json", params = { "root", "povertyinfolist" })})
	public String getpovertyhelp(){
		povertyinfolist = new ArrayList<Map<String, Object>>();
		povertyinfolist = measureService.querypovertyhelp(areaCode);
		return "getpovertyhelp";
	}
	
	@Action(value="getpovertyhelpbar", results={@Result(name = "getpovertyhelpbar", type = "json", params = { "root", "message" })})
	public String getpovertyhelpbar(){
		message = new HashMap<String, Object>();
		message.put("series", measureService.querypovertyhelpbar(areaCode));
		return "getpovertyhelpbar";
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
