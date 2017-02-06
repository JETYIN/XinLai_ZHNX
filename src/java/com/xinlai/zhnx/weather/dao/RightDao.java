package com.xinlai.zhnx.weather.dao;

import java.util.List;
import java.util.Map;

public interface RightDao {

	public List<Map<String, Object>> getRainOfYear();
	
	public Map<String, Object> getSynthesisKPI();
	
	public Map<String, Object> getDisasters();
}
