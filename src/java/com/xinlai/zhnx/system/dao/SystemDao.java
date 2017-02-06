package com.xinlai.zhnx.system.dao;

import java.util.List;
import java.util.Map;

public interface SystemDao {
	public Map<String,Object> getProductArea();
	public List<Map<String, Object>> getOneLeveMenu(int productAreaId);
	public List<Map<String, Object>> getTwoLevelMenu(Map<String,Object> map);
	public List<Map<String, Object>> getAreaBlindInfo(int productAreaId);
	public List<Map<String, Object>> getOneLevelMenuBlindInfo();

}
