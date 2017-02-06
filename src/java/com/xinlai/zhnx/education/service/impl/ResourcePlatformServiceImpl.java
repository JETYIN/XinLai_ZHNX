package com.xinlai.zhnx.education.service.impl;
import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.education.dao.ResourcePlatformDao;
import com.xinlai.zhnx.education.service.ResourcePlatformService;
import com.xinlai.zhnx.weather.dao.ActualDao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;


@Service("ResourcePlatformService")
public class ResourcePlatformServiceImpl implements ResourcePlatformService{
	@Resource
	private ResourcePlatformDao resourcePlatformDao;

	@Override
	public Map<String, Object> getEduSTLPTResource(String type) {
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("注册教师数");
		typeSet.add("注册学生数");
		typeSet.add("家长注册数");
		Iterator<String> typeiter = typeSet.iterator();
		List<Map<String, Object>> EduSTLPTList = resourcePlatformDao.getEduSTLPT(type);
		List<Float> numList = new ArrayList<Float>();
		List<Float> ratioList = new ArrayList<Float>();
		while (typeiter.hasNext())
		{
			String typename = typeiter.next();
			for (int i=0;i<EduSTLPTList.size();i++)
			{
				Map<String, Object> dataMap =EduSTLPTList.get(i);
				if(dataMap.containsValue(typename))
				{
					numList.add((Float) dataMap.get("NumOfType"));
					ratioList.add((Float) dataMap.get("RatioOfType"));
				}
			}
		}
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("values", numList);
		message.put("rato", ratioList);
		return message;
	}

	@Override
	public Map<String, Object> getEduSTLPTManagement(String type) {
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("学校覆盖率");
		typeSet.add("业务上线率");
		typeSet.add("业务办结率");
		Iterator<String> typeiter = typeSet.iterator();
		List<Map<String, Object>> EduSTLPTList = resourcePlatformDao.getEduSTLPT(type);
		List<Float> ratioList = new ArrayList<Float>();
		while (typeiter.hasNext())
		{
			String typename = typeiter.next();
			for (int i=0;i<EduSTLPTList.size();i++)
			{
				Map<String, Object> dataMap =EduSTLPTList.get(i);
				if(dataMap.containsValue(typename))
				{
					ratioList.add((Float) dataMap.get("RatioOfType"));
				}
			}
		}
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("rato", ratioList);
		return message;
	}

	@Override
	public Map<String, Object> getEduSTLPTXXTRRT() {
		Set<String> typeSet1 = new LinkedHashSet<String>();
		Set<String> typeSet2 = new LinkedHashSet<String>();
		String text = "['占教师总数', '占学生总数', '占专任总数']";
		String nav = "['网络学习人人通', '网络宽带校校通']";
		String type1 = "网络学习人人通";
		String type2 = "网络宽带校校通";
		typeSet1.add("注册基础教育教师空间");
		typeSet1.add("注册学生用户空间");
		typeSet1.add("职业教育专任教师空间");
		typeSet2.add("学校接入互联网");
		typeSet2.add("配置多媒体教学设备");
		typeSet2.add("学校信息化环境完善");
		Iterator<String> typeiter = typeSet1.iterator();
		List<Map<String, Object>> EduSTLPTList1 = resourcePlatformDao.getEduSTLPT(type1);
		List<Float> ratioList1 = new ArrayList<Float>();
		List<Float> ratioList2 = new ArrayList<Float>();
		List<String> numList = new ArrayList<String>();
		while (typeiter.hasNext())
		{
			String typename = typeiter.next();
			for (int i=0;i<EduSTLPTList1.size();i++)
			{
				Map<String, Object> dataMap =EduSTLPTList1.get(i);
				if(dataMap.containsValue(typename))
				{
					ratioList1.add((Float) dataMap.get("RatioOfType"));
					numList.add((Float) dataMap.get("NumOfType")+"万人");
				}
			}
		}
		List<Map<String, Object>> EduSTLPTList2 = resourcePlatformDao.getEduSTLPT(type2);
		typeiter = typeSet2.iterator();
		while(typeiter.hasNext())
		{
			String typename = typeiter.next();
			for (int i=0;i<EduSTLPTList2.size();i++)
			{
				Map<String, Object> dataMap =EduSTLPTList2.get(i);
				if(dataMap.containsValue(typename))
				{
					ratioList2.add((Float) dataMap.get("RatioOfType"));
				}
			}
		}
		Map<String, Object> data1 = new HashMap<String, Object>();
		Map<String, Object> data2 = new HashMap<String, Object>();
		Map<String, Object> message = new HashMap<String, Object>();
		data1.put("value", numList);
		data1.put("type", typeSet1);
		data1.put("text", JSON.parse(text));
		data1.put("ratio", ratioList1);
		data2.put("type", typeSet2);
		data2.put("ratio", ratioList2);
		message.put("data1", data1);
		message.put("data2", data2);
		message.put("nav", JSON.parse(nav));
		return message;
	}

	@Override
	public Map<String, Object> getEduSTLPTBBT_year() {
		List<Map<String, Object>> eduSTLPTBBT_yearList = resourcePlatformDao.getEduSTLPTBBT_year();
		List<Object> labelList = new ArrayList<Object>();
		List<Object> dataList = new ArrayList<Object>();
		for (int i=0;i<eduSTLPTBBT_yearList.size();i++)
		{
			Map<String, Object> dataMap = eduSTLPTBBT_yearList.get(i);
			labelList.add(dataMap.get("Year"));
			dataList.add(dataMap.get("Num"));			
		}	
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("label", labelList);
		data.put("data", dataList);
		data.put("unit", "个");
		List<Map<String, Object>> newdataList = new ArrayList<Map<String, Object>>();
		newdataList.add(data);
		Map<String, Object> series = new HashMap<String, Object>();
		series.put("data", newdataList);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("series", series);
		message.put("title", "近三年数字教育资源数量");
		return message;
	}

	@Override
	public Map<String, Object> getEduSTLPTBBT_mon() {
		List<Map<String, Object>> eduSTLPTBBT_monList = resourcePlatformDao.getEduSTLPTBBT_mon();
		List<Object> labelList = new ArrayList<Object>();
		List<Object> updataList = new ArrayList<Object>();
		List<Object> downdataList = new ArrayList<Object>();
		for (int i=0;i<eduSTLPTBBT_monList.size();i++)
		{
			Map<String, Object> dataMap = eduSTLPTBBT_monList.get(i);
			labelList.add(dataMap.get("Mon"));
			updataList.add(dataMap.get("Upload"));	
			downdataList.add(dataMap.get("Download"));
		}
		Map<String, Object> data1 = new HashMap<String, Object>();
		Map<String, Object> data2 = new HashMap<String, Object>();
		data1.put("label", labelList);
		data1.put("name", "上传量");
		data1.put("unit", "次");
		data1.put("data", updataList);
		data2.put("label", labelList);
		data2.put("name", "下载量");
		data2.put("unit", "次");
		data2.put("data", downdataList);
		List<Map<String, Object>> newdataList = new ArrayList<Map<String, Object>>();
		newdataList.add(data1);
		newdataList.add(data2);
		Map<String, Object> series = new HashMap<String, Object>();
		series.put("data", newdataList);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("series", series);
		message.put("title", "近三月数字教育资源下载量和上传量");
		return message;
	}
	
}