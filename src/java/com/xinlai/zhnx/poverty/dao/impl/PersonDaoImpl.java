package com.xinlai.zhnx.poverty.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.PersonDao;


@Repository("PersonDao")
public class PersonDaoImpl extends BaseDaoImpl implements PersonDao{

	@Autowired
	public PersonDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, PersonDao.class.getName());
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Object> querypovertyinfoqu() {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfoqu");
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfoshi(String areaid) {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfoshi", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfoxian(String areaid) {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfoxian", areaid);
		
		return returnlist;
	}

	@Override
	public Map<String, Object> querypovertyinfosumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyinfosumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyinfosumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyinfosumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyinfosumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyinfosumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Object> querypovertyreasonsumqu() {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonsumqu");
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonsumshi(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonsumshi",areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonsumxian(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonsumxian",areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfobarqu() {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfobarqu");
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfobarshi(String areaid) {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfobarshi", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfobarxian(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfobarxian", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyinfobarxiang(String areaid) {
		
		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyinfobarxiang", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonqu() {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonqu");
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonshi(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonshi", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonxian(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonxian", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonbarqu() {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonbarqu");
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonbarshi(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonbarshi", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonbarxian(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonbarxian", areaid);
		
		return returnlist;
	}

	@Override
	public List<Object> querypovertyreasonbarxiang(String areaid) {

		List<Object> returnlist = getSession().selectList(getNamespace()+"querypovertyreasonbarxiang", areaid);
		
		return returnlist;
	}

}
