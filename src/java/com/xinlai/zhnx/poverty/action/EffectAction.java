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
import com.xinlai.zhnx.poverty.service.EffectService;

@Controller
@Namespace("/poverty/effect")
public class EffectAction extends BaseAction {
	
	
	@Autowired
	EffectService effectService;
	
	private static final long serialVersionUID = -3529120287294163847L;
	
	protected String areaCode;
	protected String moveInareaCode;  
	protected String moveOutareaCode;
	protected List<Map<String, Object>> povertyinfolist = new ArrayList<Map<String, Object>>();

	/**
	 * 十二五脱贫
	 * @return
	 */
	@Action(value="getShiErWuAntPovertyBar0", results={@Result(name = "getShiErWuAntPovertyBar0", type = "json", params = { "root", "message" })})
	public String getShiErWuAntPovertyBar0(){
		message = new HashMap<String, Object>();
		String category = "贫困人口";
		String unit = "人";
		message.put("series", effectService.queryShiErWuAntPovertyBar(category,unit));
		return "getShiErWuAntPovertyBar0";
	}
	@Action(value="getShiErWuAntPovertyBar1", results={@Result(name = "getShiErWuAntPovertyBar1", type = "json", params = { "root", "message" })})
	public String getShiErWuAntPovertyBar1(){
		message = new HashMap<String, Object>();
		String category = "贫困村";
		String unit = "个";
		message.put("series", effectService.queryShiErWuAntPovertyBar(category,unit));
		return "getShiErWuAntPovertyBar1";
	}
	@Action(value="getShiErWuAntPovertyBar2", results={@Result(name = "getShiErWuAntPovertyBar2", type = "json", params = { "root", "message" })})
	public String getShiErWuAntPovertyBar2(){
		message = new HashMap<String, Object>();
		String category = "贫困户";
		String unit = "户";
		message.put("series", effectService.queryShiErWuAntPovertyBar(category,unit));
		return "getShiErWuAntPovertyBar2";
	}
	@Action(value="getShiErWuAntPovertyBar3", results={@Result(name = "getShiErWuAntPovertyBar3", type = "json", params = { "root", "message" })})
	public String getShiErWuAntPovertyBar3(){
		message = new HashMap<String, Object>();
		String category = "人均可支配收入";
		String unit = "元";
		message.put("series", effectService.queryShiErWuAntPovertyBar(category,unit));
		return "getShiErWuAntPovertyBar3";
	}
	/**
	 * 十二五脱贫地图
	 * @return
	 */
	@Action(value="getShiErWuAntPoverty", results={@Result(name = "getShiErWuAntPoverty", type = "json", params = { "root", "povertyinfolist" })})
	public String getShiErWuAntPoverty(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryShiErWuAntPoverty();
		return "getShiErWuAntPoverty";
	}
	
	/**
	 * 十二五移民搬迁
	 * @return
	 */
	@Action(value="getMigrationBar0", results={@Result(name = "getMigrationBar0", type = "json", params = { "root", "message" })})
	public String getMigrationBar0(){
		message = new HashMap<String, Object>();
		String category = "迁出";
		message.put("series", effectService.queryMigrationBar(category));
		return "getMigrationBar0";
	}
	@Action(value="getMigrationBar1", results={@Result(name = "getMigrationBar1", type = "json", params = { "root", "message" })})
	public String getMigrationBar1(){
		message = new HashMap<String, Object>();
		String category = "迁入";
		message.put("series", effectService.queryMigrationBar(category));
		return "getMigrationBar1";
	}
	@Action(value="getMigration", results={@Result(name = "getMigration", type = "json", params = { "root", "message" })})
	public String getMigration(){
		message = effectService.queryMigration(moveInareaCode,moveOutareaCode);
		return "getMigration";
	}
	
	/**
	 * 西海固经济统计
	 * @return
	 */
	@Action(value="getXHGEconomicBar0", results={@Result(name = "getXHGEconomicBar0", type = "json", params = { "root", "message" })})
	public String getXHGEconomicBar0(){
		message = new HashMap<String, Object>();
		String category = "生产总值";
		message.put("series", effectService.queryXHGEconomicBar(category));
		return "getXHGEconomicBar0";
	}

