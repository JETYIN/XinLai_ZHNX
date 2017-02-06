package com.xinlai.zhnx.weather.dao;

import java.util.List;
import java.util.Map;

public interface ForecastDao {
	public List<Map<String, Object>> getTrendForecast(String areaCode);
	
	public Map<String, Object> getLifeIndex(String areaCode);
	
	public List<Map<String, Object>> getTodayTrendForecast(String areaCode);

	public List<Map<String, Object>> getWarMsgRoll();

	public List<Map<String, Object>> getMapInfo(String areaCode);
}
