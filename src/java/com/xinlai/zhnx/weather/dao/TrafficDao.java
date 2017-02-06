package com.xinlai.zhnx.weather.dao;

import java.util.List;
import java.util.Map;

public interface TrafficDao {
	
	public List<Map<String, Object>> getHighwayForecast(String roadtype);

	public List<Map<String, Object>> getTrifficStation();
	
	public List<Map<String, Object>> getRoadOrStationForecast(Map data);
}
