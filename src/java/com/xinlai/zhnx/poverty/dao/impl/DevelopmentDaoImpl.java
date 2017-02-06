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
import com.xinlai.zhnx.poverty.dao.DevelopmentDao;


@Repository("DevelopmentDao")
public class DevelopmentDaoImpl extends BaseDaoImpl implements DevelopmentDao{

	@Autowired
	public DevelopmentDaoImpl(@Qualifier("sqlSession") SqlSessionTemplate session) {
		super(session, DevelopmentDao.class.getName());
		// TODO Auto-generated constructor stub
	}
	
	public static boolean isNumeric(String str){
		  for (int i = 0; i < str.length(); i++){
			  System.out.println(str.charAt(i));
			  if (!Character.isDigit(str.charAt(i))){
				  return false;
			  }
		  }
		  return true;
	}
	
	@Override
	public List<Object> queryChildArea(String areaid){
		Map<String, Object> args = new HashMap<String, Object>();
		if(areaid == "640000000000"){
			args.put("ningxiacode", "640000000000");
		}else{
			args.put("childareacode", areaid);
		}
		List<Object> returnList = getSession().selectList(getNamespace()+"queryChildArea", args);
		return returnList;
	}
	
	@Override
	public List<Map<String,Object>> queryOpenInfo(){
		List<Map<String,Object>> returnlist = getSession().selectList(getNamespace() + "queryOpenInfo");
		return returnlist;
	}
	
	
	@Override
	public List<Object> querypovertyneedsumqu() {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedsumqu");
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedsumshi(String areaid) {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedsumshi", areaid);
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedsumxian(String areaid) {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedsumxian", areaid);
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedqu() {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedqu");
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedshi(String areaid) {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedshi", areaid);
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedxian(String areaid) {
		
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedxian", areaid);
		
		return returnList;
		
	}

	@Override
	public List<Object> querypovertyneedbarqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedbarqu");
		return returnList;
	}

	@Override
	public List<Object> querypovertyneedbarshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedbarshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> querypovertyneedbarxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedbarxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> querypovertyneedbarxiang(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"querypovertyneedbarxiang", areaid);
		return returnList;
	}
	// 产业发展
	@Override
	public Map<String, Object> queryindustryinfosumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryindustryinfosumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> queryindustryinfosumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryindustryinfosumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryindustryinfosumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryindustryinfosumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Object> queryindustryinfoqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfoqu");
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfoshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfoshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfoxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfoxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfobarqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfobarqu");
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfobarshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfobarshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfobarxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfobarxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryindustryinfobarxiang(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryindustryinfobarxiang", areaid);
		return returnList;
	}

	@Override
	public Map<String, Object> queryinformationinfosumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryinformationinfosumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> queryinformationinfosumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryinformationinfosumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryinformationinfosumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryinformationinfosumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Object> queryinformationinfoqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfoqu");
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfoshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfoshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfoxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfoxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfobarqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfobarqu");
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfobarshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfobarshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfobarxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfobarxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryinformationinfobarxiang(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryinformationinfobarxiang", areaid);
		return returnList;
	}

	@Override
	public Map<String, Object> queryabilityinfosumqu() {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryabilityinfosumqu");
		return returnMap;
	}

	@Override
	public Map<String, Object> queryabilityinfosumshi(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryabilityinfosumshi", areaid);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryabilityinfosumxian(String areaid) {
		Map<String, Object> returnMap = getSession().selectOne(getNamespace()+"queryabilityinfosumxian", areaid);
		return returnMap;
	}

	@Override
	public List<Object> queryabilityinfoqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfoqu");
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfoshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfoshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfoxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfoxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfobarqu() {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfobarqu");
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfobarshi(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfobarshi", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfobarxian(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfobarxian", areaid);
		return returnList;
	}

	@Override
	public List<Object> queryabilityinfobarxiang(String areaid) {
		List<Object> returnList = getSession().selectList(getNamespace()+"queryabilityinfobarxiang", areaid);
		return returnList;
	}

}
