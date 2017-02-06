package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface MeasureDao {
	
	//获取行业扶贫汇总(区)
	public Map<String,Object> querypovertyindustrysumqu();	
	
	//获取行业扶贫汇总(市)
	public Map<String,Object> querypovertyindustrysumshi(String areaid);	
	
	//获取行业扶贫汇总(县)
	public Map<String,Object> querypovertyindustrysumxian(String areaid);	
	
	//获取行业扶贫(区)
	public List<Map<String,Object>> querypovertyindustryqu();	
	
	//获取行业扶贫(市)
	public List<Map<String,Object>> querypovertyindustryshi(String areaid);	
	
	//获取行业扶贫(县)
	public List<Map<String,Object>> querypovertyindustryxian(String areaid);	
	
	//获取行业扶贫柱图(区)
	public List<Map<String,Object>> querypovertyindustrybarqu();	
	
	//获取行业扶贫柱图(市)
	public List<Map<String,Object>> querypovertyindustrybarshi(String areaid);	
	
	//获取行业扶贫柱图(县)
	public List<Map<String,Object>> querypovertyindustrybarxian(String areaid);	
	
	//获取行业扶贫柱图(乡)
	public List<Map<String,Object>> querypovertyindustrybarxiang(String areaid);	
	
	//获取社会扶贫汇总(区)
	public Map<String,Object> querypovertysocietysumqu();	
	
	//获取社会扶贫汇总(市)
	public Map<String,Object> querypovertysocietysumshi(String areaid);	
	
	//获取社会扶贫汇总(县)
	public Map<String,Object> querypovertysocietysumxian(String areaid);	
	
	//获取社会扶贫(区)
	public List<Map<String, Object>> querypovertysocietyqu();	
	
	//获取社会扶贫(市)
	public List<Map<String, Object>> querypovertysocietyshi(String areaid);	
	
	//获取社会扶贫(县)
	public List<Map<String, Object>> querypovertysocietyxian(String areaid);	
	
	//获取社会扶贫柱图(区)
	public List<Map<String,Object>> querypovertysocietybarqu();	
	
	//获取社会扶贫柱图(市)
	public List<Map<String,Object>> querypovertysocietybarshi(String areaid);	
	
	//获取社会扶贫柱图(县)
	public List<Map<String,Object>> querypovertysocietybarxian(String areaid);	
	
	//获取社会扶贫柱图(乡)
	public List<Map<String,Object>> querypovertysocietybarxiang(String areaid);	
	
	//获取帮扶责任人汇总(区)
	public Map<String,Object> querypovertyhelpsumqu();	
	
	//获取帮扶责任人汇总(市)
	public Map<String,Object> querypovertyhelpsumshi(String areaid);	
	
	//获取帮扶责任人汇总(县)
	public Map<String,Object> querypovertyhelpsumxian(String areaid);
	
	//获取帮扶责任人(区)
	public List<Map<String, Object>> querypovertyhelpqu();	
	
	//获取帮扶责任人(市)
	public List<Map<String, Object>> querypovertyhelpshi(String areaid);	
	
	//获取帮扶责任人(县)
	public List<Map<String, Object>> querypovertyhelpxian(String areaid);
	
	//获取帮扶责任人柱图(区)
	public List<Map<String,Object>> querypovertyhelpbarqu();	
	
	//获取帮扶责任人柱图(市)
	public List<Map<String,Object>> querypovertyhelpbarshi(String areaid);	
	
	//获取帮扶责任人柱图(县)
	public List<Map<String,Object>> querypovertyhelpbarxian(String areaid);	
	
	//获取帮扶责任人柱图(乡)
	public List<Map<String,Object>> querypovertyhelpbarxiang(String areaid);
	
	//获取专项扶贫汇总(区)
	public Map<String,Object> querypovertyspecialsumqu();	
	
	//获取专项扶贫汇总(市)
	public Map<String,Object> querypovertyspecialsumshi(String areaid);	
	
	//获取专项扶贫柱图(区)
	public List<Map<String,Object>> querypovertyspecialbarqu();
	
	//获取专项扶贫柱图(市)
	public List<Map<String,Object>> querypovertyspecialbarshi(String areaid);
	
	//获取专项扶贫地图(区)
	public List<Map<String, Object>> querypovertyspecialqu();	
	
	//获取专项扶贫地图(市)
	public List<Map<String, Object>> querypovertyspecialshi(String areaid);	

}
