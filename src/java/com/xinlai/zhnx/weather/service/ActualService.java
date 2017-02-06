package com.xinlai.zhnx.weather.service;

import java.util.Map;

public interface ActualService {
	public Map<String, Object> getActualWeather(String areaCode);
	public Map<String, Object> getLifeIndex(String areaCode);
	public float getMaxTemp(String areaCode);
	public float getMinTemp(String areaCode);
	public float getAvgTemp(String areaCode);
	
	public float getMaxWind(String areaCode);
	public float getMinWind(String areaCode);
	public float getAvgWind(String areaCode);

	public float getMaxRain(String areaCode);
	public float getMinRain(String areaCode);
	public float getAvgRain(String areaCode);
	

	public Map<String, Object> getTodayRain(String areaCode);
	public Map<String, Object> getTodayTemp(String areaCode);
	public Map<String, Object> getTodayWind(String areaCode);
	
	public Map<String, Object> getMapInfo(String areaCode);
}
