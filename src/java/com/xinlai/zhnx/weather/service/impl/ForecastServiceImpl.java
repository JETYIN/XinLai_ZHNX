package com.xinlai.zhnx.weather.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.weather.dao.ForecastDao;
import com.xinlai.zhnx.weather.service.ForecastService;

@Service("forecastService")
public class ForecastServiceImpl implements ForecastService{

	@Resource
	private ForecastDao forecastDao;

	@Override
	public Map<String, Object> getTrendForecast(String areaCode) {
		List<Map<String, Object>> TrendForecastList = forecastDao.getTrendForecast(areaCode);
		
		List<String> weekList = new ArrayList<String>();
		List<String> dateList = new ArrayList<String>();
		List<String> weatherList = new ArrayList<String>();
		List<Float[]> tempList = new ArrayList<Float[]>();
		List<Object[]> windList = new ArrayList<Object[]>();
		List<Float> RHList = new ArrayList<Float>();
		List<Float> pressureList = new ArrayList<Float>();
		
		for(int i = Math.max(0, TrendForecastList.size() - 1); i >= 0; i--){
			Map<String, Object> TrendForecast = TrendForecastList.get(i);
			weekList.add((String)TrendForecast.get("day2week"));
			dateList.add((String)TrendForecast.get("date2day"));
			weatherList.add((String)TrendForecast.get("weather"));
			tempList.add(new Float[]{(Float)TrendForecast.get("maxTemp"), (Float)TrendForecast.get("minTemp")});
			windList.add(new Object[]{(String)TrendForecast.get("wind"), (Float)TrendForecast.get("windspeed")});
			RHList.add((Float)TrendForecast.get("RH"));
			pressureList.add((Float)TrendForecast.get("pressure"));
		}
		
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("week", weekList);
		message.put("Date", dateList);
		message.put("weather", weatherList);
		message.put("Temp", tempList);
		message.put("wind", windList);
		message.put("RH", RHList);
		message.put("pressure", pressureList);
		
		return message;
	}

	@Override
	public Map<String, Object> getLifeIndex(String areaCode) {
		Map<String, Object> lifeIndexMap = forecastDao.getLifeIndex(areaCode);
		// 晨练指数、穿衣指数、感冒指数、晾晒指数、洗车指数、紫外线指数
		String[] types = new String[]{"ExerciseIndex","DressIndex","ColdIndex","AirIndex","WashIndex","RayStrengthIndex"};
		// 指数值
		List<Object> ValuesList = new ArrayList<Object>();
		ValuesList.add(lifeIndexMap.get("AmbulatoryMotorIndex"));
		ValuesList.add(lifeIndexMap.get("DressingIndex"));
		ValuesList.add(lifeIndexMap.get("AcoldIndex"));
		ValuesList.add(lifeIndexMap.get("DryingIndex"));
		ValuesList.add(lifeIndexMap.get("WashingIndex"));
		ValuesList.add(lifeIndexMap.get("GradeofUVIndex"));
		// 指数解读
		List<Object> TipsList = new ArrayList<Object>();
		TipsList.add(lifeIndexMap.get("AmbulatoryMotor"));
		TipsList.add(lifeIndexMap.get("Dressing"));
		TipsList.add(lifeIndexMap.get("Acold"));
		TipsList.add(lifeIndexMap.get("Drying"));
		TipsList.add(lifeIndexMap.get("Washing"));
		TipsList.add(lifeIndexMap.get("GradeofUV"));
		// 返回值
		Map<String,Object> returnMap = new HashMap<String, Object>();
		returnMap.put("Icons", types);
		returnMap.put("Values", ValuesList);
		returnMap.put("Tips", TipsList);
		return returnMap;
	}

	@Override
	public Map<String, Object> getTodayTrendForecast(String areaCode) {
		List<Map<String, Object>> TodayTrendForecastList = forecastDao.getTodayTrendForecast(areaCode);
		List<String> weatherList = new ArrayList<String>();
		List<Integer> tempList = new ArrayList<Integer>();
		List<String> windList = new ArrayList<String>();
		List<String> windPowerList = new ArrayList<String>();
		for (int i=0;i<TodayTrendForecastList.size();i++)
		{
			Map<String, Object> TodayTrendForecast = TodayTrendForecastList.get(i);
			weatherList.add((String) TodayTrendForecast.get("weather"));
			tempList.add((Integer) TodayTrendForecast.get("data"));
			windList.add((String) TodayTrendForecast.get("wind"));
			windPowerList.add((String) TodayTrendForecast.get("windPower"));
		}
		Map<String, Object> DataMap = new HashMap<String, Object>();
		DataMap.put("weather", weatherList);
		DataMap.put("data", tempList);
		DataMap.put("wind", windList);
		DataMap.put("windPower", windPowerList);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("data", DataMap);
		message.put("unit", "°C");
		return message;
	}

	@Override
	public List<Map<String, Object>> getWarMsgRoll() {
		List<Map<String, Object>> ReturnList = forecastDao.getWarMsgRoll();
		return ReturnList;
	}

	@Override
	public Map<String, Object> getMapInfo(String areaCode) {
		List<Map<String, Object>> MapInfoList = forecastDao.getMapInfo(areaCode);
		Map<String, Object> returndataMap = new HashMap<String, Object>();
		for(int i=0;i<MapInfoList.size();i++)
		{
			Map<String, Object> dataMap = MapInfoList.get(i);
			Map<String, Object> returnMap = new HashMap<String, Object>();
			returnMap.put("weather", dataMap.get("weather"));
			returnMap.put("max", dataMap.get("max"));
			returnMap.put("min", dataMap.get("min"));
			String areacode = (String) dataMap.get("areaCode");
			returndataMap.put(areacode, returnMap);
		}
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("data", returndataMap);
		return message;
	}
	
}
