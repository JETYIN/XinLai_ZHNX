package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface MeasureService {

	//获取行业扶贫汇总
	public Map<String, Object> querypovertyindustrysum(String areaid);
	
	//获取行业扶贫地图
	public List<Map<String, Object>> querypovertyindustry(String areaid);
	
	//获取行业扶贫柱图
	public Map<String, Object> querypovertyindustrybar(String areaid);
	
	//获取社会扶贫汇总
	public Map<String, Object> querypovertysocietysum(String areaid);
	
	//获取社会扶贫地图
	public List<Map<String, Object>> querypovertysociety(String areaid);
	
	//获取社会扶贫柱图
	public Map<String, Object> querypovertysocietybar(String areaid);
	
	//获取帮扶责任人汇总
	public Map<String, Object> querypovertyhelpsum(String areaid);
	
	//获取帮扶责任人地图
	public List<Map<String, Object>> querypovertyhelp(String areaid);
	
	//获取帮扶责任人柱图
	public Map<String, Object> querypovertyhelpbar(String areaid);
	
	//获取专项扶贫汇总
	public Map<String, Object> querypovertyspecialsum(String areaid);
	
	//获取专项扶贫柱图
	public Map<String, Object> querypovertyspecialbar(String areaid);
	
	//获取专项扶贫地图
	public List<Map<String, Object>> querypovertyspecial(String areaid);
}
