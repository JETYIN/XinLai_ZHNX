package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface DevelopmentService {
	
	
	
	//五通八有接口
	public Map<String,Object> queryOpenInfo(String areaid);
	public List<Map<String,Object>> queryChildArea(String areaid);
	//public List<Map<String,Object>> queryAreaVillage(String type ,String areaid);
	//获取脱贫需求汇总
	public Map<String, Object> querypovertyneedsum(String areaid);
	//获取脱贫需求信息
	public List<Map<String, Object>> querypovertyneed(String areaid);
	//获取脱贫需求柱图信息
	public Map<String, Object> querypovertyneedbar(String areaid);
	

	//获取产业发展汇总
	public Map<String, Object> queryindustryinfosum(String areaid);
	//获取产业发展信息
	public List<Map<String, Object>> queryindustryinfo(String areaid);
	//获取产业发展信息柱图
	public Map<String, Object> queryindustryinfobar(String areaid);
	
	//获取信息化需求汇总情况
	public Map<String, Object> queryinformationinfosum(String areaid);
	//获取信息化需求情况
	public List<Map<String, Object>> queryinformationinfo(String areaid);
	//获取信息化需求情况柱图
	public Map<String, Object> queryinformationinfobar(String areaid);
	
	//获取能力提升状况汇总
	public Map<String, Object> queryabilityinfosum(String areaid);
	//获取能力提升状况
	public List<Map<String, Object>> queryabilityinfo(String areaid);
	//获取能力提升状况柱图
	public Map<String, Object> queryabilityinfobar(String areaid);
	
}
