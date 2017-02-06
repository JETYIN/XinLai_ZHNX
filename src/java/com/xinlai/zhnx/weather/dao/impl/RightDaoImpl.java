package com.xinlai.zhnx.weather.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.weather.dao.RightDao;

@Repository("rightDao")
public class RightDaoImpl extends BaseDaoImpl implements RightDao {
	@Autowired
	public RightDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, RightDao.class.getName());
	}

	@Override
	public List<Map<String, Object>> getRainOfYear() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getRainOfYear");
	}

	@Override
	public Map<String, Object> getSynthesisKPI() {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getSynthesisKPI");
	}

	@Override
	public Map<String, Object> getDisasters() {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getDisasters");
	}
}