	@Action(value="getXHGEconomicBar1", results={@Result(name = "getXHGEconomicBar1", type = "json", params = { "root", "message" })})
	public String getXHGEconomicBar1(){
		message = new HashMap<String, Object>();
		String series = "{" +

		        "    unit : '万人'," +
		        "    type : ['收入', '支出']," +
		        "    year : ['2006年','2007年','2008年','2009年','2010年','2011年', '2012年', '2013年', '2014年', '2015年']," +
		        "    dataset : [" +
		        "        {" +
		        "            place : '西海固地区'," +
		        "            data : [" +
		        "                [1300, 1600, 1800, 2000, 2300, 2800, 3150, 3400, 3800, 4000]," +
		        "                [1100, 1250, 1500, 1700, 2000, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '西吉县'," +
		        "            data : [" +
		        "                [300, 1600, 1800, 2000, 2300, 2800, 3150, 3400, 3800, 4000]," +
		        "                [100, 1250, 1500, 1700, 2000, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '海原县'," +
		        "            data : [" +
		        "                [1300, 600, 1800, 2000, 2300, 2800, 3150, 3400, 3800, 4000]," +
		        "                [1100, 250, 1500, 1700, 2000, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '原州区'," +
		        "            data : [" +
		        "                [1300, 1600, 800, 2000, 2300, 2800, 3150, 3400, 3800, 4000]," +
		        "                [1100, 1250, 500, 1700, 2000, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '隆德县'," +
		        "            data : [" +
		        "                [1300, 1600, 1800, 200, 2300, 2800, 3150, 3400, 3800, 4000]," +
		        "                [1100, 1250, 1500, 170, 2000, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '泾源县'," +
		        "            data : [" +
		        "                [1300, 1600, 1800, 2000, 230, 2800, 3150, 3400, 3800, 4000]," +
		        "                [1100, 1250, 1500, 1700, 200, 2200, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '彭阳县'," +
		        "            data : [" +
		        "                [1300, 1600, 1800, 2000, 2300, 280, 3150, 3400, 3800, 4000]," +
		        "                [1100, 1250, 1500, 1700, 2000, 220, 2850, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }," +
		        "        {" +
		        "            place : '同心县'," +
		        "            data : [" +
		        "                [1300, 1600, 1800, 2000, 2300, 2800, 315, 3400, 3800, 4000]," +
		        "                [1100, 1250, 1500, 1700, 2000, 2200, 285, 3100, 3400, 3650]" +
		        "            ]" +
		        "        }" +
		        "    ]" +
		        "}";
		message.put("series", JSON.parse(series));
		return "getXHGEconomicBar1";
	}

	@Action(value="getXHGEconomicBar2", results={@Result(name = "getXHGEconomicBar2", type = "json", params = { "root", "message" })})
	public String getXHGEconomicBar2(){
		message = new HashMap<String, Object>();
		String category = "农民家庭人均";
		message.put("series", effectService.queryXHGEconomicBar2(category));
		return "getXHGEconomicBar2";
	}
	@Action(value="getXHGEconomic", results={@Result(name = "getXHGEconomic", type = "json", params = { "root", "povertyinfolist" })})
	public String getXHGEconomic(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryXHGEconomic();
		return "getXHGEconomic";
	}
	/**
	 * 西海固人口统计
	 * @return
	 */
	@Action(value="getXHGPopulationBar0", results={@Result(name = "getXHGPopulationBar0", type = "json", params = { "root", "message" })})
	public String getXHGPopulationBar0(){
		message = new HashMap<String, Object>();
		String category = "农村绝对贫困人口";
		String unit = "万人";
		message.put("series", effectService.queryXHGPopulationBar(category,unit));
		return "getXHGPopulationBar0";
	}

