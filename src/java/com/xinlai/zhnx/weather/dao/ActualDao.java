package com.xinlai.zhnx.weather.dao;

import java.util.List;
import java.util.Map;

public interface ActualDao {
	
	public List<Object> getActualWeather(String areaCode);

	public List<Object> getLifeIndex(String areaCode);
	
	public Map<String, Float> getCurrentMMATemp(String areaCode);
	
	public Map<String, Float> getCurrentMMAWind(String areaCode);

	public Map<String, Float> getCurrentMMARain(String areaCode);

	public List<Map<String, Float>> getTodayMMATemp(String areaCode);
	
	public List<Map<String, Float>> getTodayMMAWind(String areaCode);

	public List<Map<String, Float>> getTodayMMARain(String areaCode);
	
	public List<Map<String, Object>> getMapInfo(String areaCode);

}
