package com.xinlai.zhnx.education.service.impl;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.mysql.fabric.xmlrpc.base.Array;
import com.xinlai.zhnx.education.dao.StudentsDao;
import com.xinlai.zhnx.education.service.StudentsService;


@Service("StudentsService")
public class StudentsServiceImpl implements StudentsService{
	@Resource
	private StudentsDao studentDao;
	
	public List<Map<String,Object>> getEduConstitute(String areaCode){
		List<Map<String,Object>> series = new ArrayList<Map<String,Object>>();
		Map<String,Object> dataMap = studentDao.getEduConstitute(areaCode);
		List<String> typeList = new ArrayList<String>();
		List<BigDecimal> valueList = new ArrayList<BigDecimal>();
		Map<String,Object> returnMap = new HashMap<String, Object>();
		typeList.add("中小学学生数量比");
		typeList.add("学前学生数量比");
		typeList.add("中职学生数量比");
		valueList.add((BigDecimal) dataMap.get("PrimarySecondaryStuNum"));
		valueList.add((BigDecimal) dataMap.get("PreschoolStuNum"));
		valueList.add((BigDecimal) dataMap.get("VocationalEduStuNum"));
		returnMap.put("type", typeList);
		returnMap.put("value", valueList);
		series.add(returnMap);
		return series;
	}
	public Map<String,Object> getDataAnaly(String areaCode){
		List<Map<String,Object>> dataList = studentDao.getDataAnaly(areaCode);
		List<Integer> xqList = new ArrayList<Integer>();
		List<Integer> zxxList = new ArrayList<Integer>();
		List<Integer> zzList = new ArrayList<Integer>();
		List<String> labelList = new ArrayList<String>();
		for (int i =0;i<dataList.size();i++)
		{
			Map<String, Object> dataMap = dataList.get(i);
			xqList.add((Integer) dataMap.get("PreschoolStuNum"));
			zxxList.add((Integer) dataMap.get("PrimarySecondaryStuNum"));
			zzList.add((Integer) dataMap.get("VocationalEduStuNum"));
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
		String unit = "人";
		List<Map<String,Object>> zxsjdataList = studentDao.getPrimarySecondary_zxsj(areaCode);
		List<Map<String,Object>> zxnndataList = studentDao.getPrimarySecondary_zxnn(areaCode);
		List<Map<String,Object>> lsetdataList = studentDao.getPrimarySecondary_lset(areaCode);
		List<Map<String,Object>> djxsdataList = studentDao.getPrimarySecondary_djxs(areaCode);
		List<String> zxsjlabelList = new ArrayList<String>();
		List<String> zxnnlabelList = new ArrayList<String>();
		List<String> lsetlabelList = new ArrayList<String>();
		List<String> djxslabelList = new ArrayList<String>();
		List<Integer> zxsj_priList = new ArrayList<Integer>();
		List<Integer> zxsj_junList = new ArrayList<Integer>();
		List<Integer> zxsj_higList = new ArrayList<Integer>();
		List<Integer> zxnn_sumList = new ArrayList<Integer>();
		List<Integer> zxnn_femaleList = new ArrayList<Integer>();
		List<Integer> zxnn_maleList = new ArrayList<Integer>();
		List<Integer> lset_sinList = new ArrayList<Integer>();
		List<Integer> lset_parList = new ArrayList<Integer>();
		List<Integer> djxs_slcjList = new ArrayList<Integer>();
		List<Integer> djxs_tlcjList = new ArrayList<Integer>();
		List<Integer> djxs_zlcjList = new ArrayList<Integer>();
		List<Integer> djxs_ztcjList = new ArrayList<Integer>();
		List<Integer> djxs_qtcjList = new ArrayList<Integer>();
		for(int i=0;i<zxsjdataList.size();i++)
		{
			Map<String, Object> zxsjMap = zxsjdataList.get(i);
			zxsj_priList.add((Integer) zxsjMap.get("PrimaryStudentNum"));
			zxsj_junList.add((Integer) zxsjMap.get("JuniorSchoolStudentNum"));
			zxsj_higList.add((Integer) zxsjMap.get("HighSchoolStudentNum"));
			zxsjlabelList.add((String) zxsjMap.get("AreaName"));
		}
		for(int i=0;i<zxnndataList.size();i++)
		{
			Map<String, Object> zxnnMap = zxnndataList.get(i);
			Integer sumNum = (Integer)zxnnMap.get("FemaleNum") + (Integer)zxnnMap.get("MaleNum");
			zxnn_sumList.add(sumNum);
			zxnn_femaleList.add((Integer) zxnnMap.get("FemaleNum"));
			zxnn_maleList.add((Integer) zxnnMap.get("MaleNum"));
			zxnnlabelList.add((String) zxnnMap.get("AreaName"));
		}
		for(int i=0;i<lsetdataList.size();i++)
		{
			Map<String, Object> lsetMap = lsetdataList.get(i);
			lset_sinList.add((Integer) lsetMap.get("SingleParentNum"));
			lset_parList.add((Integer) lsetMap.get("ParentsNum"));
			lsetlabelList.add((String) lsetMap.get("AreaName"));
		}
		for(int i=0;i<djxsdataList.size();i++)
		{
			Map<String, Object> djxsMap = djxsdataList.get(i);
			djxs_slcjList.add((Integer) djxsMap.get("BlindNum"));
			djxs_tlcjList.add((Integer) djxsMap.get("DeafNum"));
			djxs_zlcjList.add((Integer) djxsMap.get("MentalDisabilitiesNum"));
			djxs_ztcjList.add((Integer) djxsMap.get("PhysicalDisabilities"));
			djxs_qtcjList.add((Integer) djxsMap.get("OtherNum"));
			djxslabelList.add((String) djxsMap.get("AreaName"));
		}
		Map<String, Object> zxsj_pridataMap = new HashMap<String, Object>();
		Map<String, Object> zxsj_jundataMap = new HashMap<String, Object>();
		Map<String, Object> zxsj_higdataMap = new HashMap<String, Object>();
		zxsj_pridataMap.put("name", "小学");
		zxsj_pridataMap.put("unit", unit);
		zxsj_pridataMap.put("label", zxsjlabelList);
		zxsj_pridataMap.put("data", zxsj_priList);
		zxsj_jundataMap.put("name", "初中");
		zxsj_jundataMap.put("unit", unit);
		zxsj_jundataMap.put("label", zxsjlabelList);
		zxsj_jundataMap.put("data", zxsj_junList);
		zxsj_higdataMap.put("name", "高中");
		zxsj_higdataMap.put("unit", unit);
		zxsj_higdataMap.put("label", zxsjlabelList);
		zxsj_higdataMap.put("data", zxsj_higList);
		List<Map<String, Object>> zxsjreList = new ArrayList<Map<String,Object>>();
		zxsjreList.add(zxsj_pridataMap);
		zxsjreList.add(zxsj_jundataMap);
		zxsjreList.add(zxsj_higdataMap);
		Map<String, Object> zxnn_sumdataMap = new HashMap<String, Object>();
		Map<String, Object> zxnn_maledataMap = new HashMap<String, Object>();
		Map<String, Object> zxnn_femaledataMap = new HashMap<String, Object>();
		zxnn_sumdataMap.put("name", "总数");
		zxnn_sumdataMap.put("unit", unit);
		zxnn_sumdataMap.put("label", zxnnlabelList);
		zxnn_sumdataMap.put("data", zxnn_sumList);
		zxnn_maledataMap.put("name", "男生数");
		zxnn_maledataMap.put("unit", unit);
		zxnn_maledataMap.put("label", zxnnlabelList);
		zxnn_maledataMap.put("data", zxnn_maleList);
		zxnn_femaledataMap.put("name", "女生数");
		zxnn_femaledataMap.put("unit", unit);
		zxnn_femaledataMap.put("label", zxnnlabelList);
		zxnn_femaledataMap.put("data", zxnn_femaleList);
		List<Map<String, Object>> zxnnreList = new ArrayList<Map<String,Object>>();
		zxnnreList.add(zxnn_sumdataMap);
		zxnnreList.add(zxnn_maledataMap);
		zxnnreList.add(zxnn_femaledataMap);
		Map<String, Object> lset_sindataMap = new HashMap<String, Object>();
		Map<String, Object> lset_pardataMap = new HashMap<String, Object>();
		lset_sindataMap.put("name", "单亲");
		lset_sindataMap.put("unit", unit);
		lset_sindataMap.put("label", lsetlabelList);
		lset_sindataMap.put("data", lset_sinList);
		lset_pardataMap.put("name", "双亲");
		lset_pardataMap.put("unit", unit);
		lset_pardataMap.put("label", lsetlabelList);
		lset_pardataMap.put("data", lset_parList);
		List<Map<String, Object>> lsetreList = new ArrayList<Map<String,Object>>();
		lsetreList.add(lset_sindataMap);
		lsetreList.add(lset_pardataMap);
		Map<String, Object> djxs_slcjMap = new HashMap<String, Object>();
		Map<String, Object> djxs_tlcjMap = new HashMap<String, Object>();
		Map<String, Object> djxs_zlcjMap = new HashMap<String, Object>();
		Map<String, Object> djxs_ztcjMap = new HashMap<String, Object>();
		Map<String, Object> djxs_qtcjMap = new HashMap<String, Object>();
		djxs_slcjMap.put("name", "视力残疾");
		djxs_slcjMap.put("unit", unit);
		djxs_slcjMap.put("label", djxslabelList);
		djxs_slcjMap.put("data", djxs_slcjList);
		djxs_tlcjMap.put("name", "听力残疾");
		djxs_tlcjMap.put("unit", unit);
		djxs_tlcjMap.put("label", djxslabelList);
		djxs_tlcjMap.put("data", djxs_tlcjList);
		djxs_zlcjMap.put("name", "智力残疾");
		djxs_zlcjMap.put("unit", unit);
		djxs_zlcjMap.put("label", djxslabelList);
		djxs_zlcjMap.put("data", djxs_zlcjList);
		djxs_ztcjMap.put("name", "肢体残疾");
		djxs_ztcjMap.put("unit", unit);
		djxs_ztcjMap.put("label", djxslabelList);
		djxs_ztcjMap.put("data", djxs_ztcjList);
		djxs_qtcjMap.put("name", "其他残疾");
		djxs_qtcjMap.put("unit", unit);
		djxs_qtcjMap.put("label", djxslabelList);
		djxs_qtcjMap.put("data", djxs_qtcjList);
		List<Map<String, Object>> djxsreList = new ArrayList<Map<String,Object>>();
		djxsreList.add(djxs_slcjMap);
		djxsreList.add(djxs_tlcjMap);
		djxsreList.add(djxs_zlcjMap);
		djxsreList.add(djxs_ztcjMap);
		djxsreList.add(djxs_qtcjMap);
		Map<String, Object> zxsjreMap = new HashMap<String, Object>();
		Map<String, Object> zxnnreMap = new HashMap<String, Object>();
		Map<String, Object> lsetreMap = new HashMap<String, Object>();
		Map<String, Object> djxsreMap = new HashMap<String, Object>();
		zxsjreMap.put("data", zxsjreList);
		zxnnreMap.put("data", zxnnreList);
		lsetreMap.put("data", lsetreList);
		djxsreMap.put("data", djxsreList);
		List<Map<String, Object>> series = new ArrayList<Map<String,Object>>();
		series.add(zxsjreMap);
		series.add(zxnnreMap);
		series.add(lsetreMap);
		series.add(djxsreMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("nav", JSON.parse("['在校生数据分析', '在校生男女比例', '留守儿童数据分析', '特教学生数据分析']"));
		message.put("series", series);
		return message;
	}
	@Override
	public Map<String, Object> getPreSchool(String areaCode) {
		String unit = "人";
		List<Map<String,Object>> preschooldataList = studentDao.getPreSchool(areaCode);
		List<Map<String,Object>> preschoolLBCdataList = studentDao.getPreSchoolLBC(areaCode);
		List<String> prelabelList = new ArrayList<String>();
		List<String> preLBClabelList = new ArrayList<String>();
		List<Integer> cqdataList = new ArrayList<Integer>();
		List<Integer> zqdataList = new ArrayList<Integer>();
		List<Integer> xcdataList = new ArrayList<Integer>();
		List<Integer> sumdataList = new ArrayList<Integer>();
		List<Integer> yedataList = new ArrayList<Integer>();
		List<Integer> lsdataList = new ArrayList<Integer>();
		for(int i=0;i<preschooldataList.size();i++)
		{
			Map<String, Object> preMap = preschooldataList.get(i);
			Integer sumdata = (Integer) preMap.get("UrbanNum")+(Integer) preMap.get("TownshipNum")+(Integer) preMap.get("RuralNum");
			cqdataList.add((Integer) preMap.get("UrbanNum"));
			zqdataList.add((Integer) preMap.get("TownshipNum"));
			xcdataList.add((Integer) preMap.get("RuralNum"));
			sumdataList.add(sumdata);
			prelabelList.add((String) preMap.get("AreaName"));
		}
		for(int i=0;i<preschoolLBCdataList.size();i++)
		{
			Map<String, Object> preLBCMap = preschoolLBCdataList.get(i);
			yedataList.add((Integer) preLBCMap.get("InfantNum"));
			lsdataList.add((Integer) preLBCMap.get("ChildNum"));
			preLBClabelList.add((String) preLBCMap.get("AreaName"));
		}
		Map<String, Object> sumdataMap = new HashMap<String, Object>();
		Map<String, Object> cqdataMap = new HashMap<String, Object>();
		Map<String, Object> zqdataMap = new HashMap<String, Object>();
		Map<String, Object> xcdataMap = new HashMap<String, Object>();
		Map<String, Object> yedataMap = new HashMap<String, Object>();
		Map<String, Object> lsdataMap = new HashMap<String, Object>();
		sumdataMap.put("unit", unit);
		sumdataMap.put("label", prelabelList);
		sumdataMap.put("data", sumdataList);
		cqdataMap.put("name", "城区");
		cqdataMap.put("unit", unit);
		cqdataMap.put("label", prelabelList);
		cqdataMap.put("data", cqdataList);
		zqdataMap.put("name", "镇区");
		zqdataMap.put("unit", unit);
		zqdataMap.put("label", prelabelList);
		zqdataMap.put("data", zqdataList);
		xcdataMap.put("name", "乡村");
		xcdataMap.put("unit", unit);
		xcdataMap.put("label", prelabelList);
		xcdataMap.put("data", xcdataList);
		yedataMap.put("name", "幼儿");
		yedataMap.put("unit", unit);
		yedataMap.put("label", preLBClabelList);
		yedataMap.put("data", yedataList);
		lsdataMap.put("name", "留守儿童");
		lsdataMap.put("unit", unit);
		lsdataMap.put("label", preLBClabelList);
		lsdataMap.put("data", lsdataList);
		List<Map<String, Object>> sumList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> preList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> preLBCList = new ArrayList<Map<String,Object>>();
		sumList.add(sumdataMap);
		preList.add(cqdataMap);
		preList.add(zqdataMap);
		preList.add(xcdataMap);
		preLBCList.add(yedataMap);
		preLBCList.add(lsdataMap);
		Map<String, Object> sumMap = new HashMap<String, Object>();
		Map<String, Object> preMap = new HashMap<String, Object>();
		Map<String, Object> preLBCMap = new HashMap<String, Object>();
		sumMap.put("data", sumList);
		preMap.put("data", preList);
		preLBCMap.put("data", preLBCList);
		List<Map<String, Object>> series = new ArrayList<Map<String,Object>>();
		series.add(sumMap);
		series.add(preMap);
		series.add(preLBCMap);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("nav", JSON.parse("['在园幼儿数据分析', '城镇乡幼儿情况', '学前留守幼儿数据']"));
		message.put("series", series);
		return message;
	}
}