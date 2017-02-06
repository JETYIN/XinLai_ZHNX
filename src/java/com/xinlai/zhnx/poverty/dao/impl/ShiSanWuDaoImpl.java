package com.xinlai.zhnx.poverty.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.poverty.dao.ShiSanWuDao;


@Repository("ShiSanWuDao")
public class ShiSanWuDaoImpl extends BaseDaoImpl implements ShiSanWuDao{

	@Autowired
	public ShiSanWuDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, ShiSanWuDao.class.getName());
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public Map<String,Object> queryCategoryLeavePoverty(String category){
		
		List<Map<String,Object>> returnlist = getSession().selectList(getNamespace()+"queryCategoryLeavePoverty", category);
		//System.out.print(returnlist.toString()+ "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		Map<String,Object> returnMap = new HashMap<String,Object>();
		List<String> years = new ArrayList<String>();
		List<Float> numericals = new ArrayList<Float>();
		for(int i=0; i<returnlist.size(); i++){
			years.add((String) returnlist.get(i).get("year"));
			numericals.add(Float.parseFloat(String.valueOf(returnlist.get(i).get("numericalvalue"))));
			
		}
		returnMap.put("year", years);
		returnMap.put("dataset", numericals);
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> queryAntPovertyPlanSum() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryAntPovertyPlanSum");
		return returnList;
	}

	@Override
	public Map<String, Object> queryFiveOneSum() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryFiveOneSum");
		return returnMap;
	}

	@Override
	public List<Map<String, Object>> queryFiveOneBarqu() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryFiveOneBarqu");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryFiveOneBarshi(String areaid) {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryFiveOneBarshi", areaid);
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryAntPovertyPlanBar() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryAntPovertyPlanBar");
		return returnList;
	}

	@Override
	public List<Map<String, Object>> queryAntPovertyPlan() {
		List<Map<String, Object>> returnList = getSession().selectList(getNamespace()+"queryAntPovertyPlan");
		return returnList;
	}

}
