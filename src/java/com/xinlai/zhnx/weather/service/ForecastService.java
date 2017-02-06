package com.xinlai.zhnx.weather.service;

import java.util.List;
import java.util.Map;

public interface ForecastService {
	public Map<String, Object> getTrendForecast(String areaCode);
	
	public Map<String, Object> getLifeIndex(String areaCode);
	
	public Map<String, Object> getTodayTrendForecast(String areaCode);
	
	public List<Map<String, Object>> getWarMsgRoll();

	public Map<String, Object> getMapInfo(String areaCode);
}
