package com.xinlai.zhnx.education.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.education.dao.RightDao;

@Repository("eduRightDao")
public class RightDaoImpl extends BaseDaoImpl implements RightDao {

	@Autowired
	public RightDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, RightDao.class.getName());
	}

	@Override
	public Map<String, Object> getStudent() {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getStudent");
	}

	@Override
	public Map<String, Object> getSchool() {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getSchool");
	}

	@Override
	public List<Map<String, Object>> getTeacher() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getTeacher");
	}

}
