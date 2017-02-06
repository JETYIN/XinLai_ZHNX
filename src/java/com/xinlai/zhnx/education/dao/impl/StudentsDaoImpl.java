package com.xinlai.zhnx.education.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.education.dao.StudentsDao;
import com.xinlai.zhnx.weather.dao.ActualDao;




@Repository("StudentsDao")
public class StudentsDaoImpl extends BaseDaoImpl implements StudentsDao{
	@Autowired
	public StudentsDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, StudentsDao.class.getName());
	}

	@Override
	public Map<String, Object> getEduConstitute(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getEduConstitute", areaCode);
	}

	@Override
	public List<Map<String, Object>> getDataAnaly(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getDataAnaly", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPrimarySecondary_zxsj(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPrimarySecondary_zxsj", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPrimarySecondary_zxnn(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPrimarySecondary_zxnn", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPrimarySecondary_lset(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPrimarySecondary_lset", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPrimarySecondary_djxs(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPrimarySecondary_djxs", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPreSchool(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPreSchool", areaCode) ;
	}

	@Override
	public List<Map<String, Object>> getPreSchoolLBC(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPreSchoolLBC", areaCode) ;
	}
	
}