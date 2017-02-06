package com.xinlai.zhnx.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mysql.fabric.xmlrpc.base.Array;
import com.xinlai.zhnx.system.dao.SystemDao;
import com.xinlai.zhnx.system.service.SystemService;

@Service("systemService")
public class SystemServiceImpl implements SystemService{
	@Resource
	private SystemDao systemDao;
	
	private Map<String,Object> getProductArea(){
		Map<String,Object> returnMap = systemDao.getProductArea();
		return returnMap;
	}
	private List<Map<String, Object>> getOneLeveMenu(int productAreaId){
		List<Map<String,Object>> returnMap = systemDao.getOneLeveMenu(productAreaId);
		return returnMap;
	}
	private List<Map<String, Object>> getTwoLevelMenu(Map<String,Object> map ){
		List<Map<String, Object>> returnMap = systemDao.getTwoLevelMenu(map);
		return returnMap;
	}
	private List<Map<String, Object>> getAreaBlindInfo(int productAreaId){
		List<Map<String, Object>> returnMap = systemDao.getAreaBlindInfo(productAreaId);
		return returnMap;
	}
	
	
	public Map<String, Object> getBaseData(){
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String,Object> productArea = this.getProductArea();
		int productAreaId = (int) productArea.get("idarea");
		List<Map<String,Object>> oneLevelMenu = this.getOneLeveMenu(productAreaId);
		
		List<Map<String, Object>> areaBlindInfo = this.getAreaBlindInfo(productAreaId);
		List<Map<String, Object>> area_blind_info = new ArrayList<Map<String,Object>>();
		for(int i=0; i<areaBlindInfo.size(); i++){
			Map<String,Object> info = new HashMap<String, Object>();
			info.put("key", areaBlindInfo.get(i).get("TagName"));
			info.put("value", areaBlindInfo.get(i).get("TagNameValue"));
			info.put("unit", areaBlindInfo.get(i).get("Unit"));
			area_blind_info.add(info);
		}
		
		List<Map<String,Object>> menuList = new ArrayList<Map<String,Object>>();
		
		for(int i=0; i<oneLevelMenu.size(); i++){
			Map<String, Object> menuMap	= oneLevelMenu.get(i);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("productAreaId", productAreaId);
			map.put("ParentMenuId", menuMap.get("id"));
			menuMap.put("children", this.getTwoLevelMenu(map));
			
			menuList.add(menuMap);
		}
		
		//put key : area
		returnMap.put("area", productArea);
		returnMap.put("menu", menuList);
		returnMap.put("globalMetric", area_blind_info);
		
		return returnMap;
	}
}