	@Action(value="getXHGPopulationBar1", results={@Result(name = "getXHGPopulationBar1", type = "json", params = { "root", "message" })})
	public String getXHGPopulationBar1(){
		message = new HashMap<String, Object>();
		String category = "贫困发生率";
		String unit = "%";
		message.put("series", effectService.queryXHGPopulationBar(category,unit));
		return "getXHGPopulationBar1";
	}
	@Action(value="getXHGPopulationBar2", results={@Result(name = "getXHGPopulationBar2", type = "json", params = { "root", "message" })})
	public String getXHGPopulationBar2(){
		message = new HashMap<String, Object>();
		String category = "人均纯收入";
		String unit = "元";
		message.put("series", effectService.queryXHGPopulationBar(category,unit));
		return "getXHGPopulationBar2";
	}
	@Action(value="getXHGPopulation", results={@Result(name = "getXHGPopulation", type = "json", params = { "root", "povertyinfolist" })})
	public String getXHGPopulation(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryXHGPopulation();
		return "getXHGPopulation";
	}
	/**
	 * 务工人员
	 * @return
	 */
	@Action(value="getMigrantWorkersLine", results={@Result(name = "getMigrantWorkersLine", type = "json", params = { "root", "message" })})
	public String getMigrantWorkersLine(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryMigrantWorkersLine(areaCode));
		return "getMigrantWorkersLine";
	}
	
	
	@Action(value="getMigrantWorkersBar0", results={@Result(name = "getMigrantWorkersBar0", type = "json", params = { "root", "message" })})
	public String getMigrantWorkersBar0(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryMigrantWorkersBar(areaCode));
		return "getMigrantWorkersBar0";
	}

	@Action(value="getMigrantWorkers", results={@Result(name = "getMigrantWorkers", type = "json", params = { "root", "povertyinfolist" })})
	public String getMigrantWorkers(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryMigrantWorkers(areaCode);
		return "getMigrantWorkers";
	}
	/**
	 * 其它帮扶
	 * @return
	 */
	@Action(value="getOtherHelpSum", results={@Result(name = "getOtherHelpSum", type = "json", params = { "root", "message" })})
	public String getOtherHelpSum(){
		message = new HashMap<String, Object>();
		message = effectService.queryOtherHelpSum();
		return "getOtherHelpSum";
		
	}
	@Action(value="getOtherHelpBar", results={@Result(name = "getOtherHelpBar", type = "json", params = { "root", "message" })})
	public String getOtherHelpBar(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryOtherHelpBar());
		return "getOtherHelpBar";
	}
	@Action(value="getOtherHelp", results={@Result(name = "getOtherHelp", type = "json", params = { "root", "povertyinfolist" })})
	public String getOtherHelp(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryOtherHelp();
		return "getOtherHelp";
	}
	/**
	 * 精准扶贫
	 * @return
	 */
	@Action(value="getPreciseSum", results={@Result(name = "getPreciseSum", type = "json", params = { "root", "message" })})
	public String getPreciseSum(){
		message = new HashMap<String, Object>();
		message = effectService.queryPreciseSum();
		return "getPreciseSum";
	}
	@Action(value="getPreciseBar", results={@Result(name = "getPreciseBar", type = "json", params = { "root", "message" })})
	public String getPreciseBar(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryPreciseBar());
		return "getPreciseBar";
	}
	@Action(value="getPrecise", results={@Result(name = "getPrecise", type = "json", params = { "root", "povertyinfolist" })})
	public String getPrecise(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryPrecise();
		return "getPrecise";
	}
	/**
	 * 到户措施
	 * @return
	 */
	@Action(value="getToFamilyBar0", results={@Result(name = "getToFamilyBar0", type = "json", params = { "root", "message" })})
	public String getToFamilyBar0(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryToFamilyBar0());
		return "getToFamilyBar0";
	}
	@Action(value="getToFamilyBar1", results={@Result(name = "getToFamilyBar1", type = "json", params = { "root", "message" })})
	public String getToFamilyBar1(){
		message = new HashMap<String, Object>();
		message.put("series", effectService.queryToFamilyBar1());
		return "getToFamilyBar1";
	}
	@Action(value="getToFamily", results={@Result(name = "getToFamily", type = "json", params = { "root", "povertyinfolist" })})
	public String getToFamily(){
		povertyinfolist = new ArrayList <Map<String, Object>>();
		povertyinfolist = effectService.queryToFamily();
		return "getToFamily";
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
