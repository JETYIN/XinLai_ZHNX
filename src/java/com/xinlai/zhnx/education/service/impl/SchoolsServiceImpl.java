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

import com.alibaba.fastjson.JSON;
import com.xinlai.zhnx.education.dao.SchoolsDao;
import com.xinlai.zhnx.education.service.SchoolsService;


@Service("SchoolsService")
public class SchoolsServiceImpl implements SchoolsService{
	@Resource
	private SchoolsDao schoolDao;

	@Override
	public List<Object> getEduConstitute(String areaCode) {
		Map<String, Object> EduConstituteMap = new HashMap<String, Object>();
		List<BigDecimal> dataList = new ArrayList<BigDecimal>();
		EduConstituteMap = schoolDao.getEduConstitute(areaCode);
		dataList.add((BigDecimal) EduConstituteMap.get("xqsl"));
		dataList.add((BigDecimal) EduConstituteMap.get("zxxsl"));
		dataList.add((BigDecimal) EduConstituteMap.get("zzsl"));
		String type = "['学前学校数量比','中小学学校数量比','中职学校数量比']";
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("type", JSON.parse(type));
		dataMap.put("value", dataList);
		List<Object> message = new ArrayList<Object>();
		message.add(dataMap);
		return message;
	}

	@Override
	public Map<String, Object> getDataAnaly(String areaCode) {
		List<Map<String, Object>> DataAnalyList = schoolDao.getDataAnaly(areaCode);
		List<Integer> xqList = new ArrayList<Integer>();
		List<Integer> zxxList = new ArrayList<Integer>();
		List<Integer> zzList = new ArrayList<Integer>();
		List<String> labelList = new ArrayList<String>();
		for (int i =0;i<DataAnalyList.size();i++)
		{
			Map<String, Object> dataMap = DataAnalyList.get(i);
			xqList.add((Integer) dataMap.get("xqsl"));
			zxxList.add((Integer) dataMap.get("zxxsl"));
			zzList.add((Integer) dataMap.get("zzsl"));
			labelList.add((String) dataMap.get("AreaName"));
		}
		Map<String, Object> xqMap = new HashMap<String, Object>();
		Map<String, Object> zxxMap = new HashMap<String, Object>();
		Map<String, Object> zzMap = new HashMap<String, Object>();
		xqMap.put("name", "学前教育");
		xqMap.put("unit", "人");
		xqMap.put("label", labelList);
		xqMap.put("data", xqList);
		zxxMap.put("name", "中小学教育");
		zxxMap.put("unit", "人");
		zxxMap.put("label", labelList);
		zxxMap.put("data", zxxList);
		zzMap.put("name", "中职教育");
		zzMap.put("unit", "人");
		zzMap.put("label", labelList);
		zzMap.put("data", zzList);
		List<Map<String, Object>> DataList = new ArrayList<Map<String,Object>>();
		DataList.add(xqMap);
		DataList.add(zxxMap);
		DataList.add(zzMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("data", DataList);
		return message;
	}

	@Override
	public Map<String, Object> getPrimarySecondary(String areaCode) {
		List<Map<String, Object>> stageList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> sizeList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> classsizeList = new ArrayList<Map<String, Object>>();
		Map<String, Object> typereMap = new HashMap<String, Object>();
		Map<String, Object> sizereMap = new HashMap<String, Object>();
		Map<String, Object> classsizereMap = new HashMap<String, Object>();
		Map<String, Object> stagereMap = new HashMap<String, Object>();
		List<String> sizelabelList = new ArrayList<String>();
		List<Integer> sizedataList = new ArrayList<Integer>();
		Map<String, Object> typeMap = new HashMap<String, Object>();
		List<Integer> typeList = new ArrayList<Integer>();
		if(areaCode.equals("640000000000"))
		{
			typeMap = schoolDao.getprimarysecondschooltype_all();
			sizeList = schoolDao.getprimarysecondschoolsize_all();
			classsizeList = schoolDao.getprimarysecondschoolclasssize_all();
			stageList = schoolDao.getprimarysecondschoolstage_all();
			BigDecimal primaryschoolnum =  (BigDecimal) typeMap.get("PrimarySchoolNum");
			BigDecimal juniorschoolnum =  (BigDecimal) typeMap.get("JuniorSchoolNum");
			BigDecimal highschoolnum =  (BigDecimal) typeMap.get("HighSchoolNum");
			BigDecimal specialeducationschoolnum =  (BigDecimal) typeMap.get("SpecialEducationSchoolNum");
			typeList.add(primaryschoolnum.intValue());
			typeList.add(juniorschoolnum.intValue());
			typeList.add(highschoolnum.intValue());
			typeList.add(specialeducationschoolnum.intValue());
		}else
		{
			typeMap = schoolDao.getprimarysecondschooltype(areaCode);
			sizeList = schoolDao.getprimarysecondschoolsize(areaCode);
			classsizeList = schoolDao.getprimarysecondschoolclasssize(areaCode);
			stageList = schoolDao.getprimarysecondschoolstage(areaCode);
			typeList.add((Integer) typeMap.get("PrimarySchoolNum"));
			typeList.add((Integer) typeMap.get("JuniorSchoolNum"));
			typeList.add((Integer) typeMap.get("HighSchoolNum"));
			typeList.add((Integer) typeMap.get("SpecialEducationSchoolNum"));
		}
		Map<String, Object> typedataMap = new HashMap<String, Object>();
		List<Map<String, Object>> typereturnList = new ArrayList<Map<String, Object>>();
		typedataMap.put("name", "办学类型");
		typedataMap.put("unit", "");
		typedataMap.put("label", JSON.parse("['小学', '初中', '高中', '特殊教育']"));
		typedataMap.put("data", typeList);
		typereturnList.add(typedataMap);
		for(int i=0;i<sizeList.size();i++)
		{
			Map<String, Object> sizedataMap = sizeList.get(i);
			sizelabelList.add((String) sizedataMap.get("fanwei")+"人");
			if(areaCode.equals("640000000000"))
			{
				BigDecimal data = (BigDecimal) sizedataMap.get("NumOfFanwei");
				sizedataList.add(data.intValue());
			}else
			{
				sizedataList.add((Integer) sizedataMap.get("NumOfFanwei"));
			}
		}
		Map<String, Object> sizedataMap = new HashMap<String, Object>();
		List<Map<String, Object>> sizereturnList = new ArrayList<Map<String, Object>>();
		sizedataMap.put("name", "办学规模");
		sizedataMap.put("unit", "所");
		sizedataMap.put("label", sizelabelList);
		sizedataMap.put("data", sizedataList);
		sizereturnList.add(sizedataMap);
		Set<String> classsizeSet = new LinkedHashSet<String>();
		//所有classsize类别
		for (int i = 0; i < classsizeList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) classsizeList.get(i);
			classsizeSet.add(dataMap.get("ClassSize").toString());
		}
		Iterator<String> iterclasssize = classsizeSet.iterator();
		List<Map<String, Object>> classsizereturnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> stagereturnList = new ArrayList<Map<String, Object>>();
		while(iterclasssize.hasNext())
		{
			List<String> classsizelabelList = new ArrayList<String>();
			List<Integer> classsizedataList = new ArrayList<Integer>();
			String classsize = iterclasssize.next();
			Map<String, Object> resultMap = new HashMap<String, Object>();
			Map<String, Object> classsizedataMap = new HashMap<String, Object>();
			for (int i = 0; i < classsizeList.size(); i++) {
				resultMap = (Map<String, Object>) classsizeList.get(i);
				if(resultMap.containsValue(classsize))
				{
					classsizelabelList.add((String) resultMap.get("AreaName"));
					if(areaCode.equals("640000000000"))
					{
						BigDecimal data = (BigDecimal) resultMap.get("NumOfClassSize");
						classsizedataList.add(data.intValue());
					}else
					{
						classsizedataList.add((Integer) resultMap.get("NumOfClassSize"));
					}
				}
			}
			classsizedataMap.put("name", classsize);
			classsizedataMap.put("unit", "所");
			classsizedataMap.put("label", classsizelabelList);
			classsizedataMap.put("data", classsizedataList);
			classsizereturnList.add(classsizedataMap);
		}
		Set<String> stageSet = new LinkedHashSet<String>();
		//所有stage类别
		for (int i = 0; i < stageList.size(); i++) {
			Map<String, Object> dataMap = (Map<String, Object>) stageList.get(i);
			stageSet.add(dataMap.get("Stage").toString());
		}
		Iterator<String> iterstage = stageSet.iterator();
		while(iterstage.hasNext())
		{
			String stage = iterstage.next();
			List<String> stagelabelList = new ArrayList<String>();
			List<Integer> stagedataList = new ArrayList<Integer>();
			Map<String, Object> resultMap = new HashMap<String, Object>();
			Map<String, Object> stagedataMap = new HashMap<String, Object>();
			for (int i = 0; i < stageList.size(); i++) {
				resultMap = (Map<String, Object>) stageList.get(i);
				if(resultMap.containsValue(stage))
				{
					stagelabelList.add((String) resultMap.get("AreaName"));
					if(areaCode.equals("640000000000"))
					{
						BigDecimal data = (BigDecimal) resultMap.get("NumOfStage");
						stagedataList.add(data.intValue());
					}else
					{
						stagedataList.add((Integer) resultMap.get("NumOfStage"));
					}		
				}
			}
			stagedataMap.put("name", stage);
			stagedataMap.put("unit", "个");
			stagedataMap.put("label", stagelabelList);
			stagedataMap.put("data", stagedataList);
			stagereturnList.add(stagedataMap);
		}
		typereMap.put("data", typereturnList);
		sizereMap.put("data", sizereturnList);
		classsizereMap.put("data", classsizereturnList);
		stagereMap.put("data", stagereturnList);
		List<Map<String, Object>> returnList = new ArrayList<Map<String,Object>>();
		returnList.add(typereMap);
		returnList.add(sizereMap);
		returnList.add(classsizereMap);
		returnList.add(stagereMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("nav", JSON.parse("['办学类型', '办学规模', '班级数规模', '分教育阶段班级数']"));
		message.put("series", returnList);
		return message;
	}

	@Override
	public Map<String, Object> getPreSchool(String areaCode) {
		// TODO Auto-generated method stub
		Set<String> navSet = new LinkedHashSet<String>();
		navSet.add("城镇乡学校数量");
		navSet.add("公办普惠幼儿园数");
		navSet.add("独附幼儿园数");
		navSet.add("班额数");
		Iterator<String> iternav = navSet.iterator();
		List<Map<String, Object>> seriesList = new ArrayList<Map<String,Object>>();
		while(iternav.hasNext())
		{
			Map<String, Object> data = new HashMap<String, Object>();
			String nav = iternav.next();
			data.put("areaCode", areaCode);
			data.put("tagName", nav);
			List<Map<String, Object>> dataList = schoolDao.getPreSchool(data);
			//所有type类别
			Set<String> typeSet = new LinkedHashSet<String>();
			for (int i = 0; i < dataList.size(); i++) {
				Map<String, Object> dataMap = (Map<String, Object>) dataList.get(i);
				typeSet.add(dataMap.get("Type").toString());
			}
			Iterator<String> itertype = typeSet.iterator();
			List<Map<String, Object>> datareList = new ArrayList<Map<String,Object>>();
			Map<String, Object> returnMap = new HashMap<String, Object>();
			while(itertype.hasNext())
			{
				String type = itertype.next();
				Map<String, Object> datareMap = new HashMap<String, Object>();
				List<String> areanameList = new ArrayList<String>();
				List<Integer> numList = new ArrayList<Integer>();
				for(int i=0;i<dataList.size();i++)
				{
					Map<String, Object> dataMap = (Map<String, Object>) dataList.get(i);
					if(dataMap.containsValue(type))
					{
						areanameList.add((String) dataMap.get("AreaName"));
						numList.add((Integer) dataMap.get("NumOfType"));
					}
				}
				datareMap.put("name", type);
				datareMap.put("unit", "所");
				datareMap.put("label", areanameList);
				datareMap.put("data", numList);
				datareList.add(datareMap);
			}
			returnMap.put("data", datareList);
			seriesList.add(returnMap);
		}
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("nav", navSet);
		message.put("series", seriesList);
		return message;
	}

	
}