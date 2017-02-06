package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface DevelopmentDao {

	
	//五通查询
	public List<Object> queryChildArea(String areaid);
	public List<Map<String,Object>> queryOpenInfo();
	
	// 获取脱贫需求汇总(区)
	public List<Object> querypovertyneedsumqu();
	// 获取脱贫需求汇总(市)
	public List<Object> querypovertyneedsumshi(String areaid);
	// 获取脱贫需求汇总(县)
	public List<Object> querypovertyneedsumxian(String areaid);

	// 获取脱贫需求(区)
	public List<Object> querypovertyneedqu();
	// 获取脱贫需求(市)
	public List<Object> querypovertyneedshi(String areaid);
	// 获取脱贫需求(县)
	public List<Object> querypovertyneedxian(String areaid);
	
	// 获取脱贫需求柱图(区)
	public List<Object> querypovertyneedbarqu();
	// 获取脱贫需求柱图(市)
	public List<Object> querypovertyneedbarshi(String areaid);
	// 获取脱贫需求柱图(县)
	public List<Object> querypovertyneedbarxian(String areaid);
	// 获取脱贫需求柱图(乡)
	public List<Object> querypovertyneedbarxiang(String areaid);


	// 获取脱贫需求汇总(区)
	public Map<String, Object> queryindustryinfosumqu();
	// 获取脱贫需求汇总(市)
	public Map<String, Object> queryindustryinfosumshi(String areaid);
	// 获取脱贫需求汇总(县)
	public Map<String, Object> queryindustryinfosumxian(String areaid);

	// 获取脱贫需求(区)
	public List<Object> queryindustryinfoqu();
	// 获取脱贫需求(市)
	public List<Object> queryindustryinfoshi(String areaid);
	// 获取脱贫需求(县)
	public List<Object> queryindustryinfoxian(String areaid);
	
	// 获取脱贫需求柱图(区)
	public List<Object> queryindustryinfobarqu();
	// 获取脱贫需求柱图(市)
	public List<Object> queryindustryinfobarshi(String areaid);
	// 获取脱贫需求柱图(县)
	public List<Object> queryindustryinfobarxian(String areaid);
	// 获取脱贫需求柱图(乡)
	public List<Object> queryindustryinfobarxiang(String areaid);
	
	// 获取信息化需求汇总(区)
	public Map<String, Object> queryinformationinfosumqu();
	// 获取信息化需求汇总(市)
	public Map<String, Object> queryinformationinfosumshi(String areaid);
	// 获取信息化需求汇总(县)
	public Map<String, Object> queryinformationinfosumxian(String areaid);
	
	// 获取信息化需求(区)
	public List<Object> queryinformationinfoqu();
	// 获取信息化需求(市)
	public List<Object> queryinformationinfoshi(String areaid);
	// 获取信息化需求(县)
	public List<Object> queryinformationinfoxian(String areaid);
	
	// 获取信息化需求柱图(区)
	public List<Object> queryinformationinfobarqu();
	// 获取信息化需求柱图(市)
	public List<Object> queryinformationinfobarshi(String areaid);
	// 获取信息化需求柱图(县)
	public List<Object> queryinformationinfobarxian(String areaid);
	// 获取信息化需求柱图(乡)
	public List<Object> queryinformationinfobarxiang(String areaid);
	
	// 获取信息化需求汇总(区)
	public Map<String, Object> queryabilityinfosumqu();
	// 获取信息化需求汇总(市)
	public Map<String, Object> queryabilityinfosumshi(String areaid);
	// 获取信息化需求汇总(县)
	public Map<String, Object> queryabilityinfosumxian(String areaid);
	
	// 获取信息化需求(区)
	public List<Object> queryabilityinfoqu();
	// 获取信息化需求(市)
	public List<Object> queryabilityinfoshi(String areaid);
	// 获取信息化需求(县)
	public List<Object> queryabilityinfoxian(String areaid);
	
	// 获取信息化需求柱图(区)
	public List<Object> queryabilityinfobarqu();
	// 获取信息化需求柱图(市)
	public List<Object> queryabilityinfobarshi(String areaid);
	// 获取信息化需求柱图(县)
	public List<Object> queryabilityinfobarxian(String areaid);
	// 获取信息化需求柱图(乡)
	public List<Object> queryabilityinfobarxiang(String areaid);
}
