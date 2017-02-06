package com.xinlai.zhnx.weather.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.weather.dao.RightDao;
import com.xinlai.zhnx.weather.dao.TrafficDao;

@Repository("trafficDao")
public class TrafficDaoImpl extends BaseDaoImpl implements TrafficDao {
	
	@Autowired
	public TrafficDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, TrafficDao.class.getName());
	}
	@Override
	public List<Map<String, Object>> getHighwayForecast(String roadtype) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getHighwayForecast", roadtype);
	}
	@Override
	public List<Map<String, Object>> getTrifficStation() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getTrifficStation");
	}
	@Override
	public List<Map<String, Object>> getRoadOrStationForecast(Map data) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getRoadOrStationForecast",data);
	}

}
