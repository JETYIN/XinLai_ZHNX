package com.xinlai.zhnx.poverty.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.poverty.dao.EffectDao;
import com.xinlai.zhnx.poverty.service.EffectService;


@Service("EffectService")
public class EffectServiceImpl implements EffectService{
	
	@Resource
	EffectDao effectDao;

	@Override
	public Map<String, Object> queryShiErWuAntPovertyBar(String category,String unit) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryShiErWuAntPovertyBar(category);
		Set<String> yearSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有年份
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			yearSet.add(dataMap.get("year").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> iterarea = areaSet.iterator();
		while (iterarea.hasNext()){
			Map<String, Object> dataMap = new HashMap<String, Object>();
			List<Object> dataList = new ArrayList<Object>();
			String area = iterarea.next();
			Iterator<String> iteryear = areaSet.iterator();
			while (iteryear.hasNext()){
				String year = iteryear.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(area)&&returnMap.containsValue(year)){
						dataList.add(Float.parseFloat((String) returnMap.get("numericalvalue")));
					}
				}
			}
			dataMap.put("type", area);
			dataMap.put("data", dataList);
			resultList.add(dataMap);
		}
		resultMap.put("unit", unit);
		resultMap.put("mode", "multi");
		resultMap.put("year", yearSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryShiErWuAntPoverty() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryShiErWuAntPoverty();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryXHGEconomicBar(String category) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryXHGEconomicBar(category);
		Set<String> yearSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有年份
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			yearSet.add(dataMap.get("year").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> iterarea = areaSet.iterator();
		while (iterarea.hasNext()){
			Map<String, Object> dataMap = new HashMap<String, Object>();
			List<Object> dataList = new ArrayList<Object>();
			String area = iterarea.next();
			Iterator<String> iteryear = areaSet.iterator();
			while (iteryear.hasNext()){
				String year = iteryear.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(area)&&returnMap.containsValue(year)){
						dataList.add(Float.parseFloat((String) returnMap.get("numericalvalue")));
					}
				}
			}
			dataMap.put("place", area);
			dataMap.put("data", dataList);
			resultList.add(dataMap);
		}
		resultMap.put("unit", "万元");
		resultMap.put("year", yearSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryXHGEconomicBar2(String category) {
		List<Map<String, Object>> srreturnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> zcreturnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		srreturnList = effectDao.queryXHGEconomicBar(category+"纯收入");
		zcreturnList = effectDao.queryXHGEconomicBar(category+"支出");
		Set<String> yearSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有年份
		for (int i = 0; i < srreturnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) srreturnList.get(i);
			yearSet.add(dataMap.get("year").toString());
		}
		//所有地区
		for (int i = 0; i < srreturnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) srreturnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> iterarea = areaSet.iterator();
		while (iterarea.hasNext()){
			Map<String, Object> dataMap = new HashMap<String, Object>();
			List<Object> dataList = new ArrayList<Object>();
			List<Object> srdataList = new ArrayList<Object>();
			List<Object> zcdataList = new ArrayList<Object>();
			String area = iterarea.next();
			Iterator<String> iteryear = areaSet.iterator();
			while (iteryear.hasNext()){
				String year = iteryear.next();
				for (int i = 0; i < srreturnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = srreturnList.get(i);
					if(returnMap.containsValue(area)&&returnMap.containsValue(year)){
						srdataList.add(Float.parseFloat((String) returnMap.get("numericalvalue")));
					}
				}
				for (int i = 0; i < zcreturnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = zcreturnList.get(i);
					if(returnMap.containsValue(area)&&returnMap.containsValue(year)){
						zcdataList.add(Float.parseFloat((String) returnMap.get("numericalvalue")));
					}
				}
			}
			dataList.add(srdataList);
			dataList.add(zcdataList);
			dataMap.put("place", area);
			dataMap.put("data", dataList);
			resultList.add(dataMap);
		}
		resultMap.put("year", yearSet);
		resultMap.put("unit", "元");
		resultMap.put("dataset", resultList);
		resultMap.put("type", JSON.parse("['收入', '支出']"));
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryXHGEconomic() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryXHGEconomic();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryXHGPopulationBar(String category,String unit) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> dataList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryXHGPopulationBar(category);
		Set<String> yearSet = new LinkedHashSet<String>();
		//所有年份
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			yearSet.add(dataMap.get("year").toString());
		}
		Iterator<String> iteryear = yearSet.iterator();
		while (iteryear.hasNext()){
			String year = iteryear.next();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				if(returnMap.containsValue(year)){
					dataList.add(Float.parseFloat((String) returnMap.get(("numericalvalue"))));
				}
			}
		}
		resultMap.put("unit", unit);
		resultMap.put("mode", "single");
		resultMap.put("year", yearSet);
		resultMap.put("dataset", dataList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryXHGPopulation() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryXHGPopulation();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryMigrantWorkersLine(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> dataList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnList = effectDao.queryMigrantWorkersLinequ();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = effectDao.queryMigrantWorkersLineshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = effectDao.queryMigrantWorkersLinexian(areaid);
			}
		}
		Set<String> categorySet = new LinkedHashSet<String>();
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			String category = itercategory.next();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				if(returnMap.containsValue(category)){
					dataList.add(returnMap.get("sl"));
				}
			}
		}
		resultMap.put("unit", JSON.parse("['人']"));
		resultMap.put("year", categorySet);
		resultMap.put("dataset", dataList);
		resultMap.put("mode", "single");
		return resultMap;
	}

	@Override
	public Map<String, Object> queryMigrantWorkersBar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnList = effectDao.queryMigrantWorkersBarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = effectDao.queryMigrantWorkersBarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = effectDao.queryMigrantWorkersBarxian(areaid);
			}
		}
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有类型
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			List<Object> dataList = new ArrayList<Object>();
			String category = itercategory.next();
			Iterator<String> areagory = areaSet.iterator();
			while (areagory.hasNext()){
				String area = areagory.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(category)&&returnMap.containsValue(area)){
						dataList.add(returnMap.get("sl"));
						break;
					}
				}
			}
			resultList.add(dataList);
		}
		resultMap.put("unit", "人");
		resultMap.put("type", categorySet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryMigrantWorkers(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = effectDao.queryMigrantWorkersBarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = effectDao.queryMigrantWorkersBarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = effectDao.queryMigrantWorkersBarxian(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", areaMap.get("sl"));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryOtherHelpSum() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryOtherHelpSum();
		Set<String> categorySet = new LinkedHashSet<String>();
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			String category = itercategory.next();
			Map<String,Object> daMap = new HashMap<String, Object>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				if(returnMap.containsValue(category)){
					String[] name = {"2015年"};
					Float[] data = {Float.parseFloat((String) returnMap.get("numericalvalue"))};
					daMap.put("name", name);
					daMap.put("data", data);
				}
			}
			resultList.add(daMap);
		}
		resultMap.put("labels", categorySet);
		resultMap.put("series", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryOtherHelpBar() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryOtherHelpBar();
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有类型
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			List<Object> dataList = new ArrayList<Object>();
			String category = itercategory.next();
			Iterator<String> areagory = areaSet.iterator();
			while (areagory.hasNext()){
				String area = areagory.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(category)&&returnMap.containsValue(area)){
						dataList.add(Float.parseFloat(String.valueOf(returnMap.get("numericalvalue"))));
						break;
					}
				}
			}
			resultList.add(dataList);
		}
		resultMap.put("unit", "人");
		resultMap.put("type", categorySet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryOtherHelp() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryOtherHelpBar();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryPreciseSum() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryPreciseSum();
		Set<String> categorySet = new LinkedHashSet<String>();
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			String category = itercategory.next();
			Map<String,Object> daMap = new HashMap<String, Object>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				if(returnMap.containsValue(category)){
					String[] name = {"2015年"};
					Float[] data = {Float.parseFloat((String) returnMap.get("numericalvalue"))};
					daMap.put("name", name);
					daMap.put("data", data);
				}
			}
			resultList.add(daMap);
		}
		resultMap.put("labels", categorySet);
		resultMap.put("series", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryPreciseBar() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryPreciseBar();
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有类型
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			List<Object> dataList = new ArrayList<Object>();
			String category = itercategory.next();
			Iterator<String> areagory = areaSet.iterator();
			while (areagory.hasNext()){
				String area = areagory.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(category)&&returnMap.containsValue(area)){
						dataList.add(Float.parseFloat(String.valueOf(returnMap.get("numericalvalue"))));
						break;
					}
				}
			}
			resultList.add(dataList);
		}
		resultMap.put("unit", "人");
		resultMap.put("type", categorySet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryPrecise() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryPreciseBar();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryToFamilyBar0() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryToFamilyBar0();
		Set<String> areaSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			areaSet.add((String) areaMap.get("areaname"));
		}
		Iterator<String> iter = areaSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> datasetMap = new HashMap<String, Object>();
			String area = iter.next();
			datasetMap.put("nav", area);
			String[] type = new String[13];
			Float[] data = new Float[13];
			int num = 0;
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				if(areaMap.containsValue(area))
				{
					type[num] = (String) areaMap.get("category");
					data[num] = Float.parseFloat((String) areaMap.get("numericalvalue"));
					num++;
				}
			}
			datasetMap.put("type", type);
			datasetMap.put("data", data);
			resultList.add(datasetMap);
		}
		resultMap.put("mode", "bottom");
		resultMap.put("unit", "万元");
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryToFamilyBar1() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryToFamilyBar1();
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		//所有类型
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		//所有地区
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Iterator<String> itercategory = categorySet.iterator();
		while (itercategory.hasNext()){
			List<Object> dataList = new ArrayList<Object>();
			String category = itercategory.next();
			Iterator<String> areagory = areaSet.iterator();
			while (areagory.hasNext()){
				String area = areagory.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsValue(category)&&returnMap.containsValue(area)){
						dataList.add(Float.parseFloat(String.valueOf(returnMap.get("numericalvalue"))));
					}
				}
			}
			resultList.add(dataList);
		}
		resultMap.put("unit", "万元");
		resultMap.put("type", categorySet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryToFamily() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = effectDao.queryToFamilyBar1();
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.add((String) areaMap.get("category"));
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsValue(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat((String) areaMap.get("numericalvalue")));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryMigrationBar(String category) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = effectDao.queryMigrationBar(category);
		Set<String> areaSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			areaSet.add((String) areaMap.get("areaname_old"));
		}
		Iterator<String> areaiter = areaSet.iterator();
		while(areaiter.hasNext())
		{
			String area = areaiter.next();
			String areaid = "";
			Map<String, Object> datasetMap = new HashMap<String, Object>();
			List<Object> typeList = new ArrayList<Object>();
			List<Float> dataList = new ArrayList<Float>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>)returnList.get(i);
				if(dataMap.containsValue(area))
				{
					areaid = (String) dataMap.get("areaid_old");
					typeList.add(dataMap.get("areaname_target"));
					dataList.add(Float.parseFloat(String.valueOf(dataMap.get("numericalvalue"))));
				}
			}
			datasetMap.put("nav", area);
			datasetMap.put("areaCode", areaid);
			datasetMap.put("data", dataList);
			datasetMap.put("type", typeList);
			resultList.add(datasetMap);
		}
		resultMap.put("mode", "left");
		resultMap.put("unit", "户");
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryMigration(String moveInareaCode,String moveOutareaCode) {
		List<Map<String, Object>> returnmoveInList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> returnmoveOutList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> moveInList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> moveOutList = new ArrayList<Map<String,Object>>();
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnmoveInList = effectDao.queryMigration(moveInareaCode);
		returnmoveOutList = effectDao.queryMigration(moveOutareaCode);
		for (int i = 0; i < returnmoveInList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>)returnmoveInList.get(i);
			String category = (String) dataMap.get("category");
			Map<String, Object> resultMap = new HashMap<String, Object>();
				resultMap.put("areaCode", dataMap.get("areaid_target"));
				resultMap.put("y", Float.parseFloat(String.valueOf(dataMap.get("numericalvalue"))));
				moveInList.add(resultMap);
		}
		for (int i = 0; i < returnmoveOutList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>)returnmoveOutList.get(i);
			String category = (String) dataMap.get("category");
			Map<String, Object> resultMap = new HashMap<String, Object>();
				resultMap.put("areaCode", dataMap.get("areaid_target"));
				resultMap.put("y", Float.parseFloat(String.valueOf(dataMap.get("numericalvalue"))));
				moveOutList.add(resultMap);
		}
		returnMap.put("moveIn", moveInList);
		returnMap.put("moveOut", moveOutList);
		return returnMap;
	}
	

}
