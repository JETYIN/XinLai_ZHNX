package com.xinlai.zhnx.weather.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.weather.dao.ActualDao;

@Repository("actualDao")
public class ActualDaoImpl extends BaseDaoImpl implements ActualDao {
	@Autowired
	public ActualDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, ActualDao.class.getName());
	}

	@Override
	public List<Object> getActualWeather(String areaCode) {
		List returnlist = getSession().selectList(getNamespace()+"getActualWeather", areaCode);
		
		return returnlist;
	}

	@Override
	public List<Object> getLifeIndex(String areaCode) {
		List returnlist = getSession().selectList(getNamespace()+"getLifeIndex", areaCode);
		
		return returnlist;
	}

	@Override
	public Map<String, Float> getCurrentMMATemp(String areaCode) {
		Map<String, Float> returnOne = getSession().selectOne(getNamespace() + "getCurrentMMATemp", areaCode);
		return returnOne;
	}

	@Override
	public Map<String, Float> getCurrentMMAWind(String areaCode) {
		Map<String, Float> returnOne = getSession().selectOne(getNamespace() + "getCurrentMMAWind", areaCode);
		return returnOne;
	}

	@Override
	public Map<String, Float> getCurrentMMARain(String areaCode) {
		Map<String, Float> returnOne = getSession().selectOne(getNamespace() + "getCurrentMMARain", areaCode);
		return returnOne;
	}

	@Override
	public List<Map<String, Float>> getTodayMMATemp(String areaCode) {
		List<Map<String, Float>> returnlist = getSession().selectList(getNamespace()+"getTodayMMATemp", areaCode);
		return returnlist;
	}

	@Override
	public List<Map<String, Float>> getTodayMMAWind(String areaCode) {
		List<Map<String, Float>> returnlist = getSession().selectList(getNamespace()+"getTodayMMAWind", areaCode);
		return returnlist;
	}

	@Override
	public List<Map<String, Float>> getTodayMMARain(String areaCode) {
		List<Map<String, Float>> returnlist = getSession().selectList(getNamespace()+"getTodayMMARain", areaCode);
		return returnlist;
	}

	@Override
	public List<Map<String, Object>> getMapInfo(String areaCode) {
		List<Map<String, Object>> returnlist = getSession().selectList(getNamespace()+"getMapInfo", areaCode);
		return returnlist;
	}

}
