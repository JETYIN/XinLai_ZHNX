package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface EffectDao {

	
	
	//获取十二五脱贫成效柱图
	public List<Map<String,Object>> queryShiErWuAntPovertyBar(String category);	
	
	//获取十二五脱贫成效地图
	public List<Map<String,Object>> queryShiErWuAntPoverty();	
	
	//获取西海固经济统计柱图
	public List<Map<String,Object>> queryXHGEconomicBar(String category);	
	
	//获取西海固经济统计地图
	public List<Map<String,Object>> queryXHGEconomic();	
	
	//获取西海固人口统计柱图
	public List<Map<String,Object>> queryXHGPopulationBar(String category);	
	
	//获取西海固人口统计地图
	public List<Map<String,Object>> queryXHGPopulation();	
	
	//获取务工人员信息线图(区)
	public List<Map<String,Object>> queryMigrantWorkersLinequ();	
	
	//获取务工人员信息线图(市)
	public List<Map<String,Object>> queryMigrantWorkersLineshi(String areaid);	
	
	//获取务工人员信息线图(县)
	public List<Map<String,Object>> queryMigrantWorkersLinexian(String areaid);	
	
	//获取务工人员信息柱图(区)
	public List<Map<String,Object>> queryMigrantWorkersBarqu();	
	
	//获取务工人员信息柱图(市)
	public List<Map<String,Object>> queryMigrantWorkersBarshi(String areaid);	
	
	//获取务工人员信息柱图(县)
	public List<Map<String,Object>> queryMigrantWorkersBarxian(String areaid);	
	
	//获取其它帮扶汇总
	public List<Map<String,Object>> queryOtherHelpSum();
	
	//获取其它帮扶柱图
	public List<Map<String,Object>> queryOtherHelpBar();
	
	//获取精准扶贫汇总
	public List<Map<String,Object>> queryPreciseSum();
	
	//获取精准扶贫柱图
	public List<Map<String,Object>> queryPreciseBar();
	
	//获取到户措施柱图0
	public List<Map<String,Object>> queryToFamilyBar0();
	
	//获取到户措施柱图1
	public List<Map<String,Object>> queryToFamilyBar1();
	
	//获取转移信息柱图
	public List<Map<String,Object>> queryMigrationBar(String category);
	
	//获取转移信息地图
	public List<Map<String,Object>> queryMigration(String areaid);
}
