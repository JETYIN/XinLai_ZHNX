package com.xinlai.zhnx.weather.service;

import java.util.List;
import java.util.Map;

public interface TrafficService {

	public List<Map<String, Object>> getHighwayForecast();
	
	public Map<String, Object> getTrifficStation();
	
	public List<Map<String, Object>> getRoadOrStationForecast_wd(String siteID,String stationID);
	
	public List<Map<String, Object>> getRoadOrStationForecast_njd(String siteID,String stationID);
	
	public List<Map<String, Object>> getRoadOrStationForecast_fs(String siteID,String stationID);
	
	public List<Map<String, Object>> getRoadOrStationForecast_jsl(String siteID,String stationID);
}
