package com.xinlai.zhnx.weather.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.weather.dao.ForecastDao;

@Repository("forecastDao")
public class ForecastDaoImpl extends BaseDaoImpl implements ForecastDao {
	@Autowired
	public ForecastDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, ForecastDao.class.getName());
	}

	@Override
	public List<Map<String, Object>> getTrendForecast(String areaCode) {
		return getSession().selectList(getNamespace() + "getTrendForecast", areaCode);
	}

	@Override
	public Map<String, Object> getLifeIndex(String areaCode) {
		return getSession().selectOne(getNamespace() + "getLifeIndex", areaCode);
	}

	@Override
	public List<Map<String, Object>> getTodayTrendForecast(String areaCode) {
		return getSession().selectList(getNamespace() + "getTodayTrendForecast", areaCode);
	}

	@Override
	public List<Map<String, Object>> getWarMsgRoll() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getWarMsgRoll");
	}

	@Override
	public List<Map<String, Object>> getMapInfo(String areaCode) {
		List<Map<String, Object>> returnlist = getSession().selectList(getNamespace()+"getMapInfo", areaCode);
		return returnlist;
	}
}
