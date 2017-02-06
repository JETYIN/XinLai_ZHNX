package com.xinlai.zhnx.education.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.education.dao.SchoolsDao;
import com.xinlai.zhnx.weather.dao.ActualDao;



@Repository("SchoolsDao")
public class SchoolsDaoImpl extends BaseDaoImpl implements SchoolsDao{
	@Autowired
	public SchoolsDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, SchoolsDao.class.getName());
	}

	@Override
	public Map<String, Object> getEduConstitute(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getEduConstitute", areaCode);
	}

	@Override
	public List<Map<String, Object>> getDataAnaly(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace()+ "getDataAnaly", areaCode);
	}

	@Override
	public Map<String, Object> getprimarysecondschooltype(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getprimarysecondschooltype", areaCode);
	}

	@Override
	public Map<String, Object> getprimarysecondschooltype_all() {
		// TODO Auto-generated method stub
		return getSession().selectOne(getNamespace() + "getprimarysecondschooltype_all");
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolclasssize(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolclasssize", areaCode);
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolclasssize_all() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolclasssize_all");
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolsize(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolsize", areaCode);
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolsize_all() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolsize_all");
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolstage(String areaCode) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolstage", areaCode);
	}

	@Override
	public List<Map<String, Object>> getprimarysecondschoolstage_all() {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getprimarysecondschoolstage_all");
	}

	@Override
	public List<Map<String, Object>> getPreSchool(Map<String, Object> data) {
		// TODO Auto-generated method stub
		return getSession().selectList(getNamespace() + "getPreSchool", data);
	}
	
}