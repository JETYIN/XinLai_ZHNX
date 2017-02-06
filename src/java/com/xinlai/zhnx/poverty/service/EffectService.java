package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface EffectService {
	
	//获取十二五脱贫成效柱图
	public Map<String, Object> queryShiErWuAntPovertyBar(String category,String unit);
	
	//获取十二五脱贫成效地图
	public List<Map<String, Object>> queryShiErWuAntPoverty();
	
	//获取西海固经济统计柱图
	public Map<String, Object> queryXHGEconomicBar(String category);
	
	//获取西海固经济统计柱图
	public Map<String, Object> queryXHGEconomicBar2(String category);
	
	//获取西海固经济统计地图
	public List<Map<String, Object>> queryXHGEconomic();
	
	//获取西海固人口统计柱图
	public Map<String, Object> queryXHGPopulationBar(String category,String unit);
	
	//获取西海固经济统计地图
	public List<Map<String, Object>> queryXHGPopulation();
	
	//获取务工人员线图
	public Map<String, Object> queryMigrantWorkersLine(String areaid);
	
	//获取务工人员柱图
	public Map<String, Object> queryMigrantWorkersBar(String areaid);
	
	//获取务工人员地图
	public List<Map<String, Object>> queryMigrantWorkers(String areaid);
	
	//获取其他帮扶汇总
	public Map<String, Object> queryOtherHelpSum();
	
	//获取其他帮扶柱图
	public Map<String, Object> queryOtherHelpBar();
	
	//获取其他帮扶地图
	public List<Map<String, Object>> queryOtherHelp();
	
	//获取精准扶贫汇总
	public Map<String, Object> queryPreciseSum();
	
	//获取精准扶贫柱图
	public Map<String, Object> queryPreciseBar();
	
	//获取精准扶贫地图
	public List<Map<String, Object>> queryPrecise();
	
	//获取到户措施柱图0
	public Map<String, Object> queryToFamilyBar0();
	
	//获取到户措施柱图1
	public Map<String, Object> queryToFamilyBar1();
	
	//获取到户措施地图
	public List<Map<String, Object>> queryToFamily();
	
	//获取转移信息柱图
	public Map<String, Object> queryMigrationBar(String category);
	
	//获取转移信息地图
	public Map<String, Object> queryMigration(String moveInareaCode,String moveOutareaCode);

}
