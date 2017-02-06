package com.xinlai.zhnx.weather.action;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.common.action.BaseAction;
import com.xinlai.zhnx.weather.service.RightService;

@Controller
@Namespace("/weather/right")
public class RightAction extends BaseAction{
	
	private static final long serialVersionUID = 213479508314434993L;
	
	@Resource(type=RightService.class)
	private RightService rightService;
	
	@Action(value="getRainOfYear", results={@Result(name = "getRainOfYear", type = "json", params = { "root", "message" })})
	public String getRainOfYear(){
		message = new HashMap<String, Object>();
//		String data = "[" +
//				"    {" +
//			    "    	name : '降水量'," +
//				"		unit : 'mm'," +
//				"		label:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']," +
//				"		data:[14, 25, 36, 26, 17, 17, 19, 19, 44]" +
//				"    }" +
//				"]";
//		message.put("data", JSON.parse(data));
		message.put("data", rightService.getRainOfYear());
		return "getRainOfYear";
	}
	
	@Action(value="getSynthesisKPI", results={@Result(name = "getSynthesisKPI", type = "json", params = { "root", "message" })})
	public String getSynthesisKPI(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	title : '综合天气指标'," +
//				"	IconsURL : ['svg/weather/common/TotalSkyDays.svg','svg/weather/common/PM2dot5Than100Days.svg', " +
//				"	            'svg/weather/common/MonthAveragePrecipitation.svg', 'svg/weather/common/TotalSpecialWeatherNumber.svg']," +
//				"	type : ['累计蓝天天数', 'PM2.5大于100天数', '月平均降水量', '累计特殊天气数']," +
//				"	value : [122, 12, 20, 8]" +
//				"}";
		message.put("series", rightService.getSynthesisKPI());
		return "getSynthesisKPI";
	}

	@Action(value="getDisasters", results={@Result(name = "getDisasters", type = "json", params = { "root", "message" })})
	public String getDisasters(){
		message = new HashMap<String, Object>();
//		String series = "{" +
//				"	title : '气象灾害'," +
//				"	IconsURL : ['svg/weather/common/DroughtDisasterDays.svg','svg/weather/common/DisasterDays.svg', " +
//				"	            'svg/weather/common/SnowfallDisasterDays.svg', 'svg/weather/common/StormDisasterDays.svg']," +
//				"	type : ['干旱灾害天数', '洪涝灾害天数', '暴雪灾害天数', '沙尘暴灾害天数']," +
//				"	value : [12, 12, 12, 8]," +
//				"	cropValue : [5000, 5000, 5000, 5000]," +
//				"}";
		message.put("series", rightService.getDisasters());
		return "getDisasters";
	}
}
