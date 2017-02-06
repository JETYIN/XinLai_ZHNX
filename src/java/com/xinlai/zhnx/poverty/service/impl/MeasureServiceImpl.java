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

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.poverty.dao.MeasureDao;
import com.xinlai.zhnx.poverty.service.MeasureService;


@Service("MeasureService")
public class MeasureServiceImpl implements MeasureService{

	
	@Resource
	MeasureDao measureDao;
	
	@Override
	public Map<String, Object> querypovertyindustrysum(String areaid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Object> dataList = new ArrayList<Object>();
		String set = "";
		List<Object> countList = new ArrayList<Object>();
		List<Object> sumList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnMap = measureDao.querypovertyindustrysumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnMap = measureDao.querypovertyindustrysumshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnMap = measureDao.querypovertyindustrysumxian(areaid);
			}
		}
		set = "['少生快富', '低保金', '养老金', '生态补偿', '农业保险', '生产补贴', '住房补贴', '国家助学金', '新农合', '大病救助', '金融贷款']";
		countList.add(returnMap.get("sskfsl"));
		sumList.add(returnMap.get("sskfje"));
		countList.add(returnMap.get("dbjsl"));
		sumList.add(returnMap.get("dbjje"));
		countList.add(returnMap.get("yljsl"));
		sumList.add(returnMap.get("yljje"));
		countList.add(returnMap.get("stbcjsl"));
		sumList.add(returnMap.get("stbcjje"));
		countList.add(returnMap.get("nybxbtsl"));
		sumList.add(returnMap.get("nybxbtje"));
		countList.add(returnMap.get("scbtsl"));
		sumList.add(returnMap.get("scbtje"));
		countList.add(returnMap.get("zfbtsl"));
		sumList.add(returnMap.get("zfbtje"));
		countList.add(returnMap.get("gjzxjsl"));
		sumList.add(returnMap.get("gjzxjje"));
		countList.add(returnMap.get("xnhsl"));
		sumList.add(returnMap.get("xnhje"));
		countList.add(returnMap.get("dbsl"));
		sumList.add(returnMap.get("dbje"));
		countList.add(returnMap.get("jrdksl"));
		sumList.add(returnMap.get("jrdkje"));
		Map<String, Object> mapcount = new HashMap<String, Object>();
		mapcount.put("type", "户数");
		mapcount.put("data", sumList);
		Map<String, Object> mapsum = new HashMap<String, Object>();
		mapsum.put("type", "金额");
		mapsum.put("data", countList);
		dataList.add(mapcount);
		dataList.add(mapsum);
		resultMap.put("year", JSON.parse(set));
		resultMap.put("unit", "万元/户");
		resultMap.put("nav", "none");
		resultMap.put("dataset", dataList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyindustry(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyindustryqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyindustryshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertyindustryxian(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("nybxbtje");
		typeSet.add("dbje");
		typeSet.add("yljje");
		typeSet.add("stbcjje");
		typeSet.add("jrdkje");
		typeSet.add("scbtje");
		typeSet.add("zfbtje");
		typeSet.add("dbjje");
		typeSet.add("xnhje");
		typeSet.add("sskfje");
		typeSet.add("gjzxjje");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			switch (type){
			case "sskfje":
				typeMap.put("type", "少生快富金额");
				break;
			case "dbjje":
				typeMap.put("type", "低保金金额");
				break;
			case "yljje":
				typeMap.put("type", "养老金金额");
				break;
			case "stbcjje":
				typeMap.put("type", "生态补偿金额");
				break;
			case "scbtje":
				typeMap.put("type", "生产补贴金额");
				break;
			case "nybxbtje":
				typeMap.put("type", "农业保险金额");
				break;
			case "zfbtje":
				typeMap.put("type", "住房补贴金额");
				break;
			case "gjzxjje":
				typeMap.put("type", "国家助学金金额");
				break;
			case "xnhje":
				typeMap.put("type", "新农合金额");
				break;
			case "dbje":
				typeMap.put("type", "大病救助金额");
				break;
			case "jrdkje":
				typeMap.put("type", "金融贷款金额");
				break;
			}
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				dataMap.put("areaCode", areaMap.get("areaid"));
				dataMap.put("y", areaMap.get(type));
				dataList.add(dataMap);
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> querypovertyindustrybar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<List<Object>> resultList = new ArrayList<List<Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyindustrybarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyindustrybarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertyindustrybarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnList = measureDao.querypovertyindustrybarxiang(areaid);
			}
		}
		Set<Object> areanameSet = new LinkedHashSet<Object>();
		Set<Object> areaidSet = new LinkedHashSet<Object>();
		Set<Object> returntypeSet = new LinkedHashSet<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String type = "";	
		Set<String> typeSet = new HashSet<String>();
		typeSet.add("nybxbtsl");
		typeSet.add("dbsl");
		typeSet.add("yljsl");
		typeSet.add("stbcjsl");
		typeSet.add("jrdksl");
		typeSet.add("scbtsl");
		typeSet.add("zfbtsl");
		typeSet.add("dbjsl");
		typeSet.add("xnhsl");
		typeSet.add("sskfsl");
		typeSet.add("gjzxjsl");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			type = iter.next();
			switch (type){
			case "sskfsl":
				returntypeSet.add("少生快富");
				break;
			case "dbjsl":
				returntypeSet.add("低保金");
				break;
			case "yljsl":
				returntypeSet.add("养老金");
				break;
			case "stbcjsl":
				returntypeSet.add("生态补偿");
				break;
			case "scbtsl":
				returntypeSet.add("生产补贴");
				break;
			case "nybxbtsl":
				returntypeSet.add("农业保险");
				break;
			case "zfbtsl":
				returntypeSet.add("住房补贴");
				break;
			case "gjzxjsl":
				returntypeSet.add("国家助学金");
				break;
			case "xnhsl":
				returntypeSet.add("新农合");
				break;
			case "dbsl":
				returntypeSet.add("大病救助");
				break;
			case "jrdksl":
				returntypeSet.add("金融贷款");
				break;
			}
			List<Object> countList = new ArrayList<Object>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				countList.add(returnMap.get(type));
				areanameSet.add(returnMap.get("areaname"));
				areaidSet.add(returnMap.get("areaid"));
			}
			resultList.add(countList);
		}
		resultMap.put("unit", "户");
		resultMap.put("type", returntypeSet);
		resultMap.put("country", areanameSet);
		resultMap.put("countrycode", areaidSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> querypovertysocietysum(String areaid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnMap = measureDao.querypovertysocietysumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnMap = measureDao.querypovertysocietysumshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnMap = measureDao.querypovertysocietysumxian(areaid);
			}
		}
		List<Object> countList = new ArrayList<Object>();
		List<Object> sumList = new ArrayList<Object>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> countMap = new HashMap<String, Object>();
		Map<String, Object> sumMap = new HashMap<String, Object>();
		String set = "['帮扶资金', '帮扶物品']";
		countList.add(returnMap.get("bfzjhs"));
		countList.add(returnMap.get("bfwphs"));
		sumList.add(returnMap.get("bfzjje"));
		sumList.add(returnMap.get("bfwpje"));
		countMap.put("type", "户数");
		countMap.put("data", countList);
		sumMap.put("type", "金额");
		sumMap.put("data", sumList);
		resultList.add(countMap);
		resultList.add(sumMap);
		resultMap.put("unit","元/户");
		resultMap.put("nav","none");
		resultMap.put("year", JSON.parse(set));
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> querypovertysociety(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertysocietyqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertysocietyshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertysocietyxian(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("bfzjhs");
		typeSet.add("bfzjje");
		typeSet.add("bfwphs");
		typeSet.add("bfwpje");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			switch (type){
			case "bfzjhs":
				typeMap.put("type", "帮扶资金户数");
				break;
			case "bfzjje":
				typeMap.put("type", "帮扶资金金额");
				break;
			case "bfwphs":
				typeMap.put("type", "帮扶物品户数");
				break;
			case "bfwpje":
				typeMap.put("type", "帮扶物品价值金额");
				break;
			}
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				dataMap.put("areaCode", areaMap.get("areaid"));
				dataMap.put("y", areaMap.get(type));
				dataList.add(dataMap);
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> querypovertysocietybar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<List<Object>> resultList = new ArrayList<List<Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertysocietybarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertysocietybarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertysocietybarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnList = measureDao.querypovertysocietybarxiang(areaid);
			}
		}
		Set<Object> areanameSet = new LinkedHashSet<Object>();
		Set<Object> areaidSet = new LinkedHashSet<Object>();
		Set<Object> returntypeSet = new LinkedHashSet<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String type = "";	
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("bfzjhs");
		typeSet.add("bfzjje");
		typeSet.add("bfwphs");
		typeSet.add("bfwpje");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			type = iter.next();
			switch (type){
			case "bfzjhs":
				returntypeSet.add("帮扶资金户数");
				break;
			case "bfzjje":
				returntypeSet.add("帮扶资金金额");
				break;
			case "bfwphs":
				returntypeSet.add("帮扶物品户数");
				break;
			case "bfwpje":
				returntypeSet.add("帮扶物品价值金额");
				break;
			}
			List<Object> countList = new ArrayList<Object>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				countList.add(returnMap.get(type));
				areanameSet.add(returnMap.get("areaname"));
				areaidSet.add(returnMap.get("areaid"));
			}
			resultList.add(countList);
		}
		resultMap.put("unit", "元/户");
		resultMap.put("type", returntypeSet);
		resultMap.put("country", areanameSet);
		resultMap.put("countrycode", areaidSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> querypovertyhelpsum(String areaid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnMap = measureDao.querypovertyhelpsumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnMap = measureDao.querypovertyhelpsumshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnMap = measureDao.querypovertyhelpsumxian(areaid);
			}
		}
		List<Object> countList = new ArrayList<Object>();
		List<Object> sumList = new ArrayList<Object>();
		List<Object> resultList = new ArrayList<Object>();
		Map<String, Object> countMap = new HashMap<String, Object>();
		Map<String, Object> sumMap = new HashMap<String, Object>();
		String set = "['帮扶人数量', '建档立卡总户数', '有帮扶人户数','无帮扶人户数']";
		countList.add(returnMap.get("bfrsl"));
		countList.add(returnMap.get("jdlkhs"));
		countList.add(returnMap.get("ybfhs"));
		countList.add(returnMap.get("wbfhs"));
		countMap.put("type", "户数");
		countMap.put("data", countList);
		resultList.add(countMap);
		resultMap.put("unit","人/户");
		resultMap.put("nav","none");
		resultMap.put("year", JSON.parse(set));
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyhelp(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyhelpqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyhelpshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertyhelpxian(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("bfrsl");
		typeSet.add("jdlkhs");
		typeSet.add("ybfhs");
		typeSet.add("wbfhs");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			switch (type){
			case "bfrsl":
				typeMap.put("type", "帮扶人数量");
				break;
			case "jdlkhs":
				typeMap.put("type", "建档立卡总户数");
				break;
			case "ybfhs":
				typeMap.put("type", "有帮扶人户数");
				break;
			case "wbfhs":
				typeMap.put("type", "无帮扶人户数");
				break;
			}
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				dataMap.put("areaCode", areaMap.get("areaid"));
				dataMap.put("y", areaMap.get(type));
				dataList.add(dataMap);
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

	@Override
	public Map<String, Object> querypovertyhelpbar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<List<Object>> resultList = new ArrayList<List<Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyhelpbarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyhelpbarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnList = measureDao.querypovertyhelpbarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnList = measureDao.querypovertyhelpbarxiang(areaid);
			}
		}
		Set<Object> areanameSet = new LinkedHashSet<Object>();
		Set<Object> areaidSet = new LinkedHashSet<Object>();
		Set<Object> returntypeSet = new LinkedHashSet<Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String type = "";	
		Set<String> typeSet = new LinkedHashSet<String>();
		typeSet.add("bfrsl");
		typeSet.add("jdlkhs");
		typeSet.add("ybfhs");
		typeSet.add("wbfhs");
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			type = iter.next();
			switch (type){
			case "bfrsl":
				returntypeSet.add("帮扶人数量");
				break;
			case "jdlkhs":
				returntypeSet.add("建档立卡户数");
				break;
			case "ybfhs":
				returntypeSet.add("有帮扶人户数");
				break;
			case "wbfhs":
				returntypeSet.add("无帮扶人户数");
				break;
			}
			List<Object> countList = new ArrayList<Object>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> returnMap = new HashMap<String, Object>();
				returnMap = returnList.get(i);
				countList.add(returnMap.get(type));
				areanameSet.add(returnMap.get("areaname"));
				areaidSet.add(returnMap.get("areaid"));
			}
			resultList.add(countList);
		}
		resultMap.put("unit", "人/户");
		resultMap.put("type", returntypeSet);
		resultMap.put("country", areanameSet);
		resultMap.put("countrycode", areaidSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> querypovertyspecialsum(String areaid) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Float> resultList = new ArrayList<Float>();
		if (areaid.equals("640000000000")){
			returnMap = measureDao.querypovertyspecialsumqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnMap = measureDao.querypovertyspecialsumshi(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		Set<String> returntypeSet = new LinkedHashSet<String>();
		typeSet.add("yljhtr");
		typeSet.add("yljhhs");
		typeSet.add("fpxexd");
		typeSet.add("ydfpbq");
		Iterator<String> typeiter=typeSet.iterator();
		while (typeiter.hasNext())
		{
			String type = typeiter.next();
			switch (type){
			case "yljhtr":
				returntypeSet.add("雨露计划投入");
				break;
			case "yljhhs":
				returntypeSet.add("享受雨露计划户数");
				break;
			case "fpxexd":
				returntypeSet.add("扶贫小额信贷");
				break;
			case "ydfpbq":
				returntypeSet.add("异地扶贫搬迁");
				break;
			}
			resultList.add(Float.parseFloat(String.valueOf(returnMap.get(type))));
		}
		resultMap.put("unit", "元/户");
		resultMap.put("type", "");
		resultMap.put("country", returntypeSet);
		resultMap.put("dataset", resultList);
		return resultMap;
	}

	@Override
	public Map<String, Object> querypovertyspecialbar(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyspecialbarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyspecialbarshi(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		Set<String> returntypeSet = new LinkedHashSet<String>();
		Set<String> areaSet = new LinkedHashSet<String>();
		typeSet.add("yljhhs");
		typeSet.add("fpxexd");
		typeSet.add("yljhtr");
		typeSet.add("ydfpbq");
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			areaSet.add((String) areaMap.get("areaname"));
		}
		Iterator<String> typeiter = typeSet.iterator();
		List<List<Float>> typeList = new ArrayList<List<Float>> ();
		while(typeiter.hasNext())
		{
			String type = typeiter.next();
			switch (type){
			case "yljhtr":
				returntypeSet.add("雨露计划投入");
				break;
			case "yljhhs":
				returntypeSet.add("享受雨露计划户数");
				break;
			case "fpxexd":
				returntypeSet.add("扶贫小额信贷");
				break;
			case "ydfpbq":
				returntypeSet.add("异地扶贫搬迁");
				break;
			}
			Iterator<String> areaiter = areaSet.iterator();
			List<Float> areaList = new ArrayList<Float>();
			while(areaiter.hasNext())
			{
				String area = areaiter.next();
				for (int i = 0; i < returnList.size(); i++) {
					Map<String, Object> dataMap = (Map<String, Object>)returnList.get(i);
					if(dataMap.containsKey(type)&&dataMap.containsValue(area))
					{
						areaList.add(Float.parseFloat(String.valueOf(dataMap.get(type))));
					}
				}
			}
			typeList.add(areaList);
		}
		resultMap.put("unit", "元");
		resultMap.put("type", returntypeSet);
		resultMap.put("country", areaSet);
		resultMap.put("dataset", typeList);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> querypovertyspecial(String areaid) {
		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		if (areaid.equals("640000000000")){
			returnList = measureDao.querypovertyspecialqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnList = measureDao.querypovertyspecialshi(areaid);
			}
		}
		Set<String> typeSet = new LinkedHashSet<String>();
		for (int i = 0; i < returnList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
			typeSet.addAll(areaMap.keySet());
		}
		if(typeSet.contains("id")){
			typeSet.remove("id");
		}
		if(typeSet.contains("areaid")){
			typeSet.remove("areaid");
		}
		if(typeSet.contains("areaname")){
			typeSet.remove("areaname");
		}
		Iterator<String> iter = typeSet.iterator();
		while (iter.hasNext()) {
			Map<String, Object> typeMap = new HashMap<String, Object>();
			String type = iter.next();
			switch (type){
			case "yljhtr":
				typeMap.put("type", "雨露计划投入");
				break;
			case "yljhhs":
				typeMap.put("type", "享受雨露计划户数");
				break;
			case "fpxexd":
				typeMap.put("type", "扶贫小额信贷");
				break;
			case "ydfpbq":
				typeMap.put("type", "异地扶贫搬迁");
				break;
			}
			List<Map<String, Object>> dataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < returnList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)returnList.get(i);
				Map<String, Object> dataMap = new HashMap<String, Object>();
				dataMap.put("areaCode", areaMap.get("areaid"));
				dataMap.put("y", areaMap.get(type));
				dataList.add(dataMap);
			}
			typeMap.put("data", dataList);
			resultList.add(typeMap);
		}
		return resultList;
	}

}
