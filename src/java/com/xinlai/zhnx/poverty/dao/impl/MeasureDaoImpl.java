package com.xinlai.zhnx.poverty.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.MeasureDao;


@Repository("MeasureDao")
public class MeasureDaoImpl extends BaseDaoImpl implements MeasureDao{

	
	@Autowired
	public MeasureDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, MeasureDao.class.getName());
		// TODO Auto-generated constructor stub
	}

	@Override
	public Map<String, Object> querypovertyindustrysumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyindustrysumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyindustrysumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyindustrysumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyindustrysumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyindustrysumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustryqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustryqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustryshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustryshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustryxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustryxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustrybarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustrybarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustrybarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustrybarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustrybarxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustrybarxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustrybarxiang(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyindustrybarxiang", areaid);
		return returnList;
	}

	@Override
	public Map<String, Object> querypovertysocietysumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertysocietysumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertysocietysumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertysocietysumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertysocietysumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertysocietysumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietyqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietyqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietyshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietyshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietyxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietyxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietybarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietybarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietybarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietybarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietybarxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietybarxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertysocietybarxiang(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertysocietybarxiang", areaid);
		return returnList;
	}

	@Override
	public Map<String, Object> querypovertyhelpsumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyhelpsumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyhelpsumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyhelpsumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyhelpsumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyhelpsumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpbarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpbarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpbarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpbarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpbarxian(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpbarxian", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelpbarxiang(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyhelpbarxiang", areaid);
		return returnList;
	}

	@Override
	public Map<String, Object> querypovertyspecialsumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyspecialsumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> querypovertyspecialsumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"querypovertyspecialsumshi", areaid);
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyspecialbarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyspecialbarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyspecialbarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyspecialbarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyspecialqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyspecialqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> querypovertyspecialshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"querypovertyspecialshi", areaid);
		return returnList;
	}

}
