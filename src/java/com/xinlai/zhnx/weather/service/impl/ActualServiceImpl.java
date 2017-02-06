package com.xinlai.zhnx.weather.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.weather.dao.ActualDao;
import com.xinlai.zhnx.weather.service.ActualService;

@Service("actualService")
public class ActualServiceImpl implements ActualService{

	@Resource
	private ActualDao actualDao;
	
	public Map<String, Object> getActualWeather(String areaCode){
		Map<String,Object> returnMap = new HashMap<String, Object>();
		List<Object> resultList = new ArrayList<Object>();
		resultList = actualDao.getActualWeather(areaCode);
		Set<String> typeSet = new LinkedHashSet<String>();
		//所有类别
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
			typeSet.add(dataMap.get("Type").toString());
		}
		Iterator<String> itertype = typeSet.iterator();
		List<Object> dataList = new ArrayList<Object>();
		List<Object> weatherList = new ArrayList<Object>();
		List<Object> TempList = new ArrayList<Object>();
		while(itertype.hasNext())
		{
			Map<String, Object> dataMap = new HashMap<String, Object>();
			String type = itertype.next();
			List<Object> typeList = new ArrayList<Object>();
			List<Object> valueList = new ArrayList<Object>();
			for (int i = 0; i < resultList.size(); i++) {
				Map<String, Object> resultMap = new HashMap<String, Object>();
				resultMap = (Map<String, Object>) resultList.get(i);
				if(resultMap.containsValue(type)){
					weatherList.add(resultMap.get("Weather"));
					TempList.add(resultMap.get("Temperature"));
					typeList.add("相对湿度");
					typeList.add(resultMap.get("WindDirection"));
					typeList.add("气压");
					valueList.add(resultMap.get("RelativeHumidity")+"%");
					valueList.add(resultMap.get("WindSpeed"));
					valueList.add(resultMap.get("BarometricPressure")+"kPa");
					if(type.equals("实时"))
					{
						typeList.add(resultMap.get("Longitude"));
						valueList.add(resultMap.get("Latitude"));
					}else if(type.equals("白天"))
					{
						typeList.add("日落");
						valueList.add(resultMap.get("Sunset").toString());
					}else
					{
						typeList.add("日出");
						valueList.add(resultMap.get("Sunset").toString());
					}
					dataMap.put("type", typeList);
					dataMap.put("value", valueList);
					dataList.add(dataMap);
				}
			}
		}
		returnMap.put("headText", typeSet);
		returnMap.put("weather", weatherList);
		returnMap.put("Temp", TempList);
		returnMap.put("rtData", dataList);
		return returnMap;
	}
	public Map<String, Object> getLifeIndex(String areaCode){
		Map<String,Object> returnMap = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();
		List<Object> resultList = new ArrayList<Object>();
		List<Object> ValuesList = new ArrayList<Object>();
		List<Object> TipsList = new ArrayList<Object>();
		resultList = actualDao.getLifeIndex(areaCode);
		dataMap = (Map<String, Object>) resultList.get(0);
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("ExerciseIndex");
		typeSet.add("DressIndex");
		typeSet.add("ColdIndex");
		typeSet.add("AirIndex");
		typeSet.add("WashIndex");
		typeSet.add("RayStrengthIndex");
		ValuesList.add(dataMap.get("AmbulatoryMotorIndex"));
		TipsList.add(dataMap.get("AmbulatoryMotor"));
		ValuesList.add(dataMap.get("DressingIndex"));
		TipsList.add(dataMap.get("Dressing"));
		ValuesList.add(dataMap.get("AcoldIndex"));
		TipsList.add(dataMap.get("Acold"));
		ValuesList.add(dataMap.get("DryingIndex"));
		TipsList.add(dataMap.get("Drying"));
		ValuesList.add(dataMap.get("WashingIndex"));
		TipsList.add(dataMap.get("Washing"));
		ValuesList.add(dataMap.get("GradeofUVIndex"));
		TipsList.add(dataMap.get("GradeofUV"));
		returnMap.put("Icons", typeSet);
		returnMap.put("Values", ValuesList);
		returnMap.put("Tips", TipsList);
		return returnMap;
	}
	public float getMaxTemp(String areaCode){
		return actualDao.getCurrentMMATemp(areaCode).get("maxTemp");
	}
	public float getMinTemp(String areaCode){
		return actualDao.getCurrentMMATemp(areaCode).get("minTemp");
	}
	@Override
	public float getAvgTemp(String areaCode) {
		return actualDao.getCurrentMMATemp(areaCode).get("avgTemp");
	}
	@Override
	public float getMaxWind(String areaCode) {
		return actualDao.getCurrentMMAWind(areaCode).get("maxWind");
	}
	@Override
	public float getMinWind(String areaCode) {
		return actualDao.getCurrentMMAWind(areaCode).get("minWind");
	}
	@Override
	public float getAvgWind(String areaCode) {
		return actualDao.getCurrentMMAWind(areaCode).get("avgWind");
	}
	@Override
	public float getMaxRain(String areaCode) {
		return actualDao.getCurrentMMARain(areaCode).get("maxRain");
	}
	@Override
	public float getMinRain(String areaCode) {
		return actualDao.getCurrentMMARain(areaCode).get("minRain");
	}
	@Override
	public float getAvgRain(String areaCode) {
		return actualDao.getCurrentMMARain(areaCode).get("avgRain");
	}
	
	@Override
	public Map<String, Object> getTodayRain(String areaCode) {
		List<Map<String, Float>> MMARainList = actualDao.getTodayMMARain(areaCode);
		List<Integer> labelList = new ArrayList<Integer>();
		List<Float> dataList = new ArrayList<Float>();
		for(int i = 0; i <= 24; i++){
			labelList.add(i);
			if(i < MMARainList.size()){
				Map<String, Float> MMARain = MMARainList.get(i);
				dataList.add(MMARain.get("Rain"));
			}
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("unit", "mm");
		dataMap.put("label", labelList);
		dataMap.put("data", dataList);
		List<Object> AllDataList = new ArrayList<Object>();
		AllDataList.add(dataMap);
		Map<String, Object> AllDataMap = new HashMap<String, Object>();
		AllDataMap.put("data", AllDataList);
		return AllDataMap;
	}
	@Override
	public Map<String, Object> getTodayTemp(String areaCode) {
		List<Map<String, Float>> MMATempList = actualDao.getTodayMMATemp(areaCode);
		List<Integer> labelList = new ArrayList<Integer>();
		List<Float> dataList = new ArrayList<Float>();
		for(int i = 0; i <= 24; i++){
			labelList.add(i);
			if(i < MMATempList.size()){
				Map<String, Float> MMATemp = MMATempList.get(i);
				dataList.add(MMATemp.get("Temp"));
			}
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("unit", "mm");
		dataMap.put("label", labelList);
		dataMap.put("data", dataList);
		List<Object> AllDataList = new ArrayList<Object>();
		AllDataList.add(dataMap);
		Map<String, Object> AllDataMap = new HashMap<String, Object>();
		AllDataMap.put("data", AllDataList);
		return AllDataMap;
	}
	@Override
	public Map<String, Object> getTodayWind(String areaCode) {
		List<Map<String, Float>> MMAWindList = actualDao.getTodayMMAWind(areaCode);
		List<Integer> labelList = new ArrayList<Integer>();
		List<Float> dataList = new ArrayList<Float>();
		for(int i = 0; i <= 24; i++){
			labelList.add(i);
			if(i < MMAWindList.size()){
				Map<String, Float> MMAWind = MMAWindList.get(i);
				dataList.add(MMAWind.get("Wind"));
			}
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("unit", "mm");
		dataMap.put("label", labelList);
		dataMap.put("data", dataList);
		List<Object> AllDataList = new ArrayList<Object>();
		AllDataList.add(dataMap);
		Map<String, Object> AllDataMap = new HashMap<String, Object>();
		AllDataMap.put("data", AllDataList);
		return AllDataMap;
	}
	@Override
	public Map<String, Object> getMapInfo(String areaCode) {
		List<Map<String, Object>> MapInfoList = actualDao.getMapInfo(areaCode);
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
