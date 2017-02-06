package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface ShiSanWuService {
	
	
	//时间表路线图
	public Map<String,Object> queryCategoryLeavePoverty(String category);
	
	//脱贫规划
	public Map<String,Object> queryAntPovertyPlanSum();
	
	//五个一批汇总
	public Map<String,Object> queryFiveOneSum();
	
	//五个一批柱图
	public Map<String,Object> queryFiveOneBar(String areaid);
	
	//五个一批地图
	public List<Map<String, Object>> queryFiveOne(String areaid);
	
	//脱贫规划柱图
	public Map<String,Object> queryAntPovertyPlanBar();
	
	//脱贫规划地图
	public List<Map<String, Object>> queryAntPovertyPlan();
}
