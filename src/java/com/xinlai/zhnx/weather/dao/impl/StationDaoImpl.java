package com.xinlai.zhnx.weather.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.weather.dao.StationDao;


@Repository("StationDao")
public class StationDaoImpl extends BaseDaoImpl implements StationDao{
	
	@Autowired
	public StationDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, StationDao.class.getName());
		// TODO Auto-generated constructor stub
	}

	//查询站点信息
	@Override
	public List queryweatherstation() {
		List returnlist = getSession().selectList(getNamespace()+"weather_stationinfo");
		return returnlist;
	}

}
