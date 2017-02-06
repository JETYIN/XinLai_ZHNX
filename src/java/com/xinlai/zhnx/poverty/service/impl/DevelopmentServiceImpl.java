package com.xinlai.zhnx.poverty.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.xinlai.zhnx.poverty.dao.DevelopmentDao;
import com.xinlai.zhnx.poverty.service.DevelopmentService;


@Service("DevelopmentService")
public class DevelopmentServiceImpl implements DevelopmentService{
	
	@Resource
	DevelopmentDao developmentDao;
	
	
	@Override
	public List<Map<String,Object>> queryChildArea(String areaid){
		List<Object> sqlList = developmentDao.queryChildArea(areaid);
		List<Map<String,Object>> re = new ArrayList<Map<String,Object>>();
		for(int i=0; i<sqlList.size(); i++){
			re.add((Map<String,Object>)sqlList.get(i));
		}
		return re;
	}
	
	@Override
	public Map<String,Object> queryOpenInfo(String areaid){
		List<Map<String,Object>> sqlres = developmentDao.queryOpenInfo();
		List<Map<String,Object>> showarea = this.queryChildArea(areaid);
		Map<String, Map<String,Object>> mapsqlres = new HashMap<String, Map<String,Object>>();
		for(int i=0; i<sqlres.size(); i++){
			mapsqlres.put(sqlres.get(i).get("areacode").toString(), sqlres.get(i));
		}
		String[] opentype = {"notopenroad", "notopenwater", "notopenBb", "notopenbus", "notopenTV"};
		String[] type_zn = {"未通路", "未通水", "未通宽带", "未通客车", "未通广播电视"};
		String[] unit_zn = {"公里", "户", "户", "村", "户"};
		List<String> type = new ArrayList<String>();
		List<String> unit = new ArrayList<String>();
		List<String> county = new ArrayList<String>();
		List<List<Object>> dataset = new ArrayList<List<Object>>();
		
		for(int i=0; i<opentype.length; i++){
			List<Object> dataitem = new ArrayList<Object>();
			dataset.add(dataitem);
			type.add(type_zn[i]);
			unit.add(unit_zn[i]);
		}
		
		for(int i=0; i<showarea.size(); i++){
			Map<String,Object> areainfo = mapsqlres.get(showarea.get(i).get("areaid").toString());
			if(areainfo != null){
				county.add(showarea.get(i).get("areaname").toString());
				for(int j=0; j<opentype.length; j++){
					List<Object> dataitem =dataset.get(j);
					dataitem.add(areainfo.get(opentype[j]));
					dataset.set(j, dataitem);
				}
			}
		}
		
		Map<String,Object> series = new HashMap<String, Object>();
		series.put("unit", unit);
		series.put("type", type);
		series.put("country", county);
		series.put("dataset", dataset);
		
		return series;
	}
	
