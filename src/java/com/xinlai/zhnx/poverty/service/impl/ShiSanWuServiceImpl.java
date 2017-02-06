package com.xinlai.zhnx.poverty.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xinlai.zhnx.poverty.dao.ShiSanWuDao;
import com.xinlai.zhnx.poverty.service.ShiSanWuService;


@Service("ShiSanWuService")
public class ShiSanWuServiceImpl implements ShiSanWuService{
	
	@Autowired
	ShiSanWuDao shisanwudao;
	
	@Override
	public Map<String,Object> queryCategoryLeavePoverty(String category) {
		
		Map<String,Object> returnMap = new HashMap<String,Object>();
		//System.out.print("++++++++++++++++++++++++++++++++++++++++++++++++++ShiSanWuServiceImpl.queryCategoryLeavePoverty\n");
		returnMap = shisanwudao.queryCategoryLeavePoverty(category);
		return returnMap;
	}

	@Override
	public Map<String, Object> queryAntPovertyPlanSum() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<List<Map<String, Object>>> resultList = new ArrayList<List<Map<String, Object>>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = shisanwudao.queryAntPovertyPlanSum();
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> yearSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		Set<String> unitSet = new LinkedHashSet<String>();
		unitSet.add("人");
		unitSet.add("户");
		unitSet.add("个");
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
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
		Iterator<String> itercategory = categorySet.iterator();		
		while(itercategory.hasNext())
		{
			List<Map<String,Object>> datasetList = new ArrayList<Map<String,Object>>();
			Iterator<String> iteryear = yearSet.iterator();
			String category = itercategory.next();
			while(iteryear.hasNext())
			{

				String year = iteryear.next();
				Iterator<String> iterarea = areaSet.iterator();
				List<Float> dataList = new ArrayList<Float>();
				Map<String,Object> daMap = new HashMap<String, Object>();
				daMap.put("type", year);
				while(iterarea.hasNext())
				{
					String area = iterarea.next();
					for (int i = 0; i < returnList.size(); i++) {
						Map<String, Object> returnMap = new HashMap<String, Object>();
						returnMap = returnList.get(i);
						if(returnMap.containsValue(area)&&returnMap.containsValue(category)&&returnMap.containsValue(year)){
							Float data = Float.parseFloat((String.valueOf(returnMap.get("sl"))));
							dataList.add(data);
						}
					}
				}	
				daMap.put("data", dataList);	
				datasetList.add(daMap);
			}
			resultList.add(datasetList);
		}
		resultMap.put("unit", unitSet);
		resultMap.put("nav", categorySet);
		resultMap.put("year", areaSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryFiveOneSum() {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		returnMap = shisanwudao.queryFiveOneSum();
		Set<String> returnSet = new LinkedHashSet<String>();
		returnSet.add("社会保障兜底一批");
		returnSet.add("易地扶贫搬迁脱贫一批");
		returnSet.add("发展教育脱贫一批");
		returnSet.add("发展生产脱贫一批");
		Set<String> categorySet = new LinkedHashSet<String>();
		categorySet.add("shbzddyp");
		categorySet.add("ydfpbqyp");
		categorySet.add("fzjytpyp");
		categorySet.add("fzsctpyp");
		Iterator<String> itercategory = categorySet.iterator();
		while(itercategory.hasNext())
		{
			Map<String, Object> daMap = new HashMap<String, Object>();
			String category = itercategory.next();
			String[] name = {"2015年"};
			Float[] data = {Float.parseFloat(String.valueOf(returnMap.get(category)))};
			daMap.put("name", name);
			daMap.put("data", data);
			returnList.add(daMap);
		}
		resultMap.put("labels", returnSet);
		resultMap.put("series", returnList);
		return resultMap;
	}

	@Override
	public Map<String, Object> queryFiveOneBar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnList = shisanwudao.queryFiveOneBarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = shisanwudao.queryFiveOneBarshi(areaid);
			}
		}
		//所有地区
		Set<String> areaSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			areaSet.add(dataMap.get("areaname").toString());
		}
		Set<String> returnSet = new LinkedHashSet<String>();
		returnSet.add("社会保障兜底一批");
		returnSet.add("易地扶贫搬迁脱贫一批");
		returnSet.add("发展教育脱贫一批");
		returnSet.add("发展生产脱贫一批");
		Set<String> categorySet = new LinkedHashSet<String>();
		categorySet.add("shbzddyp");
		categorySet.add("ydfpbqyp");
		categorySet.add("fzjytpyp");
		categorySet.add("fzsctpyp");
		Iterator<String> itercategory = categorySet.iterator();
		List<Object> datasetList = new ArrayList<Object>();
		while(itercategory.hasNext())
		{
			List<Object> dataList = new ArrayList<Object>();
			String category = itercategory.next();
			Iterator<String> areagory = areaSet.iterator();			
			while(areagory.hasNext())
			{
				String area =areagory.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> returnMap = new HashMap<String, Object>();
					returnMap = returnList.get(i);
					if(returnMap.containsKey(category)&&returnMap.containsValue(area)){
						dataList.add(returnMap.get(category));
					}
				}
			}
			datasetList.add(dataList);
		}
		resultMap.put("unit", "万人");
		resultMap.put("type", returnSet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", datasetList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> queryFiveOne(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = shisanwudao.queryFiveOneBarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = shisanwudao.queryFiveOneBarshi(areaid);
			}
		}
		Set<String> categorySet = new LinkedHashSet<String>();
		categorySet.add("shbzddyp");
		categorySet.add("ydfpbqyp");
		categorySet.add("fzjytpyp");
		categorySet.add("fzsctpyp");
		Iterator<String> iter = categorySet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String  type = iter.next();
			switch (type) {
			case "shbzddyp":
				typeMap.put("type", "社会保障兜底一批");
				break;
			case "ydfpbqyp":
				typeMap.put("type", "易地扶贫搬迁脱贫一批");
				break;
			case "fzjytpyp":
				typeMap.put("type", "发展教育脱贫一批");
				break;
			case "fzsctpyp":
				typeMap.put("type", "发展生产脱贫一批");
				break;
			}		
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				if(areaMap.containsKey(type))
				{
					dataMap.put("areaCode", areaMap.get("areaid"));
					dataMap.put("y", Float.parseFloat(String.valueOf(areaMap.get(type))));
					dataList.add(dataMap);
				}
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> queryAntPovertyPlanBar() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		returnList = shisanwudao.queryAntPovertyPlanBar();
		Set<String> categorySet = new LinkedHashSet<String>();
		Set<String> yearSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		Set<String> unitSet = new LinkedHashSet<String>();
		unitSet.add("人");
		unitSet.add("户");
		unitSet.add("个");
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
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
		List<Object> yeardataList = new ArrayList<Object>();
		Iterator<String> yeariter = yearSet.iterator();
		while(yeariter.hasNext())
		{
			String year = yeariter.next();
			Iterator<String> categoryiter = categorySet.iterator();
			Map<String, Object> yearresultMap = new HashMap<String, Object>();
			List<Object> categorydataList = new ArrayList<Object>();
			while(categoryiter.hasNext())
			{
				String category = categoryiter.next();
				Iterator<String> areaiter = areaSet.iterator();
				List<Float> dataList = new ArrayList<Float>();
				while(areaiter.hasNext())
				{
					String area = areaiter.next();
					for (int i = 0; i < returnList.size(); i++) {
						Map<String, Object> returnMap = (Map<String, Object>)returnList.get(i);
						if(returnMap.containsValue(area)&&returnMap.containsValue(category)&&returnMap.containsValue(year))
						{
							dataList.add(Float.parseFloat(String.valueOf(returnMap.get("numericalvalue"))));
						}
					}
				}	
				categorydataList.add(dataList);
			}
			yearresultMap.put("year", year);
			yearresultMap.put("data", categorydataList);
			yeardataList.add(yearresultMap);
		}
		resultMap.put("type", categorySet);
		resultMap.put("unit", unitSet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", yeardataList);
		return resultMap;
	}
	
	@Override
	public List<Map<String, Object>> queryAntPovertyPlan() {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		returnList = shisanwudao.queryAntPovertyPlan();
		Set<String> categorySet = new LinkedHashSet<String>();
		//所有类别
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) returnList.get(i);
			categorySet.add(dataMap.get("category").toString());
		}
		Iterator<String> iter = categorySet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String  type = iter.next();
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
			typeMap.put("type", type);
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

}
