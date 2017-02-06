package com.xinlai.zhnx.poverty.service;

import java.util.List;
import java.util.Map;

public interface PersonService {

	//通过地区ID获取贫困信息
	public List<Map<String, Object>> querypovertyinfo(String areaid);
	
	//获取贫困汇总信息
	public Map<String, Object> querypovertyinfosum(String areaid);
	
	//获取贫困柱状图信息
	public Map<String, Object> querypovertybar(String areaid);
	
	//通过地区ID获取转移信息
	public List<Object> queryMigrationInfo(String areaid);
	
	//通过地区ID获取致贫原因
	public List<Map<String, Object>> querypovertyreason(String areaid);
	
	//获取致贫原因汇总
	public Map<String,Object> querypovertyreasonsum(String areaid);
	
	//获取贫困柱状图信息
	public Map<String, Object> querypovertyreasonbar(String areaid);
	
}
