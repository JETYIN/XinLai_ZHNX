package com.xinlai.zhnx.health.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.health.service.RegionalPlatformService;

@Controller
@Namespace("/health/regionalPlatform")
public class RegionalPlatformAction extends BaseAction{
	@Resource
	private RegionalPlatformService regionalPlatformService;
	
	@Action(value="getPopulation", results={@Result(name = "getPopulation", type = "json", params = { "root", "message" })})
	public String getPopulation(){
		message = new HashMap<String, Object>();
		String dataList = "{" +
			"	secondTitleList:['662.00','12.63','4.85','8.24']," +
			"	compareList:['9.5‰','0.65‰','0.45‰','0.074‰']," +
			"	seriesAll : [" +
			"		{" +
			"			group : '1'," +
			"			data : [" +
			"				{" +
			"					unit : '万人'," +
			"					name:'全区总人口'," +
			"					label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"					data:[160,170, 220,230, 240, 250, 662]   	" +
			"				}" +
			"			]" +
			"		}," +
			"		{" +
			"			group : ''," +
			"			data : [" +
			"				{" +
			"					unit : '‰'," +
			"					name:'人口出生率'," +
			"					label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"					data:[10, 11, 11.03,11.5, 11.8, 12, 12.5]" +
			"				}" +
			"			]" +
			"		}," +
			"		{" +
			"			group : ''," +
			"		    data : [" +
			"				{" +
			"					unit : '‰'," +
			"					name:'人口死亡率'," +
			"					label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"					data:[3.01,4.01, 4.22,4.33, 4.45, 4.65, 4.85]   	" +
			"				}" +
			"			]" +
			"		}," +
			"		{" +
			"			group : ''," +
			"		   data : [" +
			"				{" +
			"					unit : '‰'," +
			"					name:'自然增长率'," +
			"					label:[ 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"					data:[5, 6.1, 6.7, 7.4, 8.2, 8.9, 9.8]   	" +
			"				}" +
			"			]" +
			"		}      " +
			"	]" +
			"}";
		message.put("dataList", JSON.parse(dataList));
		return "getPopulation";
	}
	
	@Action(value="getPopulationAndMedicalService", results={@Result(name = "getPopulationAndMedicalService", type = "json", params = { "root", "message" })})
	public String getPopulationAndMedicalService(){
		message = new HashMap<String, Object>();
		String dataList = "{" +
			"	secondTitleList:['30 234 789','23 789 234','1 702 234','976 234']," +
			"	compareList:['1.54%','2.65%','6.45%','1.74%']," +
			"	seriesAll : [" +
			"		{" +
			"			group : '1'," +
			"			   data : [" +
			"					{" +
			"						unit : '万人'," +
			"						name:'总诊疗人数'," +
			"						label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"						data:[160,170, 220,230, 240, 250, 313.4]   	" +
			"					}" +
			"				]" +
			"		} ,  " +
			"		{" +
			"			group : ''," +
			"			   data : [" +
			"					{" +
			"						unit : '万人'," +
			"						name:'门诊人数'," +
			"						label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"						data:[130,140, 160,200, 200, 220, 230]   	" +
			"					}" +
			"				]" +
			"		}," +
			"		{" +
			"			group : ''," +
			"			   data : [" +
			"					{" +
			"						unit : '万人'," +
			"						name:'急诊人数'," +
			"						label:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"						data:[8, 10, 11,13, 14, 15, 50]   	" +
			"					}" +
			"				]" +
			"		}," +
			"		{" +
			"			group : ''," +
			"			   data : [" +
			"					{" +
			"						unit : '万人'," +
			"						name:'住院人数'," +
			"						label:[ 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]," +
			"						data:[13.0, 16.1, 16.7, 17.4, 18.2, 18.9, 33.4]   	" +
			"					}" +
			"				]" +
			"		}      " +
			"	]" +
			"}";
		message.put("dataList", JSON.parse(dataList));
		return "getPopulationAndMedicalService";
	}
	
	@Action(value="getRegionalHealthCircle", results={@Result(name = "getRegionalHealthCircle", type = "json", params = { "root", "message" })})
	public String getRegionalHealthCircle(){
		message = new HashMap<String, Object>();
		
		
		return "getRegionalHealthCircle";
	}
}
