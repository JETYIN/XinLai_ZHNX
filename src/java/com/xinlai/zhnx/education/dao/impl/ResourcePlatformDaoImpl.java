package com.xinlai.zhnx.education.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.education.dao.ResourcePlatformDao;
import com.xinlai.zhnx.weather.dao.ActualDao;



@Repository("ResourcePlatformDao")
public class ResourcePlatformDaoImpl extends BaseDaoImpl implements ResourcePlatformDao{
	@Autowired
	public ResourcePlatformDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, ResourcePlatformDao.class.getName());
	}

	@Override
	public List<Map<String, Object>> getEduSTLPT(String type) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getEduSTLPT", type);
	}

	@Override
	public List<Map<String, Object>> getEduSTLPTBBT_year() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getEduSTLPTBBT_year");
	}

	@Override
	public List<Map<String, Object>> getEduSTLPTBBT_mon() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getEduSTLPTBBT_mon");
	}
	
}