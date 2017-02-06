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

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.weather.dao.TrafficDao;
import com.xinlai.zhnx.weather.service.TrafficService;

@Service("trafficService")
public class TrafficServiceImpl implements TrafficService {

	@Resource
	private TrafficDao trafficDao;

	@Override
	public List<Map<String, Object>> getHighwayForecast() {
		Set<String> roadtypeSet = new LinkedHashSet<String>();
		roadtypeSet.add("高速");
		roadtypeSet.add("国道");
		roadtypeSet.add("省道");
		Iterator<String> iterroadtype = roadtypeSet.iterator();
		String type = "['交通实况气象条件', '能见度指数', '路面湿滑指数', '横风指数', '爆胎指数', '行车提示']";
		List<Map<String, Object>> ReturnList = new ArrayList<Map<String,Object>>();
		while(iterroadtype.hasNext())
		{
			String roadtype = iterroadtype.next();
			List<Map<String, Object>> HighwayForecastList = trafficDao.getHighwayForecast(roadtype);
			List<String> siteList = new ArrayList<String>();
			List<String> siteIDList = new ArrayList<String>();
			List<String> roadList = new ArrayList<String>();
			List<String> weatherList = new ArrayList<String>();
			List<Float[]> tempList = new ArrayList<Float[]>();
			List<Object> valueList = new ArrayList<Object>();
			for(int i=0;i<HighwayForecastList.size();i++)
			{
				Map<String, Object> dataMap = HighwayForecastList.get(i);
				siteList.add((String) dataMap.get("site"));
				siteIDList.add((String) dataMap.get("siteID"));
				roadList.add((String) dataMap.get("road"));
				weatherList.add((String) dataMap.get("weather"));
				tempList.add(new Float[]{(Float) dataMap.get("lowtemp"),(Float) dataMap.get("hightemp")});
				valueList.add(new Object[]{(String) dataMap.get("cond"),dataMap.get("visibility"),dataMap.get("wet"),
				dataMap.get("crosswind"),dataMap.get("tyreburst"),dataMap.get("driving")});
			}
			Map<String, Object> dataSet = new HashMap<String, Object>();
			dataSet.put("site", siteList);
			dataSet.put("siteID", siteIDList);
			dataSet.put("road", roadList);
			dataSet.put("weather", weatherList);
			dataSet.put("Temp", tempList);
			dataSet.put("Type", JSON.parse(type));
			dataSet.put("value", valueList);
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("type", roadtype);
			data.put("dataset", dataSet);
			ReturnList.add(data);
		}
		return ReturnList;
	}

	@Override
	public Map<String, Object> getTrifficStation() {
		List<Map<String, Object>> TrifficStationList = trafficDao.getTrifficStation();
		List<Map<String, Object>> datasetList = new ArrayList<Map<String, Object>>();
		for (int i=0;i<TrifficStationList.size();i++)
		{
			Map<String, Object> dataMap = TrifficStationList.get(i);
			Map<String, Object> dataSet = new HashMap<String, Object>();
			List<Object> dataList = new ArrayList<Object>();
			dataList.add(dataMap.get("RoadSurfaceTemp")+"℃");
			dataList.add(dataMap.get("RoadbedTemp")+"℃");
			dataList.add(dataMap.get("Precipitation")+"mm/min");
			dataList.add(dataMap.get("VisibilityIndex")+"m");
			dataList.add(dataMap.get("WindSpeed")+"m/s");
			dataSet.put("station", dataMap.get("StationName"));
			dataSet.put("stationID", dataMap.get("StationCode"));
			dataSet.put("data", dataList);
			datasetList.add(dataSet);
		}
		Map<String, Object> ReturnMap = new HashMap<String, Object>();
		ReturnMap.put("dataset", datasetList);
		return ReturnMap;
	}

