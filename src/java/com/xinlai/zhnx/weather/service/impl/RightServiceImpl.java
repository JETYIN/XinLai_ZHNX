package com.xinlai.zhnx.weather.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.weather.dao.RightDao;
import com.xinlai.zhnx.weather.service.RightService;

@Service("rightService")
public class RightServiceImpl implements RightService {

	@Resource(type = RightDao.class)
	private RightDao rightDao;

	@Override
	public List<Map<String, Object>> getRainOfYear() {
		List<Map<String, Object>> RainOfYearList = rightDao.getRainOfYear();
		List<Float> rainfallList = new ArrayList<Float>();
		String label = "['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']";
		for (int i=0;i<RainOfYearList.size();i++)
		{
			Map<String, Object> datamap = RainOfYearList.get(i);
			rainfallList.add((Float)datamap.get("Rainfall"));
		}
		Map<String, Object> ReturnMap = new HashMap<String, Object>();
		ReturnMap.put("name", "降雨量");
		ReturnMap.put("unit", "mm");
		ReturnMap.put("label", JSON.parse(label));
		ReturnMap.put("data", rainfallList);
		List<Map<String, Object>> message = new ArrayList<Map<String, Object>>();
		message.add(ReturnMap);
		return message;
	}

	@Override
	public Map<String, Object> getSynthesisKPI() {
		Map<String, Object> SynthesisKPIMap = rightDao.getSynthesisKPI();
		List<Object> dataList = new ArrayList<Object>();
		List<String> IconsURLList = new ArrayList<String>();
		String title = "综合天气指标";
		String type = "['累计蓝天天数', 'PM2.5大于100天数', '月平均降水量', '累计特殊天气数']";
		IconsURLList.add("svg/weather/common/TotalSkyDays.svg");
		IconsURLList.add("svg/weather/common/PM2dot5Than100Days.svg");
		IconsURLList.add("svg/weather/common/MonthAveragePrecipitation.svg");
		IconsURLList.add("svg/weather/common/TotalSpecialWeatherNumber.svg");
		dataList.add(SynthesisKPIMap.get("TotalSkyDays"));
		dataList.add(SynthesisKPIMap.get("PM"));
		dataList.add(SynthesisKPIMap.get("MonthAveragePrecipitation"));
		dataList.add(SynthesisKPIMap.get("TotalSpecialWeatherNumber"));
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("title", title);
		message.put("type", JSON.parse(type));
		message.put("IconsURL", IconsURLList);
		message.put("value", dataList);
		return message;
	}

	@Override
	public Map<String, Object> getDisasters() {
		Map<String, Object> DisastersMap = rightDao.getDisasters();
		List<Object> dataList = new ArrayList<Object>();
		List<Object> cropdataList = new ArrayList<Object>();
		List<String> IconsURLList = new ArrayList<String>();
		String title = "气象灾害";
		String type = "['干旱灾害天数', '洪涝灾害天数', '暴雪灾害天数', '沙尘暴灾害天数']";
		IconsURLList.add("svg/weather/common/DroughtDisasterDays.svg");
		IconsURLList.add("svg/weather/common/DisasterDays.svg");
		IconsURLList.add("svg/weather/common/SnowfallDisasterDays.svg");
		IconsURLList.add("svg/weather/common/StormDisasterDays.svg");
		dataList.add(DisastersMap.get("DroughtDisasterDays"));
		dataList.add(DisastersMap.get("DisasterDays"));
		dataList.add(DisastersMap.get("SnowfallDisasterDays"));
		dataList.add(DisastersMap.get("StormDisasterDays"));
		cropdataList.add(DisastersMap.get("DroughtDisastercrop"));
		cropdataList.add(DisastersMap.get("Disastercrop"));
		cropdataList.add(DisastersMap.get("SnowfallDisastercrop"));
		cropdataList.add(DisastersMap.get("StormDisastercrop"));
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("title", title);
		message.put("type", JSON.parse(type));
		message.put("IconsURL", IconsURLList);
		message.put("value", dataList);
		message.put("cropValue", cropdataList);
		return message;
	}

}
