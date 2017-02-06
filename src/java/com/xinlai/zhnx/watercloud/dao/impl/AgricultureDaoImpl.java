package com.xinlai.zhnx.watercloud.dao.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.watercloud.dao.AgricultureDao;

@Repository("agricultureDao")
public class AgricultureDaoImpl extends BaseDaoImpl implements AgricultureDao {
	
	@Autowired
	public AgricultureDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, AgricultureDao.class.getName());
	}
	
	@Override
	public void test() {
		System.out.println(getSession().selectOne(getNamespace() + "test"));
	}

}
