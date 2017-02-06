package com.xinlai.zhnx.weather.service;

import java.util.List;
import java.util.Map;

public interface RightService {

	public List<Map<String, Object>> getRainOfYear();
	
	public Map<String, Object> getSynthesisKPI();
	
	public Map<String, Object> getDisasters();
}