	@Override
	public List<Map<String, Object>> getRoadOrStationForecast_wd(String siteID, String stationID) {
		Map<String, Object> para = new HashMap<String, Object>();
		para.put("siteID", siteID);
		para.put("stationID", stationID);
		String unit = "℃";
		String label = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]";
		List<Map<String, Object>> RoadOrStationForecastList = trafficDao.getRoadOrStationForecast(para);
		List<Object> roadsurtempList = new ArrayList<Object>();
		List<Object> roadbedtempList = new ArrayList<Object>();
		for (int i=0;i<RoadOrStationForecastList.size();i++)
		{
			Map<String, Object> dataMap = RoadOrStationForecastList.get(i);
			roadsurtempList.add(dataMap.get("RoadSurfaceTemp"));
			roadbedtempList.add(dataMap.get("RoadbedTemp"));
		}
		Map<String, Object> roadsurtempMap = new HashMap<String, Object>();
		Map<String, Object> roadbedtempMap = new HashMap<String, Object>();
		roadsurtempMap.put("unit", unit);
		roadsurtempMap.put("label", JSON.parse(label));
		roadsurtempMap.put("data", roadsurtempList);
		roadbedtempMap.put("unit", unit);
		roadbedtempMap.put("label", JSON.parse(label));
		roadbedtempMap.put("data", roadbedtempList);
		Map<String, Object> ReturnroadsurtempMap = new HashMap<String, Object>();
		Map<String, Object> ReturnroadbedtempMap = new HashMap<String, Object>();
		ReturnroadsurtempMap.put("group", "路面温度");
		ReturnroadsurtempMap.put("data", new Object[]{roadsurtempMap});
		ReturnroadbedtempMap.put("group", "路基温度");
		ReturnroadbedtempMap.put("data", new Object[]{roadbedtempMap});
		List<Map<String, Object>> ReturnList = new ArrayList<Map<String, Object>>();
		ReturnList.add(ReturnroadsurtempMap);
		ReturnList.add(ReturnroadbedtempMap);
		return ReturnList;
	}

	@Override
	public List<Map<String, Object>> getRoadOrStationForecast_njd(String siteID, String stationID) {
		Map<String, Object> para = new HashMap<String, Object>();
		para.put("siteID", siteID);
		para.put("stationID", stationID);
		String unit = "m";
		String label = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]";
		List<Map<String, Object>> RoadOrStationForecastList = trafficDao.getRoadOrStationForecast(para);
		List<Object> visibilityList = new ArrayList<Object>();
		for (int i=0;i<RoadOrStationForecastList.size();i++)
		{
			Map<String, Object> dataMap = RoadOrStationForecastList.get(i);
			visibilityList.add(dataMap.get("VisibilityIndex"));
		}
		Map<String, Object> visibilityMap = new HashMap<String, Object>();
		visibilityMap.put("unit", unit);
		visibilityMap.put("label", JSON.parse(label));
		visibilityMap.put("data", visibilityList);
		Map<String, Object> ReturnvisibilityMap = new HashMap<String, Object>();
		ReturnvisibilityMap.put("group", "能见度");
		ReturnvisibilityMap.put("data", new Object[]{visibilityMap});
		List<Map<String, Object>> ReturnList = new ArrayList<Map<String, Object>>();
		ReturnList.add(ReturnvisibilityMap);
		return ReturnList;
	}

	@Override
	public List<Map<String, Object>> getRoadOrStationForecast_fs(String siteID, String stationID) {
		Map<String, Object> para = new HashMap<String, Object>();
		para.put("siteID", siteID);
		para.put("stationID", stationID);
		String unit = "m/s";
		String label = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]";
		List<Map<String, Object>> RoadOrStationForecastList = trafficDao.getRoadOrStationForecast(para);
		List<Object> windSpeedList = new ArrayList<Object>();
		for (int i=0;i<RoadOrStationForecastList.size();i++)
		{
			Map<String, Object> dataMap = RoadOrStationForecastList.get(i);
			windSpeedList.add(dataMap.get("WindSpeed"));
		}
		Map<String, Object> windSpeedMap = new HashMap<String, Object>();
		windSpeedMap.put("unit", unit);
		windSpeedMap.put("label", JSON.parse(label));
		windSpeedMap.put("data", windSpeedList);
		Map<String, Object> ReturnwindSpeedMap = new HashMap<String, Object>();
		ReturnwindSpeedMap.put("group", "风速");
		ReturnwindSpeedMap.put("data", new Object[]{windSpeedMap});
		List<Map<String, Object>> ReturnList = new ArrayList<Map<String, Object>>();
		ReturnList.add(ReturnwindSpeedMap);
		return ReturnList;
	}

	@Override
	public List<Map<String, Object>> getRoadOrStationForecast_jsl(String siteID, String stationID) {
		Map<String, Object> para = new HashMap<String, Object>();
		para.put("siteID", siteID);
		para.put("stationID", stationID);
		String unit = "mm";
		String label = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]";
		List<Map<String, Object>> RoadOrStationForecastList = trafficDao.getRoadOrStationForecast(para);
		List<Object> precipitationList = new ArrayList<Object>();
		for (int i=0;i<RoadOrStationForecastList.size();i++)
		{
			Map<String, Object> dataMap = RoadOrStationForecastList.get(i);
			precipitationList.add(dataMap.get("Precipitation"));
		}
		Map<String, Object> precipitationMap = new HashMap<String, Object>();
		precipitationMap.put("unit", unit);
		precipitationMap.put("label", JSON.parse(label));
		precipitationMap.put("data", precipitationList);
		Map<String, Object> ReturnprecipitationMap = new HashMap<String, Object>();
		ReturnprecipitationMap.put("group", "降水量");
		ReturnprecipitationMap.put("data", new Object[]{precipitationMap});
		List<Map<String, Object>> ReturnList = new ArrayList<Map<String, Object>>();
		ReturnList.add(ReturnprecipitationMap);
		return ReturnList;
	}


	
}
