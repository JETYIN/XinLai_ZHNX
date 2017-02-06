package com.xinlai.zhnx.poverty.dao;

import java.util.List;
import java.util.Map;

public interface PersonDao {
	
	//查询贫困情况(区)
	public List<Object> querypovertyinfoqu();
	//查询贫困情况(市)
	public List<Object> querypovertyinfoshi(String areaid);
	//查询贫困情况(县)
	public List<Object> querypovertyinfoxian(String areaid);
	
	//查询贫困情况汇总(区)
	public Map<String, Object> querypovertyinfosumqu();
	//查询贫困情况汇总(市)
	public Map<String, Object> querypovertyinfosumshi(String areaid);
	//查询贫困情况汇总(县)
	public Map<String, Object> querypovertyinfosumxian(String areaid);
	
	//查询贫困情况柱图(区)
	public List<Object> querypovertyinfobarqu();
	//查询贫困情况柱图(市)
	public List<Object> querypovertyinfobarshi(String areaid);
	//查询贫困情况柱图(县)
	public List<Object> querypovertyinfobarxian(String areaid);
	//查询贫困情况柱图(乡)
	public List<Object> querypovertyinfobarxiang(String areaid);
	
	//查询致贫原因汇总(区)
	public List<Object> querypovertyreasonsumqu();
	//查询致贫原因汇总(市)
	public List<Object> querypovertyreasonsumshi(String areaid);
	//查询致贫原因汇总(县)
	public List<Object> querypovertyreasonsumxian(String areaid);
	
	//查询致贫原因(区)
	public List<Object> querypovertyreasonqu();
	//查询致贫原因(市)
	public List<Object> querypovertyreasonshi(String areaid);
	//查询致贫原因(县)
	public List<Object> querypovertyreasonxian(String areaid);
	
	//查询致贫原因柱图(区)
	public List<Object> querypovertyreasonbarqu();
	//查询致贫原因柱图(市)
	public List<Object> querypovertyreasonbarshi(String areaid);
	//查询致贫原因柱图(县)
	public List<Object> querypovertyreasonbarxian(String areaid);
	//查询致贫原因柱图(乡)
	public List<Object> querypovertyreasonbarxiang(String areaid);

}
