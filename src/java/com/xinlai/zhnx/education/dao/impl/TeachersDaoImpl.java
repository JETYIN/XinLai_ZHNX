package com.xinlai.zhnx.education.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.education.dao.TeachersDao;
import com.xinlai.zhnx.weather.dao.ActualDao;


@Repository("TeachersDao")
public class TeachersDaoImpl extends BaseDaoImpl implements TeachersDao{
	@Autowired
	public TeachersDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, TeachersDao.class.getName());
	}

	@Override
	public List<Map<String, Object>> getTeacher(Map data) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getTeacher", data) ;
	}

	@Override
	public List<Map<String, Object>> getEduConstitute(Map data) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getEduConstitute", data) ;
	}
	
}