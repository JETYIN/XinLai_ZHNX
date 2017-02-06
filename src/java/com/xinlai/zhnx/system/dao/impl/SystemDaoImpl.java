package com.xinlai.zhnx.system.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.xinlai.zhnx.common.dao.impl.BaseDaoImpl;
import com.xinlai.zhnx.system.dao.SystemDao;

@Repository("systemDao")
public class SystemDaoImpl extends BaseDaoImpl implements SystemDao{
	@Autowired
	public SystemDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, SystemDao.class.getName());
	}
	
	@Override
	public Map<String,Object> getProductArea(){
		Map<String, Object> returnMap = getSession().selectOne(getNamespace() + "getProductArea");
		return returnMap;
	}
	
	@Override
	public List<Map<String, Object>> getOneLeveMenu(int productAreaId){
		List<Map<String, Object>> returnMap = getSession().selectList(getNamespace() + "getOneLeveMenu", productAreaId);
		return returnMap;
	}
	@Override
	public List<Map<String, Object>> getTwoLevelMenu(Map<String,Object> map ){
		List<Map<String, Object>> returnMap = getSession().selectList(getNamespace() + "getTwoLevelMenu", map);
		return returnMap;
	}
	@Override
	public List<Map<String, Object>> getAreaBlindInfo(int productAreaId){
		List<Map<String, Object>> returnMap = getSession().selectList(getNamespace() + "getAreaBlindInfo", productAreaId);
		return returnMap;
	}
	@Override
	public List<Map<String, Object>> getOneLevelMenuBlindInfo(){
		List<Map<String, Object>> returnMap = new ArrayList<Map<String,Object>>();
		return returnMap;
	}

}
