package com.xinlai.zhnx.education.service.impl;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.xinlai.zhnx.education.dao.TeachersDao;
import com.xinlai.zhnx.education.service.TeachersService;

@Service("TeachersService")
public class TeachersServiceImpl implements TeachersService{
	@Resource
	private TeachersDao teachersDao;

	@Override
	public Map<String, Object> getTeacherCount(String areaCode) {
		Map<String, Object> data = new HashMap<String, Object>();
		List<List<Integer>> sumList = new ArrayList<List<Integer>>();
		List<String> sumlabelList = new ArrayList<String>();
		List<Integer> sum1List = new ArrayList<Integer>();
		List<Integer> sum2List = new ArrayList<Integer>();
		List<Integer> resumList = new ArrayList<Integer>();
		List<Map<String, Object>> redataList = new ArrayList<Map<String,Object>>();
		data.put("type", "性别");
		data.put("areaCode", areaCode);
		List<Map<String, Object>> teachercountList = teachersDao.getTeacher(data);
		Set<String> typeSet = new LinkedHashSet<String>();
		for(int i=0;i<teachercountList.size();i++)
		{
			Map<String, Object> typeMap = teachercountList.get(i);
			typeSet.add((String) typeMap.get("Type"));
		}
		Iterator<String> typeiter = typeSet.iterator();
		while(typeiter.hasNext())
		{
			String type = typeiter.next();
			List<String> labelList = new ArrayList<String>();
			List<Integer> dataList = new ArrayList<Integer>();
			for(int i=0;i<teachercountList.size();i++)
			{
				Map<String, Object> typeMap = teachercountList.get(i);
				if (typeMap.containsValue(type))
				{
					labelList.add((String) typeMap.get("AreaName"));
					dataList.add((Integer) typeMap.get("NumOfType"));
				}
			}
			sumlabelList = labelList;
			sumList.add(dataList);
			Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("name", type);
			dataMap.put("unit", "人");
			dataMap.put("label", labelList);
			dataMap.put("data", dataList);
			redataList.add(dataMap);
		}
		sum1List = sumList.get(0);
		sum2List = sumList.get(1);
		for(int i=0;i<sum1List.size();i++)
		{
			resumList.add(sum1List.get(i)+sum2List.get(i));
		}
		Map<String, Object> sumMap = new HashMap<String, Object>();
		sumMap.put("name", "总人数");
		sumMap.put("unit", "人");
		sumMap.put("label", sumlabelList);
		sumMap.put("data", resumList);
		redataList.add(0,sumMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("data", redataList);
		return message;
	}

	@Override
	public List<Map<String, Object>> getEduConstitute(String areaCode) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("type", "教育阶段");
		data.put("areaCode", areaCode);
		List<Map<String, Object>> educonstituteList = teachersDao.getEduConstitute(data);
		List<String> labelList = new ArrayList<String>();
		List<BigDecimal> dataList = new ArrayList<BigDecimal>();
		for(int i=0;i<educonstituteList.size();i++)
		{
			Map<String, Object> typeMap = educonstituteList.get(i);
			labelList.add((String) typeMap.get("Type") + "教师数量比");
			dataList.add((BigDecimal) typeMap.get("NumOfType"));
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("type", labelList);
		dataMap.put("value", dataList);
		List<Map<String, Object>> message = new ArrayList<Map<String,Object>>();
		message.add(dataMap);
		return message;
	}

	@Override
	public List<Map<String, Object>> getDataAnaly(String areaCode) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("type", "职称");
		data.put("areaCode", areaCode);
		List<Map<String, Object>> dataanalyzcList = teachersDao.getEduConstitute(data);
		List<String> labelList = new ArrayList<String>();
		List<BigDecimal> dataList = new ArrayList<BigDecimal>();
		for(int i=0;i<dataanalyzcList.size();i++)
		{
			Map<String, Object> typeMap = dataanalyzcList.get(i);
			labelList.add((String) typeMap.get("Type") + "职称");
			dataList.add((BigDecimal) typeMap.get("NumOfType"));
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("type", labelList);
		dataMap.put("value", dataList);
		Map<String, Object> data1 = new HashMap<String, Object>();
		data1.put("type", "学历");
		data1.put("areaCode", areaCode);
		List<Map<String, Object>> dataanalyxlList = teachersDao.getEduConstitute(data1);
		List<String> labelxlList = new ArrayList<String>();
		List<BigDecimal> dataxlList = new ArrayList<BigDecimal>();
		for(int i=0;i<dataanalyxlList.size();i++)
		{
			Map<String, Object> typeMap = dataanalyxlList.get(i);
			labelxlList.add((String) typeMap.get("Type"));
			dataxlList.add((BigDecimal) typeMap.get("NumOfType"));
		}
		Map<String, Object> dataxlMap = new HashMap<String, Object>();
		dataxlMap.put("type", labelxlList);
		dataxlMap.put("value", dataxlList);
		List<Map<String, Object>> message = new ArrayList<Map<String,Object>>();
		message.add(dataMap);
		message.add(dataxlMap);
		return message;
	}

	@Override
	public Map<String, Object> getTeacherAgeCount(String areaCode) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("type", "年龄");
		data.put("areaCode", areaCode);
		List<Map<String, Object>> educonstituteList = teachersDao.getEduConstitute(data);
		List<String> labelList = new ArrayList<String>();
		List<BigDecimal> dataList = new ArrayList<BigDecimal>();
		for(int i=0;i<educonstituteList.size();i++)
		{
			Map<String, Object> typeMap = educonstituteList.get(i);
			labelList.add((String) typeMap.get("Type"));
			dataList.add((BigDecimal) typeMap.get("NumOfType"));
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("name", "");
		dataMap.put("unit", "人");
		dataMap.put("label", labelList);
		dataMap.put("data", dataList);
		List<Map<String, Object>> redataList = new ArrayList<Map<String,Object>>();
		redataList.add(dataMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("data", redataList);
		return message;
	}

	
}