	@Override
	public Map<String, Object> querypovertyneedsum(String areaid) {
		// TODO Auto-generated method stub
		
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.querypovertyneedsumqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.querypovertyneedsumshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.querypovertyneedsumxian(areaid);
			}
		}
		
		Set<String> labelSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)resultList.get(i);
			String[] types = areaMap.get("type").toString().split(",");
			for(String type : types){
				labelSet.add(type.trim());
			}
		}
		
		List<Object> dataList = new ArrayList<Object>();
		Iterator<String> iter = labelSet.iterator();
		while (iter.hasNext()) {
			String type = iter.next();
			Map<String, Object> dataMap = new HashMap<String, Object>();
			int total = 0;
			for (int i = 0; i < resultList.size(); i++) {
				Map<String, Object> areaMap = (Map<String, Object>)resultList.get(i);
				if(areaMap.get("type").toString().contains(type)){
					total += Integer.valueOf(areaMap.get("total").toString());
				}
			}
			dataMap.put("name", new String[]{type});
			dataMap.put("data", new Integer[]{total});
			dataList.add(dataMap);
		}
		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("labels", labelSet);
		seriesMap.put("series", dataList);
		seriesMap.put("unit", "户");
		return seriesMap;
	}

	@Override
	public List<Map<String, Object>>  querypovertyneed(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.querypovertyneedqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.querypovertyneedshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.querypovertyneedxian(areaid);
			}
		}

		// 所有类别
		Set<String> typeSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
			String[] types = dataMap.get("type").toString().split(",");
			for(String type : types){
				typeSet.add(type.trim());
			}
		}
		// 所有城市
		Set<String> areaCodeSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>)resultList.get(i);
			areaCodeSet.add(areaMap.get("areacode").toString());
		}
		// 所有数据
		List<Map<String, Object>> serieList = new ArrayList<Map<String,Object>>();
		Iterator<String> typeIter = typeSet.iterator();
		while (typeIter.hasNext()) {
			String type = typeIter.next();
			List<Map<String, Object>> typeDataList = new ArrayList<Map<String,Object>>();
			Iterator<String> areaIter = areaCodeSet.iterator();
			int total = 0;
			while (areaIter.hasNext()) {
				String area = areaIter.next();
				Map<String, Object> typeDataListOne = new HashMap<String, Object>();
				int areaTotal = 0;
				for (int i = 0; i < resultList.size(); i++) {
					Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
					if(dataMap.get("type").toString().contains(type) && dataMap.get("areacode").toString().contains(area)){
						areaTotal += Integer.valueOf(dataMap.get("total").toString());
					}
				}
				if(areaTotal > 0){
					total += areaTotal;
					typeDataListOne.put("areaCode", area);
					typeDataListOne.put("y", areaTotal);
				}
				if(!typeDataListOne.isEmpty()){
					typeDataList.add(typeDataListOne);
				}
			}
			// 分类合集
			if(total > 0){
				Map<String, Object> typeDataTotalOne = new HashMap<String, Object>();
				typeDataTotalOne.put("type", "total");
				typeDataTotalOne.put("y", total);
				typeDataList.add(typeDataTotalOne);
			}

			Map<String, Object> seriesOne = new HashMap<String, Object>();
			seriesOne.put("type", type);
			seriesOne.put("data", typeDataList);
			serieList.add(seriesOne);
		}
		return serieList;
	}

	@Override
	public Map<String, Object> querypovertyneedbar(String areaid) {

		// TODO Auto-generated method stub
		List<Object> returnlist = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			returnlist = developmentDao.querypovertyneedbarqu();
		}else{
			if(areaid.endsWith("00000000")){
				returnlist = developmentDao.querypovertyneedbarshi(areaid);
			}else if(areaid.endsWith("000000")){
				returnlist = developmentDao.querypovertyneedbarxian(areaid);
			}else if(areaid.endsWith("000")){
				returnlist = developmentDao.querypovertyneedbarxiang(areaid);
			}
		}

		Set<String> typeSet = new TreeSet<String>();
		Set<String> countrycode = new TreeSet<String>();
		Set<String> xLabelSet = new TreeSet<String>();
		for (int i = 0; i < returnlist.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>) returnlist.get(i);
			String[] types = areaMap.get("type").toString().split(",");
			for(String type : types){
				typeSet.add(type.trim());
			}
			xLabelSet.add(areaMap.get("areaname").toString());
			countrycode.add(areaMap.get("areacode").toString());
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
					if(areaMap.get("type").toString().contains(type) && areaMap.containsValue(label)){
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
		seriesMap.put("countrycode", countrycode);
		seriesMap.put("country", xLabelSet);
		seriesMap.put("dataset", allDataList);		
		return seriesMap;
	}

	@Override
	public Map<String, Object> queryindustryinfosum(String areaid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			resultMap = developmentDao.queryindustryinfosumqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultMap = developmentDao.queryindustryinfosumshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultMap = developmentDao.queryindustryinfosumxian(areaid);
			}
		}
		
		List<String> typeList = new ArrayList<String>();
		List<Integer> valueList = new ArrayList<Integer>();
		Iterator<String> iter = resultMap.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			switch (key) {
			case "yzxq":
				typeList.add("养殖");
				break;
			case "zzxq":
				typeList.add("种植");
				break;
			case "yzssxq":
				typeList.add("养殖设施");
				break;
			case "zzssxq":
				typeList.add("种植设施");
				break;
			case "njssxq":
				typeList.add("农机设施");
				break;
			case "jsxq":
				typeList.add("技术");
				break;
			case "gtjyxq":
				typeList.add("个体经营");
				break;
			}
			valueList.add(Integer.valueOf(resultMap.get(key).toString()));
		}
		HashMap<String, Object> aba_data = new HashMap<String, Object>();
		aba_data.put("type", typeList);
		aba_data.put("value", valueList);
		Map<String, Object> series = new HashMap<String, Object>();
		series.put("aba_data", new HashMap[]{aba_data});
		
		return series;
	}

	@Override
	public List<Map<String, Object>> queryindustryinfo(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryindustryinfoqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryindustryinfoshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryindustryinfoxian(areaid);
			}
		}

		List<Map<String, Object>> serieList = new ArrayList<Map<String,Object>>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"yzxq", "zzxq", "yzssxq", "zzssxq", "njssxq", "jsxq", "gtjyxq"});
		for (String type : typeList) {
			Map<String, Object> seriesOne = new HashMap<String, Object>();
			switch (type) {
			case "yzxq":
				seriesOne.put("type", "养殖需求");
				break;
			case "zzxq":
				seriesOne.put("type", "种植需求");
				break;
			case "yzssxq":
				seriesOne.put("type", "养殖设施");
				break;
			case "zzssxq":
				seriesOne.put("type", "种植设施");
				break;
			case "njssxq":
				seriesOne.put("type", "农机设施需求");
				break;
			case "jsxq":
				seriesOne.put("type", "技术需求");
				break;
			case "gtjyxq":
				seriesOne.put("type", "个体经营需求");
				break;
			}
			int total = 0;
			List<Map<String, Object>> typeDataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < resultList.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
				Map<String, Object> typeDataMap = new HashMap<String, Object>();
				int areaTotal = Integer.valueOf(dataMap.get(type).toString());
				if(areaTotal > 0){
					typeDataMap.put("areaCode", dataMap.get("areacode"));
					typeDataMap.put("y", areaTotal);
					typeDataList.add(typeDataMap);
					total += areaTotal;
				}
			}
			Map<String, Object> typeDataTotalMap = new HashMap<String, Object>();
			typeDataTotalMap.put("type", "total");
			typeDataTotalMap.put("y", total);
			typeDataList.add(typeDataTotalMap);
			
			seriesOne.put("data", typeDataList);
			serieList.add(seriesOne);
		}
		
		return serieList;
	}

	@Override
	public Map<String, Object> queryindustryinfobar(String areaid) {
		
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryindustryinfobarqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryindustryinfobarshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryindustryinfobarxian(areaid);
			}else if(areaid.endsWith("000")){
				resultList = developmentDao.queryindustryinfobarxiang(areaid);
			}
		}
		Set<String> countrycode = new TreeSet<String>();
		Set<String> labelSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
			labelSet.add(areaMap.get("areaname").toString());
			countrycode.add(areaMap.get("areacode").toString());
		}

		List<List<Object>> allDataList = new ArrayList<List<Object>>();
		List<String> typeZnList = new ArrayList<String>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"yzxq", "zzxq", "yzssxq", "zzssxq", "njssxq", "jsxq", "gtjyxq"});
		for (String type : typeList) {
			switch (type) {
			case "yzxq":
				typeZnList.add("养殖需求");
				break;
			case "zzxq":
				typeZnList.add("种植需求");
				break;
			case "yzssxq":
				typeZnList.add("养殖设施");
				break;
			case "zzssxq":
				typeZnList.add("种植设施");
				break;
			case "njssxq":
				typeZnList.add("农机设施需求");
				break;
			case "jsxq":
				typeZnList.add("技术需求");
				break;
			case "gtjyxq":
				typeZnList.add("个体经营需求");
				break;
			}
			List<Object> dataList = new ArrayList<Object>();
			for(String label : labelSet){
				int total = 0;
				for (int i = 0; i < resultList.size(); i++) {
					Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
					if(areaMap.containsValue(label)){
						total += Integer.valueOf(areaMap.get(type).toString());
					}
				}
				dataList.add(total);
			}
			allDataList.add(dataList);
		}

		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("type", typeZnList);
		seriesMap.put("unit", "户");
		seriesMap.put("countrycode", countrycode);
		seriesMap.put("country", labelSet);
		seriesMap.put("dataset", allDataList);
		
		return seriesMap;
	}

	@Override
	public Map<String, Object> queryinformationinfosum(String areaid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			resultMap = developmentDao.queryinformationinfosumqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultMap = developmentDao.queryinformationinfosumshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultMap = developmentDao.queryinformationinfosumxian(areaid);
			}
		}
		

		List<String> typeList = new ArrayList<String>();
		List<Integer> valueList = new ArrayList<Integer>();
		Iterator<String> iter = resultMap.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			switch (key) {
			case "gbdsyes":
				typeList.add("广播电视-已通");
				break;
			case "kdyes":
				typeList.add("宽带-已通");
				break;
			case "kdno":
				typeList.add("宽带-未通");
				break;
			case "gbdsno":
				typeList.add("广播电视-未通");
				break;
			case "sjswyes":
				typeList.add("手机上网-已通");
				break;
			case "sjswno":
				typeList.add("手机上网-未通");
				break;
			}
			valueList.add(Integer.valueOf(resultMap.get(key).toString()));
		}
		HashMap<String, Object> aba_data = new HashMap<String, Object>();
		aba_data.put("type", typeList);
		aba_data.put("value", valueList);
		Map<String, Object> series = new HashMap<String, Object>();
		series.put("aba_data", new HashMap[]{aba_data});
		
		return series;
	}

	@Override
	public List<Map<String, Object>> queryinformationinfo(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryinformationinfoqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryinformationinfoshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryinformationinfoxian(areaid);
			}
		}

		List<Map<String, Object>> serieList = new ArrayList<Map<String,Object>>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"gbdsyes", "gbdsno", "kdyes", "kdno", "sjswyes", "sjswno"});
		for (String type : typeList) {
			Map<String, Object> seriesOne = new HashMap<String, Object>();
			switch (type) {
			case "gbdsyes":
				seriesOne.put("type", "广播电视-已通");
				break;
			case "kdyes":
				seriesOne.put("type", "宽带-已通");
				break;
			case "kdno":
				seriesOne.put("type", "宽带-未通");
				break;
			case "gbdsno":
				seriesOne.put("type", "广播电视-未通");
				break;
			case "sjswyes":
				seriesOne.put("type", "手机上网-已通");
				break;
			case "sjswno":
				seriesOne.put("type", "手机上网-未通");
				break;
			}
			int total = 0;
			List<Map<String, Object>> typeDataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < resultList.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
				Map<String, Object> typeDataMap = new HashMap<String, Object>();
				int areaTotal = Integer.valueOf(dataMap.get(type).toString());
				if(areaTotal > 0){
					typeDataMap.put("areaCode", dataMap.get("areaid"));
					typeDataMap.put("y", areaTotal);
					typeDataList.add(typeDataMap);
					total += areaTotal;
				}
			}
			if(total > 0){
				Map<String, Object> typeDataTotalMap = new HashMap<String, Object>();
				typeDataTotalMap.put("type", "total");
				typeDataTotalMap.put("y", total);
				typeDataList.add(typeDataTotalMap);
			}
			
			seriesOne.put("data", typeDataList);
			serieList.add(seriesOne);
		}
		
		return serieList;
	}

	@Override
	public Map<String, Object> queryinformationinfobar(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryinformationinfobarqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryinformationinfobarshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryinformationinfobarxian(areaid);
			}else if(areaid.endsWith("000")){
				resultList = developmentDao.queryinformationinfobarxiang(areaid);
			}
		}

		Set<String> countrycode = new TreeSet<String>();
		Set<String> labelSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
			labelSet.add(areaMap.get("areaname").toString());
			countrycode.add(areaMap.get("areacode").toString());
		}

		List<List<Object>> allDataList = new ArrayList<List<Object>>();
		List<String> typeZnList = new ArrayList<String>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"gbdsyes", "gbdsno", "kdyes", "kdno", "sjswyes", "sjswno"});
		for (String type : typeList) {
			switch (type) {
			case "gbdsyes":
				typeZnList.add("广播电视-已通");
				break;
			case "kdyes":
				typeZnList.add("宽带-已通");
				break;
			case "kdno":
				typeZnList.add("宽带-未通");
				break;
			case "gbdsno":
				typeZnList.add("广播电视-未通");
				break;
			case "sjswyes":
				typeZnList.add("手机上网-已通");
				break;
			case "sjswno":
				typeZnList.add("手机上网-未通");
				break;
			}
			List<Object> dataList = new ArrayList<Object>();
			for(String label : labelSet){
				int total = 0;
				for (int i = 0; i < resultList.size(); i++) {
					Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
					if(areaMap.containsValue(label)){
						total += Integer.valueOf(areaMap.get(type).toString());
					}
				}
				dataList.add(total);
			}
			allDataList.add(dataList);
		}

		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("type", typeZnList);
		seriesMap.put("unit", "个");
		seriesMap.put("countrycode", countrycode);
		seriesMap.put("country", labelSet);
		seriesMap.put("dataset", allDataList);
		
		return seriesMap;
	}

	@Override
	public Map<String, Object> queryabilityinfosum(String areaid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (areaid.equals("640000000000")){
			resultMap = developmentDao.queryabilityinfosumqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultMap = developmentDao.queryabilityinfosumshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultMap = developmentDao.queryabilityinfosumxian(areaid);
			}
		}

		List<String> pxTypeList = new ArrayList<String>();
		List<Integer> pxValueList = new ArrayList<Integer>();
		List<String> pxKeyList = CollectionUtils.arrayToList(new String[]{"ypx", "wpx"});
		for(String key: pxKeyList){
			switch (key) {
			case "wpx":
				pxTypeList.add("未培训人数");
				break;
			case "ypx":
				pxTypeList.add("已培训人数");
				break;
			}
			pxValueList.add(Integer.valueOf(resultMap.get(key).toString()));
		}
		HashMap<String, Object> pxAba_data = new HashMap<String, Object>();
		pxAba_data.put("type", pxTypeList);
		pxAba_data.put("value", pxValueList);

		List<String> qzTypeList = new ArrayList<String>();
		List<Integer> qzValueList = new ArrayList<Integer>();
		List<String> qzKeyList = CollectionUtils.arrayToList(new String[]{"yqz", "wqz"});
		for(String key: qzKeyList){
			switch (key) {
			case "yqz":
				qzTypeList.add("已取证人数");
				break;
			case "wqz":
				qzTypeList.add("未取证人数");
				break;
			}
			qzValueList.add(Integer.valueOf(resultMap.get(key).toString()));
		}
		HashMap<String, Object> qzAba_data = new HashMap<String, Object>();
		qzAba_data.put("type", qzTypeList);
		qzAba_data.put("value", qzValueList);
		
		List<String> jhTypeList = new ArrayList<String>();
		List<String> jhKeyList = CollectionUtils.arrayToList(new String[]{"jhpx"});
		for(String key: jhKeyList){
			switch (key) {
			case "jhpx":
				jhTypeList.add("计划培训");
				break;
			}
			jhTypeList.add(resultMap.get(key).toString());
		}
		
		Map<String, Object> series = new HashMap<String, Object>();
		series.put("aba_data", new HashMap[]{pxAba_data, qzAba_data});
		series.put("centerText", jhTypeList);
		
		return series;
	}

	@Override
	public List<Map<String, Object>> queryabilityinfo(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryabilityinfoqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryabilityinfoshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryabilityinfoxian(areaid);
			}
		}
		

		List<Map<String, Object>> serieList = new ArrayList<Map<String,Object>>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"yqz", "wqz", "ypx", "wpx", "jhpx"});
		for (String type : typeList) {
			Map<String, Object> seriesOne = new HashMap<String, Object>();
			switch (type) {
			case "yqz":
				seriesOne.put("type", "已取证人数");
				break;
			case "wpx":
				seriesOne.put("type", "未培训人数");
				break;
			case "ypx":
				seriesOne.put("type", "已培训人数");
				break;
			case "wqz":
				seriesOne.put("type", "未取证人数");
				break;
			case "jhpx":
				seriesOne.put("type", "计划培训人数");
				break;
			}
			int total = 0;
			List<Map<String, Object>> typeDataList = new ArrayList<Map<String,Object>>();
			for (int i = 0; i < resultList.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>) resultList.get(i);
				Map<String, Object> typeDataMap = new HashMap<String, Object>();
				int areaTotal = Integer.valueOf(dataMap.get(type).toString());
				if(areaTotal > 0){
					typeDataMap.put("areaCode", dataMap.get("areaid"));
					typeDataMap.put("y", areaTotal);
					typeDataList.add(typeDataMap);
					total += areaTotal;
				}
			}
			if(total > 0){
				Map<String, Object> typeDataTotalMap = new HashMap<String, Object>();
				typeDataTotalMap.put("type", "total");
				typeDataTotalMap.put("y", total);
				typeDataList.add(typeDataTotalMap);
			}
			
			seriesOne.put("data", typeDataList);
			serieList.add(seriesOne);
		}
		
		return serieList;
	}

	@Override
	public Map<String, Object> queryabilityinfobar(String areaid) {
		List<Object> resultList = new ArrayList<Object>();
		if (areaid.equals("640000000000")){
			resultList = developmentDao.queryabilityinfobarqu();
		}else{
			if(areaid.endsWith("00000000")){
				resultList = developmentDao.queryabilityinfobarshi(areaid);
			}else if(areaid.endsWith("000000")){
				resultList = developmentDao.queryabilityinfobarxian(areaid);
			}else if(areaid.endsWith("000")){
				resultList = developmentDao.queryabilityinfobarxiang(areaid);
			}
		}

		Set<String> countrycode = new TreeSet<String>();
		Set<String> labelSet = new TreeSet<String>();
		for (int i = 0; i < resultList.size(); i++) {
			Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
			labelSet.add(areaMap.get("areaname").toString());
			countrycode.add(areaMap.get("areacode").toString());
		}

		List<List<Object>> allDataList = new ArrayList<List<Object>>();
		List<String> typeZnList = new ArrayList<String>();
		List<String> typeList = CollectionUtils.arrayToList(new String[]{"yqz", "wqz", "ypx", "wpx", "jhpx"});
		for (String type : typeList) {
			switch (type) {
			case "yqz":
				typeZnList.add("已取证人数");
				break;
			case "wpx":
				typeZnList.add("未培训人数");
				break;
			case "ypx":
				typeZnList.add("已培训人数");
				break;
			case "wqz":
				typeZnList.add("未取证人数");
				break;
			case "jhpx":
				typeZnList.add("计划培训人数");
				break;
			}
			List<Object> dataList = new ArrayList<Object>();
			for(String label : labelSet){
				int total = 0;
				for (int i = 0; i < resultList.size(); i++) {
					Map<String, Object> areaMap = (Map<String, Object>) resultList.get(i);
					if(areaMap.containsValue(label)){
						total += Integer.valueOf(areaMap.get(type).toString());
					}
				}
				dataList.add(total);
			}
			allDataList.add(dataList);
		}

		Map<String, Object> seriesMap = new HashMap<String, Object>();
		seriesMap.put("type", typeZnList);
		seriesMap.put("unit", "人");
		seriesMap.put("countrycode", countrycode);
		seriesMap.put("country", labelSet);
		seriesMap.put("dataset", allDataList);
		
		return seriesMap;
	}

}
