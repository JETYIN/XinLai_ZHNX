package com.xinlai.zhnx.education.service;

import java.util.List;
import java.util.Map;

public interface ResourcePlatformService {
	
	public Map<String, Object> getEduSTLPTResource(String type);

	public Map<String, Object> getEduSTLPTManagement(String type);
	
	public Map<String, Object> getEduSTLPTXXTRRT();
	
	public Map<String, Object> getEduSTLPTBBT_year();
	
	public Map<String, Object> getEduSTLPTBBT_mon();
}
