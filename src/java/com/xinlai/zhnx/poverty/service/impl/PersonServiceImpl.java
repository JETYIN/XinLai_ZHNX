package com.xinlai.zhnx.poverty.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.xinlai.zhnx.poverty.dao.PersonDao;
import com.xinlai.zhnx.poverty.service.PersonService;



@Service("PersonService")
public class PersonServiceImpl implements PersonService{
	
	@Resource
	PersonDao personDao;

	@Override
	public List<Map<String, Object>> querypovertyinfo(String areaid) {
		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = personDao.querypovertyinfoqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = personDao.querypovertyinfoshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = personDao.querypovertyinfoxian(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		if (areaid.equals("640000000000")){
			typeSet.add("country");
		}else if (areaid.endsWith("00000000")) {
			typeSet.add("country");
		}
		typeSet.add("village");
		typeSet.add("household");
		typeSet.add("population");
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			typeMap.put("type", type);
			
			int total = 0;
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnlist.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnlist.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				dataMap.put("areaCode", areaMap.get("areacode"));
				dataMap.put("y", areaMap.get(type));
				total += Integer.valueOf(areaMap.get(type).toString());
				dataList.add(dataMap);
			}
			// 汇总
			Map<String, Object> totalMap = new HashMap<String, Object>();
			totalMap.put("type", "total");
			totalMap.put("y", total);
			dataList.add(totalMap);
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public List<Object> queryMigrationInfo(String areaid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> querypovertyinfosum(String areaid) {
		// TODO Auto-generated method stub
		Map<String, Object> returnMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnMap = personDao.querypovertyinfosumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnMap = personDao.querypovertyinfosumshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnMap = personDao.querypovertyinfosumxian(areaid);
			}
		}
		
		List<String> dataTextList = new ArrayList<String>();
		dataTextList.add("涉及贫困人口县数");
		dataTextList.add("涉及贫困人口村数");
		dataTextList.add("贫困户数");
		dataTextList.add("贫困人口数量");
		dataTextList.add("回族人口数量");
		Map<String, Object> dataMap = new HashMap<String, Object>();
		
		Set<String> keySet = returnMap.keySet();
		Iterator<String> iter = keySet.iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			switch (key) {
			case "village":
				dataMap.put("num_village", returnMap.get("village") + "个");
				break;
			case "household":
				dataMap.put("num_household", returnMap.get("household") + "户");
				break;
			case "population":
				dataMap.put("num_people", returnMap.get("population") + "人");
				break;
			case "population_hui":
				dataMap.put("num_people_hui", returnMap.get("population_hui") + "人");
				break;
			case "country":
				dataMap.put("num_country", returnMap.get("country") + "个");
				break;
			}
		}
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status_data_text", dataTextList);
		resultMap.put("status_data", dataMap);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyreason(String areaid) {
		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = personDao.querypovertyreasonqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = personDao.querypovertyreasonshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = personDao.querypovertyreasonxian(areaid);
			}
		}
		// 所有类别
		Set<String> reasonSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnlist.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnlist.get(i);
			reasonSet.add(dataMap.get("reason").toString());
		}
		// 所有数据
		List<Map<String, Object>> serieList = new ArrayList<Map<String,Object>>();
		Iterator<String> iter = reasonSet.iterator();
		while (iter.hasNext()) {
			List<Map<String, Object>> typeDataList = new ArrayList<Map<String,Object>>();
			String type = iter.next();
			int total = 0;
			for (int i = 0; i < returnlist.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>) returnlist.get(i);
				if(dataMap.containsValue(type)){
					Map<String, Object> typeDataListOne = new HashMap<String, Object>();
					typeDataListOne.put("areaCode", dataMap.get("areacode"));
					typeDataListOne.put("y", dataMap.get("total"));
					typeDataList.add(typeDataListOne);
					total += Integer.valueOf(dataMap.get("total").toString());
				}
			}
			// 分类合集
			Map<String, Object> typeDataTotalOne = new HashMap<String, Object>();
			typeDataTotalOne.put("type", "total");
			typeDataTotalOne.put("y", total);
			typeDataList.add(typeDataTotalOne);
			
			Map<String, Object> seriesOne = new HashMap<String, Object>();
			seriesOne.put("type", type);
			seriesOne.put("data", typeDataList);
			serieList.add(seriesOne);
		}
		return serieList;
	}

	@Override
	public Map<String,Object> querypovertyreasonsum(String areaid) {
		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = personDao.querypovertyreasonsumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = personDao.querypovertyreasonsumshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = personDao.querypovertyreasonsumxian(areaid);
			}
		}
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Object> dataList = new ArrayList<Object>();
		List<Object> typeList = new ArrayList<Object>();
		for (int i = 0; i < returnlist.size(); i++) {
			Map<String, Object> reasonMap = (Map<String, Object>)returnlist.get(i);
			typeList.add(reasonMap.get("reason"));
			dataList.add(reasonMap.get("total"));
		}
		resultMap.put("type", typeList);
		resultMap.put("value", dataList);
		return resultMap;
	}

	@Override
	public Map<String, Object> querypovertybar(String areaid) {
		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = personDao.querypovertyinfobarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = personDao.querypovertyinfobarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = personDao.querypovertyinfobarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnlist = personDao.querypovertyinfobarxiang(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		Set<String> unitSet = new LinkedHashSet<String>();
		unitSet.add("个");
		unitSet.add("户");
		unitSet.add("人");
		if (areaid.equals("640000000000")){
			typeSet.add("country");
		}else if (areaid.endsWith("00000000")) {
			typeSet.add("country");
		}
		typeSet.add("village");
		typeSet.add("household");
		typeSet.add("population");
		Iterator<String> iter = typeSet.iterator();
		// 数据及X轴
		List<Object> typeList = new ArrayList<Object>();
		List<List<Object>> allDataList = new ArrayList<List<Object>>();
		Set<String> counrtycode = new LinkedHashSet<String>();
		Set<String> xLabelSet = new LinkedHashSet<String>();
		while (iter.hasNext()) {
			String type = iter.next();
			switch (type){
			case "village":
				typeList.add("贫困村");
				break;
			case "household":
				typeList.add("贫困户");
				break;
			case "population":
				typeList.add("贫困人口");
				break;
			case "country":
				typeList.add("贫困县");
				break;
			}
			List<Object> dataList = new ArrayList<Object>();
			List<String> xLabelList = new ArrayList<String>();
			for (int j = 0; j < returnlist.size(); j++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnlist.get(j);
				//debug by yankun 2016-10-31/11:32
				if(areaMap.get("areaname")==null?false:true){
					if(areaMap.containsKey(type)){
						Object data = areaMap.get(type);
						dataList.add(data);
					}else{
						dataList.add(0);
					}
				
					xLabelSet.add(areaMap.get("areaname").toString());
					counrtycode.add(areaMap.get("areacode").toString());
				}//debug end
			}
			allDataList.add(dataList);
		}
		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("unit", unitSet);
		seriesMap.put("type", typeList);
		seriesMap.put("countrycode", counrtycode);
		seriesMap.put("country", xLabelSet);
		seriesMap.put("dataset", allDataList);
		
		return seriesMap;
	}

	@Override
	public Map<String, Object> querypovertyreasonbar(String areaid) {
		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = personDao.querypovertyreasonbarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = personDao.querypovertyreasonbarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = personDao.querypovertyreasonbarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnlist = personDao.querypovertyreasonbarxiang(areaid);
			}
		}
		
		Set<String> typeSet = new LinkedHashSet<String>();
		Set<String> counrtycode = new LinkedHashSet<String>();
		Set<String> xLabelSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnlist.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>) returnlist.get(i);
			typeSet.add(areaMap.get("reason").toString());
			//debug by yankun 2016-10-14/10:27
			if(areaMap.get("areaname")==null?false:true){
				xLabelSet.add(areaMap.get("areaname").toString());
				counrtycode.add(areaMap.get("areacode").toString());
			}
			//end debug
		}
		
		List<List<Object>> allDataList = new ArrayList<List<Object>>();
		Iterator<String> typeIter = typeSet.iterator();
		while (typeIter.hasNext()) {
			String type = typeIter.next();
			List<Object> dataList = new ArrayList<Object>();
			Iterator<String> labelIter = xLabelSet.iterator();
			while (labelIter.hasNext()) {
				String label = labelIter.next();
				int total = 0;
				for (int i = 0; i < returnlist.size(); i++) {
					Map<String, Object> areaMap = (Map<String, Object>) returnlist.get(i);
					if(areaMap.containsValue(type) && areaMap.containsValue(label)){
						total += Integer.valueOf(areaMap.get("total").toString());
					}
				}
				dataList.add(total);
			}
			allDataList.add(dataList);
		}

		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("type", typeSet);
		seriesMap.put("unit", "户");
		seriesMap.put("countrycode", counrtycode);
		seriesMap.put("country", xLabelSet);
		seriesMap.put("dataset", allDataList);
		
		return seriesMap;
	}
	
	

}
