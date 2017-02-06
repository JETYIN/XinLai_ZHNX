package com.xinlai.zhnx.education.dao;

import java.util.List;
import java.util.Map;

public interface ResourcePlatformDao {
	
	public List<Map<String, Object>> getEduSTLPT(String type);
	
	public List<Map<String, Object>> getEduSTLPTBBT_year();
	
	public List<Map<String, Object>> getEduSTLPTBBT_mon();

}
