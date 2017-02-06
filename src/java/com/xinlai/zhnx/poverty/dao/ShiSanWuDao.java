package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface ShiSanWuDao {
	
	public Map<String,Object> queryCategoryLeavePoverty(String category);
	
	//脱贫规划
	public List<Map<String,Object>> queryAntPovertyPlanSum();
	
	//五个一批汇总
	public Map<String,Object> queryFiveOneSum();
	
	//五个一批汇总柱图(区)
	public List<Map<String,Object>> queryFiveOneBarqu();
	
	//五个一批汇总柱图(市)
	public List<Map<String,Object>> queryFiveOneBarshi(String areaid);
	
	//脱贫规划柱图
	public List<Map<String,Object>> queryAntPovertyPlanBar();
	
	//脱贫规划地图
	public List<Map<String,Object>> queryAntPovertyPlan();
}
